"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { MarioIcon } from "@/components/icons"
import { useLanguage } from "@/lib/language-context"
import { 
  Flag, 
  Settings, 
  Trophy, 
  RotateCcw, 
  ExternalLink, 
  Github,
  Clock,
  Database,
  FileCode
} from "lucide-react"

export default function MarioKartPage() {
  const { t } = useLanguage()
  const [isRacing, setIsRacing] = useState(false)
  const [currentCheckpoint, setCurrentCheckpoint] = useState(0)
  const [kartPosition, setKartPosition] = useState(0)
  const [showPanel, setShowPanel] = useState(false)
  const [raceComplete, setRaceComplete] = useState(false)

  const checkpoints = [
    {
      id: 1,
      icon: <Flag className="w-6 h-6" />,
      title: t("mario.checkpoint.context"),
      position: 20,
      content: {
        title: t("mario.context.title"),
        description: t("mario.context.description"),
        details: [
          t("mario.context.detail1"),
          t("mario.context.detail2"),
          t("mario.context.detail3"),
        ],
      },
    },
    {
      id: 2,
      icon: <Settings className="w-6 h-6" />,
      title: t("mario.checkpoint.technologies"),
      position: 50,
      content: {
        title: t("mario.tech.title"),
        technologies: ["Python", "BeautifulSoup", "Pandas", "HTML/CSS"],
        files: ["extract_data.py", "get_track_page.py", "main.py"],
      },
    },
    {
      id: 3,
      icon: <Trophy className="w-6 h-6" />,
      title: t("mario.checkpoint.results"),
      position: 80,
      content: {
        title: t("mario.results.title"),
        stats: [
          { label: t("mario.results.execTime"), value: "2,27 min", icon: <Clock className="w-4 h-4" /> },
          { label: t("mario.results.dataExtracted"), value: t("mario.results.realtime"), icon: <Database className="w-4 h-4" /> },
        ],
        links: {
          canva: "#",
          github: "https://github.com/aperichon-oss/Projet-Mario-Kart",
        },
      },
    },
  ]

  const startRace = useCallback(() => {
    setIsRacing(true)
    setCurrentCheckpoint(0)
    setKartPosition(0)
    setShowPanel(false)
    setRaceComplete(false)
  }, [])

  const resetRace = useCallback(() => {
    setIsRacing(false)
    setCurrentCheckpoint(0)
    setKartPosition(0)
    setShowPanel(false)
    setRaceComplete(false)
  }, [])

  useEffect(() => {
    if (!isRacing || raceComplete) return

    const interval = setInterval(() => {
      setKartPosition((prev) => {
        const newPos = prev + 0.5

        // Check for checkpoints
        const nextCheckpoint = checkpoints[currentCheckpoint]
        if (nextCheckpoint && newPos >= nextCheckpoint.position && !showPanel) {
          setShowPanel(true)
          return prev // Pause at checkpoint
        }

        // Race complete
        if (newPos >= 100) {
          setRaceComplete(true)
          return 100
        }

        return newPos
      })
    }, 50)

    return () => clearInterval(interval)
  }, [isRacing, currentCheckpoint, showPanel, raceComplete, checkpoints])

  const continueRace = () => {
    setShowPanel(false)
    if (currentCheckpoint < checkpoints.length - 1) {
      setCurrentCheckpoint((prev) => prev + 1)
    }
  }

  const activeCheckpoint = checkpoints[currentCheckpoint]

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
            <Badge className="mb-4 bg-mario-red/20 text-[#E52521] border-mario-red/30">
              {t("mario.badge")}
            </Badge>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-foreground">
              {t("mario.title")}
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t("mario.description")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Race Track Section */}
      <section className="relative px-4 pb-12">
        <div className="max-w-6xl mx-auto">
          <Card className="relative overflow-hidden bg-card border-border p-8">
            {/* Track Background */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0" style={{
                backgroundImage: `
                  linear-gradient(90deg, transparent 49%, rgba(229, 37, 33, 0.3) 49%, rgba(229, 37, 33, 0.3) 51%, transparent 51%),
                  linear-gradient(0deg, transparent 49%, rgba(0, 153, 255, 0.3) 49%, rgba(0, 153, 255, 0.3) 51%, transparent 51%)
                `,
                backgroundSize: '40px 40px'
              }} />
            </div>

            {/* Track */}
            <div className="relative">
              {/* Track Line */}
              <div className="relative h-32 mb-8">
                {/* Base Track */}
                <div className="absolute top-1/2 left-0 right-0 h-3 -translate-y-1/2 bg-muted rounded-full overflow-hidden">
                  {/* Progress */}
                  <motion.div
                    className="h-full bg-gradient-to-r from-mario-red via-mario-blue to-mario-yellow"
                    style={{ width: `${kartPosition}%` }}
                  />
                </div>

                {/* Checkpoints */}
                {checkpoints.map((checkpoint, index) => (
                  <motion.div
                    key={checkpoint.id}
                    className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
                    style={{ left: `${checkpoint.position}%` }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.2 }}
                  >
                    <div className={`
                      w-12 h-12 rounded-full flex items-center justify-center
                      ${kartPosition >= checkpoint.position 
                        ? 'bg-mario-red text-white' 
                        : 'bg-muted text-muted-foreground'
                      }
                      transition-colors duration-300 border-2 border-background
                    `}>
                      {checkpoint.icon}
                    </div>
                    <span className="absolute top-14 left-1/2 -translate-x-1/2 text-xs text-muted-foreground whitespace-nowrap">
                      {checkpoint.title}
                    </span>
                  </motion.div>
                ))}

                {/* Finish Line */}
                <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2">
                  <div className={`
                    w-12 h-12 rounded-full flex items-center justify-center
                    ${raceComplete ? 'bg-mario-yellow' : 'bg-muted'}
                    transition-colors duration-300 border-2 border-background
                  `}>
                    <Flag className="w-6 h-6" />
                  </div>
                  <span className="absolute top-14 left-1/2 -translate-x-1/2 text-xs text-muted-foreground whitespace-nowrap">
                    {t("mario.finish")}
                  </span>
                </div>

                {/* Kart with Mario */}
                <motion.div
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-10"
                  style={{ left: `${kartPosition}%` }}
                  animate={{ 
                    rotate: showPanel ? 0 : [0, -3, 3, 0],
                  }}
                  transition={{ 
                    rotate: { duration: 0.5, repeat: Infinity }
                  }}
                >
                  <div className="relative">
                    {/* Mario Kart SVG */}
                    <svg viewBox="0 0 64 40" className="w-16 h-10">
                      {/* Kart Body */}
                      <rect x="8" y="20" width="48" height="10" rx="3" fill="#E52521" />
                      <rect x="12" y="18" width="40" height="4" rx="2" fill="#C41E1A" />
                      {/* Wheels */}
                      <circle cx="16" cy="30" r="6" fill="#333" />
                      <circle cx="48" cy="30" r="6" fill="#333" />
                      <circle cx="16" cy="30" r="3" fill="#666" />
                      <circle cx="48" cy="30" r="3" fill="#666" />
                      {/* Mario */}
                      {/* Cap */}
                      <ellipse cx="32" cy="8" rx="8" ry="4" fill="#E52521" />
                      <rect x="24" y="7" width="16" height="3" fill="#E52521" />
                      <ellipse cx="32" cy="10" rx="9" ry="2.5" fill="#E52521" />
                      {/* M on cap */}
                      <path d="M29 5 L30 7 L32 5 L34 7 L35 5 L35 6 L34 8 L30 8 L29 6 Z" fill="#FFFFFF" />
                      {/* Face */}
                      <ellipse cx="32" cy="14" rx="6" ry="5" fill="#FFD8B0" />
                      {/* Eyes */}
                      <ellipse cx="30" cy="13" rx="1.2" ry="1.5" fill="#FFFFFF" />
                      <ellipse cx="34" cy="13" rx="1.2" ry="1.5" fill="#FFFFFF" />
                      <circle cx="30" cy="13" r="0.7" fill="#2D1E0F" />
                      <circle cx="34" cy="13" r="0.7" fill="#2D1E0F" />
                      {/* Nose */}
                      <ellipse cx="32" cy="15" rx="2" ry="1.2" fill="#FFB0B0" />
                      {/* Mustache */}
                      <path d="M28 17 Q30 18 32 17 Q34 18 36 17 Q34 19 32 18 Q30 19 28 17" fill="#2D1E0F" />
                    </svg>
                    {/* Speed lines when moving */}
                    {isRacing && !showPanel && (
                      <motion.div
                        className="absolute right-full top-1/2 -translate-y-1/2"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 0.3, repeat: Infinity }}
                      >
                        <div className="flex gap-1">
                          <div className="w-4 h-0.5 bg-mario-blue rounded" />
                          <div className="w-3 h-0.5 bg-mario-blue/70 rounded" />
                          <div className="w-2 h-0.5 bg-mario-blue/40 rounded" />
                        </div>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              </div>

              {/* Controls */}
              <div className="flex justify-center gap-4 mb-8">
                {!isRacing && !raceComplete && (
                  <Button
                    onClick={startRace}
                    size="lg"
                    className="bg-mario-red hover:bg-mario-red/90 text-white"
                  >
                    {t("mario.startRace")}
                  </Button>
                )}
                {(isRacing || raceComplete) && (
                  <Button
                    onClick={resetRace}
                    variant="outline"
                    size="lg"
                    className="border-mario-blue text-mario-blue hover:bg-mario-blue/10"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    {t("mario.restart")}
                  </Button>
                )}
              </div>
            </div>

            {/* Information Panel */}
            <AnimatePresence mode="wait">
              {showPanel && activeCheckpoint && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="relative z-20"
                >
                  <Card className="p-6 bg-card/95 backdrop-blur border-mario-red/30">
                    {activeCheckpoint.id === 1 && (
                      <div className="space-y-4">
                        <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                          <Flag className="w-5 h-5 text-mario-red" />
                          {activeCheckpoint.content.title}
                        </h3>
                        <p className="text-muted-foreground">{activeCheckpoint.content.description}</p>
                        <ul className="space-y-2">
                          {activeCheckpoint.content.details?.map((detail, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                              <div className="w-1.5 h-1.5 rounded-full bg-mario-red mt-2" />
                              {detail}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {activeCheckpoint.id === 2 && (
                      <div className="space-y-4">
                        <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                          <Settings className="w-5 h-5 text-mario-blue" />
                          {activeCheckpoint.content.title}
                        </h3>
                        <div className="space-y-4">
                          <div>
                            <p className="text-sm text-muted-foreground mb-2">{t("mario.tech.used")}</p>
                            <div className="flex flex-wrap gap-2">
                              {activeCheckpoint.content.technologies?.map((tech) => (
                                <Badge key={tech} variant="secondary" className="bg-mario-blue/20 text-[#0099FF] border-mario-blue/30">
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground mb-2">{t("mario.tech.files")}</p>
                            <div className="flex flex-wrap gap-2">
                              {activeCheckpoint.content.files?.map((file) => (
                                <Badge key={file} variant="outline" className="font-mono text-xs">
                                  <FileCode className="w-3 h-3 mr-1" />
                                  {file}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeCheckpoint.id === 3 && (
                      <div className="space-y-4">
                        <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                          <Trophy className="w-5 h-5 text-mario-yellow" />
                          {activeCheckpoint.content.title}
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                          {activeCheckpoint.content.stats?.map((stat) => (
                            <div key={stat.label} className="p-4 rounded-lg bg-muted/50">
                              <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                                {stat.icon}
                                {stat.label}
                              </div>
                              <div className="text-xl font-bold text-foreground">{stat.value}</div>
                            </div>
                          ))}
                        </div>
                        <div className="flex flex-wrap gap-3 pt-2">
                          <Button asChild className="bg-mario-red hover:bg-mario-red/90 text-white">
                            <a href={activeCheckpoint.content.links?.github} target="_blank" rel="noopener noreferrer">
                              <Github className="w-4 h-4 mr-2" />
                              {t("mario.sourceCode")}
                            </a>
                          </Button>
                          <Button asChild variant="outline" className="border-mario-yellow text-mario-yellow hover:bg-mario-yellow/10">
                            <a href={activeCheckpoint.content.links?.canva} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="w-4 h-4 mr-2" />
                              {t("mario.viewResults")}
                            </a>
                          </Button>
                        </div>
                      </div>
                    )}

                    <div className="mt-6 flex justify-end">
                      <Button onClick={continueRace} className="bg-mario-blue hover:bg-mario-blue/90 text-white">
                        {t("mario.continue")}
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              )}

              {raceComplete && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="relative z-20"
                >
                  <Card className="p-8 bg-card/95 backdrop-blur border-mario-yellow/30 text-center">
                    <Trophy className="w-16 h-16 text-mario-yellow mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-foreground mb-2">{t("mario.raceComplete")}</h3>
                    <p className="text-muted-foreground mb-6">
                      {t("mario.raceCompleteDesc")}
                    </p>
                    <div className="flex justify-center gap-4">
                      <Button asChild className="bg-mario-red hover:bg-mario-red/90 text-white">
                        <a href="https://github.com/aperichon-oss/Projet-Mario-Kart" target="_blank" rel="noopener noreferrer">
                          <Github className="w-4 h-4 mr-2" />
                          {t("mario.viewGithub")}
                        </a>
                      </Button>
                      <Button onClick={resetRace} variant="outline">
                        <RotateCcw className="w-4 h-4 mr-2" />
                        {t("mario.replay")}
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  )
}
