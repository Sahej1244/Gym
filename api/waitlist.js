// POST /api/waitlist
// Body: { email: string }
// MVP placeholder: logs the email server-side so you can see signups in your
// hosting provider's function logs. Before a real launch, swap the inside of
// this handler for a real integration — e.g. add the email to a Google Sheet,
// an Airtable base, a Mailchimp/ConvertKit audience, or a database table.
// Search "vercel + google sheets api" or "vercel + airtable" for copy-paste guides.

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { email } = req.body || {};
  if (!email || typeof email !== "string" || !email.includes("@") || email.length > 200) {
    res.status(400).json({ error: "Valid email required" });
    return;
  }

  // TODO: replace with a real integration before launch.
  console.log("Waitlist signup:", email, new Date().toISOString());

  res.status(200).json({ ok: true });
}
