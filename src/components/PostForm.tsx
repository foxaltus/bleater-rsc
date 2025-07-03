"use client";

import { createPost } from "@/lib/queries";
import { useState, useTransition } from "react";

// Utility function to detect touch devices
function isTouchDevice() {
  return (
    (typeof window !== "undefined" && "ontouchstart" in window) ||
    (typeof navigator !== "undefined" && navigator.maxTouchPoints > 0)
  );
}

export default function PostForm() {
  const [postText, setPostText] = useState("");
  const [isPending, startTransition] = useTransition();

  async function formAction(formData: FormData) {
    // Prevent submission if message is empty
    if (!formData.get("message")?.toString().trim()) return;
    // Create the post and track the pending state
    startTransition(async () => {
      await createPost(formData);
    });
    // Clear the input after submission
    setPostText("");
  }

  return (
    <form className="post-form" action={formAction}>
      <textarea
        name="message"
        placeholder="What's happening???"
        aria-label="Create a new post"
        value={postText}
        onChange={(e) => setPostText(e.target.value)}
        onKeyDown={(e) => {
          // Submit on Enter (but not when Alt/Shift/Ctrl is pressed)
          if (
            e.key === "Enter" &&
            !e.altKey &&
            !e.shiftKey &&
            !e.ctrlKey &&
            !isTouchDevice() // Disable Enter-to-post on touch devices
          ) {
            e.preventDefault();
            if (postText.trim()) {
              e.currentTarget.form?.requestSubmit(); // Submit the form programmatically
            }
          }
        }}
        maxLength={280}
        disabled={isPending}
      ></textarea>
      <div className="post-actions">
        <span className="char-count">
          {postText.length}/280
          {!isTouchDevice() && (
            <span className="keyboard-hint">
              Press Enter to post, Shift+Enter for line break
            </span>
          )}
        </span>
        <button type="submit" disabled={!postText.trim() || isPending}>
          Post
        </button>
      </div>
    </form>
  );
}
