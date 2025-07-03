"use client";

import { Suspense, use } from "react";
import HeartIcon from "./HeartIcon";
import { ErrorBoundary } from "react-error-boundary";

export interface LikeButtonProps {
  likesPromise: Promise<{ count: number; liked: boolean }>;
}

export default function LikeButton({ likesPromise }: LikeButtonProps) {
  return (
    <ErrorBoundary fallback="Cannot retrieve likes at the moment">
      <Suspense fallback={<HeartIcon loading />}>
        <LikeButtonImpl likesPromise={likesPromise} />
      </Suspense>
    </ErrorBoundary>
  );
}
function LikeButtonImpl({ likesPromise }: LikeButtonProps) {
  const { liked, count } = use(likesPromise);

  return (
    <button
      className={`like-button ${liked ? "liked" : ""}`}
      aria-label={liked ? "Unlike post" : "Like post"}
    >
      <HeartIcon filled={liked} />
      {count > 0 && <span className="like-count">{count}</span>}
    </button>
  );
}
