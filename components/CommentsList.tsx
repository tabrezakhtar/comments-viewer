import type { Comment } from "@/types";
import CommentCard from "@/components/CommentCard";

interface CommentsListProps {
  comments: Comment[];
}

export default function CommentsList({ comments }: CommentsListProps) {
  return (
    <ul>
      {comments.map((comment) => (
        <li key={comment._id.toString()}>
          <CommentCard comment={comment} />
        </li>
      ))}
    </ul>
  );
}
