import { NextResponse } from "next/server";
import { fetchComments } from "@/lib/comments";

export async function GET() {
  const comments = await fetchComments();
  return NextResponse.json(comments);
}