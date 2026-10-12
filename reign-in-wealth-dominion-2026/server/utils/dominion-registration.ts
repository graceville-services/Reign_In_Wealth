
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

function getConfig() {
  const config = {
    stripeKey: process.env.STRIPE_SECRET_KEY,
    supabaseUrl: process.env.SUPABASE_URL,
    supabaseSecret: process.env.SUPABASE_SECRET_KEY,
    resendKey: process.env.RESEND_API_KEY,
    emailFrom: process.env.EMAIL_FROM,
    organizerEmail: process.env.ORGANIZER_EMAIL,
  }

  const missing = Object.entries(config)
    .filter(([, value]) => !value)
    .map(([key]) => key)

  if (missing.length) {
    throw new Error(
      `Missing DOMINION server environment variables: ${missing.join(', ')}`,
    )
  }

  return config as {
    stripeKey: string
    supabaseUrl: string
    supabaseSecret: string
    resendKey: string
    emailFrom: string
    organizerEmail: string
  }
}

function createClients() {
  const config = getConfig()

  return {
    stripe: new Stripe(config.stripeKey),

    supabase: createClient(
      config.supabaseUrl,
      config.supabaseSecret,
      {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        },
      },
    ),

    resend: new Resend(config.resendKey),
    emailFrom: config.emailFrom,
    organizerEmail: config.organizerEmail,
  }
}

type DominionClients = ReturnType<typeof createClients>

let clients: DominionClients | undefined

function getClients(): DominionClients {
  if (!clients) {
    clients = createClients()
  }

  return clients
}

export function getStripeClient(): Stripe {
  return getClients().stripe
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (char) => {
    const entities: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    }

    return entities[char]
  })
}

function ticketPrivileges(ticketId: string) {
  switch (ticketId.toLowerCase()) {
    case 'vip':
      return {
        title: 'VIP Experience',
        description:
          'Your VIP ticket includes conference admission and the Saturday gala, plus the VIP Friday experience from 12 PM to 4 PM, featuring Real Estate Career Pivot, Wealth Accelerator, Health Is My Wealth, Inner Circle, and lunch.',
      }

    case 'gala':
    case 'gala-only':
    case 'gala_only':
      return {
        title: 'Gala Only',
        description:
          'Your admission is for the DOMINION gala on Saturday, December 12, 2026, at 7 PM. This ticket does not include the conference sessions or Friday VIP events.',
      }

    case 'regular':
    default:
      return {
        title: 'Conference Admission',
        description:
          'Your Regular ticket includes conference admission and the Saturday gala. It does not include the additional Friday VIP experience.',
      }
  }
}

function emailLayout(content: string) {
  const logo = process.env.DOMINION_LOGO_URL

  const logoHtml = logo
    ? `<img src="${escapeHtml(logo)}" alt="REIGN IN WEALTH — DOMINION 2026" width="220" style="display:block;max-width:100%;height:auto;margin:0 auto 24px;">`
    : '<div style="font-size:24px;font-weight:bold;letter-spacing:2px;">REIGN IN WEALTH</div>'

  return `
  <!doctype html>
  <html>
    <body style="margin:0;background:#111111;color:#f6f0e4;font-family:Arial,sans-serif;">
      <div style="max-width:640px;margin:0 auto;padding:32px 20px;">
        <div style="text-align:center;padding:28px 16px;border-bottom:1px solid #b99a55;">
          ${logoHtml}
          <div style="color:#c9a85c;font-size:12px;letter-spacing:4px;">
            DOMINION 2026
          </div>
          <h1 style="font-family:Georgia,serif;font-weight:normal;font-size:36px;margin:18px 0 8px;">
            Occupy. Build. Multiply. Reign.
          </h1>
        </div>

        <div style="padding:28px 4px;line-height:1.75;font-size:15px;">
          ${content}
        </div>

        <div style="border-top:1px solid #444;padding:20px 4px;color:#b7b0a3;font-size:12px;line-height:1.7;">
          REIGN IN WEALTH CONFERENCE · DOMINION 2026<br>
          December 11–12, 2026 · Yonkers, New York<br>
          Please retain this email for your registration records.
        </div>
      </div>
    </body>
  </html>`
}

async function claimEmail(
  registrationId: string,
  kind: 'attendee' | 'organizer',
) {
  const { supabase } = getClients()

  const { data, error } = await supabase.rpc(
    'claim_dominion_email',
    {
      p_registration_id: registrationId,
      p_kind: kind,
    },
  )

  if (error) throw error

  return data === true
}

async function releaseEmailClaim(
  registrationId: string,
  kind: 'attendee' | 'organizer',
) {
  const { supabase } = getClients()

  const claimedColumn =
    kind === 'attendee'
      ? 'attendee_email_claimed_at'
      : 'organizer_email_claimed_at'

  const { error } = await supabase
    .from('dominion_registrations')
    .update({ [claimedColumn]: null })
    .eq('id', registrationId)

  if (error) {
    console.error('Could not release email claim:', error)
  }
}

async function markEmailSent(
  registrationId: string,
  kind: 'attendee' | 'organizer',
) {
  const { supabase } = getClients()

  const sentColumn =
    kind === 'attendee'
      ? 'attendee_email_sent_at'
      : 'organizer_email_sent_at'

  const claimedColumn =
    kind === 'attendee'
      ? 'attendee_email_claimed_at'
      : 'organizer_email_claimed_at'

  const { error } = await supabase
    .from('dominion_registrations')
    .update({
      [sentColumn]: new Date().toISOString(),
      [claimedColumn]: null,
    })
    .eq('id', registrationId)

  if (error) throw error
}

async function deliverEmail(
  registrationId: string,
  kind: 'attendee' | 'organizer',
  message: {
    to: string
    subject: string
    html: string
    idempotencyKey: string
  },
) {
  const claimed = await claimEmail(registrationId, kind)

  if (!claimed) return

  try {
    const { resend, emailFrom } = getClients()

    const { data, error } = await resend.emails.send(
      {
        from: emailFrom,
        to: [message.to],
        subject: message.subject,
        html: message.html,
      },
      {
        idempotencyKey: message.idempotencyKey,
      },
    )

    if (error || !data?.id) {
      throw new Error(error?.message || 'Email delivery failed.')
    }

    await markEmailSent(registrationId, kind)
  } catch (error) {
    await releaseEmailClaim(registrationId, kind)
    throw error
  }
}

export async function processPaidSession(sessionId: string) {
  const { stripe, supabase, organizerEmail } = getClients()

  // Always retrieve the checkout session directly from Stripe.
  const session = await stripe.checkout.sessions.retrieve(sessionId)

  if (session.payment_status !== 'paid') {
    return {
      paid: false,
      status: session.status,
    }
  }

  const ticketId = session.metadata?.ticketId || ''
  const ticketName = session.metadata?.ticketName || ''

  const attendeeName = (
    session.metadata?.attendeeName ||
    session.customer_details?.name ||
    ''
  ).trim()

  const attendeeEmail = (
    session.metadata?.attendeeEmail ||
    session.customer_details?.email ||
    session.customer_email ||
    ''
  ).trim().toLowerCase()

  const quantity = Number(session.metadata?.quantity || 1)

  if (
    !ticketId ||
    !ticketName ||
    !attendeeName ||
    !attendeeEmail.includes('@') ||
    !Number.isInteger(quantity) ||
    quantity < 1 ||
    quantity > 20
  ) {
    throw new Error(
      'Paid session has incomplete registration metadata.',
    )
  }

  // Save the paid registration before attempting email delivery.
  const { error: insertError } = await supabase
    .from('dominion_registrations')
    .upsert(
      {
        stripe_session_id: session.id,
        stripe_payment_intent_id:
          typeof session.payment_intent === 'string'
            ? session.payment_intent
            : null,
        ticket_id: ticketId,
        ticket_name: ticketName,
        quantity,
        attendee_name: attendeeName,
        attendee_email: attendeeEmail,
        amount_total: session.amount_total,
        currency: session.currency,
        payment_status: 'paid',
        updated_at: new Date().toISOString(),
      },
      {
        onConflict: 'stripe_session_id',
        ignoreDuplicates: true,
      },
    )

  if (insertError) throw insertError

  const { data: registration, error: readError } = await supabase
    .from('dominion_registrations')
    .select('*')
    .eq('stripe_session_id', session.id)
    .single()

  if (readError || !registration) {
    throw readError || new Error(
      'Registration could not be loaded.',
    )
  }

  const privileges = ticketPrivileges(registration.ticket_id)
  const name = escapeHtml(registration.attendee_name)
  const safeTicket = escapeHtml(registration.ticket_name)

  const registrationNumber = escapeHtml(
    registration.registration_number,
  )

  const hotelUrl = process.env.HOTEL_BOOKING_URL

  const hotelHtml = hotelUrl
    ? `<p><a href="${escapeHtml(hotelUrl)}" style="color:#c9a85c;">Book your hotel room</a></p>
       <p style="font-size:12px;color:#b7b0a3;">The hotel rate previously advertised was $169 per night, with a November 11, 2026 booking deadline. Availability and rates are subject to the hotel's terms.</p>`
    : '<p>Please contact the event organizer for the official hotel reservation link.</p>'

  const attendeeHtml = emailLayout(`
    <p>Hello ${name},</p>

    <h2 style="font-family:Georgia,serif;font-weight:normal;">
      Your registration is confirmed.
    </h2>

    <p>We've verified your payment. Thank you for registering for REIGN IN WEALTH CONFERENCE — DOMINION 2026.</p>

    <div style="border:1px solid #c9a85c;padding:20px;margin:24px 0;">
      <div style="font-size:11px;letter-spacing:2px;color:#c9a85c;">REGISTRATION NUMBER</div>
      <div style="font-size:25px;font-weight:bold;margin:8px 0 18px;">${registrationNumber}</div>
      <div style="color:#c9a85c;font-size:11px;letter-spacing:2px;">TICKET</div>
      <div style="font-size:22px;margin:8px 0;">${safeTicket}</div>
      <p>Quantity: ${registration.quantity}</p>
      <p>Dates: December 11–12, 2026</p>
      <p>Location: Yonkers, New York</p>
    </div>

    <h3 style="color:#c9a85c;">Your admission privileges</h3>
    <p>${escapeHtml(privileges.description)}</p>

    <h3 style="color:#c9a85c;">Hotel accommodation</h3>
    ${hotelHtml}

    <p>Keep this email and your registration number for check-in. This email is your registration confirmation; it is not a QR ticket.</p>
    <p>We look forward to welcoming you.</p>
    <p>REIGN IN WEALTH<br>DOMINION 2026</p>
  `)

  const amount =
    typeof registration.amount_total === 'number'
      ? new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: (
            registration.currency || 'usd'
          ).toUpperCase(),
        }).format(registration.amount_total / 100)
      : 'Unavailable'

  const organizerHtml = emailLayout(`
    <h2 style="font-family:Georgia,serif;font-weight:normal;">
      New ticket purchase
    </h2>

    <p>A Stripe payment has been verified and a registration has been saved.</p>
    <p><strong>Registration:</strong> ${registrationNumber}</p>
    <p><strong>Attendee:</strong> ${name}</p>
    <p><strong>Email:</strong> ${escapeHtml(registration.attendee_email)}</p>
    <p><strong>Ticket:</strong> ${safeTicket} (${escapeHtml(registration.ticket_id)})</p>
    <p><strong>Quantity:</strong> ${registration.quantity}</p>
    <p><strong>Amount paid:</strong> ${escapeHtml(amount)}</p>
    <p><strong>Stripe session:</strong> ${escapeHtml(session.id)}</p>
  `)

  const emailErrors: string[] = []

  try {
    await deliverEmail(registration.id, 'attendee', {
      to: registration.attendee_email,
      subject: `Your DOMINION 2026 registration — ${registration.registration_number}`,
      html: attendeeHtml,
      idempotencyKey: `dominion-attendee-${registration.id}`,
    })
  } catch (error) {
    console.error('Attendee email failed:', error)
    emailErrors.push('attendee')
  }

  try {
    await deliverEmail(registration.id, 'organizer', {
      to: organizerEmail,
      subject: `New DOMINION ticket purchase — ${registration.registration_number}`,
      html: organizerHtml,
      idempotencyKey: `dominion-organizer-${registration.id}`,
    })
  } catch (error) {
    console.error('Organizer email failed:', error)
    emailErrors.push('organizer')
  }

  return {
    paid: true,
    status: session.status,
    registrationNumber: registration.registration_number,
    ticketName: registration.ticket_name,
    quantity: registration.quantity,
    attendeeName: registration.attendee_name,
    attendeeEmail: registration.attendee_email,
    emailErrors,
  }
}
