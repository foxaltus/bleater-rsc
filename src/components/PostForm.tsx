"use client";

import { createPost } from "@/lib/queries";
import { useState } from "react";

// Utility function to detect touch devices
function isTouchDevice() {
  return (
    (typeof window !== "undefined" && "ontouchstart" in window) ||
    (typeof navigator !== "undefined" && navigator.maxTouchPoints > 0)
  );
}

export default function PostForm() {
  const [postText, setPostText] = useState("");

  async function formAction(formData: FormData) {
    setPostText(""); // Clear the input after submission
    await createPost(formData);
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
        <button type="submit" disabled={!postText.trim()}>
          Post
        </button>
      </div>
    </form>
  );
}
