"use client";

import { useEffect } from "react";
import { useAppStore } from "@/lib/store";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const setAuthUser = useAppStore((s) => s.setAuthUser);

  useEffect(() => {
    if (
      !process.env.NEXT_PUBLIC_SUPABASE_URL ||
      !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    ) {
      return;
    }

    import("@/lib/supabase/client").then(({ createClient }) => {
      const supabase = createClient();

      supabase.auth.getUser().then(({ data: { user } }) => {
        if (user) {
          setAuthUser({
            id: user.id,
            email: user.email ?? "",
            name: user.user_metadata?.full_name ?? null,
            avatar: user.user_metadata?.avatar_url ?? null,
          });
        }
      });

      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        if (session?.user) {
          setAuthUser({
            id: session.user.id,
            email: session.user.email ?? "",
            name: session.user.user_metadata?.full_name ?? null,
            avatar: session.user.user_metadata?.avatar_url ?? null,
          });
        } else {
          setAuthUser(null);
        }
      });

      return () => subscription.unsubscribe();
    });
  }, [setAuthUser]);

  return <>{children}</>;
}
