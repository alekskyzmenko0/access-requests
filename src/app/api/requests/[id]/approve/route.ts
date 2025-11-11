// src/app/api/requests/[id]/approve/route.ts
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import RequestModel from "@/models/Request";
import UserModel from "@/models/User";
import bcrypt from "bcryptjs";
import { sendEmail } from "@/lib/mailer";

// 🔹 Підключення до MongoDB
async function dbConnect() {
  if (mongoose.connection?.readyState === 1) return;
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is not set");
  await mongoose.connect(uri);
}

// 🔹 Функція для генерації випадкового пароля
function generatePassword(length = 10) {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let pwd = "";
  for (let i = 0; i < length; i++) {
    pwd += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return pwd;
}

// ✅ Основний маршрут — approve
export async function POST(
  req: Request,
  context: { params: Promise<{ id: string }> } // новий синтаксис для Next 16
) {
  const { id } = await context.params;

  try {
    await dbConnect();

    // 1️⃣ Знаходимо заявку
    const request = await RequestModel.findById(id);
    if (!request) {
      return NextResponse.json({ error: "Заявку не знайдено" }, { status: 404 });
    }

    // 2️⃣ Якщо вже підтверджена
    if (request.status === "approved") {
      return NextResponse.json({ message: "Заявка вже підтверджена" }, { status: 200 });
    }

    // 3️⃣ Генеруємо пароль і хешуємо його
    const plainPassword = generatePassword(10);
    const passwordHash = await bcrypt.hash(plainPassword, 10);

    // 4️⃣ Створюємо користувача
    const newUser = await UserModel.create({
      name: request.fullName,
      email: request.email,
      password: passwordHash,
      role: request.requestedRole === "researcher" ? "researcher" : "user",
    });

    // 5️⃣ Оновлюємо заявку
    request.status = "approved";
    request.createdUserId = newUser._id;
    await request.save();

    // 6️⃣ Надсилаємо лист
    const subject = "Ваш обліковий запис створено";
    const html = `
      <h2>Вітаємо, ${request.fullName}!</h2>
      <p>Ваш обліковий запис успішно створено.</p>
      <p>Ось ваші дані для входу:</p>
      <ul>
        <li><b>Email:</b> ${newUser.email}</li>
        <li><b>Пароль:</b> ${plainPassword}</li>
      </ul>
      <p>Рекомендуємо змінити пароль після першого входу.</p>
      <p>З повагою,<br/>Команда Museum</p>
    `;

    await sendEmail(newUser.email, subject, html);

    return NextResponse.json(
      {
        message: "Заявка підтверджена, користувача створено, лист надіслано",
        user: {
          id: newUser._id,
          email: newUser.email,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Помилка approve:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
