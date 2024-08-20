import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useMutation } from "@tanstack/react-query";
import postServices from "@/services/post.services";

interface LikePostInterface {
  postId: number;
  isLiked: boolean;
}

const LikePost = ({ postId, isLiked }: LikePostInterface) => {
  const [liked, setLiked] = useState<Record<number, boolean>>({});

  useEffect(() => {
    if (isLiked) {
      setLiked({ [postId]: isLiked });
    }
  }, [isLiked, postId]);

  const LikePostMutation = useMutation({
    mutationFn: (postId: any) => postServices.likePost(postId),
    onSuccess: (res: any) => {
      console.log("liked post", res);
    },
    onError: (error: any) => {
      console.error("Error liking post", error);
      setLiked((prevLikes: any) => ({
        ...prevLikes,
        [postId]: !prevLikes[postId],
      }));
    },
  });

  const handleLike = (postId: any) => {
    setLiked((prevLikes: any) => ({
      ...prevLikes,
      [postId]: !prevLikes[postId],
    }));
    LikePostMutation.mutate({ post_id: postId });
  };

  return (
    <div>
      <Button variant="ghost" size="icon" onClick={() => handleLike(postId)}>
        <HeartIcon filled={liked[postId]} className="w-6 h-6" />
        <span className="sr-only">Like</span>
      </Button>
    </div>
  );
};

export default LikePost;

function HeartIcon({
  filled = false,
  ...props
}: {
  filled?: boolean;
  [key: string]: any;
}) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill={filled ? "red" : "none"} // Toggle fill color
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}
