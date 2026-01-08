'use client';

import { useState, useEffect } from 'react';
import type { Comment } from "@/types";
import CommentCard from "@/components/CommentCard";

export default function CommentsPage() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/comments?page=${page}&pageSize=${pageSize}`);
      const data = await res.json();
      setComments(data.comments);
      setTotal(data.total);
    };
    fetchData();
  }, [page, pageSize]);

  const totalPages = Math.ceil(total / pageSize);

  return (
    <main>
      <h1>User Comments</h1>
      <p>Welcome to the comments page!</p>
      <div>
        <label htmlFor="pageSize">Items per page:</label>
        <select
          id="pageSize"
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
            setPage(1); // Reset to first page
          }}
        >
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={75}>75</option>
          <option value={100}>100</option>
        </select>
      </div>
      <ul>
        {comments.map((comment) => (
          <li key={comment._id.toString()}>
            <CommentCard comment={comment} />
          </li>
        ))}
      </ul>
      <div>
        <button
          onClick={() => setPage(page - 1)}
          disabled={page <= 1}
        >
          Previous
        </button>
        <span>Page {page} of {totalPages}</span>
        <button
          onClick={() => setPage(page + 1)}
          disabled={page >= totalPages}
        >
          Next
        </button>
      </div>
    </main>
  );
}