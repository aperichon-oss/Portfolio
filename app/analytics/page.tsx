"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { ArrowLeft, Bot, Download, FileJson, MessageSquare, RefreshCcw } from "lucide-react"
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/lib/language-context"
import {
  buildAnalyticsSummary,
  hasRemoteAnalyticsStore,
  loadPortfolioAnalyticsEvents,
  type PortfolioAnalyticsEvent,
  type PortfolioAnalyticsSummary,
} from "@/lib/portfolio-analytics-store"

const dashboardText = {
  fr: {
    back: "Accueil",
    badge: "Analytics maison",
    title: "Dashboard analytics",
    description: "Suivi des visites du portfolio.",
    refresh: "Actualiser",
    exportJson: "Telecharger JSON",
    exportCsv: "Telecharger CSV",
    total: "Pages vues",
    allEvents: "Evenements suivis",
    chatbotOpens: "Ouvertures chatbot",
    chatbotMessages: "Messages chatbot",
    languages: "Langues",
    pages: "Pages les plus vues",
    timeline: "Vues temporelles par page",
    timelineHelp: "Historique des pages vues sur la periode selectionnee.",
    period: "Periode",
    days7: "7 jours",
    days30: "30 jours",
    days90: "90 jours",
    allTime: "Tout",
    recent: "Dernieres visites",
    noData: "Aucune donnee pour le moment. Navigue sur le portfolio pour generer les premieres visites.",
    accessError: "Acces analytics indisponible. Verifie les variables Supabase ou la table analytics.",
    githubPages: "Note GitHub Pages",
    githubPagesText: "Sur GitHub Pages, les donnees reelles passent par Supabase. Sans variables Supabase, le dashboard utilise seulement les visites stockees dans ce navigateur.",
    localMode: "Mode localStorage",
    remoteMode: "Mode Supabase",
    path: "Page",
    language: "Langue",
    date: "Date",
    viewport: "Ecran",
  },
  en: {
    back: "Home",
    badge: "Homemade analytics",
    title: "Analytics dashboard",
    description: "Portfolio visit tracking.",
    refresh: "Refresh",
    exportJson: "Download JSON",
    exportCsv: "Download CSV",
    total: "Page views",
    allEvents: "Tracked events",
    chatbotOpens: "Chatbot opens",
    chatbotMessages: "Chatbot messages",
    languages: "Languages",
    pages: "Top pages",
    timeline: "Page views over time",
    timelineHelp: "Page-view history for the selected period.",
    period: "Period",
    days7: "7 days",
    days30: "30 days",
    days90: "90 days",
    allTime: "All",
    recent: "Recent visits",
    noData: "No data yet. Browse the portfolio to generate the first visits.",
    accessError: "Analytics access unavailable. Check the Supabase variables or analytics table.",
    githubPages: "GitHub Pages note",
    githubPagesText: "On GitHub Pages, real data is stored in Supabase. Without Supabase variables, the dashboard only uses visits stored in this browser.",
    localMode: "localStorage mode",
    remoteMode: "Supabase mode",
    path: "Page",
    language: "Language",
    date: "Date",
    viewport: "Viewport",
  },
}

function downloadFile(filename: string, content: string, type: string) {
  const blob = new Blob([content], { type })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(url)
}

function toCsv(events: PortfolioAnalyticsEvent[]) {
  const rows = [
    ["id", "type", "path", "language", "referrer", "viewport_width", "viewport_height", "created_at"],
    ...events.map((event) => [
      event.id,
      event.type,
      event.path,
      event.language,
      event.referrer,
      String(event.viewport?.width ?? ""),
      String(event.viewport?.height ?? ""),
      event.createdAt,
    ]),
  ]

  return rows
    .map((row) => row.map((cell) => `"${cell.replaceAll('"', '""')}"`).join(","))
    .join("\n")
}

const chartColors = ["#A855F7", "#06B6D4", "#EC4899", "#22C55E", "#F59E0B", "#EF4444", "#84CC16"]

function getPeriodStart(period: string) {
  if (period === "all") return null
  const days = Number(period)
  if (!Number.isFinite(days)) return null

  const start = new Date()
  start.setHours(0, 0, 0, 0)
  start.setDate(start.getDate() - (days - 1))
  return start
}

function formatDayKey(date: Date) {
  return date.toISOString().slice(0, 10)
}

function formatChartDay(day: string, locale: string) {
  return new Date(`${day}T00:00:00`).toLocaleDateString(locale, {
    day: "2-digit",
    month: "short",
  })
}

function buildPageTimeline(events: PortfolioAnalyticsEvent[], period: string, locale: string) {
  const pageviews = events.filter((event) => event.type === "pageview")
  const start = getPeriodStart(period)
  const filteredPageviews = start
    ? pageviews.filter((event) => new Date(event.createdAt) >= start)
    : pageviews

  const pageNames = Object.entries(
    filteredPageviews.reduce<Record<string, number>>((acc, event) => {
      acc[event.path] = (acc[event.path] || 0) + 1
      return acc
    }, {}),
  )
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([path]) => path)

  const days: string[] = []
  if (period === "all") {
    const uniqueDays = Array.from(new Set(filteredPageviews.map((event) => formatDayKey(new Date(event.createdAt)))))
    days.push(...uniqueDays.sort())
  } else {
    const count = Number(period)
    const cursor = getPeriodStart(period) || new Date()
    for (let i = 0; i < count; i++) {
      const day = new Date(cursor)
      day.setDate(cursor.getDate() + i)
      days.push(formatDayKey(day))
    }
  }

  return {
    pageNames,
    rows: days.map((day) => {
      const row: Record<string, string | number> = {
        day,
        label: formatChartDay(day, locale),
      }

      pageNames.forEach((page) => {
        row[page] = filteredPageviews.filter((event) => event.path === page && formatDayKey(new Date(event.createdAt)) === day).length
      })

      return row
    }),
  }
}

export default function AnalyticsPage() {
  const { language } = useLanguage()
  const text = dashboardText[language]
  const [summary, setSummary] = useState<PortfolioAnalyticsSummary | null>(null)
  const [events, setEvents] = useState<PortfolioAnalyticsEvent[]>([])
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(true)
  const [period, setPeriod] = useState("7")
  const storeMode = useMemo(() => hasRemoteAnalyticsStore() ? text.remoteMode : text.localMode, [text.localMode, text.remoteMode])

  const loadAnalytics = async () => {
    setLoading(true)
    setError("")

    try {
      const loadedEvents = await loadPortfolioAnalyticsEvents()
      setSummary(buildAnalyticsSummary(loadedEvents))
      setEvents(loadedEvents)
    } catch {
      setError(text.accessError)
      setSummary(null)
      setEvents([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadAnalytics()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language])

  const periodStart = useMemo(() => getPeriodStart(period), [period])
  const periodEvents = useMemo(
    () => periodStart ? events.filter((event) => new Date(event.createdAt) >= periodStart) : events,
    [events, periodStart],
  )
  const periodSummary = useMemo(() => buildAnalyticsSummary(periodEvents), [periodEvents])
  const chartData = useMemo(
    () => buildPageTimeline(events, period, language === "fr" ? "fr-FR" : "en-US"),
    [events, language, period],
  )

  const sortedPages = Object.entries(periodSummary.byPath || {}).sort((a, b) => b[1] - a[1])
  const maxPageViews = Math.max(1, ...sortedPages.map(([, count]) => count))

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="container mx-auto px-4 pt-24 pb-16">
        <Link href="/" className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
          <ArrowLeft className="h-4 w-4" />
          {text.back}
        </Link>

        <section className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <Badge className="mb-4 bg-primary/15 text-primary hover:bg-primary/15">{text.badge}</Badge>
            <h1 className="mb-3 text-3xl font-bold md:text-5xl">{text.title}</h1>
            <p className="text-base leading-relaxed text-muted-foreground md:text-lg">{text.description}</p>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <Badge variant="outline" className="border-primary/40 text-primary">{storeMode}</Badge>
              <label className="flex items-center gap-2 text-sm text-muted-foreground">
                {text.period}
                <select
                  value={period}
                  onChange={(event) => setPeriod(event.target.value)}
                  className="rounded-md border border-border bg-background px-3 py-1.5 text-foreground outline-none transition focus:border-primary"
                >
                  <option value="7">{text.days7}</option>
                  <option value="30">{text.days30}</option>
                  <option value="90">{text.days90}</option>
                  <option value="all">{text.allTime}</option>
                </select>
              </label>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={loadAnalytics} disabled={loading}>
              <RefreshCcw className="h-4 w-4" />
              {text.refresh}
            </Button>
            <Button
              variant="outline"
              disabled={!events.length}
              onClick={() => downloadFile("portfolio-analytics.json", JSON.stringify(events, null, 2), "application/json")}
            >
              <FileJson className="h-4 w-4" />
              {text.exportJson}
            </Button>
            <Button
              disabled={!events.length}
              onClick={() => downloadFile("portfolio-analytics.csv", toCsv(events), "text/csv;charset=utf-8")}
            >
              <Download className="h-4 w-4" />
              {text.exportCsv}
            </Button>
          </div>
        </section>

        <Card className="mb-6 border-amber-400/25 bg-amber-400/10 p-4 text-sm text-amber-100">
          <strong className="text-amber-200">{text.githubPages}</strong>
          <p className="mt-1 text-amber-100/80">{text.githubPagesText}</p>
        </Card>

        {error ? (
          <Card className="border-destructive/30 bg-destructive/10 p-6 text-destructive">{error}</Card>
        ) : (
          <div className="grid gap-4 lg:grid-cols-4">
            <Card className="border-border/70 bg-card/80 p-5">
              <p className="text-sm text-muted-foreground">{text.total}</p>
              <p className="mt-2 text-5xl font-bold">{loading ? "..." : periodSummary.pageviews}</p>
            </Card>

            <Card className="border-border/70 bg-card/80 p-5">
              <p className="text-sm text-muted-foreground">{text.allEvents}</p>
              <p className="mt-2 text-5xl font-bold">{loading ? "..." : periodSummary.total}</p>
            </Card>

            <Card className="border-border/70 bg-card/80 p-5">
              <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
                <Bot className="h-4 w-4 text-primary" />
                {text.chatbotOpens}
              </div>
              <p className="text-4xl font-bold">{loading ? "..." : periodSummary.chatbotOpens}</p>
            </Card>

            <Card className="border-border/70 bg-card/80 p-5">
              <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
                <MessageSquare className="h-4 w-4 text-primary" />
                {text.chatbotMessages}
              </div>
              <p className="text-4xl font-bold">{loading ? "..." : periodSummary.chatbotMessages}</p>
            </Card>

            <Card className="border-border/70 bg-card/80 p-5 lg:col-span-4">
              <div className="mb-5 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h2 className="text-lg font-semibold">{text.timeline}</h2>
                  <p className="text-sm text-muted-foreground">{text.timelineHelp}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {chartData.pageNames.map((page, index) => (
                    <Badge key={page} variant="outline" className="border-border/70">
                      <span className="mr-2 h-2 w-2 rounded-full" style={{ backgroundColor: chartColors[index % chartColors.length] }} />
                      {page}
                    </Badge>
                  ))}
                </div>
              </div>
              {chartData.pageNames.length ? (
                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData.rows} margin={{ top: 8, right: 18, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.35} />
                      <XAxis dataKey="label" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} />
                      <Tooltip
                        contentStyle={{
                          background: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: 12,
                          color: "hsl(var(--foreground))",
                        }}
                        labelStyle={{ color: "hsl(var(--foreground))" }}
                      />
                      {chartData.pageNames.map((page, index) => (
                        <Line
                          key={page}
                          type="monotone"
                          dataKey={page}
                          stroke={chartColors[index % chartColors.length]}
                          strokeWidth={2}
                          dot={false}
                          activeDot={{ r: 4 }}
                        />
                      ))}
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">{text.noData}</p>
              )}
            </Card>

            <Card className="border-border/70 bg-card/80 p-5 lg:col-span-4">
              <h2 className="mb-4 text-lg font-semibold">{text.languages}</h2>
              <div className="flex flex-wrap gap-2">
                {Object.entries(periodSummary.byLanguage || {}).length ? (
                  Object.entries(periodSummary.byLanguage || {}).map(([lang, count]) => (
                    <Badge key={lang} variant="outline" className="border-primary/40 px-3 py-1 text-sm">
                      {lang.toUpperCase()} - {count}
                    </Badge>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">{text.noData}</p>
                )}
              </div>
            </Card>

            <Card className="border-border/70 bg-card/80 p-5 lg:col-span-4">
              <h2 className="mb-4 text-lg font-semibold">{text.pages}</h2>
              <div className="space-y-3">
                {sortedPages.length ? (
                  sortedPages.map(([page, count]) => (
                    <div key={page}>
                      <div className="mb-1 flex items-center justify-between gap-4 text-sm">
                        <span className="truncate font-medium">{page}</span>
                        <span className="text-muted-foreground">{count}</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-muted">
                        <div className="h-full rounded-full bg-primary" style={{ width: `${(count / maxPageViews) * 100}%` }} />
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">{text.noData}</p>
                )}
              </div>
            </Card>

            <Card className="border-border/70 bg-card/80 p-5 lg:col-span-4">
              <h2 className="mb-4 text-lg font-semibold">{text.recent}</h2>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[720px] text-left text-sm">
                  <thead className="text-muted-foreground">
                    <tr className="border-b border-border">
                      <th className="py-3 pr-4">{text.path}</th>
                      <th className="py-3 pr-4">{text.language}</th>
                      <th className="py-3 pr-4">{text.viewport}</th>
                      <th className="py-3">{text.date}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(summary?.recent || []).map((event) => (
                      <tr key={event.id} className="border-b border-border/60">
                        <td className="py-3 pr-4 font-medium">{event.path}</td>
                        <td className="py-3 pr-4">{event.language.toUpperCase()}</td>
                        <td className="py-3 pr-4">
                          {event.viewport?.width && event.viewport?.height
                            ? `${event.viewport.width} x ${event.viewport.height}`
                            : "-"}
                        </td>
                        <td className="py-3">{new Date(event.createdAt).toLocaleString(language === "fr" ? "fr-FR" : "en-US")}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
