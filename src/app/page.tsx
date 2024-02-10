import Posts from "@/components/Posts";
import axiosInstance from "@/lib/axiosInstance";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import Link from "next/link";

export default async function Home() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/posts");
      return data;
    },
  });

  return (
    <main className="flex min-h-screen flex-col items-center gap-y-10 p-24">
      <div className="">
        <h1 className="text-4xl font-bold">All Posts</h1>
      </div>
      <Link href="/create-post">
        <button className="bg-gray-900 text-white px-4 py-2 rounded-lg flex gap-x-4">
          <span className="text-xl">Create</span>
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
            className="lucide lucide-plus-square"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="M8 12h8" />
            <path d="M12 8v8" />
          </svg>
        </button>
      </Link>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Posts />
      </HydrationBoundary>
    </main>
  );
}
