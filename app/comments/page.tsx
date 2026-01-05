import type { Comment } from "@/types";
import { fetchComments } from "@/lib/comments";
import CommentCard from "@/components/CommentCard";

export default async function CommentsPage() {
  const comments: Comment[] = await fetchComments();
  return (
    <main>
      <h1>User Comments</h1>
      <p>Welcome to the comments page!</p>
      <ul>
        {comments.map((comment) => (
          <li key={comment._id.toString()}>
            <CommentCard comment={comment} />
          </li>
        ))}
      </ul>
    </main>
  );
}