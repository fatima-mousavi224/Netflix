/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'

import { redirect } from "@/src/i18n/routing";
import { db } from "@/src/lib/db";
import bcrypt from "bcryptjs";

export async function signup(prevState: any, formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!name || !email || !password) {
    return { message: "Please fill in all fields." };
  }

  if (password.length < 6) {
    return { message: "Password must be at least 6 characters." };
  }

  try {
    const existingUser = await db.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return { message: "This email is already registered." };
    }

    // 3. Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // 4. Save to MongoDB
    await db.user.create({
      data: {
        name,
        email,
        hashedPassword,
      },
    });

  } catch (error) {
    return { message: "Database error. Please try again later." };
  }

  redirect({ href: "/signin", locale: "en" });
}