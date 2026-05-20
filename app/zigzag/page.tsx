"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { useLanguage } from "@/lib/language-context"
import { assetPath } from "@/lib/asset-path"
import { 
  Play,
  RotateCcw,
  ExternalLink,
  Github,
  ChevronRight,
  Trophy,
  Eraser,
  Check,
  ArrowLeft,
  Palette,
  PaintBucket
} from "lucide-react"

// Fun colorful drawings to reproduce - more artistic, less geometric
const DRAWINGS = [
  {
    name: "Chat",
    nameEn: "Cat",
    draw: (ctx: CanvasRenderingContext2D, size: number) => {
      const cx = size / 2, cy = size / 2
      // Head
      ctx.fillStyle = "#F97316"
      ctx.beginPath()
      ctx.arc(cx, cy + 10, size * 0.28, 0, Math.PI * 2)
      ctx.fill()
      // Ears
      ctx.beginPath()
      ctx.moveTo(cx - size * 0.22, cy - size * 0.1)
      ctx.lineTo(cx - size * 0.15, cy - size * 0.3)
      ctx.lineTo(cx - size * 0.05, cy - size * 0.1)
      ctx.fillStyle = "#F97316"
      ctx.fill()
      ctx.beginPath()
      ctx.moveTo(cx + size * 0.22, cy - size * 0.1)
      ctx.lineTo(cx + size * 0.15, cy - size * 0.3)
      ctx.lineTo(cx + size * 0.05, cy - size * 0.1)
      ctx.fill()
      // Inner ears
      ctx.fillStyle = "#FBBF24"
      ctx.beginPath()
      ctx.moveTo(cx - size * 0.18, cy - size * 0.08)
      ctx.lineTo(cx - size * 0.15, cy - size * 0.2)
      ctx.lineTo(cx - size * 0.1, cy - size * 0.08)
      ctx.fill()
      ctx.beginPath()
      ctx.moveTo(cx + size * 0.18, cy - size * 0.08)
      ctx.lineTo(cx + size * 0.15, cy - size * 0.2)
      ctx.lineTo(cx + size * 0.1, cy - size * 0.08)
      ctx.fill()
      // Eyes
      ctx.fillStyle = "#1a1a2e"
      ctx.beginPath()
      ctx.ellipse(cx - size * 0.1, cy, size * 0.04, size * 0.06, 0, 0, Math.PI * 2)
      ctx.fill()
      ctx.beginPath()
      ctx.ellipse(cx + size * 0.1, cy, size * 0.04, size * 0.06, 0, 0, Math.PI * 2)
      ctx.fill()
      // Eye shine
      ctx.fillStyle = "#FFFFFF"
      ctx.beginPath()
      ctx.arc(cx - size * 0.11, cy - size * 0.02, size * 0.015, 0, Math.PI * 2)
      ctx.fill()
      ctx.beginPath()
      ctx.arc(cx + size * 0.09, cy - size * 0.02, size * 0.015, 0, Math.PI * 2)
      ctx.fill()
      // Nose
      ctx.fillStyle = "#EC4899"
      ctx.beginPath()
      ctx.moveTo(cx, cy + size * 0.08)
      ctx.lineTo(cx - size * 0.03, cy + size * 0.12)
      ctx.lineTo(cx + size * 0.03, cy + size * 0.12)
      ctx.fill()
      // Mouth
      ctx.strokeStyle = "#1a1a2e"
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(cx, cy + size * 0.12)
      ctx.quadraticCurveTo(cx - size * 0.08, cy + size * 0.2, cx - size * 0.12, cy + size * 0.15)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(cx, cy + size * 0.12)
      ctx.quadraticCurveTo(cx + size * 0.08, cy + size * 0.2, cx + size * 0.12, cy + size * 0.15)
      ctx.stroke()
      // Whiskers
      ctx.strokeStyle = "#1a1a2e"
      ctx.lineWidth = 1.5
      ctx.beginPath()
      ctx.moveTo(cx - size * 0.15, cy + size * 0.08)
      ctx.lineTo(cx - size * 0.35, cy + size * 0.05)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(cx - size * 0.15, cy + size * 0.12)
      ctx.lineTo(cx - size * 0.35, cy + size * 0.14)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(cx + size * 0.15, cy + size * 0.08)
      ctx.lineTo(cx + size * 0.35, cy + size * 0.05)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(cx + size * 0.15, cy + size * 0.12)
      ctx.lineTo(cx + size * 0.35, cy + size * 0.14)
      ctx.stroke()
    }
  },
  {
    name: "Cupcake",
    nameEn: "Cupcake",
    draw: (ctx: CanvasRenderingContext2D, size: number) => {
      const cx = size / 2, cy = size / 2
      // Wrapper
      ctx.fillStyle = "#EC4899"
      ctx.beginPath()
      ctx.moveTo(cx - size * 0.25, cy + size * 0.05)
      ctx.lineTo(cx - size * 0.2, cy + size * 0.35)
      ctx.lineTo(cx + size * 0.2, cy + size * 0.35)
      ctx.lineTo(cx + size * 0.25, cy + size * 0.05)
      ctx.closePath()
      ctx.fill()
      // Wrapper lines
      ctx.strokeStyle = "#DB2777"
      ctx.lineWidth = 2
      for (let i = -2; i <= 2; i++) {
        ctx.beginPath()
        ctx.moveTo(cx + i * size * 0.08, cy + size * 0.05)
        ctx.lineTo(cx + i * size * 0.065, cy + size * 0.35)
        ctx.stroke()
      }
      // Frosting
      ctx.fillStyle = "#A855F7"
      ctx.beginPath()
      ctx.moveTo(cx - size * 0.28, cy + size * 0.05)
      ctx.quadraticCurveTo(cx - size * 0.3, cy - size * 0.1, cx - size * 0.15, cy - size * 0.1)
      ctx.quadraticCurveTo(cx - size * 0.1, cy - size * 0.25, cx, cy - size * 0.2)
      ctx.quadraticCurveTo(cx + size * 0.1, cy - size * 0.25, cx + size * 0.15, cy - size * 0.1)
      ctx.quadraticCurveTo(cx + size * 0.3, cy - size * 0.1, cx + size * 0.28, cy + size * 0.05)
      ctx.closePath()
      ctx.fill()
      // Cherry
      ctx.fillStyle = "#EF4444"
      ctx.beginPath()
      ctx.arc(cx, cy - size * 0.22, size * 0.08, 0, Math.PI * 2)
      ctx.fill()
      // Cherry stem
      ctx.strokeStyle = "#22C55E"
      ctx.lineWidth = 3
      ctx.beginPath()
      ctx.moveTo(cx, cy - size * 0.3)
      ctx.quadraticCurveTo(cx + size * 0.05, cy - size * 0.38, cx + size * 0.08, cy - size * 0.35)
      ctx.stroke()
      // Cherry shine
      ctx.fillStyle = "#FFFFFF"
      ctx.beginPath()
      ctx.arc(cx - size * 0.025, cy - size * 0.24, size * 0.02, 0, Math.PI * 2)
      ctx.fill()
    }
  },
  {
    name: "Arc-en-ciel",
    nameEn: "Rainbow",
    draw: (ctx: CanvasRenderingContext2D, size: number) => {
      const cx = size / 2, cy = size * 0.65
      const colors = ["#EF4444", "#F97316", "#FBBF24", "#22C55E", "#06B6D4", "#8B5CF6"]
      const baseRadius = size * 0.45
      const bandWidth = size * 0.06
      
      colors.forEach((color, i) => {
        ctx.strokeStyle = color
        ctx.lineWidth = bandWidth
        ctx.beginPath()
        ctx.arc(cx, cy, baseRadius - i * bandWidth, Math.PI, 0, false)
        ctx.stroke()
      })
      
      // Clouds
      const drawCloud = (x: number, y: number, scale: number) => {
        ctx.fillStyle = "#FFFFFF"
        ctx.beginPath()
        ctx.arc(x, y, size * 0.08 * scale, 0, Math.PI * 2)
        ctx.arc(x + size * 0.06 * scale, y - size * 0.03 * scale, size * 0.06 * scale, 0, Math.PI * 2)
        ctx.arc(x + size * 0.1 * scale, y, size * 0.07 * scale, 0, Math.PI * 2)
        ctx.arc(x - size * 0.05 * scale, y - size * 0.02 * scale, size * 0.05 * scale, 0, Math.PI * 2)
        ctx.fill()
      }
      
      drawCloud(cx - size * 0.35, cy, 1)
      drawCloud(cx + size * 0.35, cy, 1)
    }
  },
  {
    name: "Fleur",
    nameEn: "Flower",
    draw: (ctx: CanvasRenderingContext2D, size: number) => {
      const cx = size / 2, cy = size / 2
      // Stem
      ctx.strokeStyle = "#22C55E"
      ctx.lineWidth = size * 0.04
      ctx.lineCap = "round"
      ctx.beginPath()
      ctx.moveTo(cx, cy + size * 0.1)
      ctx.quadraticCurveTo(cx - size * 0.1, cy + size * 0.25, cx, cy + size * 0.4)
      ctx.stroke()
      // Leaves
      ctx.fillStyle = "#22C55E"
      ctx.beginPath()
      ctx.ellipse(cx - size * 0.12, cy + size * 0.25, size * 0.08, size * 0.04, -Math.PI / 4, 0, Math.PI * 2)
      ctx.fill()
      ctx.beginPath()
      ctx.ellipse(cx + size * 0.08, cy + size * 0.32, size * 0.07, size * 0.035, Math.PI / 4, 0, Math.PI * 2)
      ctx.fill()
      // Petals
      const petalColors = ["#EC4899", "#F472B6", "#EC4899", "#F472B6", "#EC4899"]
      for (let i = 0; i < 5; i++) {
        ctx.fillStyle = petalColors[i]
        const angle = (i * Math.PI * 2) / 5 - Math.PI / 2
        const px = cx + Math.cos(angle) * size * 0.15
        const py = cy - size * 0.05 + Math.sin(angle) * size * 0.15
        ctx.beginPath()
        ctx.ellipse(px, py, size * 0.12, size * 0.08, angle + Math.PI / 2, 0, Math.PI * 2)
        ctx.fill()
      }
      // Center
      ctx.fillStyle = "#FBBF24"
      ctx.beginPath()
      ctx.arc(cx, cy - size * 0.05, size * 0.1, 0, Math.PI * 2)
      ctx.fill()
      // Center details
      ctx.fillStyle = "#F59E0B"
      for (let i = 0; i < 5; i++) {
        const angle = (i * Math.PI * 2) / 5
        ctx.beginPath()
        ctx.arc(cx + Math.cos(angle) * size * 0.04, cy - size * 0.05 + Math.sin(angle) * size * 0.04, size * 0.015, 0, Math.PI * 2)
        ctx.fill()
      }
    }
  },
  {
    name: "Glace",
    nameEn: "Ice Cream",
    draw: (ctx: CanvasRenderingContext2D, size: number) => {
      const cx = size / 2, cy = size / 2
      // Cone
      ctx.fillStyle = "#D97706"
      ctx.beginPath()
      ctx.moveTo(cx - size * 0.18, cy + size * 0.05)
      ctx.lineTo(cx, cy + size * 0.4)
      ctx.lineTo(cx + size * 0.18, cy + size * 0.05)
      ctx.closePath()
      ctx.fill()
      // Cone pattern
      ctx.strokeStyle = "#B45309"
      ctx.lineWidth = 1.5
      for (let i = 0; i < 4; i++) {
        const y = cy + size * 0.1 + i * size * 0.07
        const w = size * 0.15 - i * size * 0.035
        ctx.beginPath()
        ctx.moveTo(cx - w, y)
        ctx.lineTo(cx + w, y)
        ctx.stroke()
      }
      // Cross pattern
      ctx.beginPath()
      ctx.moveTo(cx - size * 0.12, cy + size * 0.08)
      ctx.lineTo(cx + size * 0.05, cy + size * 0.32)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(cx + size * 0.12, cy + size * 0.08)
      ctx.lineTo(cx - size * 0.05, cy + size * 0.32)
      ctx.stroke()
      // Ice cream scoops
      ctx.fillStyle = "#F472B6" // Pink scoop
      ctx.beginPath()
      ctx.arc(cx - size * 0.08, cy - size * 0.02, size * 0.12, 0, Math.PI * 2)
      ctx.fill()
      ctx.fillStyle = "#A855F7" // Purple scoop
      ctx.beginPath()
      ctx.arc(cx + size * 0.08, cy - size * 0.02, size * 0.12, 0, Math.PI * 2)
      ctx.fill()
      ctx.fillStyle = "#06B6D4" // Cyan scoop on top
      ctx.beginPath()
      ctx.arc(cx, cy - size * 0.18, size * 0.13, 0, Math.PI * 2)
      ctx.fill()
      // Sprinkles on top scoop
      const sprinkleColors = ["#FBBF24", "#EC4899", "#22C55E", "#FFFFFF"]
      for (let i = 0; i < 8; i++) {
        ctx.fillStyle = sprinkleColors[i % sprinkleColors.length]
        const angle = (i / 8) * Math.PI * 2
        const r = size * 0.08
        ctx.beginPath()
        ctx.ellipse(
          cx + Math.cos(angle) * r,
          cy - size * 0.18 + Math.sin(angle) * r * 0.6,
          size * 0.012,
          size * 0.005,
          angle,
          0,
          Math.PI * 2
        )
        ctx.fill()
      }
    }
  },
  {
    name: "Papillon",
    nameEn: "Butterfly",
    draw: (ctx: CanvasRenderingContext2D, size: number) => {
      const cx = size / 2, cy = size / 2
      // Wings
      // Top left wing
      ctx.fillStyle = "#A855F7"
      ctx.beginPath()
      ctx.ellipse(cx - size * 0.18, cy - size * 0.1, size * 0.15, size * 0.2, -Math.PI / 6, 0, Math.PI * 2)
      ctx.fill()
      // Top right wing
      ctx.beginPath()
      ctx.ellipse(cx + size * 0.18, cy - size * 0.1, size * 0.15, size * 0.2, Math.PI / 6, 0, Math.PI * 2)
      ctx.fill()
      // Bottom left wing
      ctx.fillStyle = "#EC4899"
      ctx.beginPath()
      ctx.ellipse(cx - size * 0.15, cy + size * 0.12, size * 0.12, size * 0.15, -Math.PI / 4, 0, Math.PI * 2)
      ctx.fill()
      // Bottom right wing
      ctx.beginPath()
      ctx.ellipse(cx + size * 0.15, cy + size * 0.12, size * 0.12, size * 0.15, Math.PI / 4, 0, Math.PI * 2)
      ctx.fill()
      // Wing patterns
      ctx.fillStyle = "#06B6D4"
      ctx.beginPath()
      ctx.arc(cx - size * 0.2, cy - size * 0.12, size * 0.05, 0, Math.PI * 2)
      ctx.fill()
      ctx.beginPath()
      ctx.arc(cx + size * 0.2, cy - size * 0.12, size * 0.05, 0, Math.PI * 2)
      ctx.fill()
      ctx.fillStyle = "#FBBF24"
      ctx.beginPath()
      ctx.arc(cx - size * 0.15, cy + size * 0.1, size * 0.035, 0, Math.PI * 2)
      ctx.fill()
      ctx.beginPath()
      ctx.arc(cx + size * 0.15, cy + size * 0.1, size * 0.035, 0, Math.PI * 2)
      ctx.fill()
      // Body
      ctx.fillStyle = "#1a1a2e"
      ctx.beginPath()
      ctx.ellipse(cx, cy, size * 0.03, size * 0.18, 0, 0, Math.PI * 2)
      ctx.fill()
      // Head
      ctx.beginPath()
      ctx.arc(cx, cy - size * 0.2, size * 0.045, 0, Math.PI * 2)
      ctx.fill()
      // Antennae
      ctx.strokeStyle = "#1a1a2e"
      ctx.lineWidth = 2
      ctx.lineCap = "round"
      ctx.beginPath()
      ctx.moveTo(cx - size * 0.02, cy - size * 0.23)
      ctx.quadraticCurveTo(cx - size * 0.08, cy - size * 0.35, cx - size * 0.1, cy - size * 0.32)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(cx + size * 0.02, cy - size * 0.23)
      ctx.quadraticCurveTo(cx + size * 0.08, cy - size * 0.35, cx + size * 0.1, cy - size * 0.32)
      ctx.stroke()
      // Antenna tips
      ctx.fillStyle = "#1a1a2e"
      ctx.beginPath()
      ctx.arc(cx - size * 0.1, cy - size * 0.32, size * 0.02, 0, Math.PI * 2)
      ctx.fill()
      ctx.beginPath()
      ctx.arc(cx + size * 0.1, cy - size * 0.32, size * 0.02, 0, Math.PI * 2)
      ctx.fill()
    }
  },
]

interface GameState {
  isPlaying: boolean
  level: number
  levelComplete: boolean
  showInfo: boolean
}

export default function ZigZagPage() {
  const { t, language } = useLanguage()
  const drawCanvasRef = useRef<HTMLCanvasElement>(null)
  const targetCanvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [gameState, setGameState] = useState<GameState>({
    isPlaying: false,
    level: 1,
    levelComplete: false,
    showInfo: false,
  })
  const [brushColor, setBrushColor] = useState("#EC4899")
  const [brushSize, setBrushSize] = useState(6)
  const [tool, setTool] = useState<"brush" | "fill">("brush")
  const [showEasterEgg, setShowEasterEgg] = useState(false)
  const lastPosRef = useRef({ x: 0, y: 0 })

  const levels = [
    {
      id: 1,
      name: t("zigzag.tutorial"),
      drawingIndex: 0, // Cat
      info: {
        title: language === "fr" ? "Concept du jeu" : "Game concept",
        description: "ZigZag est un jeu multijoueur en ligne inspiré de Gartic Phone, où les joueurs transforment une idée à travers une chaîne de dessins, de textes et de messages audio. Chaque participant reçoit une création qu'il doit l’interpréter à sa façon. Au fil des tours, le message de départ change progressivement jusqu’à devenir une version souvent absurde. À la fin, les joueurs découvrent toute la chaîne et comparent le point de départ avec le résultat final.",
      },
    },
    {
      id: 2,
      name: t("zigzag.intermediate"),
      drawingIndex: 2, // Rainbow
      info: {
        title: language === "fr" ? "Stack Technique" : "Tech Stack",
        technologies: [
          { category: "Frontend", items: ["Next.js", "React", "TypeScript", "Tailwind CSS"] },
          { category: "Backend / Base de données", items: ["Supabase", "PostgreSQL"] },
          { category: "Authentification", items: ["Supabase Auth", "Google OAuth"] },
          { category: "Temps réel", items: ["Supabase Realtime"] },
        ],
        description: "L'architecture combine une interface Next.js reactive avec Supabase pour la persistance, l'authentification et la synchronisation temps réel entre les joueurs.",
      },
    },
    {
      id: 3,
      name: t("zigzag.challenger"),
      drawingIndex: 5, // Butterfly
      info: {
        title: language === "fr" ? "Fonctionnalités" : "Features",
        features: [
          {
            category: "Parties multijoueurs",
            items: [
              "Création et accès aux parties",
              "Lobby avant lancement",
              "Tours de jeu successifs",
              "Attribution automatique des actions",
            ],
          },
          {
            category: "Interactions créatives",
            items: [
              "Interface de dessin intégrée",
              "Descriptions textuelles",
              "Interactions vocales",
            ],
          },
          {
            category: "Temps réel et progression",
            items: [
              "Synchronisation instantanée",
              "Suivi de la progression",
            ],
          },
          {
            category: "Résultats et compte",
            items: [
              "Chaîne complète en fin de partie",
              "Galerie des dessins générés",
              "Connexion Google simplifiée",
            ],
          },
        ],
        description: "Le projet intègre plusieurs fonctionnalités pensées pour une expérience multijoueur complète, depuis la création d’une partie jusqu’à l’affichage des résultats finaux.",
      },
    },
    {
      id: 4,
      name: language === "fr" ? "Final" : "Final",
      drawingIndex: 4, // Ice cream
      info: {
        title: language === "fr" ? "Présentation et accès" : "Presentation and access",
        description: "",
      },
    },
  ]

  const currentLevel = levels[gameState.level - 1]
  const currentDrawing = DRAWINGS[currentLevel.drawingIndex]

  // Draw target image
  useEffect(() => {
    if (!gameState.isPlaying || gameState.levelComplete) return
    const canvas = targetCanvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.fillStyle = "#1a1a2e"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    currentDrawing.draw(ctx, canvas.width)
  }, [gameState.isPlaying, gameState.level, gameState.levelComplete, currentDrawing])

  // Initialize drawing canvas
  useEffect(() => {
    if (!gameState.isPlaying || gameState.levelComplete) return
    const canvas = drawCanvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.fillStyle = "#1a1a2e"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }, [gameState.isPlaying, gameState.level, gameState.levelComplete])

  const getCanvasCoords = (e: React.MouseEvent | React.TouchEvent, canvas: HTMLCanvasElement) => {
    const rect = canvas.getBoundingClientRect()
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height
    
    if ('touches' in e) {
      const touch = e.touches[0]
      return {
        x: (touch.clientX - rect.left) * scaleX,
        y: (touch.clientY - rect.top) * scaleY
      }
    } else {
      return {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY
      }
    }
  }

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    if (!gameState.isPlaying || gameState.levelComplete) return
    const canvas = drawCanvasRef.current
    if (!canvas) return
    
    e.preventDefault()
    const coords = getCanvasCoords(e, canvas)
    if (tool === "fill") {
      floodFill(canvas, Math.floor(coords.x), Math.floor(coords.y), brushColor)
      return
    }

    setIsDrawing(true)
    lastPosRef.current = coords
  }

  const draw = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing || !gameState.isPlaying || gameState.levelComplete) return
    const canvas = drawCanvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    e.preventDefault()
    const coords = getCanvasCoords(e, canvas)
    
    ctx.strokeStyle = brushColor
    ctx.lineWidth = brushSize
    ctx.lineCap = "round"
    ctx.lineJoin = "round"
    
    ctx.beginPath()
    ctx.moveTo(lastPosRef.current.x, lastPosRef.current.y)
    ctx.lineTo(coords.x, coords.y)
    ctx.stroke()
    
    lastPosRef.current = coords
  }, [isDrawing, gameState.isPlaying, gameState.levelComplete, brushColor, brushSize])

  const stopDrawing = () => {
    setIsDrawing(false)
  }

  const clearCanvas = () => {
    const canvas = drawCanvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    
    ctx.fillStyle = "#1a1a2e"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }

  const submitDrawing = () => {
    setGameState(prev => ({
      ...prev,
      levelComplete: true,
      showInfo: true,
    }))
  }

  const startGame = () => {
    setGameState({
      isPlaying: true,
      level: 1,
      levelComplete: false,
      showInfo: false,
    })
  }

  const nextLevel = () => {
    if (gameState.level < levels.length) {
      setGameState(prev => ({
        ...prev,
        level: prev.level + 1,
        levelComplete: false,
        showInfo: false,
      }))
    }
  }

  const restartGame = () => {
    setGameState({
      isPlaying: false,
      level: 1,
      levelComplete: false,
      showInfo: false,
    })
  }

  const hexToRgb = (hex: string) => {
    const normalized = hex.replace("#", "")
    return {
      r: parseInt(normalized.slice(0, 2), 16),
      g: parseInt(normalized.slice(2, 4), 16),
      b: parseInt(normalized.slice(4, 6), 16),
      a: 255,
    }
  }

  const floodFill = (canvas: HTMLCanvasElement, startX: number, startY: number, color: string) => {
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const data = imageData.data
    const targetIndex = (startY * canvas.width + startX) * 4
    const target = {
      r: data[targetIndex],
      g: data[targetIndex + 1],
      b: data[targetIndex + 2],
      a: data[targetIndex + 3],
    }
    const replacement = hexToRgb(color)
    if (
      target.r === replacement.r &&
      target.g === replacement.g &&
      target.b === replacement.b &&
      target.a === replacement.a
    ) return

    const stack = [[startX, startY]]
    while (stack.length) {
      const point = stack.pop()
      if (!point) continue
      const [x, y] = point
      if (x < 0 || y < 0 || x >= canvas.width || y >= canvas.height) continue
      const index = (y * canvas.width + x) * 4
      if (
        data[index] !== target.r ||
        data[index + 1] !== target.g ||
        data[index + 2] !== target.b ||
        data[index + 3] !== target.a
      ) continue

      data[index] = replacement.r
      data[index + 1] = replacement.g
      data[index + 2] = replacement.b
      data[index + 3] = replacement.a

      stack.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1])
    }
    ctx.putImageData(imageData, 0, 0)
  }

  const colors = [
    "#1a1a2e",
    "#FFFFFF",
    "#EC4899",
    "#A855F7",
    "#06B6D4",
    "#22C55E",
    "#FBBF24",
    "#F97316",
    "#B45309",
    "#EF4444",
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-8 px-4">
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
            <Image 
              src={assetPath("/images/zigzag-logo.webp")} 
              alt="ZigZag" 
              width={48} 
              height={48}
              className="w-12 h-12 object-contain rounded-full"
            />
            <Badge className="bg-zigzag-violet/20 text-[#9333EA] border-zigzag-violet/30">
              {t("zigzag.badge")}
            </Badge>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-bold mb-4 text-foreground"
          >
            {t("zigzag.title")}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground max-w-2xl"
          >
            {t("zigzag.description")}
          </motion.p>
        </div>
      </section>

      {/* Game Section */}
      <section className="relative px-4 pb-12">
        <div className="max-w-5xl mx-auto">
          {/* Start Screen */}
          <AnimatePresence>
            {!gameState.isPlaying && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex flex-col items-center justify-center py-12"
              >
                <div className="relative mb-8">
                  <div className="w-64 h-64 rounded-2xl bg-[#1a1a2e] border-2 border-zigzag-violet/30 flex items-center justify-center overflow-hidden">
                    <canvas 
                      width={256}
                      height={256}
                      ref={(canvas) => {
                        if (canvas) {
                          const ctx = canvas.getContext("2d")
                          if (ctx) {
                            ctx.fillStyle = "#1a1a2e"
                            ctx.fillRect(0, 0, 256, 256)
                            DRAWINGS[1].draw(ctx, 256) // Cupcake preview
                          }
                        }
                      }}
                      className="w-full h-full"
                    />
                  </div>
                  <div className="absolute -bottom-4 -right-4 w-16 h-16 rounded-full bg-zigzag-pink flex items-center justify-center">
                    <Palette className="w-8 h-8 text-white" />
                  </div>
                  <button
                    type="button"
                    aria-label="ZigZag insight"
                    onClick={() => setShowEasterEgg(true)}
                    className="absolute left-1/2 top-[18%] h-12 w-12 -translate-x-1/2 rounded-full opacity-0"
                  />
                </div>

                <Button
                  onClick={startGame}
                  size="lg"
                  className="bg-zigzag-violet hover:bg-zigzag-violet/90 text-white text-lg px-8 py-6 rounded-full"
                >
                  <Play className="w-5 h-5 mr-2" />
                  {t("zigzag.play")}
                </Button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Game Playing */}
          {gameState.isPlaying && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Drawing Area */}
              <div className="space-y-4">
                {/* Level indicator */}
                <div className="flex justify-between items-center">
                  <Badge variant="outline" className="border-zigzag-cyan text-[#06B6D4]">
                    {t("zigzag.level")} {gameState.level}: {currentLevel.name}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {language === "fr" ? currentDrawing.name : currentDrawing.nameEn}
                  </span>
                </div>

                {/* Target drawing */}
                <Card className="p-4 bg-card border-zigzag-violet/30">
                  <p className="text-sm text-muted-foreground mb-2">{t("zigzag.drawThis")}</p>
                  <canvas
                    ref={targetCanvasRef}
                    width={200}
                    height={200}
                    className="w-full max-w-[200px] mx-auto rounded-lg"
                  />
                </Card>

                {/* Drawing canvas */}
                <Card className="p-4 bg-card border-zigzag-pink/30">
                  <p className="text-sm text-muted-foreground mb-2">{t("zigzag.yourDrawing")}</p>
                  <canvas
                    ref={drawCanvasRef}
                    width={300}
                    height={300}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    onTouchStart={startDrawing}
                    onTouchMove={draw}
                    onTouchEnd={stopDrawing}
                    className="w-full max-w-[300px] mx-auto rounded-lg cursor-crosshair touch-none"
                    style={{ touchAction: "none" }}
                  />
                </Card>

                {/* Color palette */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm text-muted-foreground mr-2">{language === "fr" ? "Couleur:" : "Color:"}</span>
                  {colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setBrushColor(color)}
                      className={`w-8 h-8 rounded-full border-2 transition-transform ${
                        brushColor === color ? "scale-110 border-white" : "border-transparent"
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>

                {/* Tools */}
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground mr-2">{language === "fr" ? "Outil:" : "Tool:"}</span>
                  <Button
                    type="button"
                    variant={tool === "brush" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTool("brush")}
                    className={tool === "brush" ? "bg-zigzag-violet hover:bg-zigzag-violet/90 text-white" : ""}
                  >
                    <Palette className="w-4 h-4 mr-2" />
                    {language === "fr" ? "Pinceau" : "Brush"}
                  </Button>
                  <Button
                    type="button"
                    variant={tool === "fill" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTool("fill")}
                    className={tool === "fill" ? "bg-zigzag-violet hover:bg-zigzag-violet/90 text-white" : ""}
                  >
                    <PaintBucket className="w-4 h-4 mr-2" />
                    {language === "fr" ? "Seau" : "Fill"}
                  </Button>
                </div>

                {/* Brush size */}
                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground">{language === "fr" ? "Taille:" : "Size:"}</span>
                  {[3, 6, 10, 16].map((size) => (
                    <button
                      key={size}
                      onClick={() => setBrushSize(size)}
                      className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors ${
                        brushSize === size 
                          ? "border-zigzag-violet bg-zigzag-violet/20" 
                          : "border-muted-foreground/30"
                      }`}
                    >
                      <div 
                        className="rounded-full bg-foreground"
                        style={{ width: size + 2, height: size + 2 }}
                      />
                    </button>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <Button
                    onClick={clearCanvas}
                    variant="outline"
                    className="flex-1"
                  >
                    <Eraser className="w-4 h-4 mr-2" />
                    {t("zigzag.clear")}
                  </Button>
                  <Button
                    onClick={submitDrawing}
                    className="flex-1 bg-zigzag-violet hover:bg-zigzag-violet/90 text-white"
                  >
                    <Check className="w-4 h-4 mr-2" />
                    {t("zigzag.submit")}
                  </Button>
                </div>
              </div>

              {/* Info Panel */}
              <div className="space-y-6">
                {/* Level Complete Info */}
                <AnimatePresence mode="wait">
                  {gameState.showInfo && gameState.levelComplete && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      <Card className="p-6 bg-card border-zigzag-cyan/30">
                        <div className="flex items-center gap-2 mb-4">
                          <Trophy className="w-6 h-6 text-zigzag-pink" />
                          <span className="font-bold text-foreground">
                            {t("zigzag.wellDone")} {t("zigzag.levelComplete").replace("{level}", String(gameState.level))}
                          </span>
                        </div>

                        <h3 className="text-xl font-bold text-foreground mb-2">
                          {currentLevel.info.title}
                        </h3>
                        {currentLevel.info.description && (
                          <p className="text-muted-foreground mb-3">
                            {language === "fr" ? currentLevel.info.description : [
                              "ZigZag is an online multiplayer game inspired by Gartic Phone, where players transform an idea through drawings, text and audio messages. Round after round, the original message gradually changes into an often absurd version.",
                              "The architecture combines a reactive Next.js interface with Supabase for persistence, authentication and real-time synchronization between players.",
                              "The project includes features designed for a complete multiplayer experience, from game creation to the final results display.",
                              "",
                            ][gameState.level - 1]}
                          </p>
                        )}

                        {currentLevel.info.technologies && (
                          <div className="mb-4">
                            <p className="text-lg font-semibold text-foreground mb-3">{t("zigzag.technologies")}</p>
                            <div className="space-y-3">
                              {currentLevel.info.technologies.map((techGroup) => (
                                <div key={techGroup.category}>
                                  <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                                    {language === "fr" ? techGroup.category : ["Frontend", "Backend / Database", "Authentication", "Real-time"][currentLevel.info.technologies?.indexOf(techGroup) ?? 0]}
                                  </p>
                                  <div className="flex flex-wrap gap-2">
                                    {techGroup.items.map((tech) => (
                                      <Badge key={tech} className="bg-zigzag-cyan/20 text-[#06B6D4] border-zigzag-cyan/30">
                                        {tech}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {currentLevel.info.features && (
                          <div className="mb-4">
                            <div className="grid gap-3 sm:grid-cols-2">
                              {currentLevel.info.features.map((featureGroup) => (
                                <div key={featureGroup.category} className="rounded-lg border border-zigzag-pink/20 bg-zigzag-pink/5 p-3">
                                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#EC4899]">
                                    {language === "fr" ? featureGroup.category : ["Multiplayer games", "Creative interactions", "Real-time and progress", "Results and account"][currentLevel.info.features?.indexOf(featureGroup) ?? 0]}
                                  </p>
                                  <div className="space-y-1.5">
                                    {featureGroup.items.map((feature) => (
                                      <div key={feature} className="flex items-start gap-2 text-sm text-muted-foreground">
                                        <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-zigzag-pink" />
                                        <span>
                                          {language === "fr" ? feature : [
                                            ["Game creation and access", "Pre-game lobby", "Successive game rounds", "Automatic action assignment"],
                                            ["Built-in drawing interface", "Text descriptions", "Voice interactions"],
                                            ["Instant synchronization", "Progress tracking"],
                                            ["Full chain at the end of the game", "Generated drawings gallery", "Simplified Google login"],
                                          ][currentLevel.info.features?.indexOf(featureGroup) ?? 0][featureGroup.items.indexOf(feature)]}
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {gameState.level === 4 && (
                          <div className="mt-5 overflow-hidden rounded-lg border border-zigzag-violet/30 bg-muted">
                            <div className="aspect-video w-full">
                              <iframe
                                src="https://www.canva.com/design/DAG_cLuhVSw/synMzn4iF9134bSFYLI5dA/view?embed"
                                className="h-full w-full"
                                allowFullScreen
                              />
                            </div>
                          </div>
                        )}

                        {gameState.level === 4 && (
                          <div className="mt-4 grid gap-3 sm:grid-cols-2">
                            <Button asChild variant="outline" className="justify-start">
                              <a href="https://zig-zag.fun" target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="w-4 h-4 mr-2" />
                                {t("zigzag.playOnSite")}
                              </a>
                            </Button>
                            <Button asChild variant="outline" className="justify-start">
                              <a href="https://github.com/jeanlisek/ZigZag" target="_blank" rel="noopener noreferrer">
                                <Github className="w-4 h-4 mr-2" />
                                {t("zigzag.viewSource")}
                              </a>
                            </Button>
                          </div>
                        )}

                        <div className="flex gap-3 mt-6">
                          {gameState.level < levels.length ? (
                            <Button
                              onClick={nextLevel}
                              className="bg-zigzag-violet hover:bg-zigzag-violet/90 text-white"
                            >
                              {t("zigzag.nextLevel")}
                              <ChevronRight className="w-4 h-4 ml-2" />
                            </Button>
                          ) : (
                            <Button
                              onClick={restartGame}
                              variant="outline"
                            >
                              <RotateCcw className="w-4 h-4 mr-2" />
                              {t("zigzag.replay")}
                            </Button>
                          )}
                        </div>
                      </Card>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Progress & Links */}
                <Card className="p-6 bg-card border-border">
                  <h3 className="font-semibold text-foreground mb-4">{t("zigzag.progress")}</h3>
                  <div className="flex gap-2 mb-6">
                    {levels.map((level) => (
                      <div
                        key={level.id}
                        className={`flex-1 h-2 rounded-full ${
                          level.id < gameState.level || (level.id === gameState.level && gameState.levelComplete)
                            ? "bg-zigzag-violet"
                            : level.id === gameState.level
                            ? "bg-zigzag-pink"
                            : "bg-muted"
                        }`}
                      />
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Presentation Section */}
      {gameState.level === 4 && gameState.levelComplete && (
        <section className="relative py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8"
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                {language === "fr" ? "Presentation du Projet" : "Project Presentation"}
              </h2>
              <p className="text-muted-foreground">
                {language === "fr" 
                  ? "Decouvrez l'analyse complete, les insights et les resultats dans la presentation Canva."
                  : "Discover the complete analysis, insights and results in the Canva presentation."}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="relative rounded-xl overflow-hidden border border-border bg-card"
            >
              <div className="aspect-[16/9] w-full">
                <iframe
                  src="https://www.canva.com/design/DAG_cLuhVSw/synMzn4iF9134bSFYLI5dA/view?embed"
                  className="w-full h-full"
                  allowFullScreen
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex justify-center mt-6"
            >
              <Button asChild variant="outline">
                <a 
                  href="https://www.canva.com/design/DAG_cLuhVSw/synMzn4iF9134bSFYLI5dA/view" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  {language === "fr" ? "Ouvrir dans Canva" : "Open in Canva"}
                </a>
              </Button>
            </motion.div>
          </div>
        </section>
      )}

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
              className="relative max-w-md rounded-2xl border border-zigzag-pink/30 bg-card p-5 pr-28 shadow-2xl"
              onClick={(event) => event.stopPropagation()}
            >
                <img
                  src={assetPath("/images/easter-eggs/personnage-easteregg.png")}
                  alt=""
                  aria-hidden="true"
                  className="pointer-events-none absolute bottom-full right-3 z-10 w-36 translate-y-[15px]"
                />
              <h3 className="mb-2 text-lg font-bold text-foreground">{language === "fr" ? "Oeuf cache - ZigZag" : "Easter egg - ZigZag"}</h3>
              <div className="space-y-2 text-sm leading-relaxed text-muted-foreground">
                <p><strong>{language === "fr" ? "Stack/imports :" : "Stack/imports:"}</strong> {language === "fr" ? "l'outil s'appuie sur React refs/effects, Canvas 2D, Framer Motion, lucide-react et les composants `Card`, `Button`, `Badge`." : "the tool relies on React refs/effects, Canvas 2D, Framer Motion, lucide-react and the `Card`, `Button`, `Badge` components."}</p>
                <p><strong>{language === "fr" ? "États clés :" : "Key states:"}</strong> {language === "fr" ? "`gameState` gère les niveaux, tandis que `brushColor`, `brushSize`, `tool`, `isDrawing`, `drawCanvasRef` et `targetCanvasRef` pilotent le dessin." : "`gameState` handles the levels, while `brushColor`, `brushSize`, `tool`, `isDrawing`, `drawCanvasRef` and `targetCanvasRef` drive the drawing tool."}</p>
                <p><strong>{language === "fr" ? "Interaction :" : "Interaction:"}</strong> {language === "fr" ? "`DRAWINGS` génère le modèle à reproduire, puis `startDrawing`, `draw` et `stopDrawing` écrivent sur le canvas utilisateur." : "`DRAWINGS` generates the target drawing, then `startDrawing`, `draw` and `stopDrawing` write onto the user canvas."}</p>
                <p><strong>{language === "fr" ? "Astuce :" : "Main trick:"}</strong> {language === "fr" ? "le seau utilise `floodFill` sur `ImageData`, avec une pile de pixels et une comparaison RGBA pour remplir une zone fermée." : "the fill bucket uses `floodFill` on `ImageData`, with a pixel stack and RGBA comparison to fill a closed area."}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  )
}
