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

  try {
    const { sql } = db();
    const email = "debug-param-test@example.com";
    const paramResult = await sql`SELECT ${email} as echoed`;
    info.paramQuerySucceeded = true;
    info.paramQueryResult = paramResult;
  } catch (err) {
    info.paramQuerySucceeded = false;
    info.paramErrorName = err?.name || null;
    info.paramErrorMessage = err?.message || String(err);
    info.paramErrorStack = err?.stack ? err.stack.split("\n").slice(0, 8) : null;
  }

  try {
    const { sql } = db();
    const usersResult = await sql`SELECT id, email FROM users LIMIT 5`;
    info.usersQuerySucceeded = true;
    info.usersQueryResult = usersResult;
  } catch (err) {
    info.usersQuerySucceeded = false;
    info.usersErrorMessage = err?.message || String(err);
    info.usersErrorStack = err?.stack ? err.stack.split("\n").slice(0, 8) : null;
  }

  return Response.json(info);
}
