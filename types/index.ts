import type { User } from "@/models/User";
import type { Types } from "mongoose";

export interface Comment {
  _id: Types.ObjectId;
  equipmentId: Types.ObjectId;
  user: User;
  text: string;
  date: string;
}
