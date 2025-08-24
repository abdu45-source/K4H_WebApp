// src/app/api/remedies/route.js
import { NextResponse } from "next/server";
import { getConnection } from "../../lib/db";

export async function GET() {
  let db;
  try {
    db = await getConnection();
    const [rows] = await db.query("SELECT * FROM remedies");
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
    const { title, description, created_by } = await request.json();
    db = await getConnection();
    const [result] = await db.query(
      "INSERT INTO remedies (title, description, created_by) VALUES (?, ?, ?)",
      [title, description, created_by]
    );
    return NextResponse.json({ id: result.insertId, title, description });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    if (db) await db.end();
  }
}
