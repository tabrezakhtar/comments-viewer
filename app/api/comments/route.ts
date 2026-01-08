import { NextResponse } from "next/server";
import { fetchComments } from "@/lib/comments";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = parseInt(searchParams.get("pageSize") || "10", 10);
  const { comments, total } = await fetchComments(page, pageSize);
  return NextResponse.json({ comments, total });
}