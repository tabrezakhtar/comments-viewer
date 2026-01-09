import mongoose, { Schema, Model } from "mongoose";
import type { Comment } from "@/types";

const CommentSchema = new Schema<Comment>(
  {
    equipmentId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
  },
  {
    collection: "comments",
  }
);

const CommentModel: Model<Comment> =
  mongoose.models.Comment || mongoose.model<Comment>("Comment", CommentSchema);

export default CommentModel;
