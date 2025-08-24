import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { message, recipients } = await req.json();

    console.log("SMS recipients:", recipients);
    console.log("Message:", message);

    return NextResponse.json({
      ok: true,
      message: `SMS successfully sent to ${recipients.length} recipient(s) (static).`,
    });
  } catch (err) {
    console.error("Error in send-sms API:", err);
    return NextResponse.json({ error: "Failed to send SMS" }, { status: 500 });
  }
}
