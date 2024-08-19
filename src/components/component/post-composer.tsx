"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import postServices from "@/services/post.services";
import { useSession } from "next-auth/react";

export function PostComposer() {
  const [caption, setCaption] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  const PostMutation = useMutation({
    mutationFn: (data: any) => postServices.postData(data),
    onSuccess: (res: any) => {
      console.log(res, "success");
      setCaption("");
      if (fileInputRef.current) {
        fileInputRef.current.value = ""; // Clear the file input
      }
      queryClient.invalidateQueries({ queryKey: ["post-card"] });
    },
  });

  const handleCaption = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCaption(e.target.value);
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handlePost = () => {
    const data = new FormData();
    data.append("caption", caption);
    if (fileInputRef.current && fileInputRef.current.files) {
      for (let i = 0; i < fileInputRef.current.files.length; i++) {
        data.append("image", fileInputRef.current.files[i]);
      }
    }
    PostMutation.mutate(data);
  };
  return (
    <div className="flex flex-col items-center gap-4 py-6">
      <Card className="w-full max-w-sm bg-background p-4">
        <CardHeader className="flex items-center gap-2">
          <Avatar className="h-10 w-10">
            <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <Input
            type="text"
            placeholder="What's on your mind?"
            className="flex-1"
            value={caption} // Controlled input
            onChange={handleCaption}
          />
        </CardHeader>
        <CardContent className="pt-2">
          <div className="grid grid-cols-4 gap-2">
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              accept="image/*"
            />
            <Button
              variant="outline"
              size="icon"
              className="p-2"
              onClick={handleButtonClick}
            >
              <ImageIcon className="h-5 w-5" />
              <span className="sr-only">Upload Image</span>
            </Button>
            <Button variant="outline" size="icon" className="p-2">
              <VideoIcon className="h-5 w-5" />
              <span className="sr-only">Upload Video</span>
            </Button>
            <Button variant="outline" size="icon" className="p-2">
              <TextIcon className="h-5 w-5" />
              <span className="sr-only">Create Text Post</span>
            </Button>
            <Button
              className="col-span-1 justify-self-end"
              onClick={handlePost}
            >
              Post
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function ImageIcon(props: any) {
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
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
      <circle cx="9" cy="9" r="2" />
      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
    </svg>
  );
}

function TextIcon(props: any) {
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
      <path d="M17 6.1H3" />
      <path d="M21 12.1H3" />
      <path d="M15.1 18H3" />
    </svg>
  );
}

function VideoIcon(props: any) {
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
      <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5" />
      <rect x="2" y="6" width="14" height="12" rx="2" />
    </svg>
  );
}
