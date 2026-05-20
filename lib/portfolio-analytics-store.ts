export type PortfolioAnalyticsEvent = {
  id: string
  type: "pageview"
  path: string
  language: string
  referrer: string
  viewport?: {
    width?: number
    height?: number
  }
  createdAt: string
}

export type PortfolioAnalyticsSummary = {
  total: number
  byPath: Record<string, number>
  byLanguage: Record<string, number>
  recent: PortfolioAnalyticsEvent[]
}

const localStorageKey = "portfolio-analytics-events"
const maxStoredEvents = 5000

function getSupabaseConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  const table = process.env.NEXT_PUBLIC_SUPABASE_ANALYTICS_TABLE || "portfolio_analytics"

  if (!url || !anonKey) return null

  return {
    endpoint: `${url.replace(/\/$/, "")}/rest/v1/${table}`,
    anonKey,
  }
}

function aggregateBy(events: PortfolioAnalyticsEvent[], key: (event: PortfolioAnalyticsEvent) => string) {
  return events.reduce<Record<string, number>>((acc, event) => {
    const value = key(event)
    acc[value] = (acc[value] || 0) + 1
    return acc
  }, {})
}

function readLocalEvents() {
  if (typeof window === "undefined") return []

  try {
    const data = JSON.parse(window.localStorage.getItem(localStorageKey) || "[]")
    return Array.isArray(data) ? (data as PortfolioAnalyticsEvent[]) : []
  } catch {
    return []
  }
}

function writeLocalEvents(events: PortfolioAnalyticsEvent[]) {
  if (typeof window === "undefined") return
  window.localStorage.setItem(localStorageKey, JSON.stringify(events.slice(-maxStoredEvents)))
}

function mapSupabaseEvent(row: Record<string, unknown>): PortfolioAnalyticsEvent {
  return {
    id: String(row.id || crypto.randomUUID()),
    type: "pageview",
    path: String(row.path || "/"),
    language: String(row.language || "unknown"),
    referrer: String(row.referrer || ""),
    viewport: {
      width: typeof row.viewport_width === "number" ? row.viewport_width : undefined,
      height: typeof row.viewport_height === "number" ? row.viewport_height : undefined,
    },
    createdAt: String(row.created_at || new Date().toISOString()),
  }
}

export function buildAnalyticsSummary(events: PortfolioAnalyticsEvent[]): PortfolioAnalyticsSummary {
  return {
    total: events.length,
    byPath: aggregateBy(events, (event) => event.path),
    byLanguage: aggregateBy(events, (event) => event.language),
    recent: events.slice(-25).reverse(),
  }
}

export async function trackPortfolioPageview(event: Omit<PortfolioAnalyticsEvent, "id" | "createdAt">) {
  const payload: PortfolioAnalyticsEvent = {
    ...event,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  }

  const supabase = getSupabaseConfig()

  if (supabase) {
    await fetch(supabase.endpoint, {
      method: "POST",
      headers: {
        apikey: supabase.anonKey,
        Authorization: `Bearer ${supabase.anonKey}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        id: payload.id,
        type: payload.type,
        path: payload.path,
        language: payload.language,
        referrer: payload.referrer,
        viewport_width: payload.viewport?.width ?? null,
        viewport_height: payload.viewport?.height ?? null,
        created_at: payload.createdAt,
      }),
      keepalive: true,
    })

    return
  }

  const events = readLocalEvents()
  events.push(payload)
  writeLocalEvents(events)
}

export async function loadPortfolioAnalyticsEvents() {
  const supabase = getSupabaseConfig()

  if (supabase) {
    const response = await fetch(`${supabase.endpoint}?select=*&order=created_at.asc&limit=${maxStoredEvents}`, {
      headers: {
        apikey: supabase.anonKey,
        Authorization: `Bearer ${supabase.anonKey}`,
      },
      cache: "no-store",
    })

    if (!response.ok) {
      throw new Error("analytics-load-failed")
    }

    const rows = (await response.json()) as Record<string, unknown>[]
    return rows.map(mapSupabaseEvent)
  }

  return readLocalEvents()
}

export function hasRemoteAnalyticsStore() {
  return Boolean(getSupabaseConfig())
}
