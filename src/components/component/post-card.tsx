"use client";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Link from "next/link";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import postServices from "@/services/post.services";
import PostCardDropdown from "../postCardDropdown/PostCardDropdown";

export function PostCard() {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["post-card"],
    queryFn: () => postServices.getPostData(),
  });
  console.log(data);
  return (
    <div className="flex flex-col items-center gap-4">
      {data &&
        data.map((post: any) => (
          <Card key={post.id} className="w-full max-w-sm">
            <CardHeader className="flex flex-row items-center p-4">
              <Link
                href="#"
                className="flex items-center gap-2 text-sm font-semibold"
                prefetch={false}
              >
                <Avatar className="w-8 h-8 border">
                  <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
                  <AvatarFallback>AC</AvatarFallback>
                </Avatar>
                {post?.username}
              </Link>
              <div className="ml-auto">
                <PostCardDropdown />
              </div>
            </CardHeader>
            <CardContent className="px-4 py-2">
              <p className="text-sm">{post.caption}</p>
              {post?.image && (
                <Image
                  src={process.env.NEXT_PUBLIC_API_URL + "/" + post?.image}
                  width={1600}
                  height={1600}
                  alt="Image"
                  className="object-cover aspect-square"
                />
              )}
            </CardContent>
            <CardFooter className="grid gap-2 p-2 pb-4">
              <div className="flex items-center w-full">
                <Button variant="ghost" size="icon">
                  <HeartIcon className="w-4 h-4" />
                  <span className="sr-only">Like</span>
                </Button>
                <Button variant="ghost" size="icon">
                  <MessageCircleIcon className="w-4 h-4" />
                  <span className="sr-only">Comment</span>
                </Button>
                <Button variant="ghost" size="icon">
                  <SendIcon className="w-4 h-4" />
                  <span className="sr-only">Share</span>
                </Button>
              </div>
              {/* <div className="px-2 text-sm w-full grid gap-1.5">
                <div>
                  <Link href="#" className="font-medium" prefetch={false}>
                    john
                  </Link>
                  Wow, this photo is absolutely stunning! 😍✨
                </div>
                <div>
                  <Link href="#" className="font-medium" prefetch={false}>
                    amelia
                  </Link>
                  This post just made my day! 😃👍
                </div>
              </div> */}
            </CardFooter>
          </Card>
        ))}
      {data?.length <= 0 && "Wow!! Such an empty"}
    </div>
  );
}

function BookmarkIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
    </svg>
  );
}

function HeartIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}

function MessageCircleIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </svg>
  );
}

function SendIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  );
}
