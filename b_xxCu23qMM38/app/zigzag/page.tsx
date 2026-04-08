"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { useLanguage } from "@/lib/language-context"
import { 
  Play,
  RotateCcw,
  ExternalLink,
  Github,
  ChevronRight,
  Trophy,
  Zap
} from "lucide-react"

interface GameState {
  isPlaying: boolean
  score: number
  level: number
  gameOver: boolean
  levelComplete: boolean
}

export default function ZigZagPage() {
  const { t } = useLanguage()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const gameLoopRef = useRef<number>()
  const [gameState, setGameState] = useState<GameState>({
    isPlaying: false,
    score: 0,
    level: 1,
    gameOver: false,
    levelComplete: false,
  })
  const [showInfo, setShowInfo] = useState(false)

  const ballRef = useRef({ x: 150, y: 50, direction: 1 })
  const pathRef = useRef<{ x: number; direction: number }[]>([])

  const levels = [
    {
      id: 1,
      name: t("zigzag.tutorial"),
      targetScore: 5,
      speed: 3,
      info: {
        title: t("zigzag.info1.title"),
        description: t("zigzag.info1.description"),
      },
    },
    {
      id: 2,
      name: t("zigzag.intermediate"),
      targetScore: 10,
      speed: 4,
      info: {
        title: t("zigzag.info2.title"),
        technologies: ["Next.js", "React", "Supabase", "OAuth Google"],
        description: t("zigzag.info2.description"),
      },
    },
    {
      id: 3,
      name: t("zigzag.challenger"),
      targetScore: 15,
      speed: 5,
      info: {
        title: t("zigzag.info3.title"),
        features: [t("zigzag.realtime"), t("zigzag.auth"), t("zigzag.deployed")],
        description: t("zigzag.info3.description"),
      },
    },
  ]

  const currentLevel = levels[gameState.level - 1]

  const initGame = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    ballRef.current = { x: 150, y: 50, direction: 1 }
    
    pathRef.current = []
    let x = 150
    let direction = 1
    for (let i = 0; i < 50; i++) {
      pathRef.current.push({ x, direction })
      x += direction * 30
      if (x > 250 || x < 50) {
        direction *= -1
        x += direction * 30
      }
      if (Math.random() > 0.6) {
        direction *= -1
      }
    }
  }, [])

  const startGame = useCallback(() => {
    initGame()
    setGameState({
      isPlaying: true,
      score: 0,
      level: 1,
      gameOver: false,
      levelComplete: false,
    })
    setShowInfo(false)
  }, [initGame])

  const restartLevel = useCallback(() => {
    initGame()
    setGameState(prev => ({
      ...prev,
      isPlaying: true,
      score: 0,
      gameOver: false,
      levelComplete: false,
    }))
    setShowInfo(false)
  }, [initGame])

  const nextLevel = useCallback(() => {
    if (gameState.level < 3) {
      initGame()
      setGameState(prev => ({
        ...prev,
        level: prev.level + 1,
        score: 0,
        isPlaying: true,
        levelComplete: false,
      }))
      setShowInfo(false)
    }
  }, [gameState.level, initGame])

  const handleClick = useCallback(() => {
    if (!gameState.isPlaying || gameState.gameOver || gameState.levelComplete) return
    ballRef.current.direction *= -1
  }, [gameState.isPlaying, gameState.gameOver, gameState.levelComplete])

  useEffect(() => {
    if (!gameState.isPlaying || gameState.gameOver || gameState.levelComplete) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const speed = currentLevel.speed

    const gameLoop = () => {
      ctx.fillStyle = "#0F172A"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.strokeStyle = "rgba(147, 51, 234, 0.3)"
      ctx.lineWidth = 40
      ctx.lineCap = "round"
      ctx.beginPath()
      
      const pathY = 50
      let currentX = 150
      ctx.moveTo(currentX, pathY)
      
      for (let i = 0; i < pathRef.current.length; i++) {
        const segment = pathRef.current[i]
        currentX = segment.x
        ctx.lineTo(currentX, pathY + i * 15)
      }
      ctx.stroke()

      const ball = ballRef.current
      ball.y += speed
      ball.x += ball.direction * speed

      if (ball.x < 20 || ball.x > 280) {
        setGameState(prev => ({ ...prev, isPlaying: false, gameOver: true }))
        return
      }

      const newScore = Math.floor(ball.y / 30)
      if (newScore > gameState.score) {
        setGameState(prev => {
          if (newScore >= currentLevel.targetScore) {
            return { ...prev, score: newScore, isPlaying: false, levelComplete: true }
          }
          return { ...prev, score: newScore }
        })
      }

      if (ball.y > canvas.height - 30) {
        ball.y = 50
        ball.x = 150 + (Math.random() - 0.5) * 100
      }

      ctx.beginPath()
      ctx.arc(ball.x, ball.y, 12, 0, Math.PI * 2)
      const gradient = ctx.createRadialGradient(ball.x, ball.y, 0, ball.x, ball.y, 12)
      gradient.addColorStop(0, "#EC4899")
      gradient.addColorStop(1, "#9333EA")
      ctx.fillStyle = gradient
      ctx.fill()

      ctx.shadowColor = "#9333EA"
      ctx.shadowBlur = 20
      ctx.fill()
      ctx.shadowBlur = 0

      gameLoopRef.current = requestAnimationFrame(gameLoop)
    }

    gameLoopRef.current = requestAnimationFrame(gameLoop)

    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current)
      }
    }
  }, [gameState.isPlaying, gameState.gameOver, gameState.levelComplete, gameState.score, currentLevel])

  useEffect(() => {
    if (gameState.levelComplete) {
      setShowInfo(true)
    }
  }, [gameState.levelComplete])

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-8 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <Badge className="mb-4 bg-zigzag-violet/20 text-[#9333EA] border-zigzag-violet/30">
              {t("zigzag.badge")}
            </Badge>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-foreground">
              {t("zigzag.title")}
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t("zigzag.description")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Game Section */}
      <section className="relative px-4 pb-12">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Game Canvas */}
            <Card className="relative overflow-hidden bg-[#0F172A] border-zigzag-violet/30 p-4">
              {/* Level & Score */}
              <div className="flex justify-between items-center mb-4">
                <Badge variant="outline" className="border-zigzag-cyan text-[#06B6D4]">
                  {t("zigzag.level")} {gameState.level}: {currentLevel.name}
                </Badge>
                <div className="flex items-center gap-2 text-foreground">
                  <Zap className="w-4 h-4 text-zigzag-pink" />
                  <span className="font-mono">{gameState.score}/{currentLevel.targetScore}</span>
                </div>
              </div>

              {/* Canvas */}
              <div className="relative">
                <canvas
                  ref={canvasRef}
                  width={300}
                  height={400}
                  onClick={handleClick}
                  className="w-full max-w-[300px] mx-auto cursor-pointer rounded-lg"
                  style={{ touchAction: "none" }}
                />

                {/* Overlay for non-playing states */}
                <AnimatePresence>
                  {!gameState.isPlaying && !gameState.gameOver && !gameState.levelComplete && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm rounded-lg"
                    >
                      <Button
                        onClick={startGame}
                        size="lg"
                        className="bg-zigzag-violet hover:bg-zigzag-violet/90 text-white"
                      >
                        <Play className="w-5 h-5 mr-2" />
                        {t("zigzag.play")}
                      </Button>
                    </motion.div>
                  )}

                  {gameState.gameOver && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 flex flex-col items-center justify-center bg-background/90 backdrop-blur-sm rounded-lg"
                    >
                      <p className="text-xl font-bold text-destructive mb-4">{t("zigzag.gameOver")}</p>
                      <p className="text-muted-foreground mb-4">{t("zigzag.score")}: {gameState.score}</p>
                      <Button
                        onClick={restartLevel}
                        className="bg-zigzag-violet hover:bg-zigzag-violet/90 text-white"
                      >
                        <RotateCcw className="w-4 h-4 mr-2" />
                        {t("zigzag.restart")}
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Instructions */}
              <p className="text-center text-sm text-muted-foreground mt-4">
                {t("zigzag.clickToChange")}
              </p>
            </Card>

            {/* Info Panel */}
            <div className="space-y-6">
              <AnimatePresence mode="wait">
                {showInfo && gameState.levelComplete && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <Card className="p-6 bg-card border-zigzag-cyan/30">
                      <div className="flex items-center gap-2 mb-4">
                        <Trophy className="w-6 h-6 text-zigzag-pink" />
                        <span className="font-bold text-foreground">
                          {t("zigzag.levelComplete").replace("{level}", String(gameState.level))}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-foreground mb-2">
                        {currentLevel.info.title}
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        {currentLevel.info.description}
                      </p>

                      {currentLevel.info.technologies && (
                        <div className="mb-4">
                          <p className="text-sm text-muted-foreground mb-2">{t("zigzag.technologies")}</p>
                          <div className="flex flex-wrap gap-2">
                            {currentLevel.info.technologies.map((tech) => (
                              <Badge key={tech} className="bg-zigzag-cyan/20 text-[#06B6D4] border-zigzag-cyan/30">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {currentLevel.info.features && (
                        <div className="mb-4">
                          <p className="text-sm text-muted-foreground mb-2">{t("zigzag.features")}</p>
                          <div className="flex flex-wrap gap-2">
                            {currentLevel.info.features.map((feature) => (
                              <Badge key={feature} variant="outline" className="border-zigzag-pink/30 text-zigzag-pink">
                                {feature}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="flex gap-3 mt-6">
                        {gameState.level < 3 ? (
                          <Button
                            onClick={nextLevel}
                            className="bg-zigzag-violet hover:bg-zigzag-violet/90 text-white"
                          >
                            {t("zigzag.nextLevel")}
                            <ChevronRight className="w-4 h-4 ml-2" />
                          </Button>
                        ) : (
                          <Button
                            onClick={restartLevel}
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

              {/* External Links */}
              <Card className="p-6 bg-card border-border">
                <h3 className="text-lg font-semibold text-foreground mb-4">{t("zigzag.projectLinks")}</h3>
                <div className="flex flex-col gap-3">
                  <Button asChild className="bg-zigzag-violet hover:bg-zigzag-violet/90 text-white justify-start">
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
              </Card>

              {/* Progress */}
              <Card className="p-6 bg-card border-border">
                <h3 className="text-lg font-semibold text-foreground mb-4">{t("zigzag.progress")}</h3>
                <div className="space-y-3">
                  {levels.map((level) => (
                    <div key={level.id} className="flex items-center gap-3">
                      <div className={`
                        w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
                        ${gameState.level > level.id 
                          ? 'bg-zigzag-cyan text-background' 
                          : gameState.level === level.id
                          ? 'bg-zigzag-violet text-white'
                          : 'bg-muted text-muted-foreground'
                        }
                      `}>
                        {gameState.level > level.id ? '✓' : level.id}
                      </div>
                      <div className="flex-1">
                        <p className={`text-sm font-medium ${gameState.level >= level.id ? 'text-foreground' : 'text-muted-foreground'}`}>
                          {level.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {level.targetScore} {t("zigzag.pointsRequired")}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
