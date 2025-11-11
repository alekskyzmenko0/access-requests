// models/Request.ts
import mongoose, { Schema, models, model } from "mongoose";

const RequestSchema = new Schema(
  {
    // Хто просить
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    about: { type: String },

    // вибрана роль: user | researcher
    requestedRole: {
      type: String,
      enum: ["user", "researcher"],
      required: true,
    },

    // тільки для дослідника
    passportNumber: { type: String },
    passportIssuedBy: { type: String },
    directorLetterUrl: { type: String }, // для MVP як URL

    // статус модерації
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },

    // якщо approved — ми створимо юзера і можемо зберегти його id
    createdUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default models.Request || model("Request", RequestSchema);
