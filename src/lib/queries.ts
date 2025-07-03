"use server";

import { revalidatePath } from "next/cache";
import type { Database } from "./supabase/schema";
import { createClient, getUser } from "./supabase/server";

// Types
export type PostType = Database["public"]["Tables"]["post"]["Row"];
export type ProfileType = Database["public"]["Tables"]["profiles"]["Row"];
export type LikeType = Database["public"]["Tables"]["likes"]["Row"];

// Fetch posts
export const fetchPosts = async () => {
  const supabase = await createClient();
  return await supabase
    .from("post")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(20);
};

// Fetch profiles
export const fetchProfiles = async (userIds: string[]) => {
  const supabase = await createClient();
  return await supabase.from("profiles").select("*").in("id", userIds);
};

// Fetch likes
export const fetchLikes = async (postId: string) => {
  const supabase = await createClient();
  return await supabase.from("likes").select("*").eq("post_id", postId);
};

// Toggle like on a post
export const toggleLike = async ({
  postId,
  liked,
}: {
  postId: string;
  liked: boolean;
}) => {
  const {
    data: { user },
  } = await getUser();
  if (!user) throw new Error("User not authenticated");

  const supabase = await createClient();

  if (liked) {
    // Unlike the post
    const { error } = await supabase
      .from("likes")
      .delete()
      .eq("post_id", postId)
      .eq("user_id", user.id);

    if (error) throw error;
  } else {
    // Like the post
    const { error } = await supabase
      .from("likes")
      .insert([{ post_id: postId, user_id: user.id }]);

    if (error) throw error;
  }

  revalidatePath("/"); // Revalidate the path to update the UI
};
