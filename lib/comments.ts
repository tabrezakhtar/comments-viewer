import clientPromise from "@/lib/mongodb";
import type { Comment } from "@/types";

export async function fetchComments(page: number = 1, pageSize: number = 10, sort: 'asc' | 'desc' = 'desc', search: string = ''): Promise<{ comments: Comment[], total: number }> {
  const client = await clientPromise;
  const db = client.db("guitar-db");
  const skip = (page - 1) * pageSize;
  const query = search ? { text: { $regex: search, $options: 'i' } } : {};
  const comments = await db.collection<Comment>("comments").find(query).sort({ createdAt: sort === 'asc' ? 1 : -1 }).skip(skip).limit(pageSize).toArray();
  const total = await db.collection<Comment>("comments").countDocuments(query);
  return { comments, total };
}