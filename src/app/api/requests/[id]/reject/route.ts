// src/app/api/requests/[id]/reject/route.ts
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import RequestModel from "@/models/Request";
import { sendEmail } from "@/lib/mailer";

// 🔹 Підключення до бази
async function dbConnect() {
  if (mongoose.connection?.readyState === 1) return;
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is not set");
  await mongoose.connect(uri);
}

// ✅ POST /api/requests/[id]/reject
export async function POST(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  try {
    await dbConnect();

    // 1️⃣ Знаходимо заявку
    const request = await RequestModel.findById(id);
    if (!request) {
      return NextResponse.json({ error: "Заявку не знайдено" }, { status: 404 });
    }

    // 2️⃣ Якщо вже відхилена
    if (request.status === "rejected") {
      return NextResponse.json({ message: "Заявка вже відхилена" }, { status: 200 });
    }

    // 3️⃣ Змінюємо статус
    request.status = "rejected";
    await request.save();

    // 4️⃣ Надсилаємо повідомлення користувачу
    const subject = "Ваша заявка відхилена";
    const html = `
      <h2>Шановний(а) ${request.fullName},</h2>
      <p>На жаль, вашу заявку на реєстрацію було відхилено.</p>
      <p>Якщо ви вважаєте це помилкою — будь ласка, звʼяжіться з адміністратором.</p>
      <p>З повагою,<br/>Команда Museum</p>
    `;

    await sendEmail(request.email, subject, html);

    return NextResponse.json(
      { message: "Заявку відхилено, лист надіслано" },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Помилка reject:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
