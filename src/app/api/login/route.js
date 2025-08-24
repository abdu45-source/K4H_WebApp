// src/app/api/login/route.js
import { NextResponse } from "next/server";
import { getConnection } from "../../lib/db";
import { withCors, corsOptions } from "../../lib/cors";

export async function OPTIONS() {
  return corsOptions();
}

export async function POST(request) {
  try {
    const { role, email, password } = await request.json();
    const conn = await getConnection();

    let table;
    if (role === "admin") table = "admins";
    else if (role === "doctor") table = "doctors";
    else {
      return withCors(
        NextResponse.json({ ok: false, error: "Invalid role" }, { status: 400 })
      );
    }

    const [rows] = await conn.execute(
      `SELECT id, name, email FROM ${table} WHERE email = ? AND password = ?`,
      [email, password]
    );

    return withCors(
      NextResponse.json({
        ok: rows.length > 0,
        user: rows[0] || null,
        role,
        message: rows.length > 0 ? "Login successful" : "Invalid credentials",
      })
    );
  } catch (err) {
    console.error("POST /api/login error:", err);
    return withCors(
      NextResponse.json({ ok: false, error: err.message }, { status: 500 })
    );
  }
}
