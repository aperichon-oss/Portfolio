create table if not exists public.portfolio_analytics (
  id uuid primary key default gen_random_uuid(),
  type text not null default 'pageview',
  path text not null,
  language text not null default 'unknown',
  referrer text not null default '',
  viewport_width integer,
  viewport_height integer,
  created_at timestamptz not null default now()
);

alter table public.portfolio_analytics enable row level security;

drop policy if exists "portfolio_analytics_insert_public" on public.portfolio_analytics;
create policy "portfolio_analytics_insert_public"
on public.portfolio_analytics
for insert
to anon
with check (
  type = 'pageview'
  and char_length(path) <= 200
  and char_length(language) <= 10
  and char_length(referrer) <= 300
);

drop policy if exists "portfolio_analytics_select_public" on public.portfolio_analytics;
create policy "portfolio_analytics_select_public"
on public.portfolio_analytics
for select
to anon
using (true);

create index if not exists portfolio_analytics_created_at_idx
on public.portfolio_analytics (created_at desc);

create index if not exists portfolio_analytics_path_idx
on public.portfolio_analytics (path);
