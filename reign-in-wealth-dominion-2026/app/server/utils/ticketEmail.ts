import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

type TicketEmailData = {
  sessionId: string
  attendeeName: string
  attendeeEmail: string
  ticketName: string
  quantity: number
}

const escapeHtml = (value: string) => {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

const getFirstName = (name: string) => {
  return name.trim().split(/\s+/)[0] || 'there'
}

const getTicketDetails = (ticketName: string) => {
  const name = ticketName.toLowerCase()

  if (name.includes('vip')) {
    return {
      access: 'VIP Experience + Opening Night + Saturday Conference',
      schedule: 'Friday, December 11 · VIP Experience 12–4 PM',
    }
  }

  if (name.includes('gala')) {
    return {
      access: 'Reign in Wealth Fundraising Gala',
      schedule: 'Saturday, December 12 · 6–8 PM',
    }
  }

  return {
    access: 'Friday Opening Night + Saturday Conference',
    schedule: 'December 11–12, 2026',
  }
}

export async function sendTicketWelcomeEmail(
  data: TicketEmailData,
) {
  const venueName =
    process.env.DOMINION_VENUE_NAME ||
    'Courtyard by Marriott Yonkers Westchester County'

  const venueAddress =
    process.env.DOMINION_VENUE_ADDRESS ||
    'Venue address will be provided here.'

  const firstName = getFirstName(data.attendeeName)

  const details = getTicketDetails(data.ticketName)

  const safeFirstName = escapeHtml(firstName)
  const safeTicketName = escapeHtml(data.ticketName)
  const safeVenueName = escapeHtml(venueName)
  const safeVenueAddress = escapeHtml(venueAddress)

  const subject =
    `Welcome to DOMINION, ${firstName}`

  const html = `
<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>${subject}</title>
</head>

<body
  style="
    margin:0;
    padding:0;
    background:#050605;
    color:#f4efe5;
    font-family:Arial,Helvetica,sans-serif;
  "
>
  <div
    style="
      max-width:680px;
      margin:0 auto;
      padding:40px 20px;
    "
  >

    <!-- Brand -->
    <div
      style="
        padding:20px 0;
        border-bottom:1px solid rgba(197,164,109,.25);
      "
    >
      <div
        style="
          color:#c5a46d;
          font-size:10px;
          font-weight:700;
          letter-spacing:3px;
        "
      >
        REIGN IN WEALTH CONFERENCE 2026
      </div>

      <div
        style="
          margin-top:10px;
          color:#f4efe5;
          font-family:Georgia,serif;
          font-size:36px;
          line-height:1;
        "
      >
        DOMINION
      </div>
    </div>

    <!-- Main -->
    <div style="padding:48px 0 20px;">

      <div
        style="
          color:#c5a46d;
          font-size:11px;
          font-weight:700;
          letter-spacing:2px;
          text-transform:uppercase;
        "
      >
        YOUR PLACE IS CONFIRMED
      </div>

      <h1
        style="
          margin:16px 0 0;
          color:#f4efe5;
          font-family:Georgia,serif;
          font-size:42px;
          line-height:1.05;
          font-weight:400;
        "
      >
        Welcome to DOMINION, ${safeFirstName}.
      </h1>

      <p
        style="
          margin:24px 0 0;
          color:rgba(244,239,229,.78);
          font-size:16px;
          line-height:1.8;
        "
      >
        Thank you for choosing to be part of DOMINION.
        Your ticket purchase is confirmed, and we are looking forward
        to welcoming you into the room.
      </p>

      <p
        style="
          margin:18px 0 0;
          color:rgba(244,239,229,.78);
          font-size:16px;
          line-height:1.8;
        "
      >
        Come ready to learn, connect, build and think differently
        about what it means to occupy your place.
      </p>

    </div>

    <!-- Ticket details -->
    <div
      style="
        margin-top:28px;
        padding:28px;
        border:1px solid rgba(255,255,255,.12);
        background:#0b100c;
      "
    >
      <div
        style="
          color:#c5a46d;
          font-size:10px;
          font-weight:700;
          letter-spacing:2px;
          text-transform:uppercase;
        "
      >
        YOUR TICKET
      </div>

      <div
        style="
          margin-top:12px;
          color:#f4efe5;
          font-family:Georgia,serif;
          font-size:28px;
        "
      >
        ${safeTicketName}
      </div>

      <div
        style="
          margin-top:20px;
          padding-top:20px;
          border-top:1px solid rgba(255,255,255,.1);
        "
      >
        <div
          style="
            color:rgba(244,239,229,.5);
            font-size:10px;
            letter-spacing:1.5px;
            text-transform:uppercase;
          "
        >
          Access
        </div>

        <div
          style="
            margin-top:7px;
            color:#f4efe5;
            font-size:14px;
            line-height:1.6;
          "
        >
          ${escapeHtml(details.access)}
        </div>
      </div>

      <div style="margin-top:20px;">
        <div
          style="
            color:rgba(244,239,229,.5);
            font-size:10px;
            letter-spacing:1.5px;
            text-transform:uppercase;
          "
        >
          Schedule
        </div>

        <div
          style="
            margin-top:7px;
            color:#f4efe5;
            font-size:14px;
            line-height:1.6;
          "
        >
          ${escapeHtml(details.schedule)}
        </div>
      </div>

      <div style="margin-top:20px;">
        <div
          style="
            color:rgba(244,239,229,.5);
            font-size:10px;
            letter-spacing:1.5px;
            text-transform:uppercase;
          "
        >
          Quantity
        </div>

        <div
          style="
            margin-top:7px;
            color:#f4efe5;
            font-size:14px;
          "
        >
          ${data.quantity}
        </div>
      </div>
    </div>

    <!-- Private venue -->
    <div
      style="
        margin-top:18px;
        padding:28px;
        border:1px solid rgba(197,164,109,.35);
        background:#0b100c;
      "
    >
      <div
        style="
          color:#c5a46d;
          font-size:10px;
          font-weight:700;
          letter-spacing:2px;
          text-transform:uppercase;
        "
      >
        PRIVATE VENUE DETAILS
      </div>

      <div
        style="
          margin-top:14px;
          color:#f4efe5;
          font-family:Georgia,serif;
          font-size:23px;
        "
      >
        ${safeVenueName}
      </div>

      <div
        style="
          margin-top:8px;
          color:rgba(244,239,229,.7);
          font-size:14px;
          line-height:1.7;
        "
      >
        ${safeVenueAddress}
      </div>

      <p
        style="
          margin:18px 0 0;
          color:rgba(244,239,229,.5);
          font-size:12px;
          line-height:1.7;
        "
      >
        Please keep this email for your records.
        The private venue details above are provided to registered
        ticket holders.
      </p>
    </div>

    <!-- Important -->
    <div
      style="
        margin-top:28px;
        padding:24px 0;
        border-top:1px solid rgba(255,255,255,.1);
        border-bottom:1px solid rgba(255,255,255,.1);
      "
    >
      <p
        style="
          margin:0;
          color:rgba(244,239,229,.7);
          font-size:13px;
          line-height:1.8;
        "
      >
        Your Stripe payment receipt is separate from this email.
        Please keep both for your records.
      </p>

      <p
        style="
          margin:14px 0 0;
          color:rgba(244,239,229,.7);
          font-size:13px;
          line-height:1.8;
        "
      >
        Please note that ticket purchases are non-refundable.
      </p>
    </div>

    <!-- Closing -->
    <div style="padding:42px 0 20px;">

      <p
        style="
          margin:0;
          color:#f4efe5;
          font-family:Georgia,serif;
          font-size:24px;
          line-height:1.4;
        "
      >
        Pray. Prepare. Build. Own. Multiply.
      </p>

      <p
        style="
          margin:22px 0 0;
          color:rgba(244,239,229,.65);
          font-size:14px;
          line-height:1.8;
        "
      >
        We look forward to seeing you in December.
      </p>

    </div>

    <!-- Footer -->
    <div
      style="
        padding-top:28px;
        border-top:1px solid rgba(255,255,255,.1);
      "
    >
      <div
        style="
          color:#c5a46d;
          font-size:10px;
          font-weight:700;
          letter-spacing:2px;
        "
      >
        REIGN IN WEALTH CONFERENCE
      </div>

      <div
        style="
          margin-top:8px;
          color:rgba(244,239,229,.4);
          font-size:11px;
        "
      >
        DOMINION 2026 · Occupy. Build. Multiply. Reign.
      </div>
    </div>

  </div>
</body>
</html>
`

  const result = await resend.emails.send(
    {
      from:
        process.env.RESEND_FROM_EMAIL ||
        'DOMINION <hello@reigninwealthconference.com>',

      to: [data.attendeeEmail],

      subject,

      html,
    },
    {
      // Same checkout session = same email.
      // This protects against duplicate webhook retries.
      idempotencyKey: `dominion-welcome/${data.sessionId}`,
    },
  )

  if (result.error) {
    throw new Error(result.error.message)
  }

  return result.data
}