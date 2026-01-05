import clientPromise from "@/lib/mongodb";
import type { Comment } from "@/types";

export async function fetchComments(): Promise<Comment[]> {
  const client = await clientPromise;
  const db = client.db("guitar-db");
  return db.collection<Comment>("comments").find({}).toArray();
}
