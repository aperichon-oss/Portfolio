"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/lib/language-context"
import { assetPath } from "@/lib/asset-path"
import { 
  ArrowLeft, 
  ChevronRight, 
  Play, 
  ExternalLink,
  FileSpreadsheet,
  Github,
  RotateCcw,
  Keyboard,
  ArrowRight as ArrowRightIcon
} from "lucide-react"
import marioTrack from "@/public/images/mario-track.png"
import marioKartCharacter from "@/public/images/mario-kart-character-cropped.png"

export default function MarioKartPage() {
  const { t, language } = useLanguage()
  const [raceStarted, setRaceStarted] = useState(false)
  const [progress, setProgress] = useState(0) // 0-100 horizontal progress
  const [currentCheckpoint, setCurrentCheckpoint] = useState(-1)
  const [showContent, setShowContent] = useState(false)
  const [raceComplete, setRaceComplete] = useState(false)
  const [kartY, setKartY] = useState(50) // vertical position for steering visual
  const [showEasterEgg, setShowEasterEgg] = useState(false)
  const animationRef = useRef<number | null>(null)
  const keysPressed = useRef<Set<string>>(new Set())
  const trackRef = useRef<HTMLDivElement>(null)

  const CHECKPOINT_POSITIONS = [32, 63, 94] // aligned with the two arches and finish gate
  const FINISH_POSITION = 98

  // Handle keyboard controls
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!raceStarted || showContent) return
    if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "a", "d", "w", "s"].includes(e.key)) {
      e.preventDefault()
      keysPressed.current.add(e.key)
    }
  }, [raceStarted, showContent])

  const handleKeyUp = useCallback((e: KeyboardEvent) => {
    keysPressed.current.delete(e.key)
  }, [])

  // Game loop - horizontal movement
  useEffect(() => {
    if (!raceStarted || showContent || raceComplete) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
        animationRef.current = null
      }
      return
    }

    const gameLoop = () => {
      // Horizontal movement (left = back, right = forward)
      if (keysPressed.current.has("ArrowRight") || keysPressed.current.has("d")) {
        setProgress(prev => Math.min(100, prev + 0.5))
      }
      if (keysPressed.current.has("ArrowLeft") || keysPressed.current.has("a")) {
        setProgress(prev => Math.max(0, prev - 0.3))
      }
      
      // Vertical steering (up/down) for visual effect
      if (keysPressed.current.has("ArrowUp") || keysPressed.current.has("w")) {
        setKartY(prev => Math.max(20, prev - 1))
      }
      if (keysPressed.current.has("ArrowDown") || keysPressed.current.has("s")) {
        setKartY(prev => Math.min(80, prev + 1))
      }
      
      animationRef.current = requestAnimationFrame(gameLoop)
    }
    
    animationRef.current = requestAnimationFrame(gameLoop)
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [raceStarted, showContent, raceComplete])

  // Check for checkpoint triggers
  useEffect(() => {
    if (!raceStarted || showContent) return
    
    for (let i = 0; i < CHECKPOINT_POSITIONS.length; i++) {
      if (progress >= CHECKPOINT_POSITIONS[i] && currentCheckpoint < i) {
        setCurrentCheckpoint(i)
        setShowContent(true)
        break
      }
    }
    
    if (progress >= FINISH_POSITION && currentCheckpoint >= CHECKPOINT_POSITIONS.length - 1 && !showContent && !raceComplete) {
      setRaceComplete(true)
    }
  }, [progress, currentCheckpoint, raceStarted, showContent, raceComplete])

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("keyup", handleKeyUp)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("keyup", handleKeyUp)
    }
  }, [handleKeyDown, handleKeyUp])

  // Mouse controls - click right side to accelerate, left to brake
  const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!raceStarted || showContent || raceComplete) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    
    if (x > 0.5) {
      // Click on right side - accelerate
      setProgress(prev => Math.min(100, prev + 5))
    } else {
      // Click on left side - brake
      setProgress(prev => Math.max(0, prev - 3))
    }
  }

  const startRace = () => {
    setRaceStarted(true)
    setProgress(0)
    setCurrentCheckpoint(-1)
    setShowContent(false)
    setKartY(50)
  }

  const continueRace = () => {
    setShowContent(false)
  }

  const restartRace = () => {
    setRaceStarted(false)
    setProgress(0)
    setCurrentCheckpoint(-1)
    setShowContent(false)
    setRaceComplete(false)
    setKartY(50)
    keysPressed.current.clear()
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="relative py-6 md:py-8">
          <div className="absolute inset-0 bg-gradient-to-b from-mario-red/10 via-transparent to-transparent" />
          
          <div className="container mx-auto px-4 relative z-10">
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              {t("nav.home")}
            </Link>

            <div className="flex items-center gap-4 mb-3">
              <Image 
                src={assetPath("/images/mario-icon.png")} 
                alt="Mario" 
                width={40} 
                height={40}
                className="w-10 h-10 object-contain"
              />
              <Badge className="bg-mario-red text-white">{t("mario.badge")}</Badge>
            </div>

            <h1 className="text-2xl md:text-4xl font-bold text-foreground mb-2">
              {t("mario.title")}
            </h1>
            <p className="text-muted-foreground text-sm md:text-base max-w-2xl">
              {t("mario.description")}
            </p>
          </div>
        </section>

        {/* Game Section */}
        <section className="container mx-auto px-4 pb-12">
          {/* Start Screen */}
          <AnimatePresence>
            {!raceStarted && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex flex-col items-center justify-center py-12"
              >
                {/* Mario Kart Preview */}
                <div className="relative mb-8 w-full max-w-4xl">
                  <div className="relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
                    <Image
                      src={marioTrack}
                      alt="Mario Kart track preview"
                      priority
                      className="block h-auto w-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                    <motion.div
                      className="absolute left-[3%] top-[74%] w-24 -translate-y-1/2 drop-shadow-[0_6px_7px_rgba(0,0,0,0.45)] sm:w-32"
                      animate={{ x: [0, 8, 0], y: [0, -2, 0] }}
                      transition={{ duration: 1.2, repeat: Infinity }}
                    >
                      <Image
                        src={marioKartCharacter}
                        alt="Mario in his kart"
                        className="h-auto w-full"
                      />
                      <button
                        type="button"
                        aria-label="Mario Kart insight"
                        onClick={(event) => {
                          event.stopPropagation()
                          setShowEasterEgg(true)
                        }}
                        className="absolute inset-0 cursor-default opacity-0"
                      />
                    </motion.div>
                  </div>
                </div>
                
                <Button
                  size="lg"
                  onClick={startRace}
                  className="bg-mario-red hover:bg-mario-red/90 text-white text-lg px-8 py-6 rounded-full shadow-lg shadow-mario-red/30"
                >
                  <Play className="w-5 h-5 mr-2" />
                  {t("mario.startRace")}
                </Button>

                <div className="mt-6 flex flex-col items-center gap-2 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Keyboard className="w-4 h-4" />
                    <span className="text-sm">{t("mario.controls")}</span>
                  </div>
                  <div className="flex items-center gap-4 text-xs">
                    <span className="flex items-center gap-1"><ArrowRightIcon className="w-3 h-3" /> {language === "fr" ? "Avancer" : "Forward"}</span>
                    <span className="flex items-center gap-1"><ArrowLeft className="w-3 h-3" /> {language === "fr" ? "Reculer" : "Back"}</span>
                    <span>{language === "fr" ? "Clic droit: Accelerer | Clic gauche: Freiner" : "Right click: accelerate | Left click: brake"}</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Racing View */}
          {raceStarted && (
            <div className="relative">
              {/* Progress bar with checkpoints */}
              <div className="mb-4">
                <div className="flex justify-between text-sm text-muted-foreground mb-2">
                  <span>{language === "fr" ? "Depart" : "Start"}</span>
                  <span>{Math.round(progress)}%</span>
                  <span>{language === "fr" ? "Arrivee" : "Finish"}</span>
                </div>
                <div className="h-3 bg-muted rounded-full overflow-hidden relative">
                  <motion.div
                    className="h-full bg-gradient-to-r from-mario-red via-mario-yellow to-mario-green"
                    style={{ width: `${progress}%` }}
                  />
                  {/* Checkpoint markers */}
                  {CHECKPOINT_POSITIONS.map((pos, i) => (
                    <div
                      key={i}
                      className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 transition-colors ${
                        progress >= pos 
                          ? "bg-mario-green border-white" 
                          : "bg-muted border-muted-foreground"
                      }`}
                      style={{ left: `${pos}%`, transform: "translate(-50%, -50%)" }}
                    >
                      <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs whitespace-nowrap">
                        {i === 0 ? t("mario.checkpoint.context") : i === 1 ? t("mario.checkpoint.demo") : t("mario.checkpoint.presentation")}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Content Display */}
              <AnimatePresence mode="wait">
                {showContent && !raceComplete && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="mb-6"
                  >
                    {currentCheckpoint === 0 && <ContextContent t={t} onContinue={continueRace} />}
                    {currentCheckpoint === 1 && <DemoContent t={t} onContinue={continueRace} />}
                    {currentCheckpoint === 2 && <PresentationContent t={t} onContinue={continueRace} />}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Horizontal Racing Track */}
              {!showContent && !raceComplete && (
                <div
                  ref={trackRef}
                  onClick={handleTrackClick}
                  className="relative mt-8 overflow-hidden rounded-2xl border border-white/10 shadow-2xl cursor-pointer select-none"
                >
                  <Image
                    src={marioTrack}
                    alt="Mario Kart racing track"
                    priority
                    className="block h-auto w-full select-none"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
                  <div className="absolute left-[2%] top-[2%] rounded-full border border-white/10 bg-black/55 px-3 py-1 text-[10px] font-medium text-white/80 shadow-lg backdrop-blur-sm sm:text-xs">
                    <span>{language === "fr" ? "← Reculer" : "← Back"}</span>
                    <span className="mx-2 text-white/40">|</span>
                    <span>{language === "fr" ? "Avancer →" : "Forward →"}</span>
                  </div>

                  {/* Checkpoints on track */}
                  {CHECKPOINT_POSITIONS.map((pos, i) => (
                    <motion.div
                      key={i}
                      className="absolute top-[21%] hidden -translate-x-1/2 flex-col items-center md:flex"
                      style={{ left: `${pos}%` }}
                      animate={{ 
                        scale: progress >= pos - 5 && progress <= pos + 5 ? [1, 1.1, 1] : 1,
                      }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                    >
                      <div className={`rounded-full px-2 py-1 text-[10px] font-semibold shadow-lg ${
                        progress >= pos ? "bg-mario-green text-white" : "bg-black/45 text-white/80"
                      }`}>
                        {i === 0 ? t("mario.checkpoint.context") : i === 1 ? t("mario.checkpoint.demo") : t("mario.checkpoint.presentation")}
                      </div>
                    </motion.div>
                  ))}

                  {/* Mario Kart - moves horizontally */}
                  <motion.div
                    className="absolute"
                    style={{ 
                      left: `${Math.min(96, Math.max(4, progress))}%`,
                      top: `${Math.min(76, Math.max(66, kartY + 14))}%`,
                    }}
                    animate={{ 
                      y: [0, -2, 0],
                    }}
                    transition={{ 
                      y: { duration: 0.15, repeat: Infinity },
                    }}
                  >
                    <div className="relative w-16 -translate-x-1/2 -translate-y-1/2 sm:w-24">
                      <div className="absolute bottom-0 left-1/2 h-2 w-12 -translate-x-1/2 rounded-full bg-black/35 blur-sm sm:w-16" />
                      <Image
                        src={marioKartCharacter}
                        alt="Mario in his kart"
                        className="relative h-auto w-full drop-shadow-[0_6px_8px_rgba(0,0,0,0.45)]"
                      />
                    </div>
                  </motion.div>

                  {/* Control hints */}
                  <div className="hidden">
                    <span>← Reculer</span>
                    <span>|</span>
                    <span>Avancer →</span>
                  </div>
                </div>
              )}

              {/* Race Complete */}
              {raceComplete && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-mario-green/20 mb-6">
                    <Image 
                      src={assetPath("/images/mario-icon.png")} 
                      alt="Mario" 
                      width={48} 
                      height={48}
                      className="w-12 h-12 object-contain"
                    />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">{t("mario.raceComplete")}</h2>
                  <p className="text-muted-foreground mb-6">{t("mario.raceCompleteDesc")}</p>
                  <div className="flex flex-col gap-3 justify-center sm:flex-row">
                    <Button
                      onClick={restartRace}
                      variant="outline"
                      className="w-full sm:w-auto"
                    >
                      <RotateCcw className="w-4 h-4 mr-2" />
                      {t("mario.replay")}
                    </Button>
                    <Button asChild className="w-full bg-mario-red hover:bg-mario-red/90 text-white sm:w-auto">
                      <a href="https://github.com/aperichon-oss/Projet-Mario-Kart" target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4 mr-2" />
                        {t("mario.viewGithub")}
                      </a>
                    </Button>
                  </div>
                </motion.div>
              )}
            </div>
          )}
        </section>
      </main>

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
              className="relative max-w-md rounded-2xl border border-mario-red/30 bg-card p-5 pr-28 shadow-2xl"
              onClick={(event) => event.stopPropagation()}
            >
                <img
                  src={assetPath("/images/easter-eggs/personnage-easteregg.png")}
                  alt=""
                  aria-hidden="true"
                  className="pointer-events-none absolute bottom-full right-3 z-10 w-36 translate-y-[15px]"
                />
              <h3 className="mb-2 text-lg font-bold text-foreground">Easter egg - Mario Kart</h3>
              <div className="space-y-2 text-sm leading-relaxed text-muted-foreground">
                <p><strong>{language === "fr" ? "Stack/imports :" : "Stack/imports:"}</strong> {language === "fr" ? "j'utilise `next/image`, Framer Motion, lucide-react, puis les assets `marioTrack` et `marioKartCharacter`." : "I use `next/image`, Framer Motion, lucide-react, then the `marioTrack` and `marioKartCharacter` assets."}</p>
                <p><strong>{language === "fr" ? "États clés :" : "Key states:"}</strong> {language === "fr" ? "l'expérience est pilotée par `raceStarted`, `progress`, `currentCheckpoint`, `showContent`, `raceComplete` et `kartY`." : "the experience is driven by `raceStarted`, `progress`, `currentCheckpoint`, `showContent`, `raceComplete` and `kartY`."}</p>
                <p><strong>{language === "fr" ? "Interaction :" : "Interaction:"}</strong> {language === "fr" ? "`keydown` et `keyup` remplissent `keysPressed`, puis une boucle `requestAnimationFrame` fait avancer le kart et déclenche les checkpoints." : "`keydown` and `keyup` populate `keysPressed`, then a `requestAnimationFrame` loop moves the kart forward and triggers checkpoints."}</p>
                <p><strong>{language === "fr" ? "Astuce :" : "Main trick:"}</strong> {language === "fr" ? "le kart reste un élément `absolute` dont le `left` dépend de `progress`, avec une légère oscillation Motion pour simuler la course." : "the kart stays as an `absolute` element whose `left` depends on `progress`, with a subtle Motion bounce to simulate racing."}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <Footer />
    </div>
  )
}

// Content Components
function ContextContent({ t, onContinue }: { t: (key: string) => string; onContinue: () => void }) {
  return (
    <Card className="p-6 bg-card border-mario-red/30">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-mario-red/20 flex items-center justify-center">
          <span className="text-lg font-bold text-mario-red">1</span>
        </div>
        <h3 className="text-xl font-bold text-foreground">{t("mario.context.title")}</h3>
      </div>
      
      <p className="text-muted-foreground mb-4">{t("mario.context.description")}</p>
      
      <ul className="space-y-2 mb-6">
        <li className="flex items-start gap-2">
          <ChevronRight className="w-4 h-4 text-mario-red mt-1 flex-shrink-0" />
          <span className="text-foreground">{t("mario.context.detail1")}</span>
        </li>
        <li className="flex items-start gap-2">
          <ChevronRight className="w-4 h-4 text-mario-red mt-1 flex-shrink-0" />
          <span className="text-foreground">{t("mario.context.detail2")}</span>
        </li>
        <li className="flex items-start gap-2">
          <ChevronRight className="w-4 h-4 text-mario-red mt-1 flex-shrink-0" />
          <span className="text-foreground">{t("mario.context.detail3")}</span>
        </li>
      </ul>

      <div className="flex flex-wrap gap-2 mb-6">
        {["Python", "BeautifulSoup", "Requests"].map((tech) => (
          <Badge key={tech} variant="outline" className="border-mario-blue text-mario-blue">
            {tech}
          </Badge>
        ))}
      </div>
      
      <Button onClick={onContinue} className="bg-mario-red hover:bg-mario-red/90 text-white">
        {t("mario.continue")}
        <ChevronRight className="w-4 h-4 ml-2" />
      </Button>
    </Card>
  )
}

function DemoContent({ t, onContinue }: { t: (key: string) => string; onContinue: () => void }) {
  return (
    <Card className="p-6 bg-card border-mario-yellow/30">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-mario-yellow/20 flex items-center justify-center">
          <span className="text-lg font-bold text-mario-yellow">2</span>
        </div>
        <h3 className="text-xl font-bold text-foreground">{t("mario.demo.title")}</h3>
      </div>
      
      <p className="text-muted-foreground mb-4">{t("mario.demo.description")}</p>
      
      {/* Video */}
      <div className="relative aspect-video mb-4 rounded-lg overflow-hidden bg-black">
        <video 
          src={assetPath("/videos/mario-kart-demo.mp4")} 
          controls 
          className="w-full h-full object-contain"
          poster={assetPath("/images/mario-icon.png")}
        >
          Your browser does not support the video tag.
        </video>
      </div>

      <div className="flex items-center gap-2 p-3 bg-mario-green/10 rounded-lg mb-6">
        <FileSpreadsheet className="w-5 h-5 text-mario-green" />
        <span className="text-foreground">{t("mario.demo.csvOutput")}</span>
      </div>
      
      <Button onClick={onContinue} className="bg-mario-yellow hover:bg-mario-yellow/90 text-black">
        {t("mario.continue")}
        <ChevronRight className="w-4 h-4 ml-2" />
      </Button>
    </Card>
  )
}

function PresentationContent({ t, onContinue }: { t: (key: string) => string; onContinue: () => void }) {
  return (
    <Card className="p-6 bg-card border-mario-green/30">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-mario-green/20 flex items-center justify-center">
          <span className="text-lg font-bold text-mario-green">3</span>
        </div>
        <h3 className="text-xl font-bold text-foreground">{t("mario.presentation.title")}</h3>
      </div>
      
      <p className="text-muted-foreground mb-4">{t("mario.presentation.description")}</p>
      
      {/* Canva Embed */}
      <div className="relative aspect-video mb-6 rounded-lg overflow-hidden bg-muted">
        <iframe
          src="https://www.canva.com/design/DAG2bg_YYyc/fC8KOg4yLi4X-3XNwipbNg/view?embed"
          className="w-full h-full"
          allowFullScreen
        />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button onClick={onContinue} className="w-full bg-mario-green hover:bg-mario-green/90 text-white sm:w-auto">
          {t("mario.finish")}
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
        <Button asChild variant="outline" className="w-full sm:w-auto">
          <a 
            href="https://www.canva.com/design/DAG2bg_YYyc/fC8KOg4yLi4X-3XNwipbNg/view" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            {t("mario.presentation.view")}
          </a>
        </Button>
        <Button asChild variant="outline" className="w-full sm:w-auto">
          <a 
            href="https://github.com/aperichon-oss/Projet-Mario-Kart" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <Github className="w-4 h-4 mr-2" />
            {t("mario.viewGithub")}
          </a>
        </Button>
      </div>
    </Card>
  )
}
