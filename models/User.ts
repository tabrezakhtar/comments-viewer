import mongoose, { Schema, Model, Types } from "mongoose";

export interface User {
  _id: Types.ObjectId;
  username: string;
}

const UserSchema = new Schema<User>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      maxlength: 25,
      validate: {
        validator: function(v) {
          const emojiRegex = /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/u;
          return !emojiRegex.test(v);
        },
        message: "Username cannot contain emojis"
      }
    },
  },
  {
    collection: "users",
  }
);

const UserModel: Model<User> =
  mongoose.models.User || mongoose.model<User>("User", UserSchema);

export default UserModel;