-- Run this in Supabase SQL Editor to create the reports table

create table if not exists public.reports (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  scenario_id text not null default 'jet-engine-claim',
  overall_score integer not null,
  judgment_score integer not null,
  communication_score integer not null,
  report_data jsonb not null,
  created_at timestamptz default now() not null
);

alter table public.reports enable row level security;

create policy "Users can read own reports"
  on public.reports for select
  using (auth.uid() = user_id);

create policy "Users can insert own reports"
  on public.reports for insert
  with check (auth.uid() = user_id);

create index idx_reports_user_id on public.reports(user_id);
create index idx_reports_created_at on public.reports(created_at desc);
