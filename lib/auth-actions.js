"use server";

import { redirect } from "next/navigation";
import { randomUUID } from "crypto";
import { db } from "@/lib/db";
import { hashPassword, verifyPassword, createSessionToken, setSessionCookie, clearSessionCookie } from "@/lib/auth";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function registerUser(formData) {
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const password = String(formData.get("password") || "");

  if (!name || !EMAIL_RE.test(email) || password.length < 8) {
    redirect("/register?error=invalid");
  }

  const { sql } = db();

  const existing = await sql`SELECT id FROM users WHERE email = ${email}`;
  if (existing.length > 0) {
    redirect("/register?error=duplicate");
  }

  const passwordHash = await hashPassword(password);
  const id = randomUUID();
  let user;
  try {
    [user] = await sql`
      INSERT INTO users (id, name, email, password_hash)
      VALUES (${id}, ${name}, ${email}, ${passwordHash})
      RETURNING id, name, email
    `;
  } catch (err) {
    if (err?.code === "23505") {
      redirect("/register?error=duplicate");
    }
    throw err;
  }

  const token = await createSessionToken({ id: user.id, name: user.name, email: user.email });
  await setSessionCookie(token);

  redirect("/account");
}

export async function loginUser(formData) {
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const password = String(formData.get("password") || "");

  if (!EMAIL_RE.test(email) || !password) {
    redirect("/login?error=invalid");
  }

  const { sql } = db();
  const [user] = await sql`SELECT id, name, email, password_hash FROM users WHERE email = ${email}`;

  if (!user) {
    redirect("/login?error=invalid");
  }

  const valid = await verifyPassword(password, user.password_hash);
  if (!valid) {
    redirect("/login?error=invalid");
  }

  const token = await createSessionToken({ id: user.id, name: user.name, email: user.email });
  await setSessionCookie(token);

  redirect("/account");
}

export async function logoutUser() {
  await clearSessionCookie();
  redirect("/");
}
