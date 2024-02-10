"use client";

import axiosInstance from "@/lib/axiosInstance";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import Post from "./Post";

const Posts = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/posts");
      return data;
    },
  });

  let content = null;
  if (isLoading) {
    content = <div>Loading...</div>;
  }

  if (isError) {
    content = <div>Error fetching posts</div>;
  }

  if (data.length === 0) {
    content = <h2 className="text-xl font-semibold">No posts found</h2>;
  }

  if (data.length > 0) {
    content = data.map((post: any, i: number) => (
      <Post key={post.id} post={post} />
    ));
  }

  return <ul className="space-y-4">{content}</ul>;
};

export default Posts;
