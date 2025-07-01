import "./page.css";
import { createClient } from "@/lib/supabase/server";
import AuthForm from "@/components/AuthForm";
import Header from "@/components/Header";

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
    </div>
  );
}
