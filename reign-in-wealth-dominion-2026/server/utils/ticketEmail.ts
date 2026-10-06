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

  const subject = `Your DOMINION 2026 Ticket Is Confirmed, ${firstName}`

  const html = `
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <meta name="x-apple-disable-message-reformatting">
  <meta name="color-scheme" content="dark">
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
      width:100%;
      background:#050605;
      padding:32px 16px;
      box-sizing:border-box;
    "
  >

    <div
      style="
        max-width:680px;
        margin:0 auto;
      "
    >

      <!-- HEADER -->
      <div
        style="
          padding:24px 0 22px;
          border-bottom:1px solid rgba(197,164,109,.25);
        "
      >
        <div
          style="
            color:#c5a46d;
            font-size:10px;
            font-weight:700;
            letter-spacing:3px;
            text-transform:uppercase;
          "
        >
          REIGN IN WEALTH CONFERENCE 2026
        </div>

        <div
          style="
            margin-top:10px;
            color:#f4efe5;
            font-family:Georgia,'Times New Roman',serif;
            font-size:38px;
            line-height:1;
            letter-spacing:-1px;
          "
        >
          DOMINION
        </div>

        <div
          style="
            margin-top:10px;
            color:rgba(244,239,229,.45);
            font-size:11px;
            letter-spacing:1.5px;
          "
        >
          OCCUPY. BUILD. MULTIPLY. REIGN.
        </div>
      </div>


      <!-- CONFIRMATION -->
      <div style="padding:50px 0 30px;">

        <div
          style="
            display:inline-block;
            padding:8px 12px;
            border:1px solid rgba(197,164,109,.35);
            color:#c5a46d;
            font-size:10px;
            font-weight:700;
            letter-spacing:2px;
            text-transform:uppercase;
          "
        >
          REGISTRATION CONFIRMED
        </div>

        <h1
          style="
            margin:20px 0 0;
            color:#f4efe5;
            font-family:Georgia,'Times New Roman',serif;
            font-size:42px;
            line-height:1.08;
            font-weight:400;
            letter-spacing:-.8px;
          "
        >
          You're officially joining us, ${safeFirstName}.
        </h1>

        <p
          style="
            margin:24px 0 0;
            color:rgba(244,239,229,.78);
            font-size:16px;
            line-height:1.8;
          "
        >
          Thank you for registering for DOMINION 2026.
          Your ticket purchase has been successfully confirmed,
          and your place at the conference is secured.
        </p>

        <p
          style="
            margin:16px 0 0;
            color:rgba(244,239,229,.78);
            font-size:16px;
            line-height:1.8;
          "
        >
          This is more than a conference. It is a gathering of
          people committed to learning, building, connecting,
          creating opportunities and taking greater ownership
          of what comes next.
        </p>

      </div>


      <!-- TICKET CARD -->
      <div
        style="
          margin-top:10px;
          padding:30px;
          border:1px solid rgba(197,164,109,.3);
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
            margin-top:14px;
            color:#f4efe5;
            font-family:Georgia,'Times New Roman',serif;
            font-size:29px;
            line-height:1.25;
          "
        >
          ${safeTicketName}
        </div>


        <div
          style="
            margin-top:26px;
            padding-top:22px;
            border-top:1px solid rgba(255,255,255,.1);
          "
        >

          <div
            style="
              color:rgba(244,239,229,.42);
              font-size:10px;
              font-weight:700;
              letter-spacing:1.5px;
              text-transform:uppercase;
            "
          >
            ACCESS
          </div>

          <div
            style="
              margin-top:8px;
              color:#f4efe5;
              font-size:14px;
              line-height:1.7;
            "
          >
            ${escapeHtml(details.access)}
          </div>

        </div>


        <div style="margin-top:22px;">

          <div
            style="
              color:rgba(244,239,229,.42);
              font-size:10px;
              font-weight:700;
              letter-spacing:1.5px;
              text-transform:uppercase;
            "
          >
            DATE & SCHEDULE
          </div>

          <div
            style="
              margin-top:8px;
              color:#f4efe5;
              font-size:14px;
              line-height:1.7;
            "
          >
            ${escapeHtml(details.schedule)}
          </div>

        </div>


        <div style="margin-top:22px;">

          <div
            style="
              color:rgba(244,239,229,.42);
              font-size:10px;
              font-weight:700;
              letter-spacing:1.5px;
              text-transform:uppercase;
            "
          >
            QUANTITY
          </div>

          <div
            style="
              margin-top:8px;
              color:#f4efe5;
              font-size:14px;
            "
          >
            ${data.quantity} ${data.quantity === 1 ? 'ticket' : 'tickets'}
          </div>

        </div>

      </div>


      <!-- VENUE -->
      <div
        style="
          margin-top:18px;
          padding:30px;
          border:1px solid rgba(255,255,255,.1);
          background:#090d0a;
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
          EVENT VENUE
        </div>

        <div
          style="
            margin-top:14px;
            color:#f4efe5;
            font-family:Georgia,'Times New Roman',serif;
            font-size:24px;
            line-height:1.3;
          "
        >
          ${safeVenueName}
        </div>

        <div
          style="
            margin-top:10px;
            color:rgba(244,239,229,.68);
            font-size:14px;
            line-height:1.7;
          "
        >
          ${safeVenueAddress}
        </div>

      </div>


      <!-- WHAT TO EXPECT -->
      <div style="padding:42px 0 34px;">

        <div
          style="
            color:#c5a46d;
            font-size:10px;
            font-weight:700;
            letter-spacing:2px;
            text-transform:uppercase;
          "
        >
          WHAT TO EXPECT
        </div>

        <h2
          style="
            margin:14px 0 0;
            color:#f4efe5;
            font-family:Georgia,'Times New Roman',serif;
            font-size:28px;
            font-weight:400;
          "
        >
          Come prepared to make the most of it.
        </h2>

        <p
          style="
            margin:16px 0 0;
            color:rgba(244,239,229,.68);
            font-size:14px;
            line-height:1.8;
          "
        >
          Expect meaningful conversations, practical insights,
          valuable connections and an environment designed to
          challenge you to think bigger about wealth, leadership,
          business and your future.
        </p>

        <p
          style="
            margin:14px 0 0;
            color:rgba(244,239,229,.68);
            font-size:14px;
            line-height:1.8;
          "
        >
          We recommend arriving prepared, keeping this confirmation
          accessible and allowing yourself enough time to check in
          before your scheduled sessions.
        </p>

      </div>


      <!-- IMPORTANT INFORMATION -->
      <div
        style="
          padding:28px 0;
          border-top:1px solid rgba(255,255,255,.1);
          border-bottom:1px solid rgba(255,255,255,.1);
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
          IMPORTANT INFORMATION
        </div>

        <div style="margin-top:18px;">

          <p
            style="
              margin:0;
              color:rgba(244,239,229,.68);
              font-size:13px;
              line-height:1.8;
            "
          >
            <strong style="color:#f4efe5;">
              Keep this email:
            </strong>
            Please save this confirmation for your records.
            You may need it when checking in at the event.
          </p>

          <p
            style="
              margin:14px 0 0;
              color:rgba(244,239,229,.68);
              font-size:13px;
              line-height:1.8;
            "
          >
            <strong style="color:#f4efe5;">
              Payment receipt:
            </strong>
            Your Stripe payment receipt is provided separately.
            Please keep that receipt together with this confirmation.
          </p>

          <p
            style="
              margin:14px 0 0;
              color:rgba(244,239,229,.68);
              font-size:13px;
              line-height:1.8;
            "
          >
            <strong style="color:#f4efe5;">
              Ticket policy:
            </strong>
            Ticket purchases are non-refundable.
          </p>

        </div>

      </div>


      <!-- CLOSING -->
      <div
        style="
          padding:46px 0 40px;
          text-align:center;
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
          DECEMBER 2026
        </div>

        <div
          style="
            margin-top:16px;
            color:#f4efe5;
            font-family:Georgia,'Times New Roman',serif;
            font-size:29px;
            line-height:1.35;
          "
        >
          Pray. Prepare. Build. Own. Multiply.
        </div>

        <p
          style="
            margin:18px 0 0;
            color:rgba(244,239,229,.58);
            font-size:14px;
            line-height:1.8;
          "
        >
          We look forward to welcoming you to DOMINION 2026.
        </p>

      </div>


      <!-- FOOTER -->
      <div
        style="
          padding:26px 0 10px;
          border-top:1px solid rgba(255,255,255,.1);
          text-align:center;
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
            margin-top:9px;
            color:rgba(244,239,229,.35);
            font-size:11px;
            line-height:1.6;
          "
        >
          DOMINION 2026 · Occupy. Build. Multiply. Reign.
        </div>

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
      idempotencyKey: `dominion-welcome/${data.sessionId}`,
    },
  )

  if (result.error) {
    throw new Error(result.error.message)
  }

  return result.data
}