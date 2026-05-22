"use client"

import { FormEvent, useMemo, useState } from "react"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import { Send, X } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { assetPath } from "@/lib/asset-path"
import { trackPortfolioAnalyticsEvent } from "@/lib/portfolio-analytics-store"

type Message = {
  role: "user" | "bot"
  text: string
}

const normalize = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")

export function PortfolioChatbot() {
  const { language } = useLanguage()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([])

  const currentProject = useMemo(() => {
    if (pathname?.startsWith("/supply-brain")) return "supply"
    if (pathname?.startsWith("/synapse")) return "synapse"
    if (pathname?.startsWith("/eugenia-school")) return "eugenia"
    if (pathname?.startsWith("/zigzag")) return "zigzag"
    if (pathname?.startsWith("/mario-kart")) return "mario"
    return null
  }, [pathname])

  const copy = useMemo(
    () =>
      language === "fr"
        ? {
            title: "Assistant portfolio",
            placeholder: "Pose une question sur le portfolio...",
            intro: "Bonjour ! Je peux repondre sur les projets, les technologies, les liens, le contact et le parcours d'Aurelie.",
            projects: "Les projets sont classes par pertinence : Supply Brain - Hackathon Mirakl, Synapse, Eugenia School, ZigZag, puis Mario Kart.",
            supply: "Supply Brain est un projet Hackathon Mirakl. Il presente Nordika Pulse, une extension de Mirakl Connect qui centralise stocks, ventes, commandes, supply chain et CO2. La solution utilise Dust.tt, Supabase, Recharts, Leaflet, n8n et plusieurs agents : Monitoring Agent, Supply Allocation, GeoSupplyWatch et Carbon Footprint Tracker.",
            synapse: "Synapse est un assistant RAG pour explorer des theses scientifiques. Il combine recherche HAL, extraction PDF avec PyMuPDF, chunking, embeddings, indexation FAISS/BM25, retrieval des passages pertinents et reponses LLM sourcees.",
            eugenia: "Eugenia School presente une refonte SEO/GEO interactive : prototype React/Vite/TypeScript/Tailwind, architecture de contenu par parcours, audit SEO/GEO avec scores, blocages techniques et strategie de visibilite.",
            zigzag: "ZigZag est un jeu multijoueur inspire de Gartic Phone. Il combine Next.js, React, TypeScript, Tailwind CSS, Supabase, PostgreSQL, Supabase Auth, Google OAuth et Realtime pour gerer lobby, tours, dessin, texte, audio et galerie finale.",
            mario: "Mario Kart est un projet data autour du web scraping des records Mario Kart 8 : extraction des temps, nettoyage, export CSV, analyse de performance et presentation Canva.",
            tech: "Les stacks principales couvrent Next.js, React, TypeScript, Tailwind CSS, Supabase, FastAPI, Python, LangChain, FAISS, BM25, Recharts, Leaflet et Framer Motion selon les projets.",
            contact: "Tu peux contacter Aurelie par email : aurelieperichon@gmail.com. Les liens GitHub et LinkedIn sont dans le header et le footer.",
            language: "Le portfolio est bilingue. Le bouton FR/EN dans le header change les textes entre francais et anglais.",
            about: "Aurelie Perichon est etudiante en MSc AI Applied to Business, avec une experience en marketing digital et 5 ans dans le retail. Son portfolio met en avant des projets data, IA, web et SEO/GEO.",
            fallback: "Je peux repondre sur les projets, les technologies, les liens, le contact, la navigation ou le fonctionnement du portfolio.",
          }
        : {
            title: "Portfolio assistant",
            placeholder: "Ask a question about the portfolio...",
            intro: "Hi! I can answer questions about Aurelie's projects, technologies, links, contact details and background.",
            projects: "Projects are ordered by relevance: Supply Brain - Mirakl Hackathon, Synapse, Eugenia School, ZigZag, then Mario Kart.",
            supply: "Supply Brain is a Mirakl Hackathon project. It presents Nordika Pulse, a Mirakl Connect extension that centralizes inventory, sales, orders, supply-chain data and CO2 impact. It uses Dust.tt, Supabase, Recharts, Leaflet, n8n and agents such as Monitoring Agent, Supply Allocation, GeoSupplyWatch and Carbon Footprint Tracker.",
            synapse: "Synapse is a RAG assistant for scientific theses. It combines HAL search, PDF extraction with PyMuPDF, chunking, embeddings, FAISS/BM25 indexing, relevant-passage retrieval and sourced LLM answers.",
            eugenia: "Eugenia School showcases an interactive SEO/GEO redesign: React/Vite/TypeScript/Tailwind prototype, content architecture by user journey, SEO/GEO audit with scores, technical blockers and visibility strategy.",
            zigzag: "ZigZag is a multiplayer game inspired by Gartic Phone. It uses Next.js, React, TypeScript, Tailwind CSS, Supabase, PostgreSQL, Supabase Auth, Google OAuth and Realtime to handle lobby, rounds, drawing, text, audio and the final gallery.",
            mario: "Mario Kart is a data project focused on scraping Mario Kart 8 world records: time extraction, cleaning, CSV export, performance analysis and Canva presentation.",
            tech: "Main stacks include Next.js, React, TypeScript, Tailwind CSS, Supabase, FastAPI, Python, LangChain, FAISS, BM25, Recharts, Leaflet and Framer Motion depending on the project.",
            contact: "You can contact Aurelie by email: aurelieperichon@gmail.com. GitHub and LinkedIn links are available in the header and footer.",
            language: "The portfolio is bilingual. The FR/EN button in the header switches all text between French and English.",
            about: "Aurelie Perichon is an MSc AI Applied to Business student with digital marketing experience and 5 years in retail. Her portfolio highlights data, AI, web and SEO/GEO projects.",
            fallback: "I can answer questions about projects, technologies, links, contact, navigation or how the portfolio works.",
          },
    [language],
  )

  const answerQuestion = (question: string) => {
    const q = normalize(question)
    const projectAnswers = {
      supply: copy.supply,
      synapse: copy.synapse,
      eugenia: copy.eugenia,
      zigzag: copy.zigzag,
      mario: copy.mario,
    }

    if (
      currentProject &&
      (q.includes("ce projet") ||
        q.includes("this project") ||
        q.includes("explique") ||
        q.includes("explain") ||
        q.includes("c'est quoi") ||
        q.includes("what is it") ||
        q.includes("detail") ||
        q.includes("details"))
    ) {
      return projectAnswers[currentProject]
    }

    if (q.includes("supply") || q.includes("mirakl") || q.includes("hackathon")) return copy.supply
    if (q.includes("synapse") || q.includes("rag") || q.includes("these") || q.includes("thesis") || q.includes("hal")) return copy.synapse
    if (q.includes("eugenia") || q.includes("seo") || q.includes("geo")) return copy.eugenia
    if (q.includes("zigzag") || q.includes("dessin") || q.includes("drawing") || q.includes("gartic")) return copy.zigzag
    if (q.includes("mario") || q.includes("kart") || q.includes("scraping")) return copy.mario
    if (q.includes("tech") || q.includes("stack") || q.includes("outil") || q.includes("library") || q.includes("librairie")) return copy.tech
    if (q.includes("contact") || q.includes("email") || q.includes("mail") || q.includes("linkedin") || q.includes("github")) return copy.contact
    if (q.includes("anglais") || q.includes("english") || q.includes("francais") || q.includes("french") || q.includes("langue")) return copy.language
    if (q.includes("a propos") || q.includes("about") || q.includes("aurelie") || q.includes("parcours")) return copy.about
    if (q.includes("projet") || q.includes("project") || q.includes("ordre") || q.includes("order")) return currentProject ? projectAnswers[currentProject] : copy.projects

    return currentProject ? `${projectAnswers[currentProject]}\n\n${copy.fallback}` : copy.fallback
  }

  const trackChatbotUsage = (type: "chatbot_open" | "chatbot_message", question?: string) => {
    trackPortfolioAnalyticsEvent({
      type,
      path: window.location.pathname || "/",
      language,
      referrer: document.referrer || "",
      metadata: question ? { question: question.slice(0, 500) } : undefined,
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight,
      },
    }).catch(() => {
      // Analytics must stay silent if storage is unavailable.
    })
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const question = input.trim()
    if (!question) return

    setMessages((current) => [
      ...current,
      { role: "user", text: question },
      { role: "bot", text: answerQuestion(question) },
    ])
    trackChatbotUsage("chatbot_message", question)
    setInput("")
  }

  if (pathname?.startsWith("/analytics")) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 sm:bottom-5 sm:right-5">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.96 }}
            className="mb-3 w-[min(calc(100vw-2rem),23rem)] overflow-hidden rounded-2xl border border-primary/20 bg-background/95 shadow-2xl shadow-black/30 backdrop-blur-md"
          >
            <div className="flex items-center justify-between border-b border-border/70 px-4 py-3">
              <div className="flex items-center gap-2">
                <Image src={assetPath("/favicon.png")} alt="" width={28} height={28} className="h-7 w-7 rounded-full bg-black object-contain" />
                <p className="text-sm font-semibold text-foreground">{copy.title}</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full p-1 text-muted-foreground transition hover:bg-muted hover:text-foreground"
                aria-label={language === "fr" ? "Fermer le chatbot" : "Close chatbot"}
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="max-h-80 space-y-3 overflow-y-auto px-4 py-4 text-sm">
              <div className="rounded-2xl rounded-tl-sm bg-muted px-3 py-2 text-muted-foreground">
                {copy.intro}
              </div>
              {messages.map((message, index) => (
                <div
                  key={`${message.role}-${index}`}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] whitespace-pre-line rounded-2xl px-3 py-2 leading-relaxed ${
                      message.role === "user"
                        ? "rounded-tr-sm bg-primary text-primary-foreground"
                        : "rounded-tl-sm bg-muted text-muted-foreground"
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="flex gap-2 border-t border-border/70 p-3">
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder={copy.placeholder}
                className="min-w-0 flex-1 rounded-full border border-border bg-background px-3 py-2 text-sm text-foreground outline-none transition focus:border-primary"
              />
              <button
                type="submit"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition hover:bg-primary/90"
                aria-label={language === "fr" ? "Envoyer" : "Send"}
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => {
          setOpen((current) => {
            const next = !current
            if (next) trackChatbotUsage("chatbot_open")
            return next
          })
        }}
        className="flex h-14 w-14 items-center justify-center rounded-full border border-primary/25 bg-background shadow-xl shadow-black/30 transition hover:-translate-y-0.5 hover:border-primary/50"
        aria-label={open ? (language === "fr" ? "Fermer le chatbot" : "Close chatbot") : copy.title}
      >
        <Image src={assetPath("/favicon.png")} alt="" width={44} height={44} className="h-11 w-11 rounded-full bg-black object-contain" priority={false} />
      </button>
    </div>
  )
}
