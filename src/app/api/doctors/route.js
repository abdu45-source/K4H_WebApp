import { NextResponse } from "next/server";
import { getConnection } from "../../lib/db"; // adjust path

// GET all doctors
export async function GET() {
  let db;
  try {
    db = await getConnection();
    const [rows] = await db.query(
      "SELECT id, name, specialty, mobile, email FROM doctors"
    );
    return NextResponse.json(rows, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    if (db) await db.end();
  }
}

// POST new doctor
export async function POST(req) {
  let db;
  try {
    const body = await req.json();
    const { name, specialty, mobile, email, password } = body;

    if (!name || !specialty || !mobile || !email || !password) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    db = await getConnection();

    const [result] = await db.query(
      "INSERT INTO doctors (name, specialty, mobile, email, password) VALUES (?, ?, ?, ?, ?)",
      [name, specialty, mobile, email, password]
    );

    const newDoctor = { id: result.insertId, name, specialty, mobile, email };

    return NextResponse.json(
      { message: "Doctor added successfully", doctor: newDoctor },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    if (db) await db.end();
  }
}
