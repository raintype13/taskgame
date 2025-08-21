import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  telegramId: string;
  username?: string;
  balance: number;
  referralCode: string;
  invitedBy?: string; // чей код ввёл
  referrals: string[]; // кого пригласил
}

const UserSchema: Schema = new Schema({
  telegramId: { type: String, required: true, unique: true },
  username: { type: String },
  balance: { type: Number, default: 0 },
  referralCode: { type: String, unique: true },
  invitedBy: { type: String },
  referrals: [{ type: String }],
});

export default mongoose.models.User ||
  mongoose.model<IUser>("User", UserSchema);
