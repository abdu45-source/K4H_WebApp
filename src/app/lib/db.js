import mysql from "mysql2/promise";

export async function getConnection() {
  return mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "abduselam455219@",
    database: process.env.DB_NAME || "knowledge_for_health",
  });
}
