import { fetchLikes, type PostType, type ProfileType } from "@/lib/queries";
import LikeButton from "./LikeButton";
import { getUser } from "@/lib/supabase/server";

interface PostProps {
  post: PostType;
  profile?: ProfileType;
}

export default async function Post({ post, profile }: PostProps) {
  const {
    data: { user },
  } = await getUser();

  // Fetch likes
  const likesPromise = fetchLikes(post.id).then((likes) => ({
    count: likes.data?.length ?? 0,
    liked: likes.data?.some((like) => like.user_id === user?.id) ?? false,
  }));

  return (
    <div className={`post-item`}>
      <div className="post-avatar">
        {profile?.picture ? (
          <img
            src={profile.picture}
            alt={profile?.name || "User"}
            className="avatar-img"
          />
        ) : (
          <div className="avatar">{profile?.name?.charAt(0) || "U"}</div>
        )}
      </div>
      <div className="post-content">
        <div className="post-header">
          <span className="post-author">@{profile?.name || "User"}</span>
          <span className="post-time">
            {new Date(post.created_at).toLocaleString(undefined, {
              month: "short",
              day: "numeric",
              hour: "numeric",
              minute: "2-digit",
            })}
          </span>
        </div>
        <div className="post-message">{post.message}</div>
        <div className="post-actions">
          <div className="action-container">
            <LikeButton likesPromise={likesPromise} />
          </div>
        </div>
      </div>
    </div>
  );
}
