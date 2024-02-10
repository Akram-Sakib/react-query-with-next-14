"use client";

import axiosInstance from "@/lib/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const Post = ({
  post,
}: {
  post: { id: string; title: string; description: string };
}) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async () => {
      const res = await axiosInstance.delete(`/posts/${post.id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
      queryClient.invalidateQueries({
        queryKey: ["post"],
      });
    },
    onError: (error: any) => {
      console.log(error);
    },
  });

  const handleDelete = (e: any) => {
    e.preventDefault();
    mutate();
  };

  return (
    <li
      key={post.id}
      className="flex justify-between items-center bg-gray-100 p-4 rounded-lg gap-x-4"
    >
      <Link href={`/posts/${post.id}`} className="block">
        <h2 className="text-xl font-bold">{post.title}</h2>
        <p>{post.description}</p>
      </Link>
      <div className="flex items-center gap-x-4">
        <Link
          href={`/update-post/${post.id}`}
          // onClick={() => router.push(`/update-post/${post.id}`)}
          className="bg-green-500 text-white px-4 py-2 rounded-lg inline-block"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-pencil"
          >
            <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
            <path d="m15 5 4 4" />
          </svg>
        </Link>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-4 py-2 rounded-lg inline-block"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-trash"
          >
            <path d="M3 6h18" />
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
          </svg>
        </button>
      </div>
    </li>
  );
};

export default Post;
