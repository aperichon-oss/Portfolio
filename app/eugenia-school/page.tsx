"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { GraduationCap, ExternalLink, Github, DoorOpen, ChevronRight, ArrowDown } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/lib/language-context"
import { assetPath } from "@/lib/asset-path"

export default function EugeniaSchoolPage() {
  const { t, language } = useLanguage()
  const [currentStep, setCurrentStep] = useState(0)
  const [showEasterEgg, setShowEasterEgg] = useState(false)
  const sceneScrollRef = useRef<HTMLDivElement>(null)

  // Steps configuration - hotspot positions match the black dots in images
  const steps = [
    {
      id: "facade",
      image: assetPath("/images/eugenia/facade.png"),
      title: "Eugenia School",
      subtitle: language === "fr" ? "Ecole Superieure en Data & IA" : "Higher Education in Data & AI",
      isLanding: true,
    },
    {
      id: "entrance",
      image: assetPath("/images/eugenia/entrance.png"),
      title: language === "fr" ? "Hall d'Entree" : "Entrance Hall",
      // Black dots positions: one on left door, one on right door
      hotspots: [
        { x: 73, y: 33.5, nextStep: 2 }, // point noir du haut
        { x: 76, y: 80.5, nextStep: 4 }, // point noir du bas
      ],
      content: {
        title: language === "fr" ? "Refonte SEO/GEO - Eugenia School" : "SEO/GEO Redesign - Eugenia School",
        paragraphs: [
          language === "fr" ? "Creation d'un prototype de site vitrine moderne pour Eugenia School, une ecole positionnee sur l'IA, la data et le business. Le projet vise a structurer un parcours clair pour les futurs etudiants : decouvrir l'ecole, comparer les programmes Bachelor et MSc, comprendre les admissions, consulter les contenus editoriaux et passer a l'action via la candidature ou la demande de brochure." : "Creation of a modern showcase website prototype for Eugenia School, a school positioned around AI, data and business. The project structures a clear journey for future students: discover the school, compare Bachelor and MSc programs, understand admissions, read editorial content and take action through an application or brochure request.",
        ],
        highlights: [
          { label: "Role", value: "Front-end · SEO technique · Architecture de contenu" },
          { label: "Livrables", value: "Site multi-pages · composants UI · audit SEO/GEO" },
          { label: "Focus", value: "Visibilite · parcours etudiant · conversion" },
        ],
      }
    },
    {
      id: "amphi",
      image: assetPath("/images/eugenia/amphi.png"),
      title: language === "fr" ? "Amphitheatre" : "Amphitheater",
      // Black dot at top of stairs center
      hotspots: [
        { x: 51, y: 25, nextStep: 3 },
        { x: 79.8, y: 65.5, nextStep: 4 },
      ],
      content: {
        title: language === "fr" ? "Stack & architecture du site" : "Website stack & architecture",
        paragraphs: [
          language === "fr" ? "Developpement d'un site multi-pages avec une stack front-end moderne : React, Vite 7, TypeScript, Tailwind CSS, shadcn/ui, Wouter, TanStack Query et Framer Motion." : "Development of a multi-page website with a modern front-end stack: React, Vite 7, TypeScript, Tailwind CSS, shadcn/ui, Wouter, TanStack Query and Framer Motion.",
          language === "fr" ? "Le contenu est organise autour de quatre parcours : decouverte de l'ecole, presentation des formations, admissions/conversion et contenus SEO editoriaux." : "The content is organized around four journeys: school discovery, program presentation, admissions/conversion and editorial SEO content.",
        ],
        routes: [
          { label: "Decouverte", value: "Accueil · Ecole · ADN · Methode · Equipe · Campus" },
          { label: "Formations", value: "Bachelor · MSc · Alternance" },
          { label: "Conversion", value: "Admissions · Financement · Candidature · Brochure · Contact" },
          { label: "SEO", value: "Blog · Metiers · Glossaire · FAQ · Presse" },
        ],
      }
    },
    {
      id: "amphi2",
      image: assetPath("/images/eugenia/amphi-2.png"),
      title: language === "fr" ? "Etage Superieur" : "Upper Floor",
      // Black dots: one on left balcony, one on right area
      hotspots: [
        { x: 48, y: 72, nextStep: 4 }, // Left area on balcony
        { x: 77, y: 83, nextStep: 2 }, // Right side area
      ],
      content: {
        title: language === "fr" ? "Audit SEO/GEO & strategie de visibilite" : "SEO/GEO audit & visibility strategy",
        paragraphs: [
          language === "fr" ? "Audit du site actuel d'Eugenia School pour mesurer sa visibilite sur Google, Bing et les moteurs d'IA generative. L'analyse a croise 60 requetes sourcees, 5 personas, 7 clusters semantiques et une lecture concurrentielle du marche." : "Audit of Eugenia School's current website to measure visibility on Google, Bing and generative AI engines. The analysis combined 60 sourced queries, 5 personas, 7 semantic clusters and a competitive market review.",
          language === "fr" ? "Elle a mis en evidence un enjeu principal : les contenus ont du potentiel, mais l'infrastructure technique et l'identite numerique limitent leur comprehension par les moteurs et les LLMs." : "It highlighted one main challenge: the content has potential, but technical infrastructure and digital identity limit how well search engines and LLMs understand it.",
        ],
        metrics: language === "fr" ? ["SEO global 42/100", "GEO/IA 28/100", "Technique 55/100", "Contenu 68/100"] : ["Global SEO 42/100", "GEO/AI 28/100", "Technical 55/100", "Content 68/100"],
        blockers: "Page MSc inaccessible · blog non indexe · page professeurs bloquee · mentions legales hors site",
        strategy: "Corriger la dette technique · clarifier l'entite Eugenia School · structurer les contenus par intention · renforcer les signaux d'autorite",
        impact: "Faire d'Eugenia School une reponse plus lisible, fiable et identifiable sur les recherches liees a l'IA appliquee au business a Paris.",
      }
    },
    {
      id: "classroom",
      image: assetPath("/images/eugenia/classroom.png"),
      title: language === "fr" ? "Salle de Classe" : "Classroom",
      // Black dot in bottom right
      hotspots: [],
      content: {
        canvaUrl: "https://www.canva.com/design/DAHI4Gb4pT4/zmfxZ6LirB7IM8ETr4LpiA/view",
        github: "https://github.com/aperichon-oss/SEO-GEO_EugeniaSchool"
      },
      isFinal: true
    },
  ]

  const currentStepData = steps[currentStep]

  useEffect(() => {
    const scene = sceneScrollRef.current
    if (!scene) return

    const centerScene = () => {
      scene.scrollLeft = Math.max(0, (scene.scrollWidth - scene.clientWidth) / 2)
    }

    const frame = requestAnimationFrame(centerScene)
    window.addEventListener("resize", centerScene)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("resize", centerScene)
    }
  }, [currentStep])

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="relative">
        <AnimatePresence mode="wait">
          <motion.section
            key={currentStep}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="relative h-[calc(100vh-4rem)] overflow-y-auto overflow-x-hidden bg-black"
          >

            {/* Scene complète : image + hotspots + contenu */}
            <div
              ref={sceneScrollRef}
              className="h-[calc(100vh-4rem)] w-full overflow-x-auto overflow-y-hidden bg-black overscroll-x-contain [-webkit-overflow-scrolling:touch]"
            >
            <div className="relative mx-auto aspect-[16/9] h-full min-w-[900px] max-w-none overflow-hidden bg-black md:min-w-[calc((100vh-4rem)*16/9)]">
              <Image
                src={currentStepData.image}
                alt={currentStepData.title}
                fill
                className="object-cover"
                priority
              />

              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/50" />

              {/* Hotspots */}
              {currentStepData.hotspots?.map((hotspot, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentStep(hotspot.nextStep)}
                  className="absolute z-30 group cursor-pointer flex items-center"
                  style={{
                    left: `${hotspot.x}%`,
                    top: `${hotspot.y}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <span className="absolute inset-[-8px] rounded-full bg-[#FCBA35]/50 animate-ping" />
                  <span className="absolute inset-[-4px] rounded-full bg-[#FCBA35]/30 animate-pulse" />
                  <span className="relative flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-[#FCBA35] to-[#E5A52F] shadow-lg shadow-[#FCBA35]/50 border-2 border-white/70">
                    <ChevronRight className="w-4 h-4 text-[#8B2346]" />
                  </span>
                </motion.button>
              ))}

              {/* Content directly on image - no card backgrounds */}
              <div className="absolute inset-0 z-20 flex flex-col justify-between p-4 pointer-events-none">

                {/* Top - Title */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="pt-16 text-center"
                >
                  {currentStepData.isLanding && (
                    <Badge className="mb-4 bg-[#FCBA35] text-[#8B2346] border-none font-semibold shadow-lg">
                      <GraduationCap className="w-4 h-4 mr-1" />
                      {t("eugenia.badge")}
                    </Badge>
                  )}

                  <h1 className={`font-bold text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] ${currentStepData.isLanding ? 'text-4xl sm:text-6xl' : 'text-2xl sm:text-4xl'}`}>
                    {currentStepData.title}
                  </h1>

                  {currentStepData.subtitle && (
                    <p className="text-white/90 mt-2 text-lg sm:text-xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                      {currentStepData.subtitle}
                    </p>
                  )}
                </motion.div>

                {/* Center - Landing CTA */}
                {currentStepData.isLanding && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    className="flex-1 flex items-center justify-center"
                  >
                    <Button
                      size="lg"
                      className="pointer-events-auto bg-[#8B2346] hover:bg-[#6B1A36] text-white shadow-2xl text-lg px-10 py-7 rounded-full"
                      onClick={() => setCurrentStep(1)}
                    >
                      <DoorOpen className="w-6 h-6 mr-3" />
                      {language === "fr" ? "Entrer" : "Enter"}
                    </Button>
                  </motion.div>
                )}

                {/* Bottom - Content text */}
                {currentStepData.content && !currentStepData.isLanding && (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className={
                      currentStep === 1
                        ? "absolute left-[7%] top-[38%] hidden w-[min(58rem,60vw)] px-0 xl:block"
                        : currentStep === 2
                          ? "absolute left-[8%] top-[34%] hidden w-[min(52rem,58vw)] px-0 xl:block"
                          : currentStep === 3
                            ? "absolute left-1/2 top-[23%] hidden w-[min(78rem,83vw)] -translate-x-1/2 px-0 xl:block"
                            : currentStep === 4
                              ? "hidden px-2 pb-6 sm:pb-8 min-[1400px]:block"
                              : "hidden px-2 pb-6 sm:pb-8 xl:block"
                    }
                  >
                    {currentStep === 1 && currentStepData.content.highlights && (
                      <div className="max-w-[58rem] rounded-2xl border border-[#FCBA35]/25 bg-[linear-gradient(135deg,rgba(139,35,70,0.16),rgba(252,186,53,0.07)_55%,rgba(255,255,255,0.035))] p-5 text-left shadow-[0_18px_48px_rgba(20,6,12,0.22),inset_0_1px_0_rgba(255,255,255,0.16)] backdrop-blur-md ring-1 ring-white/10 sm:p-6">
                        <h2 className="text-2xl sm:text-3xl font-bold text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] mb-3">
                          {currentStepData.content.title}
                        </h2>
                        <div className="space-y-3">
                          {currentStepData.content.paragraphs.map((paragraph: string) => (
                            <p key={paragraph} className="text-sm leading-relaxed text-white/90 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] sm:text-base">
                              {paragraph}
                            </p>
                          ))}
                        </div>
                        <div className="mt-5 grid gap-3 sm:grid-cols-3">
                          {currentStepData.content.highlights.map((item: { label: string; value: string }, index: number) => (
                            <div key={item.label} className="rounded-xl border border-[#FCBA35]/25 bg-[linear-gradient(135deg,rgba(139,35,70,0.13),rgba(252,186,53,0.055))] p-3 shadow-[0_10px_24px_rgba(20,6,12,0.14),inset_0_1px_0_rgba(255,255,255,0.14)] backdrop-blur-sm">
                              <p className="text-xs font-semibold uppercase tracking-wide text-[#FCBA35]">
                                {language === "fr" ? item.label : ["Role", "Deliverables", "Focus"][index]}
                              </p>
                              <p className="mt-1 text-sm font-medium leading-snug text-white">
                                {language === "fr" ? item.value : ["Front-end · Technical SEO · Content architecture", "Multi-page website · UI components · SEO/GEO audit", "Visibility · student journey · conversion"][index]}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {currentStep === 2 && currentStepData.content.routes && (
                      <div className="rounded-2xl border border-[#FCBA35]/25 bg-[linear-gradient(135deg,rgba(139,35,70,0.16),rgba(252,186,53,0.07)_55%,rgba(255,255,255,0.035))] p-5 text-left shadow-[0_18px_48px_rgba(20,6,12,0.22),inset_0_1px_0_rgba(255,255,255,0.16)] backdrop-blur-md ring-1 ring-white/10 sm:p-6">
                        <h2 className="text-2xl sm:text-3xl font-bold text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] mb-3">
                          {currentStepData.content.title}
                        </h2>
                        <div className="grid gap-3">
                          <div className="space-y-3">
                            {currentStepData.content.paragraphs.map((paragraph: string) => (
                              <p key={paragraph} className="text-sm leading-relaxed text-white/90 sm:text-base">
                                {paragraph}
                              </p>
                            ))}
                          </div>
                          <div className="grid gap-2">
                            {currentStepData.content.routes.map((route: { label: string; value: string }, index: number) => (
                              <div key={route.label} className="rounded-xl border border-[#FCBA35]/22 bg-[linear-gradient(135deg,rgba(255,255,255,0.045),rgba(252,186,53,0.055),rgba(139,35,70,0.11))] p-3 shadow-[0_10px_24px_rgba(20,6,12,0.13),inset_0_1px_0_rgba(255,255,255,0.14)] backdrop-blur-sm">
                                <p className="text-xs font-semibold uppercase tracking-wide text-[#FCBA35]">
                                  {language === "fr" ? route.label : ["Discovery", "Programs", "Conversion", "SEO"][index]}
                                </p>
                                <p className="mt-1 text-sm leading-snug text-white/90">
                                  {language === "fr" ? route.value : ["Home · School · DNA · Method · Team · Campus", "Bachelor · MSc · Apprenticeship", "Admissions · Funding · Apply · Brochure · Contact", "Blog · Careers · Glossary · FAQ · Press"][index]}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {currentStep === 3 && currentStepData.content.metrics && (
                      <div className="rounded-2xl border border-[#FCBA35]/25 bg-[linear-gradient(135deg,rgba(139,35,70,0.16),rgba(252,186,53,0.07)_55%,rgba(255,255,255,0.035))] p-5 text-left shadow-[0_18px_48px_rgba(20,6,12,0.22),inset_0_1px_0_rgba(255,255,255,0.16)] backdrop-blur-md ring-1 ring-white/10 sm:p-6">
                        <h2 className="text-2xl sm:text-3xl font-bold text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] mb-3">
                          {currentStepData.content.title}
                        </h2>
                        <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
                          <div className="space-y-3">
                            {currentStepData.content.paragraphs.map((paragraph: string) => (
                              <p key={paragraph} className="text-sm leading-relaxed text-white/90 sm:text-base">
                                {paragraph}
                              </p>
                            ))}
                            <div className="rounded-xl border border-[#FCBA35]/25 bg-[linear-gradient(135deg,rgba(139,35,70,0.13),rgba(252,186,53,0.055))] p-3 shadow-[0_10px_24px_rgba(20,6,12,0.14),inset_0_1px_0_rgba(255,255,255,0.14)] backdrop-blur-sm">
                              <p className="text-xs font-semibold uppercase tracking-wide text-[#FCBA35]">{language === "fr" ? "Impact vise" : "Target impact"}</p>
                              <p className="mt-1 text-sm leading-snug text-white/90">
                                {language === "fr" ? currentStepData.content.impact : "Make Eugenia School a clearer, more reliable and identifiable answer for searches related to applied AI for business in Paris."}
                              </p>
                            </div>
                          </div>
                          <div className="space-y-3">
                            <div className="grid grid-cols-2 gap-2">
                              {currentStepData.content.metrics.map((metric: string) => (
                                <div key={metric} className="rounded-xl border border-[#FCBA35]/22 bg-[linear-gradient(135deg,rgba(255,255,255,0.045),rgba(252,186,53,0.055),rgba(139,35,70,0.11))] p-3 text-center shadow-[0_10px_24px_rgba(20,6,12,0.13),inset_0_1px_0_rgba(255,255,255,0.14)] backdrop-blur-sm">
                                  <p className="text-sm font-semibold text-white">{metric}</p>
                                </div>
                              ))}
                            </div>
                            <div className="rounded-xl border border-[#FCBA35]/20 bg-[linear-gradient(135deg,rgba(255,255,255,0.04),rgba(139,35,70,0.12))] p-3 shadow-[0_10px_24px_rgba(20,6,12,0.13),inset_0_1px_0_rgba(255,255,255,0.14)] backdrop-blur-sm">
                              <p className="text-xs font-semibold uppercase tracking-wide text-[#FCBA35]">{language === "fr" ? "Blocages identifies" : "Identified blockers"}</p>
                              <p className="mt-1 text-sm leading-snug text-white/90">
                                {language === "fr" ? currentStepData.content.blockers : "MSc page inaccessible · blog not indexed · professors page blocked · legal notices hosted off-site"}
                              </p>
                            </div>
                            <div className="rounded-xl border border-[#FCBA35]/20 bg-[linear-gradient(135deg,rgba(255,255,255,0.04),rgba(139,35,70,0.12))] p-3 shadow-[0_10px_24px_rgba(20,6,12,0.13),inset_0_1px_0_rgba(255,255,255,0.14)] backdrop-blur-sm">
                              <p className="text-xs font-semibold uppercase tracking-wide text-[#FCBA35]">{language === "fr" ? "Strategie" : "Strategy"}</p>
                              <p className="mt-1 text-sm leading-snug text-white/90">
                                {language === "fr" ? currentStepData.content.strategy : "Fix technical debt · clarify the Eugenia School entity · structure content by search intent · strengthen authority signals"}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {currentStep === 4 && currentStepData.content.canvaUrl && (
                      <div className="max-w-5xl mx-auto pointer-events-auto">
                        <h2 className="text-2xl sm:text-3xl font-bold text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] mb-4 text-center">
                          {language === "fr" ? "Presentation du Projet" : "Project Presentation"}
                        </h2>

                        <div className="relative mb-4 overflow-hidden rounded-xl border border-[#FCBA35]/30 shadow-[0_18px_50px_rgba(20,6,12,0.35)]">
                          <div className="aspect-[16/9] w-full bg-[#8B2346]/25 backdrop-blur-xl">
                            <iframe
                              src={`${currentStepData.content.canvaUrl}?embed`}
                              className="w-full h-full"
                              allowFullScreen
                            />
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-3 justify-center">
                          <Button asChild className="border border-[#FCBA35]/35 bg-[#FCBA35]/85 text-[#8B2346] shadow-[0_10px_30px_rgba(252,186,53,0.22)] hover:bg-[#FCBA35]">
                            <a href={currentStepData.content.canvaUrl} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="w-4 h-4 mr-2" />
                              Canva
                            </a>
                          </Button>
                          <Button asChild className="border border-[#FCBA35]/30 bg-[#8B2346]/85 text-white shadow-[0_10px_30px_rgba(139,35,70,0.30)] hover:bg-[#6B1A36]">
                            <a href={currentStepData.content.github} target="_blank" rel="noopener noreferrer">
                              <Github className="w-4 h-4 mr-2" />
                              GitHub
                            </a>
                          </Button>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </div>

              {/* Step indicator - right side */}
              {!currentStepData.isLanding && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="absolute top-1/2 right-4 -translate-y-1/2 flex flex-col gap-3 z-40"
                >
                  {steps.slice(1).map((step, index) => (
                    <button
                      key={step.id}
                      onClick={() => setCurrentStep(index + 1)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${currentStep === index + 1
                        ? "bg-[#FCBA35] scale-150 shadow-lg shadow-[#FCBA35]/60"
                        : currentStep > index + 1
                          ? "bg-[#8B2346]"
                          : "bg-white/60 hover:bg-white"
                        }`}
                      title={step.title}
                    />
                  ))}
                </motion.div>
              )}

              {/* Back button */}
              {currentStep > 0 && !currentStepData.isLanding && (
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="absolute top-20 left-4 z-40 rounded-full border border-[#FCBA35]/25 bg-[#8B2346]/18 px-4 py-2 text-sm font-medium text-white shadow-[0_10px_26px_rgba(20,6,12,0.18),inset_0_1px_0_rgba(255,255,255,0.16)] backdrop-blur-sm transition-colors hover:bg-[#8B2346]/28"
                  onClick={() => {
                    if (currentStep === 1) {
                      setShowEasterEgg(true)
                      return
                    }
                    setCurrentStep(Math.max(0, currentStep - 1))
                  }}
                >
                  {language === "fr" ? "Retour" : "Back"}
                </motion.button>
              )}

              {currentStepData.content && !currentStepData.isLanding && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: [0.35, 0.75, 0.35], y: [0, 8, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                  className={`absolute bottom-5 left-1/2 z-40 -translate-x-1/2 rounded-full border border-white/15 bg-black/20 p-2 text-white/80 backdrop-blur-sm ${currentStep === 4 ? "min-[1400px]:hidden" : "xl:hidden"}`}
                  aria-hidden="true"
                >
                  <ArrowDown className="h-5 w-5" />
                </motion.div>
              )}
            </div>
            </div>

            {currentStepData.content && !currentStepData.isLanding && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className={`mx-auto w-full max-w-3xl px-4 py-5 ${currentStep === 4 ? "min-[1400px]:hidden" : "xl:hidden"}`}
              >
                <div className="rounded-2xl border border-[#FCBA35]/35 bg-[linear-gradient(135deg,rgba(139,35,70,0.40),rgba(252,186,53,0.14)_55%,rgba(255,255,255,0.09))] p-4 text-left shadow-[0_22px_55px_rgba(20,6,12,0.30),inset_0_1px_0_rgba(255,255,255,0.22)] backdrop-blur-2xl ring-1 ring-white/15">
                  {"paragraphs" in currentStepData.content && (
                    <>
                      <h2 className="mb-3 text-xl font-bold text-white">{currentStepData.content.title}</h2>
                      <div className="space-y-3">
                        {currentStepData.content.paragraphs?.map((paragraph: string) => (
                          <p key={paragraph} className="text-sm leading-relaxed text-white/85">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </>
                  )}

                  {"highlights" in currentStepData.content && (
                    <div className="mt-4 grid gap-3 sm:grid-cols-3">
                      {currentStepData.content.highlights?.map((item: { label: string; value: string }, index: number) => (
                        <div key={item.label} className="rounded-xl border border-[#FCBA35]/35 bg-[linear-gradient(135deg,rgba(139,35,70,0.34),rgba(252,186,53,0.13))] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.18)] backdrop-blur-xl">
                          <p className="text-xs font-semibold uppercase tracking-wide text-[#FCBA35]">
                            {language === "fr" ? item.label : ["Role", "Deliverables", "Focus"][index]}
                          </p>
                          <p className="mt-1 text-sm font-medium leading-snug text-white">
                            {language === "fr" ? item.value : ["Front-end · Technical SEO · Content architecture", "Multi-page website · UI components · SEO/GEO audit", "Visibility · student journey · conversion"][index]}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {"routes" in currentStepData.content && (
                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      {currentStepData.content.routes?.map((route: { label: string; value: string }, index: number) => (
                        <div key={route.label} className="rounded-xl border border-[#FCBA35]/30 bg-[linear-gradient(135deg,rgba(255,255,255,0.12),rgba(252,186,53,0.11),rgba(139,35,70,0.18))] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.18)] backdrop-blur-xl">
                          <p className="text-xs font-semibold uppercase tracking-wide text-[#FCBA35]">
                            {language === "fr" ? route.label : ["Discovery", "Programs", "Conversion", "SEO"][index]}
                          </p>
                          <p className="mt-1 text-sm leading-snug text-white/85">
                            {language === "fr" ? route.value : ["Home · School · DNA · Method · Team · Campus", "Bachelor · MSc · Apprenticeship", "Admissions · Funding · Apply · Brochure · Contact", "Blog · Careers · Glossary · FAQ · Press"][index]}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {"metrics" in currentStepData.content && (
                    <div className="mt-4 space-y-3">
                      <div className="grid grid-cols-2 gap-2">
                        {currentStepData.content.metrics?.map((metric: string) => (
                          <div key={metric} className="rounded-xl border border-[#FCBA35]/30 bg-[linear-gradient(135deg,rgba(255,255,255,0.12),rgba(252,186,53,0.11),rgba(139,35,70,0.18))] p-3 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.18)] backdrop-blur-xl">
                            <p className="text-sm font-semibold text-white">{metric}</p>
                          </div>
                        ))}
                      </div>
                      <div className="rounded-xl border border-[#FCBA35]/35 bg-[linear-gradient(135deg,rgba(139,35,70,0.34),rgba(252,186,53,0.13))] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.18)] backdrop-blur-xl">
                        <p className="text-xs font-semibold uppercase tracking-wide text-[#FCBA35]">{language === "fr" ? "Impact vise" : "Target impact"}</p>
                        <p className="mt-1 text-sm leading-snug text-white/85">
                          {language === "fr" ? currentStepData.content.impact : "Make Eugenia School a clearer, more reliable and identifiable answer for searches related to applied AI for business in Paris."}
                        </p>
                      </div>
                    </div>
                  )}

                  {"canvaUrl" in currentStepData.content && (
                    <div className="pointer-events-auto space-y-4">
                      <h2 className="text-xl font-bold text-white">{language === "fr" ? "Presentation du Projet" : "Project Presentation"}</h2>
                      <div className="overflow-hidden rounded-xl border border-white/10 bg-black/50">
                        <iframe
                          src={`${currentStepData.content.canvaUrl}?embed`}
                          className="aspect-video w-full"
                          allowFullScreen
                        />
                      </div>
                      <div className="flex flex-wrap gap-3">
                        <Button asChild className="bg-white/90 text-[#8B2346] hover:bg-white">
                          <a href={currentStepData.content.canvaUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Canva
                          </a>
                        </Button>
                        <Button asChild className="bg-[#8B2346] hover:bg-[#6B1A36] text-white">
                          <a href={currentStepData.content.github} target="_blank" rel="noopener noreferrer">
                            <Github className="mr-2 h-4 w-4" />
                            GitHub
                          </a>
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </motion.section>
        </AnimatePresence>
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
              className="relative max-w-md rounded-2xl border border-[#FCBA35]/30 bg-[#1f1017]/95 p-5 pr-28 text-white shadow-2xl"
              onClick={(event) => event.stopPropagation()}
            >
                <img
                  src={assetPath("/images/easter-eggs/personnage-easteregg.png")}
                  alt=""
                  aria-hidden="true"
                  className="pointer-events-none absolute bottom-full right-3 z-10 w-36 translate-y-[15px]"
                />
              <h3 className="mb-2 text-lg font-bold">Easter egg - Eugenia School</h3>
              <div className="space-y-2 text-sm leading-relaxed text-white/80">
                <p><strong>{language === "fr" ? "Stack/imports :" : "Stack/imports:"}</strong> {language === "fr" ? "j'ai utilise `next/image`, Framer Motion, lucide-react, `Button`, `Badge` et Tailwind pour composer les scenes." : "I used `next/image`, Framer Motion, lucide-react, `Button`, `Badge` and Tailwind to compose the scenes."}</p>
                <p><strong>{language === "fr" ? "Etats cles :" : "Key states:"}</strong> {language === "fr" ? "`currentStep` choisit la scene active; le tableau `steps` regroupe `image`, `title`, `content` et `hotspots`." : "`currentStep` selects the active scene; the `steps` array groups `image`, `title`, `content` and `hotspots`."}</p>
                <p><strong>{language === "fr" ? "Interaction :" : "Interaction:"}</strong> {language === "fr" ? "chaque hotspot garde ses coordonnees `x/y` en pourcentage et declenche `setCurrentStep(hotspot.nextStep)` au clic." : "each hotspot keeps its percentage-based `x/y` coordinates and triggers `setCurrentStep(hotspot.nextStep)` on click."}</p>
                <p><strong>{language === "fr" ? "Astuce :" : "Main trick:"}</strong> {language === "fr" ? "l'image et les hotspots partagent le meme conteneur `relative` en 16/9, ce qui conserve l'alignement pendant le resize et le scroll horizontal mobile." : "the image and hotspots share the same 16/9 `relative` container, which preserves alignment during resize and mobile horizontal scrolling."}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {currentStepData.isFinal && <Footer />}
    </div>
  )
}
