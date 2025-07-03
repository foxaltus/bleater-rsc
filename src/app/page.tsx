import "./page.css";
import { getUser } from "@/lib/supabase/server";
import Header from "@/components/Header";
import PostList from "@/components/PostList";
import PostCreation from "@/components/PostCreation";
import { redirect } from "next/navigation";

export default async function Page() {
  const {
    data: { user },
    error,
  } = await getUser();
  if (error) console.error("Error fetching user:", error);
  if (error || !user) redirect("/auth/login?autoLogin=off");

  return (
    <div className="dashboard">
      <Header user={user} />
      <main>
        <PostCreation user={user} />
        <div className="posts-container">
          <h2>Recent Bleats</h2>
          <PostList />
        </div>
      </main>
    </div>
  );
}
