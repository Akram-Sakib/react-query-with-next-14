"use client";

import axiosInstance from "@/lib/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

// export const metadata = {
//   title: "Create Post",
// };

const CreatePostPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async (post: any) => {
      const { data } = await axiosInstance.post("/posts", post);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
      queryClient.invalidateQueries({
        queryKey: ["post"],
      });
      router.push("/");
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({ title, description, views: 100 });
  };

  return (
    <main className="flex min-h-screen flex-col items-center gap-y-10 p-24">
      <div className="">
        <h1 className="text-4xl font-bold">Create Post</h1>
      </div>
      <form className="flex flex-col gap-y-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          className="p-2 rounded-lg"
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="description"
          className="p-2 rounded-lg"
          onChange={(e) => setDescription(e.target.value)}
        />
        <button
          type="submit"
          className="bg-gray-900 text-white px-4 py-2 rounded-lg"
        >
          Create
        </button>
      </form>
    </main>
  );
};

export default CreatePostPage;
