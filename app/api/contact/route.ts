import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { recruiterName, company, role, email, message } = await req.json();

  if (!recruiterName || !company || !role) {
    return NextResponse.json(
      { error: "Name, company, and role are required" },
      { status: 400 }
    );
  }

  const accessKey = process.env.WEB3FORMS_KEY;

  if (!accessKey) {
    console.error("WEB3FORMS_KEY is not set");
    return NextResponse.json(
      { error: "Email service not configured" },
      { status: 500 }
    );
  }

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        access_key: accessKey,
        subject: `Recruiter Interest: ${recruiterName} at ${company} — ${role}`,
        from_name: "Atif Agent (Portfolio Chatbot)",
        name: recruiterName,
        company,
        role,
        email: email || "Not provided",
        message: message || "No additional message",
        botcheck: false,
      }),
    });

    const data = await response.json();

    if (data.success) {
      return NextResponse.json({ success: true });
    }

    console.error("Web3Forms error:", data);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
