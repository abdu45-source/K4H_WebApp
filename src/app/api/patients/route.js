// src/app/api/patients/route.js
import { NextResponse } from "next/server";
import { getConnection } from "../../lib/db";

export async function GET() {
  let db;
  try {
    db = await getConnection();
    const [rows] = await db.query("SELECT * FROM patients");
    return NextResponse.json(rows, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    if (db) await db.end();
  }
}

export async function POST(request) {
  let db;
  try {
    const { name, age, mobile } = await request.json();
    db = await getConnection();
    const [result] = await db.query(
      "INSERT INTO patients (name, age, mobile) VALUES (?, ?, ?)",
      [name, age, mobile]
    );
    return NextResponse.json({ id: result.insertId, name, age, mobile });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    if (db) await db.end();
  }
}
