"use server";

import fs from "fs";
import path from "path";
import { redirect } from "next/navigation";

const DATA_FILE = path.join(process.cwd(), "data", "contact-submissions.json");

function readSubmissions() {
  if (!fs.existsSync(DATA_FILE)) return [];
  return JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
}

export async function submitContact(formData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const message = formData.get("message");

  if (name && email && message) {
    const submissions = readSubmissions();
    submissions.push({ name, email, message, receivedAt: new Date().toISOString() });
    fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
    fs.writeFileSync(DATA_FILE, JSON.stringify(submissions, null, 2));
  }

  redirect("/contact?success=1");
}
