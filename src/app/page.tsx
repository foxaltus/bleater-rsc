import "./page.css";
import { getUser } from "@/lib/supabase/server";
import AuthForm from "@/components/AuthForm";
import Header from "@/components/Header";
import PostList from "@/components/PostList";
import PostCreation from "@/components/PostCreation";

export default async function Page() {
  const {
    data: { user },
    error,
  } = await getUser();
  if (error || !user) {
    return <AuthForm />;
  }

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
