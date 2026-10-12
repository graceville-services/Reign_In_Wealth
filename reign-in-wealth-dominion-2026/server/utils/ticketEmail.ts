import { Resend } from 'resend'
import { site } from '~/data/site'

const resendApiKey = process.env.RESEND_API_KEY
const emailFrom = process.env.RESEND_FROM_EMAIL || process.env.EMAIL_FROM
const siteUrl = (
  process.env.NUXT_PUBLIC_SITE_URL || `https://${site.domain}`
).replace(/\/+$/, '')

if (!resendApiKey) {
  throw new Error('RESEND_API_KEY is not configured.')
}

if (!emailFrom) {
  throw new Error(
    'RESEND_FROM_EMAIL or EMAIL_FROM is not configured.',
  )
}

const resend = new Resend(resendApiKey)

export interface TicketEmailData {
  sessionId: string
  attendeeName: string
  attendeeEmail: string
  ticketName: string
  ticketId?: string
  quantity: number
  registrationNumber?: string
}

interface TicketDetails {
  id: string
  name: string
  price: number
  description: string
  features: string[]
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function getTicketDetails(
  ticketId?: string,
  ticketName?: string,
): TicketDetails {
  const normalizedId = ticketId?.toLowerCase().trim()
  const normalizedName = ticketName?.toLowerCase().trim()

  const ticket = site.tickets.find((item) => {
    if (normalizedId && item.id === normalizedId) {
      return true
    }

    return (
      !!normalizedName &&
      item.name.toLowerCase() === normalizedName
    )
  })

  if (!ticket) {
    throw new Error(
      `Unable to identify the purchased ticket. ID: ${
        ticketId || 'not provided'
      }, name: ${ticketName || 'not provided'}`,
    )
  }

  return {
    id: ticket.id,
    name: ticket.name,
    price: ticket.price,
    description: ticket.description,
    features: ticket.features,
  }
}

function getAdmissionNote(ticketId: string): string {
  switch (ticketId) {
    case 'vip':
      return (
        'Your VIP ticket includes Regular Admission benefits, ' +
        'the Saturday conference and Fundraising Gala, plus the ' +
        'exclusive Friday VIP Experience from 12:00 PM to 4:00 PM.'
      )

    case 'regular':
      return (
        'Your Regular Admission ticket includes Friday Opening Night, ' +
        'Saturday wellness and main conference experiences, and the ' +
        'Saturday evening Fundraising Gala. The Friday afternoon ' +
        'VIP Experience is not included.'
      )

    case 'gala':
      return (
        'Your ticket grants admission to the Saturday evening ' +
        'Fundraising Gala only. It does not include the main conference ' +
        'or Friday VIP Experience.'
      )

    default:
      return ''
  }
}

function renderFeatures(features: string[]): string {
  return features
    .map(
      (feature) => `
        <tr>
          <td style="padding:0 0 12px;">
            <table role="presentation" cellpadding="0" cellspacing="0">
              <tr>
                <td
                  width="24"
                  valign="top"
                  style="color:#c5a46d;font-size:16px;font-weight:bold;"
                >
                  &#10003;
                </td>
                <td
                  style="color:#e8e1d5;font-size:14px;line-height:1.7;"
                >
                  ${escapeHtml(feature)}
                </td>
              </tr>
            </table>
          </td>
        </tr>
      `,
    )
    .join('')
}

export async function sendTicketWelcomeEmail(
  data: TicketEmailData,
) {
  const ticket = getTicketDetails(data.ticketId, data.ticketName)

  const attendeeName = escapeHtml(
    data.attendeeName.trim() || 'Guest',
  )

  const attendeeEmail = data.attendeeEmail.trim()
  const quantity = Math.max(1, Math.floor(data.quantity || 1))

  if (!attendeeEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(attendeeEmail)) {
    throw new Error('A valid attendee email address is required.')
  }

  const registrationNumber =
    data.registrationNumber?.trim() || data.sessionId

  const safeRegistrationNumber = escapeHtml(registrationNumber)
  const safeTicketName = escapeHtml(ticket.name)
  const safeEventName = escapeHtml(site.name)
  const safeTheme = escapeHtml(site.theme)
  const safeDates = escapeHtml(site.dates)
  const safeLocation = escapeHtml(site.location)
  const safeTagline = escapeHtml(site.tagline)
  const safeHotelName = escapeHtml(site.hotel.name)
  const safeHotelRate = escapeHtml(site.hotel.rate)
  const safeHotelDeadline = escapeHtml(site.hotel.bookingDeadline)
  const safeHotelPhone = escapeHtml(site.hotel.phone)
  const safeGroupName = escapeHtml(site.hotel.groupName)

  const logoUrl =
    process.env.DOMINION_LOGO_URL ||
    `${siteUrl}/images/logo.png`

  const hotelUrl = site.hotel.bookingUrl
  const admissionNote = escapeHtml(getAdmissionNote(ticket.id))

  const total = ticket.price * quantity
  const formattedTotal = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(total)

  const subject =
    `You're Registered for ${site.theme} 2026 — ${ticket.name}`

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="color-scheme" content="dark" />
  <title>${safeEventName} Registration Confirmation</title>
</head>

<body style="margin:0;padding:0;background:#11110f;font-family:Arial,Helvetica,sans-serif;color:#f4efe5;">

  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">
    Your ${safeTicketName} registration is confirmed for ${safeDates}. We look forward to welcoming you to ${safeTheme}.
  </div>

  <table
    role="presentation"
    width="100%"
    cellpadding="0"
    cellspacing="0"
    border="0"
    style="background:#11110f;width:100%;"
  >
    <tr>
      <td align="center" style="padding:32px 12px;">

        <table
          role="presentation"
          width="600"
          cellpadding="0"
          cellspacing="0"
          border="0"
          style="width:100%;max-width:600px;background:#191916;border:1px solid #39342a;"
        >

          <!-- Brand header -->
          <tr>
            <td align="center" style="padding:36px 24px 30px;background:#141411;border-bottom:1px solid #51452e;">

              <a
                href="${siteUrl}"
                style="text-decoration:none;"
              >
                <img
                  src="${escapeHtml(logoUrl)}"
                  alt="${safeEventName}"
                  width="100"
                  style="display:block;width:100px;max-width:100%;height:auto;margin:0 auto 22px;border:0;"
                />
              </a>

              <p style="margin:0 0 10px;color:#c5a46d;font-size:11px;letter-spacing:4px;text-transform:uppercase;">
                ${safeEventName}
              </p>

              <h1 style="margin:0;color:#f4efe5;font-family:Georgia,'Times New Roman',serif;font-size:42px;line-height:1.1;letter-spacing:3px;font-weight:normal;">
                ${safeTheme}
              </h1>

              <p style="margin:14px 0 0;color:#bcb4a5;font-size:13px;letter-spacing:1px;">
                ${safeTagline}
              </p>

            </td>
          </tr>

          <!-- Confirmation -->
          <tr>
            <td style="padding:34px 28px 16px;">

              <p style="margin:0 0 12px;color:#c5a46d;font-size:11px;letter-spacing:2px;text-transform:uppercase;">
                Registration Confirmed
              </p>

              <h2 style="margin:0 0 16px;color:#f4efe5;font-family:Georgia,'Times New Roman',serif;font-size:29px;line-height:1.3;font-weight:normal;">
                You're on the list, ${attendeeName}.
              </h2>

              <p style="margin:0;color:#d1c9bb;font-size:15px;line-height:1.9;">
                Thank you for registering for ${safeEventName} 2026.
                Your ticket purchase has been confirmed, and we look
                forward to welcoming you to ${safeTheme}.
              </p>

            </td>
          </tr>

          <!-- Ticket details -->
          <tr>
            <td style="padding:20px 28px 12px;">

              <table
                role="presentation"
                width="100%"
                cellpadding="0"
                cellspacing="0"
                border="0"
                style="background:#22211c;border:1px solid #504632;"
              >
                <tr>
                  <td style="padding:24px;">

                    <p style="margin:0 0 8px;color:#c5a46d;font-size:10px;letter-spacing:2px;text-transform:uppercase;">
                      Your Ticket
                    </p>

                    <h3 style="margin:0 0 20px;color:#f4efe5;font-family:Georgia,'Times New Roman',serif;font-size:24px;font-weight:normal;">
                      ${safeTicketName}
                    </h3>

                    <table
                      role="presentation"
                      width="100%"
                      cellpadding="0"
                      cellspacing="0"
                      border="0"
                    >
                      <tr>
                        <td style="padding:12px 0;border-top:1px solid #454033;color:#aaa294;font-size:13px;">
                          Registration Number
                        </td>
                        <td align="right" style="padding:12px 0;border-top:1px solid #454033;color:#f4efe5;font-size:13px;font-weight:bold;word-break:break-word;">
                          ${safeRegistrationNumber}
                        </td>
                      </tr>

                      <tr>
                        <td style="padding:12px 0;border-top:1px solid #454033;color:#aaa294;font-size:13px;">
                          Quantity
                        </td>
                        <td align="right" style="padding:12px 0;border-top:1px solid #454033;color:#f4efe5;font-size:13px;">
                          ${quantity}
                        </td>
                      </tr>

                      <tr>
                        <td style="padding:12px 0;border-top:1px solid #454033;color:#aaa294;font-size:13px;">
                          Total Paid
                        </td>
                        <td align="right" style="padding:12px 0;border-top:1px solid #454033;color:#c5a46d;font-size:16px;font-weight:bold;">
                          ${escapeHtml(formattedTotal)}
                        </td>
                      </tr>
                    </table>

                    <p style="margin:20px 0 0;color:#d1c9bb;font-size:13px;line-height:1.8;">
                      ${admissionNote}
                    </p>

                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Event information -->
          <tr>
            <td style="padding:26px 28px 10px;">

              <h3 style="margin:0 0 18px;color:#f4efe5;font-family:Georgia,'Times New Roman',serif;font-size:22px;font-weight:normal;">
                Event Information
              </h3>

              <table
                role="presentation"
                width="100%"
                cellpadding="0"
                cellspacing="0"
                border="0"
              >
                <tr>
                  <td width="32" valign="top" style="padding:0 0 16px;color:#c5a46d;font-size:17px;">
                    &#9670;
                  </td>
                  <td style="padding:0 0 16px;">
                    <p style="margin:0 0 4px;color:#aaa294;font-size:11px;letter-spacing:1px;text-transform:uppercase;">
                      Dates
                    </p>
                    <p style="margin:0;color:#f4efe5;font-size:14px;line-height:1.7;">
                      ${safeDates}
                    </p>
                  </td>
                </tr>

                <tr>
                  <td width="32" valign="top" style="padding:0 0 16px;color:#c5a46d;font-size:17px;">
                    &#9670;
                  </td>
                  <td style="padding:0 0 16px;">
                    <p style="margin:0 0 4px;color:#aaa294;font-size:11px;letter-spacing:1px;text-transform:uppercase;">
                      Location
                    </p>
                    <p style="margin:0;color:#f4efe5;font-size:14px;line-height:1.7;">
                      ${safeLocation}
                    </p>
                    <p style="margin:5px 0 0;color:#aaa294;font-size:12px;line-height:1.7;">
                      Final venue details will be shared when confirmed.
                    </p>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Ticket inclusions -->
          <tr>
            <td style="padding:20px 28px 12px;">

              <h3 style="margin:0 0 18px;color:#f4efe5;font-family:Georgia,'Times New Roman',serif;font-size:22px;font-weight:normal;">
                What's Included
              </h3>

              <table
                role="presentation"
                width="100%"
                cellpadding="0"
                cellspacing="0"
                border="0"
              >
                ${renderFeatures(ticket.features)}
              </table>

            </td>
          </tr>

          <!-- Hotel -->
          <tr>
            <td style="padding:20px 28px 28px;">

              <table
                role="presentation"
                width="100%"
                cellpadding="0"
                cellspacing="0"
                border="0"
                style="background:#201e19;border:1px solid #504632;"
              >
                <tr>
                  <td style="padding:24px;">

                    <p style="margin:0 0 10px;color:#c5a46d;font-size:10px;letter-spacing:2px;text-transform:uppercase;">
                      Accommodation
                    </p>

                    <h3 style="margin:0 0 12px;color:#f4efe5;font-family:Georgia,'Times New Roman',serif;font-size:21px;line-height:1.4;font-weight:normal;">
                      Stay Near DOMINION
                    </h3>

                    <p style="margin:0 0 10px;color:#e8e1d5;font-size:14px;line-height:1.8;">
                      ${safeHotelName}
                    </p>

                    <p style="margin:0 0 6px;color:#d1c9bb;font-size:13px;line-height:1.8;">
                      Group rate: <strong style="color:#c5a46d;">${safeHotelRate}</strong>
                    </p>

                    <p style="margin:0 0 6px;color:#d1c9bb;font-size:13px;line-height:1.8;">
                      Booking deadline: ${safeHotelDeadline}
                    </p>

                    <p style="margin:0 0 20px;color:#d1c9bb;font-size:13px;line-height:1.8;">
                      Group name: ${safeGroupName}<br />
                      Hotel reservations: ${safeHotelPhone}
                    </p>

                    <table
                      role="presentation"
                      cellpadding="0"
                      cellspacing="0"
                      border="0"
                    >
                      <tr>
                        <td
                          align="center"
                          bgcolor="#c5a46d"
                          style="background:#c5a46d;"
                        >
                          <a
                            href="${escapeHtml(hotelUrl)}"
                            target="_blank"
                            style="display:inline-block;padding:14px 22px;color:#171510;font-size:12px;font-weight:bold;letter-spacing:1px;text-decoration:none;text-transform:uppercase;"
                          >
                            Book Your Hotel
                          </a>
                        </td>
                      </tr>
                    </table>

                    <p style="margin:16px 0 0;color:#9e9688;font-size:11px;line-height:1.7;">
                      Hotel rates and availability are subject to the hotel's
                      terms. Booking accommodations is separate from your
                      conference ticket.
                    </p>

                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Closing -->
          <tr>
            <td align="center" style="padding:26px 28px 34px;border-top:1px solid #39342a;">

              <p style="margin:0 0 12px;color:#c5a46d;font-family:Georgia,'Times New Roman',serif;font-size:23px;">
                Pray. Prepare. Build. Own. Multiply.
              </p>

              <p style="margin:0 0 20px;color:#bcb4a5;font-size:13px;line-height:1.8;">
                We look forward to seeing you at DOMINION 2026.
              </p>

              <a
                href="${siteUrl}"
                style="color:#c5a46d;font-size:12px;text-decoration:underline;"
              >
                Visit the Conference Website
              </a>

              <p style="margin:24px 0 0;color:#797367;font-size:11px;line-height:1.8;">
                ${safeEventName}<br />
                ${safeDates} · ${safeLocation}
              </p>

            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
`

  const text = `
${site.name}
${site.theme} — Registration Confirmed

Hello ${data.attendeeName || 'Guest'},

Thank you for registering for ${site.name} 2026. Your ticket purchase has been confirmed.

TICKET DETAILS
Ticket: ${ticket.name}
Registration Number: ${registrationNumber}
Quantity: ${quantity}
Total Paid: ${formattedTotal}

ADMISSION INFORMATION
${getAdmissionNote(ticket.id)}

WHAT'S INCLUDED
${ticket.features.map((feature) => `- ${feature}`).join('\n')}

EVENT INFORMATION
Dates: ${site.dates}
Location: ${site.location}
Final venue details will be shared when confirmed.

HOTEL ACCOMMODATION
Hotel: ${site.hotel.name}
Rate: ${site.hotel.rate}
Booking deadline: ${site.hotel.bookingDeadline}
Phone: ${site.hotel.phone}
Group name: ${site.hotel.groupName}
Book here: ${site.hotel.bookingUrl}

Hotel reservations are separate from your conference ticket. Rates and availability are subject to the hotel's terms.

We look forward to seeing you at DOMINION 2026.

Pray. Prepare. Build. Own. Multiply.

${site.domain}
`.trim()

  const { data: result, error } = await resend.emails.send(
    {
      from: emailFrom,
      to: [attendeeEmail],
      subject,
      html,
      text,
      tags: [
        { name: 'category', value: 'ticket-confirmation' },
        { name: 'ticket', value: ticket.id },
      ],
    },
    {
      idempotencyKey: `dominion-welcome/${data.sessionId}`,
    },
  )

  if (error) {
    console.error('Failed to send ticket confirmation email:', error)
    throw new Error(
      `Failed to send ticket confirmation email: ${error.message}`,
    )
  }

  return {
    success: true,
    emailId: result?.id,
    registrationNumber,
    ticketId: ticket.id,
  }
}