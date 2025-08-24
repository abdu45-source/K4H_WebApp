import { NextResponse } from "next/server";
import { getConnection } from "../../lib/db";
import { withCors, corsOptions } from "../../lib/cors";

export async function OPTIONS() {
  return corsOptions();
}

export async function GET() {
  try {
    const conn = await getConnection();
    const [rows] = await conn.execute("SELECT id, name, email FROM admins");
    const response = NextResponse.json({ ok: true, admins: rows });
    return withCors(response);
  } catch (err) {
    console.error("GET /api/admins error:", err);
    const response = NextResponse.json(
      { ok: false, error: err.message },
      { status: 500 }
    );
    return withCors(response);
  }
}

export async function POST(request) {
  try {
    const { email, password } = await request.json();
    const conn = await getConnection();
    const [rows] = await conn.execute(
      "SELECT id, name, email FROM admins WHERE email = ? AND password = ?",
      [email, password]
    );

    const response = NextResponse.json({
      ok: rows.length > 0,
      admin: rows[0] || null,
      message: rows.length > 0 ? "Login successful" : "Invalid credentials",
    });

    return withCors(response);
  } catch (err) {
    console.error("POST /api/admins error:", err);
    const response = NextResponse.json(
      { ok: false, error: err.message },
      { status: 500 }
    );
    return withCors(response);
  }
}
