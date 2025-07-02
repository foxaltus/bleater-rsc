import "./page.css";
import { createClient } from "@/lib/supabase/server";
import AuthForm from "@/components/AuthForm";
import Header from "@/components/Header";
import PostList from "@/components/PostList";

export default async function Page() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error || !user) {
    return <AuthForm />;
  }

  return (
    <div className="dashboard">
      <Header user={user} />
      <main>
        <div className="posts-container">
          <h2>Recent Bleats</h2>
          <PostList />
        </div>
      </main>
    </div>
  );
}
