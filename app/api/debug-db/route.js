import { db } from "@/lib/db";

export async function GET() {
  const info = {
    NETLIFY_DB_DRIVER: process.env.NETLIFY_DB_DRIVER || null,
    hasNetlifyDbUrl: Boolean(process.env.NETLIFY_DB_URL),
    connStringPrefix: process.env.NETLIFY_DB_URL
      ? process.env.NETLIFY_DB_URL.slice(0, 20)
      : null,
  };

  try {
    const { driver, sql } = db();
    info.resolvedDriver = driver;
    const result = await sql`SELECT 1 as ok`;
    info.queryResult = result;
    info.querySucceeded = true;
  } catch (err) {
    info.querySucceeded = false;
    info.errorName = err?.name || null;
    info.errorMessage = err?.message || String(err);
    info.errorCause = err?.cause ? String(err.cause) : null;
    info.errorStack = err?.stack ? err.stack.split("\n").slice(0, 5) : null;
  }

  return Response.json(info);
}
