import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { category, name, phone, location, notes } = body;

    const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;

    if (webhookUrl) {
      // Send to Google Apps Script Webhook
      await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          timestamp: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
          category: category || "Volunteer",
          name: name || "",
          phone: phone || "",
          location: location || "",
          notes: notes || "",
        }),
      });
    }

    return NextResponse.json({ ok: true, message: "Submission received successfully" });
  } catch (error) {
    console.error("Contact form submission error:", error);
    return NextResponse.json(
      { ok: false, error: "Failed to process submission" },
      { status: 500 }
    );
  }
}
