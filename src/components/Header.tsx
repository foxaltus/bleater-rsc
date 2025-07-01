import Image from "next/image";
import SignOut from "./SignOut";
import type { User } from "@supabase/supabase-js";

export interface HeaderProps {
  user?: User;
}

// Check for all possible username keys in metadata
const getUserName = (user?: User) => {
  if (!user?.user_metadata) return user?.email?.split("@")[0] ?? "User";

  // Try different possible keys for username
  return (
    user.user_metadata.user_name ??
    user.user_metadata.username ??
    user.user_metadata.name ??
    user?.email?.split("@")[0] ??
    "User"
  );
};

export default function Header({ user }: HeaderProps) {
  const username = getUserName(user);
  const avatar = user?.user_metadata?.avatar_url;

  return (
    <header className="twitter-header">
      <div className="header-content">
        <h1>
          <Image
            src="/logo.png"
            alt="Bleater Logo"
            className="twitter-logo"
            width={500}
            height={500}
          />
          Bleater
        </h1>
        <div className="user-info">
          <div className="user-profile">
            {username &&
              (avatar ? (
                <img
                  src={avatar}
                  alt={`@${username}'s profile`}
                  className="header-avatar-img"
                />
              ) : (
                <div className="header-avatar">
                  {username.charAt(0).toUpperCase()}
                </div>
              ))}
            <span className="username">@{username}</span>
          </div>
          <SignOut />
        </div>
      </div>
    </header>
  );
}
