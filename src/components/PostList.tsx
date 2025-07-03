import { fetchPosts, fetchProfiles } from "@/lib/queries";
import Post from "./Post";

export default async function PostList() {
  // Fetch posts
  const posts = (await fetchPosts()).data;
  if (!posts || posts?.length === 0) {
    return <div className="no-posts">No posts yet. Be the first to post!</div>;
  }

  // Fetch profiles for the users who posted
  const userIds = new Set(posts.map((post) => post.user_id));
  const profiles = await fetchProfiles(Array.from(userIds));

  return (
    <div className="posts-list">
      {posts.map((post) => (
        <Post
          key={post.id}
          post={post}
          profile={profiles.data?.find((p) => p.id === post.user_id)}
        />
      ))}
    </div>
  );
}
