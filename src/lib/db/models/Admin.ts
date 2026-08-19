import mongoose, { Schema, model, models, type Document } from "mongoose";

export interface IAdmin extends Document {
  username: string;
  passwordHash: string;
  role: "superadmin" | "editor";
  lastLogin?: Date;
}

const AdminSchema = new Schema<IAdmin>(
  {
    username: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["superadmin", "editor"], default: "superadmin" },
    lastLogin: { type: Date },
  },
  { timestamps: true },
);

export const AdminModel =
  (models.Admin as mongoose.Model<IAdmin>) ?? model<IAdmin>("Admin", AdminSchema);
