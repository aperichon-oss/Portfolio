"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { ArrowLeft, Download, FileJson, RefreshCcw } from "lucide-react"
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
    languages: "Langues",
    pages: "Pages les plus vues",
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
    languages: "Languages",
    pages: "Top pages",
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

export default function AnalyticsPage() {
  const { language } = useLanguage()
  const text = dashboardText[language]
  const [summary, setSummary] = useState<PortfolioAnalyticsSummary | null>(null)
  const [events, setEvents] = useState<PortfolioAnalyticsEvent[]>([])
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(true)
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

  const sortedPages = Object.entries(summary?.byPath || {}).sort((a, b) => b[1] - a[1])
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
            <Badge variant="outline" className="mt-4 border-primary/40 text-primary">{storeMode}</Badge>
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
          <div className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
            <Card className="border-border/70 bg-card/80 p-5">
              <p className="text-sm text-muted-foreground">{text.total}</p>
              <p className="mt-2 text-5xl font-bold">{loading ? "..." : summary?.total ?? 0}</p>
            </Card>

            <Card className="border-border/70 bg-card/80 p-5">
              <h2 className="mb-4 text-lg font-semibold">{text.languages}</h2>
              <div className="flex flex-wrap gap-2">
                {Object.entries(summary?.byLanguage || {}).length ? (
                  Object.entries(summary?.byLanguage || {}).map(([lang, count]) => (
                    <Badge key={lang} variant="outline" className="border-primary/40 px-3 py-1 text-sm">
                      {lang.toUpperCase()} - {count}
                    </Badge>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">{text.noData}</p>
                )}
              </div>
            </Card>

            <Card className="border-border/70 bg-card/80 p-5 lg:col-span-2">
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

            <Card className="border-border/70 bg-card/80 p-5 lg:col-span-2">
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
