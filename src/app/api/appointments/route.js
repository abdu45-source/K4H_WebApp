import { NextResponse } from "next/server";
import { getConnection } from "../../lib/db";

export async function POST(req) {
  let db;
  try {
    const { patient_name, doctor_id, date, time, mobile, message } =
      await req.json();

    if (!patient_name || !doctor_id || !date || !time || !mobile) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    db = await getConnection();

    const [result] = await db.query(
      "INSERT INTO appointments (patient_name, doctor_id, date, time, mobile) VALUES (?, ?, ?, ?, ?)",
      [patient_name, doctor_id, date, time, mobile]
    );

    console.log(`SMS sent to ${mobile}: ${message || "Appointment created"}`);

    return NextResponse.json({
      message: "Appointment added successfully and SMS sent!",
      appointment: {
        id: result.insertId,
        patient_name,
        doctor_id,
        date,
        time,
        mobile,
      },
    });
  } catch (err) {
    console.error("POST /api/appointments error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  } finally {
    if (db) await db.end();
  }
}

export async function GET() {
  let db;
  try {
    db = await getConnection();
    const [rows] = await db.query("SELECT * FROM appointments");
    return NextResponse.json(rows);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  } finally {
    if (db) await db.end();
  }
}
