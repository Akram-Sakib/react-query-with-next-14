import UpdatePostForm from "@/components/UpdatePostForm";
import axiosInstance from "@/lib/axiosInstance";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import Link from "next/link";

// export const metadata = {
//   title: "Create Post",
// };

const UpdatePostPage = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["post"],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/posts/${params.id}`);
      return data;
    },
  });

  return (
    <main className="flex min-h-screen flex-col items-center gap-y-10 p-24">
      <div className="">
        <h1 className="text-4xl font-bold">
          <Link href={"/"}>Update Post</Link>
        </h1>
      </div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <UpdatePostForm />
      </HydrationBoundary>
    </main>
  );
};

export default UpdatePostPage;
