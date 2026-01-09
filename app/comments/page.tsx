"use client";

import { useState } from "react";
import useSWR from "swr";
import type { Comment } from "@/types";
import CommentsList from "@/components/CommentsList";
import SearchInput from "@/components/SearchInput";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function CommentsPage() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sort, setSort] = useState<'asc' | 'desc'>('desc');
  const [search, setSearch] = useState('');
  
  const { data, error, isLoading } = useSWR<{ comments: Comment[], total: number }>(`/api/comments?page=${page}&pageSize=${pageSize}&sort=${sort}&search=${encodeURIComponent(search)}`, fetcher, { keepPreviousData: true });
  const comments = data?.comments || [];
  const total = data?.total || 0;
  const totalPages = Math.ceil(total / pageSize);

  return (
    <main>
      <h1>User Comments</h1>
      <p>Welcome to the comments page!</p>
      <SearchInput
        value={search}
        onChange={(value) => {
          setSearch(value);
          setPage(1);
        }}
        debounceMs={300}
        placeholder="Enter search text"
        label="Search comments"
      />
      <div>
        <label htmlFor="sort">Sort by date:</label>
        <select
          id="sort"
          value={sort}
          onChange={(e) => {
            setSort(e.target.value as 'asc' | 'desc');
            setPage(1); // Reset to first page
          }}
        >
          <option value="desc">Newest first</option>
          <option value="asc">Oldest first</option>
        </select>
      </div>
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
      {error && <div>Failed to load comments</div>}
      {isLoading && <div>Loading...</div>}
      {!isLoading && !error && <CommentsList comments={comments} />}
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