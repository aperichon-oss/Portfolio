"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { useLanguage } from "@/lib/language-context"
import { trackPortfolioPageview } from "@/lib/portfolio-analytics-store"

export function PortfolioAnalytics() {
  const pathname = usePathname()
  const { language } = useLanguage()

  useEffect(() => {
    if (!pathname) return
    if (pathname === "/analytics" || pathname.startsWith("/analytics/")) return

    const payload = {
      path: pathname,
      language,
      referrer: document.referrer || "",
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight,
      },
    }

    trackPortfolioPageview(payload).catch(() => {
      // Analytics must never interrupt the portfolio experience.
    })
  }, [pathname, language])

  return null
}
