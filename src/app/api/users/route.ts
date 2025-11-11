import { NextResponse } from "next/server";
import mongoose from "mongoose";
import User from "@/models/User";

// 🔹 Конект до MongoDB
async function dbConnect() {
  if (mongoose.connection?.readyState === 1) return;
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is not set");
  await mongoose.connect(uri);
}

// ✅ GET /api/users
export async function GET() {
  try {
    await dbConnect();
    const users = await User.find().sort({ createdAt: -1 });
    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    console.error("❌ Помилка отримання користувачів:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
