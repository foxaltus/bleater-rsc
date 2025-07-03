"use client";

import { Suspense, use } from "react";
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
  const { liked, count } = use(likesPromise);

  return (
    <button
      className={`like-button ${liked ? "liked" : ""}`}
      aria-label={liked ? "Unlike post" : "Like post"}
      onClick={() => toggleLike({ postId, liked })}
    >
      <HeartIcon filled={liked} />
      {count > 0 && <span className="like-count">{count}</span>}
    </button>
  );
}
