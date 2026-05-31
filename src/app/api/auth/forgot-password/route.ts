import { NextResponse } from "next/server";
import crypto from "crypto";
import { Resend } from "resend";
import { db } from "@/src/lib/db";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    const user = await db.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const expiry = new Date(Date.now() + 3600000); // 1 hour

    await db.user.update({
      where: { email: email.toLowerCase() },
      data: { resetToken, resetTokenExpiry: expiry },
    });

    const resetLink = `http://localhost:3000/en/reset-password?token=${resetToken}`;

    await resend.emails.send({
      from: "Netflix Clone <onboarding@resend.dev>", 
      to: email,
      subject: "Reset your password",
      html: `
        <h1>Reset Password</h1>
        <p>Click the link below to reset your password. This link expires in 1 hour.</p>
        <a href="${resetLink}">${resetLink}</a>
      `,
    });

    return NextResponse.json({ message: "Email sent" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}