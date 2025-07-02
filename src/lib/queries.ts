import type { Database } from "./supabase/schema";
import { createClient } from "./supabase/server";

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
