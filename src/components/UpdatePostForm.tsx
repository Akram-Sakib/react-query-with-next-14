"use client";

import axiosInstance from "@/lib/axiosInstance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";

const UpdatePostForm = () => {
  const params = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["post"],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/posts/${params.id}`);
      return data;
    },
  });

  const [title, setTitle] = useState(data?.title || "");
  const [description, setDescription] = useState(data?.description || "");

  const { mutate } = useMutation({
    mutationFn: async (post: any) => {
      const { data } = await axiosInstance.patch(`/posts/${params.id}`, post);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
      queryClient.invalidateQueries({
        queryKey: ["post"],
      });
      router.push("/posts/2");
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({ title, description, views: 100 });
  };

  return (
    <>
      <form className="flex flex-col gap-y-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          className="p-2 rounded-lg"
          onChange={(e) => setTitle(e.target.value)}
          disabled={isLoading}
          value={title}
        />
        <textarea
          placeholder="description"
          className="p-2 rounded-lg"
          onChange={(e) => setDescription(e.target.value)}
          disabled={isLoading}
          value={description}
        />
        <button
          type="submit"
          className="bg-gray-900 text-white px-4 py-2 rounded-lg"
          disabled={isLoading}
        >
          Update
        </button>
      </form>
      <button
        className="mt-10 bg-gray-900 text-white px-4 py-2 rounded-lg"
        onClick={() => router.back()}
      >
        Go Back
      </button>
    </>
  );
};

export default UpdatePostForm;
