"use client";

import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { getURL } from "@/lib/utils";
import "./page.css";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { experimental_useEffectEvent, Suspense, useEffect } from "react";

export default function LoginPage() {
  return (
    <Suspense>
      <LoginPageImpl />
    </Suspense>
  );
}

function LoginPageImpl() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const autoLogin = searchParams.get("autoLogin") !== "off";

  async function signInWithGitHub() {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("autoLogin");
    router.replace(`${pathname}?${params.toString()}`);

    const supabase = createClient();
    supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${getURL()}auth/callback`,
      },
    });
  }

  const onAutoLogin = experimental_useEffectEvent(signInWithGitHub);
  useEffect(() => {
    if (autoLogin) onAutoLogin();
    // Effect events should be omitted from the exhaustive-deps rule
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoLogin]);

  const logo = (
    <Image
      src="/logo.png"
      alt="Bleater Logo"
      className="loading-logo"
      width={500}
      height={500}
    />
  );

  return (
    <div className="loading-container">
      {!autoLogin ? (
        <div className="login-container">
          {logo}
          <h2>Welcome to Bleater</h2>
          <button className="login-button" onClick={() => signInWithGitHub()}>
            Sign in with GitHub
          </button>
        </div>
      ) : (
        logo
      )}
    </div>
  );
}
