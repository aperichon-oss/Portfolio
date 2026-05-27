"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/lib/language-context"
import { assetPath } from "@/lib/asset-path"
import { 
  Brain,
  Search,
  MessageSquare,
  Bot,
  Github,
  FileText,
  ArrowLeft,
  Database,
  Cpu,
  Zap,
  ChevronLeft,
  ChevronRight,
  PlayCircle
} from "lucide-react"

interface Neuron {
  x: number
  y: number
  radius: number
  pulsePhase: number
  connections: number[]
}

interface Impulse {
  fromIndex: number
  toIndex: number
  progress: number
  speed: number
}

const backendStack = [
  { name: "Python", color: "bg-gradient-to-r from-amber-800/20 to-yellow-700/20 text-amber-900 border border-amber-800/20" },
  { name: "FastAPI", color: "bg-gradient-to-r from-yellow-800/20 to-amber-600/20 text-amber-900 border border-amber-800/20" },
  { name: "LangChain", color: "bg-gradient-to-r from-amber-800/20 to-yellow-700/20 text-amber-900 border border-amber-800/20" },
  { name: "OpenAI", color: "bg-gradient-to-r from-yellow-800/20 to-amber-600/20 text-amber-900 border border-amber-800/20" },
  { name: "PyMuPDF", color: "bg-gradient-to-r from-amber-800/20 to-yellow-700/20 text-amber-900 border border-amber-800/20" },
]

const ragStack = [
  { name: "FAISS", color: "bg-gradient-to-r from-yellow-800/20 to-amber-600/20 text-amber-900 border border-amber-800/20" },
  { name: "BM25", color: "bg-gradient-to-r from-amber-800/20 to-yellow-700/20 text-amber-900 border border-amber-800/20" },
  { name: "Embeddings", color: "bg-gradient-to-r from-yellow-800/20 to-amber-600/20 text-amber-900 border border-amber-800/20" },
  { name: "MMR", color: "bg-gradient-to-r from-amber-800/20 to-yellow-700/20 text-amber-900 border border-amber-800/20" },
  { name: "Sentence Transformers", color: "bg-gradient-to-r from-yellow-800/20 to-amber-600/20 text-amber-900 border border-amber-800/20" },
]

const frontendStack = [
  { name: "HTML", color: "bg-gradient-to-r from-yellow-800/20 to-amber-600/20 text-amber-900 border border-amber-800/20" },
  { name: "CSS", color: "bg-gradient-to-r from-amber-800/20 to-yellow-700/20 text-amber-900 border border-amber-800/20" },
  { name: "JavaScript", color: "bg-gradient-to-r from-yellow-800/20 to-amber-600/20 text-amber-900 border border-amber-800/20" },
]

const mlStack = [
  { name: "Transformers", color: "bg-gradient-to-r from-amber-800/20 to-yellow-700/20 text-amber-900 border border-amber-800/20" },
  { name: "scikit-learn", color: "bg-gradient-to-r from-yellow-800/20 to-amber-600/20 text-amber-900 border border-amber-800/20" },
  { name: "Torch", color: "bg-gradient-to-r from-amber-800/20 to-yellow-700/20 text-amber-900 border border-amber-800/20" },
  { name: "Pandas", color: "bg-gradient-to-r from-yellow-800/20 to-amber-600/20 text-amber-900 border border-amber-800/20" },
]

export default function SynapsePage() {
  const { t, language } = useLanguage()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const neuronsRef = useRef<Neuron[]>([])
  const impulsesRef = useRef<Impulse[]>([])
  const [bookState, setBookState] = useState<'closed' | 'rotating' | 'opening' | 'open'>('closed')
  const [currentPage, setCurrentPage] = useState(0)
  const [turningPage, setTurningPage] = useState<number | null>(null)
  const [turnDirection, setTurnDirection] = useState<'next' | 'prev'>('next')
  const [showEasterEgg, setShowEasterEgg] = useState(false)

  const features = [
    {
      icon: <Search className="w-5 h-5" />,
      title: language === "fr" ? "Recherche HAL" : "HAL Search",
      description: "Recherche de thèses scientifiques via l’API HAL avec métadonnées, auteurs, résumés et liens PDF.",
    },
    {
      icon: <FileText className="w-5 h-5" />,
      title: language === "fr" ? "Analyse PDF intelligente" : "Intelligent PDF analysis",
      description: "Extraction du texte, détection de structure, découpage en chunks et préparation du document pour le RAG.",
    },
    {
      icon: <MessageSquare className="w-5 h-5" />,
      title: language === "fr" ? "Chat RAG sourcé" : "Sourced RAG chat",
      description: "Questions-réponses contextuelles avec citations, numéros de pages et passages sources.",
    },
    {
      icon: <Bot className="w-5 h-5" />,
      title: "ML Features",
      description: "Classification automatique, résumés multi-niveaux et recommandations de thèses similaires.",
    },
  ]

  const pipelineSteps = [
    { icon: <MessageSquare className="w-4 h-4" />, label: language === "fr" ? "Requête utilisateur" : "User request" },
    { icon: <Search className="w-4 h-4" />, label: language === "fr" ? "Recherche HAL API" : "HAL API search" },
    { icon: <FileText className="w-4 h-4" />, label: language === "fr" ? "Téléchargement PDF" : "PDF download" },
    { icon: <FileText className="w-4 h-4" />, label: language === "fr" ? "Extraction texte avec PyMuPDF" : "Text extraction with PyMuPDF" },
    { icon: <Cpu className="w-4 h-4" />, label: language === "fr" ? "Chunking et embeddings" : "Chunking and embeddings" },
    { icon: <Database className="w-4 h-4" />, label: language === "fr" ? "Indexation FAISS + BM25" : "FAISS + BM25 indexing" },
    { icon: <Brain className="w-4 h-4" />, label: language === "fr" ? "Retrieval des passages pertinents" : "Relevant passage retrieval" },
    { icon: <Zap className="w-4 h-4" />, label: language === "fr" ? "Réponse LLM avec sources" : "LLM answer with sources" },
  ]

  // Book pages content
  const bookPages = [
    // Page 1 - Introduction
    {
      title: "Synapse",
      subtitle: language === "fr" ? "Assistant IA RAG pour l’exploration de thèses scientifiques" : "RAG AI assistant for exploring scientific theses",
      content: (
        <div className="space-y-4 text-center">
          <div className="relative w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-amber-900 via-yellow-800 to-amber-500 flex items-center justify-center shadow-lg shadow-amber-900/20">
            <Brain className="w-8 h-8 text-white" />
            <button
              type="button"
              aria-label="Synapse insight"
              onClick={() => setShowEasterEgg(true)}
              className="absolute inset-0 rounded-full opacity-0"
            />
          </div>
          <p className="text-amber-900/80 leading-relaxed text-sm">
            {language === "fr" ? "Synapse permet de rechercher des thèses via l’API HAL, d’analyser automatiquement leurs PDF et de poser des questions en langage naturel avec des réponses contextualisées, sourcées et vérifiables." : "Synapse lets users search theses through the HAL API, automatically analyze their PDFs and ask natural-language questions with contextualized, sourced and verifiable answers."}
          </p>
          <div className="flex flex-col items-center justify-center gap-1">
            <span className="px-3 py-1 bg-gradient-to-r from-amber-900/15 to-yellow-700/20 text-amber-900 text-xs rounded-full border border-amber-800/20">
              {language === "fr" ? "182K+ documents académiques indexables via HAL" : "182K+ academic documents indexable through HAL"}
            </span>
            <span className="px-3 py-1 bg-gradient-to-r from-amber-800/15 to-yellow-600/20 text-amber-900 text-xs rounded-full border border-amber-800/20">
              {language === "fr" ? "HAL Science · RAG · Analyse PDF · Réponses sourcées" : "HAL Science · RAG · PDF Analysis · Sourced answers"}
            </span>
          </div>
        </div>
      ),
    },
    // Page 2 - Features
    {
      title: language === "fr" ? "Fonctionnalites" : "Features",
      subtitle: language === "fr" ? "Ce que Synapse peut faire" : "What Synapse can do",
      content: (
        <div className="grid h-full grid-rows-4 gap-[clamp(0.35rem,1vw,0.75rem)]">
          {features.map((feature, index) => (
            <div key={index} className="grid grid-cols-[clamp(1.55rem,3vw,2.2rem)_minmax(0,1fr)] items-center gap-[clamp(0.35rem,0.9vw,0.65rem)] rounded-lg border border-amber-800/15 bg-transparent p-[clamp(0.35rem,0.9vw,0.7rem)]">
              <div className="w-[clamp(1.55rem,3vw,2.2rem)] h-[clamp(1.55rem,3vw,2.2rem)] rounded-full bg-gradient-to-br from-amber-900 via-yellow-800 to-amber-500 flex items-center justify-center text-white flex-shrink-0 shadow-sm shadow-amber-900/20">
                {feature.icon}
              </div>
              <div className="min-w-0">
                <h4 className="font-semibold text-amber-900 text-[clamp(0.74rem,1.25vw,0.95rem)] leading-tight">{feature.title}</h4>
                <p className="break-words text-amber-800/70 text-[clamp(0.58rem,0.9vw,0.72rem)] leading-snug">
                  {language === "fr" ? feature.description : [
                    "Scientific thesis search through the HAL API with metadata, authors, abstracts and PDF links.",
                    "Text extraction, structure detection, chunking and document preparation for RAG.",
                    "Contextual question answering with citations, page numbers and source passages.",
                    "Automatic classification, multi-level summaries and recommendations of similar theses.",
                  ][index]}
                </p>
              </div>
            </div>
          ))}
        </div>
      ),
    },
    // Page 3 - Tech Stack
    {
      title: language === "fr" ? "Technologies" : "Tech Stack",
      subtitle: language === "fr" ? "Outils utilises" : "Tools used",
      content: (
        <div className="grid h-full grid-cols-1 gap-[clamp(0.35rem,0.9vw,0.7rem)] sm:grid-cols-2 sm:grid-rows-2">
          <div className="min-w-0 rounded-lg border border-amber-800/15 bg-transparent p-[clamp(0.35rem,0.9vw,0.75rem)]">
            <h4 className="font-semibold text-amber-800 text-[clamp(0.64rem,1vw,0.82rem)] mb-[clamp(0.25rem,0.8vw,0.55rem)] flex items-center gap-1">
              <Cpu className="w-3 h-3" />
              Backend
            </h4>
            <div className="flex min-w-0 flex-wrap gap-1">
              {backendStack.map((tech) => (
                <span key={tech.name} className={`max-w-full break-words px-1.5 py-0.5 text-[clamp(0.52rem,0.82vw,0.68rem)] rounded ${tech.color}`}>
                  {tech.name}
                </span>
              ))}
            </div>
          </div>
          <div className="min-w-0 rounded-lg border border-amber-800/15 bg-transparent p-[clamp(0.35rem,0.9vw,0.75rem)]">
            <h4 className="font-semibold text-amber-800 text-[clamp(0.64rem,1vw,0.82rem)] mb-[clamp(0.25rem,0.8vw,0.55rem)] flex items-center gap-1">
              <FileText className="w-3 h-3" />
              {language === "fr" ? "RAG / Recherche" : "RAG / Search"}
            </h4>
            <div className="flex min-w-0 flex-wrap gap-1">
              {ragStack.map((tech) => (
                <span key={tech.name} className={`max-w-full break-words px-1.5 py-0.5 text-[clamp(0.52rem,0.82vw,0.68rem)] rounded ${tech.color}`}>
                  {tech.name}
                </span>
              ))}
            </div>
          </div>
          <div className="min-w-0 rounded-lg border border-amber-800/15 bg-transparent p-[clamp(0.35rem,0.9vw,0.75rem)]">
            <h4 className="font-semibold text-amber-800 text-[clamp(0.64rem,1vw,0.82rem)] mb-[clamp(0.25rem,0.8vw,0.55rem)] flex items-center gap-1">
              <FileText className="w-3 h-3" />
              Frontend
            </h4>
            <div className="flex min-w-0 flex-wrap gap-1">
              {frontendStack.map((tech) => (
                <span key={tech.name} className={`max-w-full break-words px-1.5 py-0.5 text-[clamp(0.52rem,0.82vw,0.68rem)] rounded ${tech.color}`}>
                  {tech.name}
                </span>
              ))}
            </div>
          </div>
          <div className="min-w-0 rounded-lg border border-amber-800/15 bg-transparent p-[clamp(0.35rem,0.9vw,0.75rem)]">
            <h4 className="font-semibold text-amber-800 text-[clamp(0.64rem,1vw,0.82rem)] mb-[clamp(0.25rem,0.8vw,0.55rem)] flex items-center gap-1">
              <Bot className="w-3 h-3" />
              Machine Learning
            </h4>
            <div className="flex min-w-0 flex-wrap gap-1">
              {mlStack.map((tech) => (
                <span key={tech.name} className={`max-w-full break-words px-1.5 py-0.5 text-[clamp(0.52rem,0.82vw,0.68rem)] rounded ${tech.color}`}>
                  {tech.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    // Page 4 - Pipeline
    {
      title: "Pipeline RAG",
      subtitle: language === "fr" ? "Flux de donnees" : "Data flow",
      content: (
        <div className="grid h-full grid-cols-1 gap-[clamp(0.35rem,1vw,0.7rem)] sm:grid-cols-2 sm:grid-rows-4">
          {pipelineSteps.map((step, index) => (
            <div key={index} className="relative grid min-w-0 grid-cols-[clamp(1rem,1.8vw,1.35rem)_minmax(0,1fr)] items-center gap-[clamp(0.2rem,0.55vw,0.45rem)] rounded-lg border border-amber-800/15 bg-transparent p-[clamp(0.35rem,0.85vw,0.65rem)] pt-[clamp(0.85rem,1.45vw,1.1rem)]">
              <div className="absolute left-[clamp(0.25rem,0.65vw,0.45rem)] top-[clamp(0.25rem,0.65vw,0.45rem)] flex h-[clamp(0.8rem,1.25vw,1rem)] min-w-[clamp(0.8rem,1.25vw,1rem)] items-center justify-center rounded-full bg-gradient-to-br from-amber-900 via-yellow-800 to-amber-500 px-1 text-[clamp(0.42rem,0.65vw,0.52rem)] font-bold text-white">
                {index + 1}
              </div>
              <div className="w-[clamp(1rem,1.8vw,1.35rem)] h-[clamp(1rem,1.8vw,1.35rem)] rounded bg-amber-200/50 flex items-center justify-center text-amber-700 [&_svg]:h-[0.85em] [&_svg]:w-[0.85em]">
                {step.icon}
              </div>
              <span className="min-w-0 whitespace-normal text-[clamp(0.48rem,0.76vw,0.66rem)] leading-tight text-amber-900 font-medium">{step.label}</span>
            </div>
          ))}
        </div>
      ),
    },
    // Page 5 - Demo video
    {
      title: language === "fr" ? "Demo video" : "Video demo",
      subtitle: language === "fr" ? "Presentation du projet" : "Project presentation",
      content: (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-amber-900">
            <PlayCircle className="w-5 h-5 text-amber-800" />
            <p className="text-sm font-semibold">
              {language === "fr" ? "Presentation de Synapse" : "Synapse presentation"}
            </p>
          </div>
          <div className="relative aspect-video overflow-hidden rounded-lg border border-amber-300/60 bg-black shadow-inner">
            <video
              src={assetPath("/videos/synapse-demo.mp4")}
              controls
              preload="metadata"
              className="h-full w-full object-contain"
            >
              Your browser does not support the video tag.
            </video>
          </div>
          <p className="text-xs leading-relaxed text-amber-800/75">
            {language === "fr"
              ? "Une presentation complete du fonctionnement, de l'interface et du parcours utilisateur du projet."
              : "A complete walkthrough of the project workflow, interface and user journey."}
          </p>
        </div>
      ),
    },
    // Page 6 - CTA
    {
      title: language === "fr" ? "Decouvrir" : "Explore",
      subtitle: language === "fr" ? "Voir le projet" : "View the project",
      content: (
        <div className="space-y-6 text-center pt-4">
          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-amber-900 via-yellow-800 to-amber-500 flex items-center justify-center shadow-lg shadow-amber-900/20">
            <Github className="w-10 h-10 text-white" />
          </div>
          <p className="text-amber-800/80 text-sm">
            {language === "fr" 
              ? "Explorez le code source et contribuez au projet" 
              : "Explore the source code and contribute to the project"}
          </p>
          <Button asChild className="bg-gradient-to-r from-amber-900 via-yellow-800 to-amber-500 hover:opacity-90 text-white shadow-lg shadow-amber-900/25 border border-amber-700/40">
            <a href="https://github.com/jeanlisek/Synapse" target="_blank" rel="noopener noreferrer">
              <Github className="w-4 h-4 mr-2" />
              {t("synapse.viewGithub")}
            </a>
          </Button>
        </div>
      ),
    },
  ]

  const openBook = () => {
    // First rotate to show spine
    setBookState('rotating')
    setTimeout(() => {
      // Then open like a real book
      setBookState('opening')
      setTimeout(() => {
        setBookState('open')
        setCurrentPage(0)
      }, 800)
    }, 800)
  }

  const closeBook = () => {
    setBookState('closed')
    setCurrentPage(0)
    setTurningPage(null)
  }

  const nextPage = () => {
    if (currentPage < bookPages.length - 1 && turningPage === null) {
      setTurnDirection('next')
      setTurningPage(currentPage)
      setTimeout(() => {
        setCurrentPage(prev => prev + 1)
        setTurningPage(null)
      }, 600)
    }
  }

  const prevPage = () => {
    if (currentPage > 0 && turningPage === null) {
      setTurnDirection('prev')
      setTurningPage(currentPage - 1)
      setTimeout(() => {
        setCurrentPage(prev => prev - 1)
        setTurningPage(null)
      }, 600)
    }
  }

  // Neural network background animation
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initNeurons()
    }

    const initNeurons = () => {
      neuronsRef.current = []
      const neuronCount = Math.min(50, Math.floor((canvas.width * canvas.height) / 20000))

      for (let i = 0; i < neuronCount; i++) {
        const neuron: Neuron = {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 3 + 2,
          pulsePhase: Math.random() * Math.PI * 2,
          connections: [],
        }

        for (let j = 0; j < neuronsRef.current.length; j++) {
          const other = neuronsRef.current[j]
          const dx = neuron.x - other.x
          const dy = neuron.y - other.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150 && neuron.connections.length < 3) {
            neuron.connections.push(j)
          }
        }

        neuronsRef.current.push(neuron)
      }
    }

    const createImpulse = () => {
      const neurons = neuronsRef.current
      if (neurons.length < 2) return

      const fromIndex = Math.floor(Math.random() * neurons.length)
      const neuron = neurons[fromIndex]

      if (neuron.connections.length > 0) {
        const toIndex = neuron.connections[Math.floor(Math.random() * neuron.connections.length)]
        impulsesRef.current.push({
          fromIndex,
          toIndex,
          progress: 0,
          speed: 0.02 + Math.random() * 0.02,
        })
      }
    }

    const animate = () => {
      ctx.fillStyle = "rgba(10, 10, 10, 0.15)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const neurons = neuronsRef.current
      const time = Date.now() * 0.001

      ctx.strokeStyle = "rgba(139, 92, 246, 0.08)"
      ctx.lineWidth = 1

      neurons.forEach((neuron) => {
        neuron.connections.forEach((connIndex) => {
          const other = neurons[connIndex]
          ctx.beginPath()
          ctx.moveTo(neuron.x, neuron.y)
          ctx.lineTo(other.x, other.y)
          ctx.stroke()
        })
      })

      impulsesRef.current = impulsesRef.current.filter((impulse) => {
        impulse.progress += impulse.speed

        if (impulse.progress >= 1) return false

        const from = neurons[impulse.fromIndex]
        const to = neurons[impulse.toIndex]

        const x = from.x + (to.x - from.x) * impulse.progress
        const y = from.y + (to.y - from.y) * impulse.progress

        ctx.beginPath()
        ctx.arc(x, y, 3, 0, Math.PI * 2)
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, 3)
        gradient.addColorStop(0, "rgba(6, 182, 212, 1)")
        gradient.addColorStop(1, "rgba(139, 92, 246, 0)")
        ctx.fillStyle = gradient
        ctx.fill()

        return true
      })

      if (Math.random() < 0.08) {
        createImpulse()
      }

      neurons.forEach((neuron) => {
        const pulse = Math.sin(time * 2 + neuron.pulsePhase) * 0.3 + 0.7
        
        const dx = mousePos.x - neuron.x
        const dy = mousePos.y - neuron.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const isHovered = distance < 80

        ctx.beginPath()
        ctx.arc(neuron.x, neuron.y, neuron.radius * (isHovered ? 1.3 : 1), 0, Math.PI * 2)

        if (isHovered) {
          const gradient = ctx.createRadialGradient(
            neuron.x, neuron.y, 0,
            neuron.x, neuron.y, neuron.radius * 2
          )
          gradient.addColorStop(0, `rgba(6, 182, 212, ${pulse})`)
          gradient.addColorStop(1, "rgba(139, 92, 246, 0)")
          ctx.fillStyle = gradient
          ctx.shadowColor = "#06B6D4"
          ctx.shadowBlur = 10
        } else {
          ctx.fillStyle = `rgba(139, 92, 246, ${pulse * 0.4})`
          ctx.shadowBlur = 0
        }

        ctx.fill()
        ctx.shadowBlur = 0
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }

    resize()
    window.addEventListener("resize", resize)
    window.addEventListener("mousemove", handleMouseMove)
    animate()

    return () => {
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(animationFrameId)
    }
  }, [mousePos])

  return (
    <div className="min-h-screen bg-background relative">
      {/* Neural Network Background */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0"
      />

      {/* Overlay */}
      <div className="fixed inset-0 bg-background/80 pointer-events-none z-0" />

      <Header />
      
      {/* Hero Section */}
      <section className="relative z-10 pt-24 pb-8 px-4">
        <div className="max-w-6xl mx-auto">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            {t("nav.home")}
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4 mb-4"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-synapse-violet to-synapse-cyan flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <Badge className="bg-synapse-violet/20 text-[#8B5CF6] border-synapse-violet/30">
              {t("synapse.badge")}
            </Badge>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-bold mb-2 text-foreground"
          >
            {t("synapse.title")}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-xl text-synapse-cyan mb-4"
          >
            {t("synapse.subtitle")}
          </motion.p>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground max-w-2xl"
          >
            {t("synapse.description")}
          </motion.p>
        </div>
      </section>

      {/* 3D Book Section */}
      <section className="relative z-10 px-4 pb-12">
        <div className="max-w-6xl mx-auto flex flex-col items-center justify-center min-h-[550px]" style={{ perspective: '2000px' }}>
          
          <AnimatePresence mode="wait">
            {/* Closed Book - Front view */}
            {bookState === 'closed' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, rotateY: 90 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center cursor-pointer"
                onClick={openBook}
              >
                <motion.div 
                  className="relative group"
                  whileHover={{ scale: 1.02 }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Book - 3D closed view using custom image */}
                  <div className="relative" style={{ transformStyle: 'preserve-3d' }}>
                    {/* Front Cover - Using provided image */}
                    <div 
                      className="w-72 h-[400px] rounded-r-lg rounded-l-sm relative overflow-hidden shadow-2xl"
                      style={{
                        boxShadow: '0 25px 50px -12px rgba(50, 30, 15, 0.6)',
                      }}
                    >
                      <img 
                        src={assetPath("/images/synapse/book-cover.jpg")} 
                        alt="Synapse Book Cover"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Pages (spine side) */}
                    <div 
                      className="absolute top-0 left-0 w-6 h-full origin-right"
                      style={{ 
                        transform: 'rotateY(-90deg) translateX(-6px)',
                        background: 'linear-gradient(to right, #f5e6d3 0%, #e8d4b8 50%, #f5e6d3 100%)',
                      }}
                    >
                      {/* Page lines */}
                      {[...Array(20)].map((_, i) => (
                        <div 
                          key={i} 
                          className="absolute w-full h-px bg-amber-300/30"
                          style={{ top: `${5 + i * 4.5}%` }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="mt-8"
                >
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-amber-900 via-yellow-800 to-amber-500 hover:opacity-90 text-white shadow-lg shadow-amber-900/30 border border-amber-700/40"
                  >
                    {t("synapse.openBook")}
                  </Button>
                </motion.div>
              </motion.div>
            )}

            {/* Rotating to show spine */}
            {bookState === 'rotating' && (
              <motion.div
                initial={{ rotateY: 0 }}
                animate={{ rotateY: -90 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="relative"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Book rotating to show spine */}
                <div className="relative" style={{ transformStyle: 'preserve-3d' }}>
                  {/* Front Cover - using provided image */}
                  <div 
                    className="w-72 h-[400px] rounded-r-lg rounded-l-sm relative overflow-hidden"
                  >
                    <img 
                      src={assetPath("/images/synapse/book-cover.jpg")} 
                      alt="Synapse Book Cover"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Pages side */}
                  <div 
                    className="absolute top-0 left-0 w-8 h-full origin-right"
                    style={{ 
                      transform: 'rotateY(-90deg) translateX(-8px)',
                      background: 'linear-gradient(to right, #f5e6d3 0%, #e8d4b8 50%, #f5e6d3 100%)',
                    }}
                  >
                    {[...Array(25)].map((_, i) => (
                      <div 
                        key={i} 
                        className="absolute w-full h-px bg-amber-400/40"
                        style={{ top: `${4 + i * 3.7}%` }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Opening animation */}
            {bookState === 'opening' && (
              <motion.div
                initial={{ rotateY: -90 }}
                animate={{ rotateY: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Open book base - using provided image */}
                <div className="relative" style={{ transformStyle: 'preserve-3d' }}>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    className="relative aspect-[7/4.5] w-[min(92vw,700px)]"
                  >
                    <img 
                      src={assetPath("/images/synapse/book-pages.jpg")} 
                      alt="Synapse Book Pages"
                      className="w-full h-full object-contain"
                    />
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* Open Book - Reading mode */}
            {bookState === 'open' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex w-full flex-col items-center"
              >
                <div className="w-full max-w-xl rounded-2xl border border-amber-800/20 bg-[#f5e0b8] p-5 shadow-2xl shadow-amber-950/25 md:hidden">
                  <div className="rounded-xl border border-amber-800/20 bg-[radial-gradient(circle_at_50%_0%,rgba(255,248,220,0.9),rgba(245,224,184,0.96))] p-4">
                    <h3 className="mb-1 text-2xl font-bold leading-tight text-amber-900">{bookPages[currentPage].title}</h3>
                    <p className="mb-4 text-sm leading-tight text-amber-700/75">{bookPages[currentPage].subtitle}</p>
                    <div className="min-h-[360px] text-amber-900">
                      {bookPages[currentPage].content}
                    </div>
                  </div>
                </div>

                {/* Open Book - using provided background image */}
                <div 
                  className="relative hidden md:block"
                  style={{ perspective: '2000px', transformStyle: 'preserve-3d' }}
                >
                  {/* Book pages background */}
                  <div className="relative aspect-[7/4.5] w-[min(98vw,960px,calc((100vh-11rem)*1.55))]">
                    <img 
                      src={assetPath("/images/synapse/book-pages.jpg")} 
                      alt="Synapse Book Pages"
                      className="absolute inset-0 w-full h-full object-contain"
                    />
                    
                    {/* Left Page Content Overlay */}
                    <div className="absolute left-[10%] top-[8.6%] h-[80.5%] w-[37.2%] overflow-hidden rounded-[2px] bg-transparent">
                      <div className="relative z-10 flex h-full flex-col p-[clamp(0.35rem,1.25vw,0.75rem)]">
                        <h3 className="mb-0.5 text-[clamp(0.78rem,1.75vw,1.12rem)] font-bold leading-tight text-amber-900">{bookPages[currentPage].title}</h3>
                        <p className="mb-1.5 text-[clamp(0.55rem,1.05vw,0.72rem)] leading-tight text-amber-700/70">{bookPages[currentPage].subtitle}</p>
                        <div className="min-h-0 flex-1 overflow-hidden text-[clamp(0.58rem,1.05vw,0.78rem)]">
                          {bookPages[currentPage].content}
                        </div>
                      </div>
                    </div>
                    
                    {/* Right Page Text Overlay */}
                    <div className="pointer-events-none absolute right-[9.2%] top-[8.6%] h-[80.5%] w-[37.2%] overflow-hidden rounded-[2px] bg-transparent">
                      <div className="absolute left-1/2 top-[41.5%] flex w-[78%] -translate-x-1/2 -translate-y-1/2 flex-col items-center text-center">
                        <div className="mx-auto mb-3 h-px w-28 bg-gradient-to-r from-transparent via-amber-700/45 to-transparent" />
                        <p className="font-serif text-[clamp(0.72rem,1.12vw,1rem)] font-semibold leading-relaxed text-[#8a3f16]">
                          {language === "fr" ? "Utilisez les flèches pour tourner les pages" : "Use the arrows to turn the pages"}
                        </p>
                        <div className="mx-auto mt-3 h-px w-28 bg-gradient-to-r from-transparent via-amber-700/45 to-transparent" />
                      </div>
                    </div>

                    {/* Page numbers */}
                    <div className="absolute bottom-[10%] left-[13%] text-[clamp(0.65rem,1.3vw,0.75rem)] text-amber-600/50">
                      {currentPage * 2 + 1}
                    </div>
                    <div className="absolute bottom-[10%] right-[13%] text-[clamp(0.65rem,1.3vw,0.75rem)] text-amber-600/50">
                      {currentPage * 2 + 2}
                    </div>
                    
                    {/* Turning page overlay */}
                    {turningPage !== null && (
                      <motion.div
                        initial={{ rotateY: turnDirection === 'next' ? 0 : -180 }}
                        animate={{ rotateY: turnDirection === 'next' ? -180 : 0 }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                        className="absolute right-[6.4%] top-[1.5%] h-[93%] w-[43.8%] rounded-[3px] bg-[#ead9bd]/90 shadow-[inset_10px_0_18px_rgba(120,53,15,0.14),-10px_8px_18px_rgba(92,45,14,0.14)]"
                        style={{ 
                          transformOrigin: 'left center',
                          backfaceVisibility: 'hidden'
                        }}
                      />
                    )}
                  </div>
                </div>
                
                {/* Navigation */}
                <div className="flex items-center gap-4 mt-8">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={prevPage}
                    disabled={currentPage === 0 || turningPage !== null}
                    className="rounded-full bg-gradient-to-r from-amber-900 via-yellow-800 to-amber-500 text-white border border-amber-700/40 shadow-md shadow-amber-900/25 hover:opacity-90 disabled:opacity-40"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </Button>
                  
                  {/* Page dots */}
                  <div className="flex gap-2">
                    {bookPages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          if (turningPage === null && index !== currentPage) {
                            setTurnDirection(index > currentPage ? 'next' : 'prev')
                            setTurningPage(currentPage)
                            setTimeout(() => {
                              setCurrentPage(index)
                              setTurningPage(null)
                            }, 600)
                          }
                        }}
                        className={`w-2 h-2 rounded-full transition-all ${
                          index === currentPage 
                            ? "w-6 bg-gradient-to-r from-amber-900 via-yellow-800 to-amber-500" 
                            : "bg-amber-800/30 hover:bg-amber-700/50"
                        }`}
                      />
                    ))}
                  </div>
                  
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={nextPage}
                    disabled={currentPage === bookPages.length - 1 || turningPage !== null}
                    className="rounded-full bg-gradient-to-r from-amber-900 via-yellow-800 to-amber-500 text-white border border-amber-700/40 shadow-md shadow-amber-900/25 hover:opacity-90 disabled:opacity-40"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </div>
                
                {/* Close button */}
                <Button 
                  variant="ghost" 
                  onClick={closeBook}
                  className="mt-4 bg-gradient-to-r from-amber-900 via-yellow-800 to-amber-500 hover:opacity-90 text-white shadow-md shadow-amber-900/25 border border-amber-700/40"
                >
                  {t("synapse.closeBook")}
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <AnimatePresence>
        {showEasterEgg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
            onClick={() => setShowEasterEgg(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 12 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 12 }}
              className="relative max-w-md overflow-visible rounded-2xl border border-amber-700/40 bg-[#f5e0b8] p-5 pr-28 text-amber-950 shadow-2xl shadow-black/40"
              onClick={(event) => event.stopPropagation()}
            >
                <img
                  src={assetPath("/images/easter-eggs/personnage-easteregg.png")}
                  alt=""
                  aria-hidden="true"
                  className="pointer-events-none absolute bottom-full right-3 z-10 w-36 translate-y-[15px]"

                />
              <h3 className="mb-2 text-lg font-bold">Easter egg - Synapse</h3>
              <div className="space-y-2 text-sm leading-relaxed text-amber-950">
                <p><strong>{language === "fr" ? "Stack/imports :" : "Stack/imports:"}</strong> {language === "fr" ? "la page combine Canvas API, Framer Motion, lucide-react, `Button`, `Badge` et les hooks `useRef`, `useEffect`, `useState`." : "the page combines Canvas API, Framer Motion, lucide-react, `Button`, `Badge` and the `useRef`, `useEffect`, `useState` hooks."}</p>
                <p><strong>{language === "fr" ? "Etats cles :" : "Key states:"}</strong> {language === "fr" ? "`bookState`, `currentPage`, `turningPage` et `turnDirection` controlent le livre; `neuronsRef` et `impulsesRef` animent le fond." : "`bookState`, `currentPage`, `turningPage` and `turnDirection` control the book; `neuronsRef` and `impulsesRef` animate the background."}</p>
                <p><strong>{language === "fr" ? "Interaction :" : "Interaction:"}</strong> {language === "fr" ? "`openBook()` enchaine `rotating {'->'} opening {'->'} open`, puis le contenu est rendu depuis le tableau `bookPages`." : "`openBook()` chains `rotating {'->'} opening {'->'} open`, then content is rendered from the `bookPages` array."}</p>
                <p><strong>{language === "fr" ? "Astuce :" : "Main trick:"}</strong> {language === "fr" ? "sur desktop, les pages sont des overlays `absolute` en pourcentages sur `book-pages.jpg`; sur mobile, le contenu bascule en carte lisible." : "on desktop, pages are `absolute` percentage-based overlays on `book-pages.jpg`; on mobile, the content switches to a readable card layout."}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  )
}
