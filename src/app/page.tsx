import { createClient } from "../lib/supabase/server";

export default async function Page() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    return <p>Not logged in :(</p>;
  }
  return <p>Hello {data.user.email}</p>;
}
