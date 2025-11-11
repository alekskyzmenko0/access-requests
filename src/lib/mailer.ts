// src/lib/mailer.ts
import nodemailer from "nodemailer";

export async function sendEmail(to: string, subject: string, html: string) {
  try {
    const transporter = nodemailer.createTransport({
      streamTransport: true, // 🔹 не відправляє, а просто виводить у консоль
      newline: "unix",
      buffer: true,
    });

    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM || "Museum Admin <test@example.com>",
      to,
      subject,
      html,
    });

    console.log("📨 Simulated email content:");
    console.log("-----------------------------------------");
    console.log(info.message.toString());
    console.log("-----------------------------------------");
    return info;
  } catch (error) {
    console.error("❌ Error sending email:", error);
    throw error;
  }
}
