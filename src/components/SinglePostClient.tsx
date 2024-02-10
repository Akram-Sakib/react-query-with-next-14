"use client";

import axiosInstance from "@/lib/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React from "react";

const SinglePostClient = () => {
  const params = useParams();
  const router = useRouter();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["post"],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/posts/${params.postId}`);
      return data;
    },
  });

  let content = null;
  if (isLoading) {
    content = <div>Loading...</div>;
  }

  if (isError) {
    content = <div>Error fetching post</div>;
  }

  if (data?.id) {
    content = (
      <section className="flex flex-col">
        <h2 className="text-2xl font-bold">{data?.title}</h2>
        <p>{data?.description}</p>
      </section>
    );
  }

  return (
    <div className="mt-10">
      {content}
      <button
        className="mt-10 bg-gray-900 text-white px-4 py-2 rounded-lg"
        onClick={() => router.back()}
      >
        Go Back
      </button>
    </div>
  );
};

export default SinglePostClient;
