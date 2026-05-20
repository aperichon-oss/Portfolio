"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { BarChart3, Bot, Database, LineChart, Leaf, AlertTriangle, Cpu, Layout, Server, X, MapPin, Radar, ExternalLink } from "lucide-react"
import { ComposableMap, Geographies, Geography, Marker, Line } from "react-simple-maps"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/lib/language-context"

// Map points for each step - positioned on real coordinates
const mapSteps = [
  { 
    id: 1, 
    coordinates: [2.3522, 48.8566] as [number, number], // Paris, France
    city: "Paris",
    labelPosition: "top" as const
  },
  { 
    id: 2, 
    coordinates: [55.2708, 25.2048] as [number, number], // Dubai, UAE
    city: "Dubai",
    labelPosition: "bottom" as const
  },
  { 
    id: 3, 
    coordinates: [139.6917, 35.6895] as [number, number], // Tokyo, Japan
    city: "Tokyo",
    labelPosition: "top" as const
  },
  { 
    id: 4, 
    coordinates: [151.2093, -33.8688] as [number, number], // Sydney, Australia
    city: "Sydney",
    labelPosition: "bottom" as const
  },
  { 
    id: 5, 
    coordinates: [-74.006, 40.7128] as [number, number], // New York, USA
    city: "New York",
    labelPosition: "bottom" as const
  },
  { 
    id: 6, 
    coordinates: [-43.1729, -22.9068] as [number, number], // Rio de Janeiro, Brazil
    city: "Rio",
    labelPosition: "top" as const
  },
]

const hackathonPhotos = {
  briefing: "/images/supply-brain/briefing-problematique.jpg",
  finalDemo: "/images/supply-brain/final-demo.jpg",
}

export default function SupplyBrainPage() {
  const { t, language } = useLanguage()
  const [selectedStep, setSelectedStep] = useState<number | null>(null)
  const [started, setStarted] = useState(false)
  const [showEasterEgg, setShowEasterEgg] = useState(false)

  const agents = [
    {
      id: "monitoring",
      icon: LineChart,
      color: "#3B82F6",
      name: "Monitoring Agent",
      desc: "Surveille en temps reel les ventes, le stock et les commandes pour detecter les anomalies : pics de ventes, ventes simultanees, risques d'oversell, backlog et retards operationnels.",
    },
    {
      id: "supply",
      icon: BarChart3,
      color: "#10B981",
      name: "Supply Allocation Agent",
      desc: "Gere la visibilite du stock sur les marketplaces et recommande quels canaux garder ouverts, limiter ou suspendre selon le stock, la vitesse de vente et la priorite marketplace.",
    },
    {
      id: "pricing",
      icon: Database,
      color: "#F59E0B",
      name: "Pricing Adjustment Agent",
      desc: "Recommande des ajustements de prix selon le stock, la demande et la vitesse de vente, sans jamais utiliser de marge.",
    },
    {
      id: "eco-flow",
      icon: Leaf,
      color: "#22C55E",
      name: "Eco Flow Analyst",
      desc: "Analyse les emissions CO2 liees a la logistique, aux retours et aux flux transfrontaliers, puis propose des optimisations durables.",
    },
    {
      id: "predictive",
      icon: AlertTriangle,
      color: "#EF4444",
      name: "AI Predictive Agent",
      desc: "Calcule les KPIs predictifs supply chain : rupture, stock de securite, demande future, SKUs dormants, couts de stockage, CO2 futur et revenus previsionnels.",
    },
    {
      id: "orchestrator",
      icon: Cpu,
      color: "#8B5CF6",
      name: "Orchestrator",
      desc: "Coordonne les agents, choisit lesquels appeler, compare les reponses et renvoie une recommandation finale claire avec action UI si necessaire.",
    },
    {
      id: "demand-forecast",
      icon: LineChart,
      color: "#06B6D4",
      name: "Demand Forecast",
      desc: "Analyse la demande et les stocks pour optimiser les ventes, les retours, les flux locaux ou transfrontaliers, le score durable et les recommandations ecologiques.",
    },
    {
      id: "logistic-carbon",
      icon: Leaf,
      color: "#14B8A6",
      name: "Logistic Carbon Agent",
      desc: "Calcule l'empreinte carbone logistique : CO2 par commande, France vs international, impact des retours, routes et SKUs a forte emission.",
    },
    {
      id: "geo-supply",
      icon: Radar,
      color: "#A855F7",
      name: "GeoSupplyWatch",
      desc: "Surveille les risques externes qui peuvent impacter la supply chain : greves, jours feries, transport et tensions geopolitique, puis les transforme en alertes.",
    },
    {
      id: "carbon-tracker",
      icon: Server,
      color: "#84CC16",
      name: "Carbon Footprint Tracker",
      desc: "Agent batch declenche par n8n pour calculer et enregistrer le CO2 de chaque commande : distance, poids, facteur d'emission, score RSE et persistance en base.",
    },
  ]

  const frontendStack = ["React 19", "Vite 6", "Recharts", "Leaflet", "i18next"]
  const backendStack = ["Supabase", "Dust.tt", "OpenAI GPT-4o", "n8n"]
  const intelligenceStack = ["Agents autonomes", "NL2SQL", "Alertes temps reel", "Workflows batch", "Cartographie risque", "Score CO2"]
  const presentationUrl = "/supply-brain-presentation.html"

  const stepContents = [
    {
      title: language === "fr" ? "Presentation du projet" : "Project Brief",
      subtitle: language === "fr" ? "Brief Hackathon Mirakl" : "Mirakl Hackathon Brief",
    },
    {
      title: language === "fr" ? "La solution Supply Brain" : "Supply Brain Solution",
      subtitle: language === "fr" ? "Dashboard d'intelligence supply chain" : "Supply-chain intelligence dashboard",
      description: "Nous avons conçu Nordika Pulse, une extension intelligente de Mirakl Connect pensée comme un véritable Supply Brain pour les vendeurs. L’objectif est de dépasser le simple dashboard en proposant une interface dynamique, capable de s’adapter au métier, au contexte et aux priorités de chaque utilisateur.",
      details: [
        {
          title: "Centraliser les données",
          text: "Nordika Pulse centralise les données de stocks, ventes, commandes, supply chain et impact carbone afin d’offrir une vision fiable et temps réel de l’activité.",
        },
        {
          title: "Analyser avec les agents IA",
          text: "Une architecture multi-agents basée sur Dust.tt analyse ces données pour détecter les anomalies, suivre les risques opérationnels et recommander les meilleures actions.",
        },
        {
          title: "Anticiper les risques",
          text: "Les agents prédictifs anticipent les ruptures, prévoient la demande future, identifient les SKUs dormants et aident à optimiser le réapprovisionnement.",
        },
        {
          title: "Optimiser durablement",
          text: "La solution calcule les émissions CO2 liées aux commandes, aux retours et aux flux logistiques afin d’intégrer l’impact environnemental dans la décision.",
        },
        {
          title: "Agir concrètement",
          text: "Grâce au NL2SQL, aux visualisations Recharts et à la cartographie Leaflet, les utilisateurs interrogent leurs données simplement et transforment l’analyse en décisions concrètes. L’objectif est d’aider les vendeurs à ne plus seulement réagir, mais à anticiper, arbitrer et agir plus tôt.",
        },
      ],
    },
    {
      title: language === "fr" ? "Agents autonomes" : "Autonomous Agents",
      subtitle: language === "fr" ? "Architecture multi-agents Dust.tt" : "Dust.tt multi-agent architecture",
      agents: agents,
    },
    {
      title: t("supply.stack.title"),
      subtitle: t("supply.section.stack"),
      frontend: frontendStack,
      backend: backendStack,
      intelligence: intelligenceStack,
    },
    {
      title: language === "fr" ? "Prototype presente" : "Presented Prototype",
      subtitle: language === "fr" ? "Experience dashboard et decision" : "Dashboard and decision experience",
      presentation: presentationUrl,
    },
    {
      title: language === "fr" ? "Pitch final" : "Final Pitch",
      subtitle: language === "fr" ? "Restitution devant le jury" : "Jury Presentation",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <AnimatePresence mode="wait">
        {!started ? (
          <motion.section
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative min-h-[90vh] flex items-center justify-center pt-16 overflow-hidden"
          >
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-background to-emerald-500/10" />
            
            {/* Animated dots */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full bg-blue-500/30"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -30, 0],
                    opacity: [0.3, 0.7, 0.3],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </div>

            <div className="relative z-10 text-center px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Badge className="mb-4 bg-blue-500/10 text-blue-500 border-blue-500/20">
                  <Bot className="w-4 h-4 mr-1" />
                  {t("supply.badge")}
                </Badge>

                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-4">
                  {t("supply.title")}
                </h1>

                <p className="text-xl text-blue-500 font-medium mb-4">
                  {t("supply.subtitle")}
                </p>

                <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
                  {t("supply.description")}
                </p>

                <Button 
                  size="lg" 
                  className="bg-blue-500 hover:bg-blue-600"
                  onClick={() => setStarted(true)}
                >
                  <MapPin className="w-5 h-5 mr-2" />
                  {language === "fr" ? "Explorer la carte" : "Explore the map"}
                </Button>
              </motion.div>
            </div>
          </motion.section>
        ) : (
          <motion.section
            key="map"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="pt-20 pb-12 px-4"
          >
            <div className="max-w-6xl mx-auto">
              {/* Title */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-8"
              >
                <h1 className="text-3xl font-bold text-foreground mb-2">{t("supply.title")}</h1>
                <p className="text-muted-foreground">
                  {language === "fr" 
                    ? "Cliquez sur les points pour decouvrir chaque etape du projet" 
                    : "Click on points to discover each project step"}
                </p>
              </motion.div>

              {/* World Map */}
              <Card className="relative overflow-hidden rounded-xl border-cyan-500/20 bg-[radial-gradient(circle_at_50%_15%,rgba(14,165,233,0.18),rgba(15,23,42,0.96)_48%,rgba(2,6,23,1))] shadow-[0_0_50px_rgba(6,182,212,0.12)]">
                <div className="pointer-events-none absolute inset-0 opacity-45 [background-image:linear-gradient(rgba(34,211,238,0.09)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.09)_1px,transparent_1px)] [background-size:38px_38px]" />
                <div className="pointer-events-none absolute left-0 right-0 top-1/2 h-px bg-cyan-300/20" />
                <div className="relative aspect-[2/1] min-h-[360px]">
                  <ComposableMap
                    projection="geoMercator"
                    projectionConfig={{ scale: 125, center: [20, 28] }}
                    style={{ width: "100%", height: "100%" }}
                  >
                    <defs>
                      <linearGradient id="techMapLand" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#0f766e" />
                        <stop offset="55%" stopColor="#155e75" />
                        <stop offset="100%" stopColor="#1e3a8a" />
                      </linearGradient>
                      <linearGradient id="techRoute" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#22D3EE" />
                        <stop offset="50%" stopColor="#34D399" />
                        <stop offset="100%" stopColor="#A78BFA" />
                      </linearGradient>
                      <filter id="mapGlow">
                        <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                        <feMerge>
                          <feMergeNode in="coloredBlur" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                    </defs>

                    <Geographies geography={geoUrl}>
                      {({ geographies }: { geographies: any[] }) =>
                        geographies.map((geo: any) => {
                          const geographyName = String(
                            geo.properties?.name ||
                            geo.properties?.NAME ||
                            geo.properties?.NAME_LONG ||
                            ""
                          )
                          const isAntarctica = geographyName.toLowerCase().includes("antarctica")

                          return (
                            <Geography
                              key={geo.rsmKey}
                              geography={geo}
                              fill="url(#techMapLand)"
                              stroke="#67e8f9"
                              strokeOpacity={0.22}
                              strokeWidth={0.45}
                              onClick={isAntarctica ? () => setShowEasterEgg(true) : undefined}
                              style={{
                                default: { outline: "none", cursor: isAntarctica ? "pointer" : "default" },
                                hover: { fill: "#0891b2", outline: "none", cursor: isAntarctica ? "pointer" : "default" },
                                pressed: { outline: "none" },
                              }}
                            />
                          )
                        })
                      }
                    </Geographies>

                    {mapSteps.slice(0, -1).map((step, index) => (
                      <Line
                        key={`line-${index}`}
                        from={step.coordinates}
                        to={mapSteps[index + 1].coordinates}
                        stroke="url(#techRoute)"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeDasharray="5,4"
                        filter="url(#mapGlow)"
                      />
                    ))}

                    {mapSteps.map((step, index) => (
                      <Marker key={step.id} coordinates={step.coordinates}>
                        <g onClick={() => setSelectedStep(step.id)} style={{ cursor: "pointer" }}>
                          <motion.circle
                            r={14}
                            fill="transparent"
                            stroke={selectedStep === step.id ? "#34D399" : "#22D3EE"}
                            strokeWidth={2}
                            animate={{ r: [9, 18, 9], opacity: [0.9, 0, 0.9] }}
                            transition={{ duration: 2.2, repeat: Infinity, delay: index * 0.25 }}
                          />
                          <motion.circle
                            r={8}
                            fill={selectedStep === step.id ? "#10B981" : "#0EA5E9"}
                            stroke="#E0F2FE"
                            strokeWidth={2}
                            filter="url(#mapGlow)"
                            whileHover={{ scale: 1.25 }}
                          />
                          <text textAnchor="middle" y={4} style={{ fontSize: 10, fontWeight: 800, fill: "#fff", pointerEvents: "none" }}>
                            {step.id}
                          </text>
                        </g>
                        <g transform={`translate(0, ${step.labelPosition === "top" ? -24 : 24})`}>
                          <rect x={-34} y={-10} width={68} height={20} rx={5} fill="rgba(2, 6, 23, 0.78)" stroke="rgba(34, 211, 238, 0.45)" />
                          <text textAnchor="middle" y={4} style={{ fontSize: 9, fontWeight: 600, fill: "#BAE6FD" }}>
                            {step.city}
                          </text>
                        </g>
                      </Marker>
                    ))}
                  </ComposableMap>
                </div>

                <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full border border-cyan-300/20 bg-slate-950/70 px-3 py-2 text-xs text-cyan-100 backdrop-blur">
                  <Radar className="h-4 w-4 text-cyan-300" />
                  {language === "fr" ? "Carte reseau supply chain" : "Supply-chain network map"}
                </div>

                <div className="absolute bottom-4 right-4 hidden max-w-[48%] flex-wrap justify-end gap-2 text-xs md:flex">
                  {mapSteps.map((step) => (
                    <button
                      key={step.id}
                      type="button"
                      onClick={() => setSelectedStep(step.id)}
                      className={`rounded border px-2 py-1 backdrop-blur transition ${
                        selectedStep === step.id
                          ? "border-emerald-300/60 bg-emerald-400/15 text-emerald-200"
                          : "border-cyan-300/20 bg-slate-950/60 text-slate-300 hover:border-cyan-300/60"
                      }`}
                    >
                      {step.id}. {step.city}
                    </button>
                  ))}
                </div>
              </Card>

              {/* Step Detail Modal */}
              <AnimatePresence>
                {selectedStep !== null && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
                    onClick={() => setSelectedStep(null)}
                  >
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.9, opacity: 0 }}
                      className={`bg-card border border-border rounded-xl p-6 w-full max-h-[80vh] overflow-y-auto ${
                        selectedStep === 3 || selectedStep === 6 ? "max-w-5xl" : selectedStep === 1 || selectedStep === 2 || selectedStep === 5 ? "max-w-4xl" : "max-w-2xl"
                      }`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {/* Header */}
                      <div className="flex items-start justify-between mb-6">
                        <div>
                          <Badge className="mb-2 bg-blue-500/10 text-blue-500">
                            {language === "fr" ? `Etape ${selectedStep}` : `Step ${selectedStep}`} - {mapSteps[selectedStep - 1].city}
                          </Badge>
                          <h3 className="text-2xl font-bold text-foreground">
                            {stepContents[selectedStep - 1].title}
                          </h3>
                          <p className="text-muted-foreground">
                            {stepContents[selectedStep - 1].subtitle}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setSelectedStep(null)}
                        >
                          <X className="w-5 h-5" />
                        </Button>
                      </div>

                      {/* Content based on step */}
                      {selectedStep === 1 && (
                        <div className="grid gap-5 md:grid-cols-[1.05fr_0.95fr] md:items-start">
                          <div className="space-y-4">
                            <Badge variant="outline" className="border-blue-500/30 text-blue-500">
                              {language === "fr" ? "Hackathon Mirakl" : "Mirakl Hackathon"}
                            </Badge>
                            <div className="space-y-3 rounded-lg border border-blue-500/15 bg-blue-500/5 p-4">
                              <p className="text-sm font-semibold text-foreground">
                                {language === "fr" ? "Imaginer des agents autonomes pour aider les vendeurs Mirakl a deleguer leurs operations." : "Imagine autonomous agents that help Mirakl sellers delegate their operations."}
                              </p>
                              <p className="text-sm leading-relaxed text-muted-foreground">
                                {language === "fr" ? "Ce projet est né lors d’un hackathon organisé avec Mirakl. La problématique attribuée consistait à concevoir un système d’agents autonomes permettant aux clients de Mirakl, en particulier aux auto-entrepreneurs, de déléguer une partie de leurs activités opérationnelles." : "This project was born during a hackathon organized with Mirakl. The assigned challenge was to design a system of autonomous agents allowing Mirakl customers, especially self-employed sellers, to delegate part of their operational activities."}
                              </p>
                              <p className="text-sm leading-relaxed text-muted-foreground">
                                {language === "fr" ? "Nous avons concentré notre approche sur la supply chain et la gestion des stocks, deux enjeux clés pour des vendeurs qui doivent piloter leur activité avec des ressources limitées." : "We focused our approach on supply chain and inventory management, two key issues for sellers who must run their business with limited resources."}
                              </p>
                            </div>
                            <div className="grid gap-3 sm:grid-cols-2">
                              <div className="rounded-lg bg-muted/45 p-3">
                                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-blue-500">{language === "fr" ? "Objectif" : "Goal"}</p>
                                <p className="text-sm leading-relaxed text-muted-foreground">
                                  {language === "fr" ? "Réduire la charge opérationnelle, améliorer le suivi des stocks et faciliter la prise de décision." : "Reduce operational workload, improve inventory tracking and make decision-making easier."}
                                </p>
                              </div>
                              <div className="rounded-lg bg-muted/45 p-3">
                                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-emerald-500">{language === "fr" ? "Approche" : "Approach"}</p>
                                <p className="text-sm leading-relaxed text-muted-foreground">
                                  {language === "fr" ? "Comprendre le besoin métier avant de construire une IA utile, lisible et démontrable devant le jury." : "Understand the business need before building an AI solution that is useful, readable and demonstrable to the jury."}
                                </p>
                              </div>
                            </div>
                          </div>
                          <figure className="overflow-hidden rounded-lg border border-border bg-muted/30">
                            <Image
                              src={hackathonPhotos.briefing}
                              alt={language === "fr" ? "Presentation de la problematique du Hackathon Mirakl" : "Mirakl Hackathon challenge briefing"}
                              width={2048}
                              height={1152}
                              className="aspect-[16/10] w-full object-cover"
                            />
                          </figure>
                        </div>
                      )}

                      {selectedStep === 2 && (
                        <div className="space-y-5">
                          <div className="rounded-lg border border-emerald-500/15 bg-emerald-500/5 p-4">
                            <Badge variant="outline" className="mb-3 border-emerald-500/30 text-emerald-500">
                              Nordika Pulse
                            </Badge>
                            <p className="text-sm leading-relaxed text-muted-foreground">
                              {language === "fr" ? stepContents[1].description : "We designed Nordika Pulse, an intelligent extension of Mirakl Connect imagined as a true Supply Brain for sellers. The goal is to go beyond a simple dashboard by providing a dynamic interface that adapts to each user's business context and priorities."}
                            </p>
                          </div>
                          <div className="grid gap-3 md:grid-cols-2">
                            {stepContents[1].details?.map((detail, i) => (
                              <div
                                key={detail.title}
                                className={`flex items-start gap-3 rounded-lg bg-muted/40 p-4 ${
                                  i === 4 ? "md:col-span-2" : ""
                                }`}
                              >
                                <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                  <span className="text-xs text-emerald-500 font-bold">{i + 1}</span>
                                </div>
                                <div>
                                  <h4 className="mb-1 text-sm font-semibold text-foreground">
                                    {language === "fr" ? detail.title : ["Centralize data", "Analyze with AI agents", "Anticipate risks", "Optimize sustainably", "Take concrete action"][i]}
                                  </h4>
                                  <p className="text-sm leading-relaxed text-muted-foreground">
                                    {language === "fr" ? detail.text : [
                                      "Nordika Pulse centralizes inventory, sales, orders, supply chain and carbon impact data to provide a reliable real-time view of activity.",
                                      "A Dust.tt-based multi-agent architecture analyzes this data to detect anomalies, monitor operational risks and recommend the best actions.",
                                      "Predictive agents anticipate stockouts, forecast future demand, identify dormant SKUs and help optimize replenishment.",
                                      "The solution calculates CO2 emissions from orders, returns and logistics flows so environmental impact can be included in decisions.",
                                      "With NL2SQL, Recharts visualizations and Leaflet mapping, users can query their data simply and turn analysis into concrete decisions.",
                                    ][i]}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {selectedStep === 3 && (
                        <div className="grid gap-3 sm:grid-cols-2">
                          {stepContents[2].agents?.map((agent, index) => {
                            const Icon = agent.icon
                            return (
                              <div key={agent.id} className="p-4 bg-muted/50 rounded-lg">
                                <div 
                                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-2"
                                  style={{ backgroundColor: `${agent.color}20` }}
                                >
                                  <Icon className="w-5 h-5" style={{ color: agent.color }} />
                                </div>
                                <h4 className="font-semibold text-foreground text-sm">{agent.name}</h4>
                                <p className="text-xs leading-relaxed text-muted-foreground">
                                  {language === "fr" ? agent.desc : [
                                    "Monitors sales, stock and orders in real time to detect anomalies, sales spikes, oversell risks, backlog and operational delays.",
                                    "Manages stock visibility across marketplaces and recommends which channels to keep open, limit or suspend based on stock and sales velocity.",
                                    "Recommends price adjustments according to stock, demand and sales velocity, without using margin data.",
                                    "Analyzes CO2 emissions linked to logistics, returns and cross-border flows, then suggests sustainable optimizations.",
                                    "Computes predictive supply chain KPIs: stockout risk, safety stock, future demand, dormant SKUs, storage costs, future CO2 and revenue forecasts.",
                                    "Coordinates specialized agents, selects which ones to call, compares responses and returns a clear recommendation with UI action when needed.",
                                    "Analyzes demand and inventory to optimize sales, returns, local and cross-border flows, sustainability score and ecological recommendations.",
                                    "Calculates logistics carbon footprint: CO2 per order, France vs international, return impact, high-emission routes and SKUs.",
                                    "Monitors external risks that can affect the supply chain: strikes, holidays, transport issues and geopolitical tensions, turning them into alerts.",
                                    "Batch agent triggered by n8n to calculate and store CO2 per order: distance, weight, emission factor, CSR score and database persistence.",
                                  ][index]}
                                </p>
                              </div>
                            )
                          })}
                        </div>
                      )}

                      {selectedStep === 4 && (
                        <div className="grid md:grid-cols-3 gap-4">
                          <div className="p-4 bg-muted/50 rounded-lg">
                            <div className="flex items-center gap-2 mb-3">
                              <Layout className="w-4 h-4 text-blue-500" />
                              <h4 className="font-semibold text-foreground text-sm">{t("supply.stack.frontend")}</h4>
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {stepContents[3].frontend?.map((item) => (
                                <Badge key={item} variant="secondary" className="text-xs bg-blue-500/10">
                                  {item}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div className="p-4 bg-muted/50 rounded-lg">
                            <div className="flex items-center gap-2 mb-3">
                              <Server className="w-4 h-4 text-emerald-500" />
                              <h4 className="font-semibold text-foreground text-sm">{t("supply.stack.backend")}</h4>
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {stepContents[3].backend?.map((item) => (
                                <Badge key={item} variant="secondary" className="text-xs bg-emerald-500/10">
                                  {item}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div className="p-4 bg-muted/50 rounded-lg">
                            <div className="flex items-center gap-2 mb-3">
                              <Cpu className="w-4 h-4 text-violet-500" />
                              <h4 className="font-semibold text-foreground text-sm">
                                {language === "fr" ? "Intelligence metier" : "Business Intelligence"}
                              </h4>
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {stepContents[3].intelligence?.map((item) => (
                                <Badge key={item} variant="secondary" className="text-xs bg-violet-500/10 font-mono">
                                  {item}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {selectedStep === 5 && (
                        <div className="grid gap-5 md:grid-cols-[1.25fr_0.75fr] md:items-center">
                          <figure className="overflow-hidden rounded-lg border border-border bg-muted/30">
                            <Image
                              src={hackathonPhotos.finalDemo}
                              alt={language === "fr" ? "Pitch final de Supply Brain" : "Final Supply Brain pitch"}
                              width={2048}
                              height={1152}
                              className="aspect-[16/10] w-full object-cover"
                            />
                            <figcaption className="px-3 py-2 text-xs text-muted-foreground">
                              {language === "fr" ? "Pitch final et demonstration du dashboard devant le jury." : "Final pitch and dashboard demo in front of the jury."}
                            </figcaption>
                          </figure>
                          <div className="space-y-4">
                            <Badge variant="outline" className="border-emerald-500/30 text-emerald-500">
                              {language === "fr" ? "Restitution finale" : "Final pitch"}
                            </Badge>
                            <p className="text-muted-foreground">
                              {language === "fr"
                                ? "La conclusion du Hackathon se concentre sur la valeur de Supply Brain : rendre visibles les signaux faibles du catalogue, prioriser les risques de stock, et donner aux equipes une lecture actionnable de la performance marketplace."
                                : "The Hackathon closes on Supply Brain's value: making catalog signals visible, prioritizing stock risks, and giving teams an actionable view of marketplace performance."}
                            </p>
                            <p className="text-muted-foreground">
                              {language === "fr"
                                ? "Le pitch montre le passage d'un brief metier a un prototype concret, avec un dashboard comprehensible par des profils operationnels et assez riche pour soutenir la decision."
                                : "The pitch shows the move from business brief to concrete prototype, with a dashboard readable by operational teams and rich enough to support decisions."}
                            </p>
                          </div>
                        </div>
                      )}

                      {selectedStep === 6 && (
                        <div className="space-y-6">
                          <div>
                            <Badge variant="outline" className="mb-2 border-blue-500/30 text-blue-500">
                              {language === "fr" ? "Support de presentation" : "Presentation deck"}
                            </Badge>
                            <p className="text-sm text-muted-foreground">
                              {language === "fr"
                                ? "Cette presentation formalise le prototype, le parcours de decision et la valeur metier defendue pendant la restitution finale."
                                : "This deck formalizes the prototype, the decision flow and the business value defended during the final presentation."}
                            </p>
                          </div>

                          <div className="overflow-hidden rounded-lg border border-border bg-muted/30">
                            <iframe
                              src={stepContents[4].presentation}
                              title="Supply Brain presentation"
                              className="h-[420px] w-full bg-background"
                            />
                          </div>

                          <div className="flex justify-center pt-2">
                            <Button asChild className="bg-blue-500 hover:bg-blue-600">
                              <a href={stepContents[4].presentation} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="w-4 h-4 mr-2" />
                                {language === "fr" ? "Ouvrir la presentation" : "Open presentation"}
                              </a>
                            </Button>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

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
              className="relative max-w-md rounded-2xl border border-cyan-400/30 bg-card p-5 pr-28 shadow-2xl"
              onClick={(event) => event.stopPropagation()}
            >
                <img
                  src="/images/easter-eggs/personnage-easteregg.png"
                  alt="Easter egg character"
                  aria-hidden="true"
                  className="pointer-events-none absolute bottom-full right-3 z-10 w-36 translate-y-[15px]"
                />

              <h3 className="mb-2 text-lg font-bold text-foreground">{language === "fr" ? "Oeuf cache - Supply Brain" : "Easter egg - Supply Brain"}</h3>
              <div className="space-y-2 text-sm leading-relaxed text-muted-foreground">
                <p><strong>{language === "fr" ? "Stack/imports :" : "Stack/imports:"}</strong> {language === "fr" ? "la carte utilise `react-simple-maps` avec `ComposableMap`, `Geographies`, `Geography`, `Marker`, `Line`, plus Framer Motion et `next/image`." : "the map uses `react-simple-maps` with `ComposableMap`, `Geographies`, `Geography`, `Marker`, `Line`, plus Framer Motion and `next/image`."}</p>
                <p><strong>{language === "fr" ? "États clés :" : "Key states:"}</strong> {language === "fr" ? "`started` lance la carte, `selectedStep` ouvre la bonne étape, et `showEasterEgg` contrôle cet encadré." : "`started` launches the map, `selectedStep` opens the right step, and `showEasterEgg` controls this panel."}</p>
                <p><strong>{language === "fr" ? "Interaction :" : "Interaction:"}</strong> {language === "fr" ? "les villes viennent de `mapSteps`; chaque marker appelle `setSelectedStep(step.id)` et les routes sont tracées depuis `mapSteps.slice(0, -1)`." : "cities come from `mapSteps`; each marker calls `setSelectedStep(step.id)` and routes are drawn from `mapSteps.slice(0, -1)`."}</p>
                <p><strong>{language === "fr" ? "Astuce :" : "Main trick:"}</strong> {language === "fr" ? "l'easter egg est branché sur la vraie géographie Antarctica via `geo.properties.name`, donc il garde le hover natif des pays." : "the easter egg is attached to the real Antarctica geography through `geo.properties.name`, so it keeps the native country hover behavior."}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  )
}
const geoUrl = "/data/countries-110m.json"
