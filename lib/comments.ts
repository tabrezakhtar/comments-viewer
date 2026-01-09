import clientPromise from "@/lib/mongodb";
import type { Comment } from "@/types";

export async function fetchComments(page: number = 1, pageSize: number = 10, sort: 'asc' | 'desc' = 'desc'): Promise<{ comments: Comment[], total: number }> {
  const client = await clientPromise;
  const db = client.db("guitar-db");
  const skip = (page - 1) * pageSize;
  const comments = await db.collection<Comment>("comments").find({}).sort({ date: sort === 'asc' ? 1 : -1 }).skip(skip).limit(pageSize).toArray();
  const total = await db.collection<Comment>("comments").countDocuments();
  return { comments, total };
}