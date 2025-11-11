// src/app/api/requests/route.ts
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Request from "@/models/Request";

async function dbConnect() {
  if (mongoose.connection?.readyState === 1) return;
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is not set");
  await mongoose.connect(uri);
}

// 🟢 Створення нової заявки
export async function POST(req: Request) {
  try {
    await dbConnect(); // використовуємо спільне з'єднання замість прямого mongoose.connect
    const body = await req.json();

    const {
      fullName,
      email,
      phone,
      about,
      requestedRole,
      passportNumber,
      passportIssuedBy,
      directorLetterUrl,
    } = body;

    // 🔸 Перевірка обов'язкових полів
    if (!fullName || !email || !requestedRole) {
      return NextResponse.json(
        { error: "Заповніть усі обов'язкові поля" },
        { status: 400 }
      );
    }

    // 🔸 Створення документа в базі
    const newRequest = await Request.create({
      fullName,
      email,
      phone,
      about,
      requestedRole,
      passportNumber,
      passportIssuedBy,
      directorLetterUrl,
    });

    return NextResponse.json(
      { message: "Заявку успішно надіслано", request: newRequest },
      { status: 201 }
    );
  } catch (err) {
    console.error("❌ Помилка створення заявки:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// 🟡 Отримання списку заявок
export async function GET() {
  try {
    await dbConnect();
    const requests = await Request.find().sort({ createdAt: -1 });
    return NextResponse.json({ requests }, { status: 200 });
  } catch (error) {
    console.error("❌ Помилка отримання заявок:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
