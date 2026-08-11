import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return Response.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { report, scenarioId } = await req.json();

  const { data, error } = await supabase
    .from("reports")
    .insert({
      user_id: user.id,
      scenario_id: scenarioId || "jet-engine-claim",
      overall_score: report.overallScore,
      judgment_score: report.judgmentScore.total,
      communication_score: report.communicationScore.total,
      report_data: report,
    })
    .select()
    .single();

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json({ id: data.id });
}

export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return Response.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("reports")
    .select("id, scenario_id, overall_score, judgment_score, communication_score, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json({ reports: data });
}
