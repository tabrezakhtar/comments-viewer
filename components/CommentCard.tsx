import { Comment } from '@/types';

interface CommentCardProps {
  comment: Comment;
}

export default function CommentCard({ comment }: CommentCardProps) {
  const formattedDate = new Date(comment.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4 border border-gray-200">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-gray-800">{String(comment.user)}</h3>
        <span className="text-sm text-gray-500">{formattedDate}</span>
      </div>
      <p className="text-gray-700">{comment.text}</p>
      {comment.equipmentId && (
        <div className="mt-2 text-xs text-gray-500">
          Equipment ID: {String(comment.equipmentId)}
        </div>
      )}
    </div>
  );
}
