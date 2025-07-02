"use client";

import { Suspense, use, useOptimistic, useTransition } from "react";
import HeartIcon from "./HeartIcon";
import { ErrorBoundary } from "react-error-boundary";
import { toggleLike } from "@/lib/queries";

export interface LikeButtonProps {
  postId: string;
  likesPromise: Promise<{ count: number; liked: boolean }>;
}

export default function LikeButton({ postId, likesPromise }: LikeButtonProps) {
  return (
    <ErrorBoundary fallback="Cannot retrieve likes at the moment">
      <Suspense fallback={<HeartIcon loading />}>
        <LikeButtonImpl postId={postId} likesPromise={likesPromise} />
      </Suspense>
    </ErrorBoundary>
  );
}
function LikeButtonImpl({ postId, likesPromise }: LikeButtonProps) {
  const likes = use(likesPromise);
  const [optmimisticLikes, toggleOptimisticLikes] = useOptimistic(
    likes,
    (prev, liked: boolean) => ({
      count: liked ? Math.max(prev.count - 1, 0) : prev.count + 1,
      liked: !prev.liked,
    })
  );
  const [isPending, startTransition] = useTransition();

  const { count, liked } = optmimisticLikes;

  const onClick = async () => {
    startTransition(async () => {
      toggleOptimisticLikes(liked);
      await toggleLike({ postId, liked });
    });
  };

  return (
    <button
      className={`like-button ${liked ? "liked" : ""} ${
        isPending ? "liking" : ""
      }`}
      aria-label={liked ? "Unlike post" : "Like post"}
      onClick={onClick}
    >
      <HeartIcon filled={liked} />
      {count > 0 && <span className="like-count">{count}</span>}
    </button>
  );
}
