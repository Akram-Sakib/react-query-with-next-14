import SinglePostClient from "@/components/SinglePostClient";
import axiosInstance from "@/lib/axiosInstance";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

export const metadata = {
  title: "Single Post",
};

const SinglePost = async ({
  params,
}: {
  params: {
    postId: string;
  };
}) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["post"],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/posts/${params.postId}`);
      return data;
    },
  });

  return (
    <main className="flex min-h-screen flex-col items-center gap-y-10 p-24">
      <div className="">
        <h1 className="text-4xl font-bold">Single Post</h1>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <SinglePostClient />
        </HydrationBoundary>
      </div>
    </main>
  );
};

export default SinglePost;
