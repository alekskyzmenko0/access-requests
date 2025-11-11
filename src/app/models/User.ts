// models/User.ts
import mongoose, { Schema, models, model } from "mongoose";

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true }, // тут буде bcrypt-хеш
    role: {
      type: String,
      enum: ["admin", "researcher", "staff", "user"],
      default: "user",
    },
    // опціонально — для адмінки
    exhibitsCount: { type: Number, default: 0 },
    commentsCount: { type: Number, default: 0 },
    notificationsCount: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Щоб не створювався модель двічі під час hot-reload
export default models.User || model("User", UserSchema);
