import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  const { origin } = new URL(req.url);
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }

  return Response.json({ url: data.url });
}
