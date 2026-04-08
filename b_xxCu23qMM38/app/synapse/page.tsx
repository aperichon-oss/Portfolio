"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { useLanguage } from "@/lib/language-context"
import { 
  Brain,
  Search,
  MessageSquare,
  Bot,
  Github,
  FileText,
  ArrowRight,
  Database,
  Cpu,
  Zap
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
  { name: "Python", color: "bg-synapse-cyan/20 text-[#06B6D4]" },
  { name: "FastAPI", color: "bg-synapse-violet/20 text-[#8B5CF6]" },
  { name: "LangChain", color: "bg-synapse-cyan/20 text-[#06B6D4]" },
  { name: "OpenAI", color: "bg-synapse-violet/20 text-[#8B5CF6]" },
  { name: "Supabase", color: "bg-synapse-cyan/20 text-[#06B6D4]" },
]

const frontendStack = [
  { name: "HTML/CSS/JS", color: "bg-synapse-violet/20 text-[#8B5CF6]" },
  { name: "Dark Theme", color: "bg-synapse-cyan/20 text-[#06B6D4]" },
]

const databaseStack = [
  { name: "PostgreSQL", color: "bg-synapse-cyan/20 text-[#06B6D4]" },
  { name: "FAISS", color: "bg-synapse-violet/20 text-[#8B5CF6]" },
]

export default function SynapsePage() {
  const { t } = useLanguage()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const neuronsRef = useRef<Neuron[]>([])
  const impulsesRef = useRef<Impulse[]>([])
  const [activeSection, setActiveSection] = useState(0)

  const features = [
    {
      icon: <Search className="w-6 h-6" />,
      title: t("synapse.feature1.title"),
      description: t("synapse.feature1.description"),
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: t("synapse.feature2.title"),
      description: t("synapse.feature2.description"),
    },
    {
      icon: <Bot className="w-6 h-6" />,
      title: t("synapse.feature3.title"),
      description: t("synapse.feature3.description"),
    },
  ]

  const pipelineSteps = [
    { icon: <MessageSquare className="w-4 h-4" />, label: t("synapse.pipeline.request") },
    { icon: <Database className="w-4 h-4" />, label: t("synapse.pipeline.api") },
    { icon: <FileText className="w-4 h-4" />, label: t("synapse.pipeline.extraction") },
    { icon: <Cpu className="w-4 h-4" />, label: t("synapse.pipeline.vectorization") },
    { icon: <Brain className="w-4 h-4" />, label: t("synapse.pipeline.chat") },
    { icon: <Zap className="w-4 h-4" />, label: t("synapse.pipeline.response") },
  ]

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
      const neuronCount = Math.min(80, Math.floor((canvas.width * canvas.height) / 12000))

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

          if (distance < 150 && neuron.connections.length < 4) {
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
      ctx.fillStyle = "rgba(10, 10, 10, 0.1)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const neurons = neuronsRef.current
      const time = Date.now() * 0.001

      ctx.strokeStyle = "rgba(139, 92, 246, 0.1)"
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

      if (Math.random() < 0.1) {
        createImpulse()
      }

      neurons.forEach((neuron) => {
        const pulse = Math.sin(time * 2 + neuron.pulsePhase) * 0.3 + 0.7
        
        const dx = mousePos.x - neuron.x
        const dy = mousePos.y - neuron.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const isHovered = distance < 100

        ctx.beginPath()
        ctx.arc(neuron.x, neuron.y, neuron.radius * (isHovered ? 1.5 : 1), 0, Math.PI * 2)

        if (isHovered) {
          const gradient = ctx.createRadialGradient(
            neuron.x, neuron.y, 0,
            neuron.x, neuron.y, neuron.radius * 2
          )
          gradient.addColorStop(0, `rgba(6, 182, 212, ${pulse})`)
          gradient.addColorStop(1, "rgba(139, 92, 246, 0)")
          ctx.fillStyle = gradient
          ctx.shadowColor = "#06B6D4"
          ctx.shadowBlur = 15
        } else {
          ctx.fillStyle = `rgba(139, 92, 246, ${pulse * 0.5})`
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

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("[data-section]")
      let current = 0

      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect()
        if (rect.top < window.innerHeight / 2) {
          current = index
        }
      })

      setActiveSection(current)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-background relative">
      {/* Neural Network Background */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0"
      />

      {/* Overlay */}
      <div className="fixed inset-0 bg-background/70 pointer-events-none z-0" />

      <Header />
      
      {/* Hero Section */}
      <section data-section className="relative z-10 pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-synapse-violet to-synapse-cyan flex items-center justify-center"
            >
              <Brain className="w-10 h-10 text-white" />
            </motion.div>

            <Badge className="mb-4 bg-synapse-violet/20 text-[#8B5CF6] border-synapse-violet/30">
              {t("synapse.badge")}
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 text-foreground">
              {t("synapse.title")}
            </h1>
            <p className="text-xl text-primary mb-2">
              {t("synapse.subtitle")}
            </p>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t("synapse.description")}
            </p>

            <div className="flex justify-center gap-4 mt-8">
              <Button asChild className="bg-synapse-violet hover:bg-synapse-violet/90 text-white">
                <a href="https://github.com/jeanlisek/Synapse" target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4 mr-2" />
                  {t("synapse.viewGithub")}
                </a>
              </Button>
              <Button asChild variant="outline" className="border-synapse-cyan text-synapse-cyan hover:bg-synapse-cyan/10">
                <a href="#features">
                  {t("synapse.explore")}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" data-section className="relative z-10 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-foreground mb-4">{t("synapse.featuresTitle")}</h2>
            <p className="text-muted-foreground">{t("synapse.featuresSubtitle")}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`
                  p-6 bg-card/80 backdrop-blur border-border h-full
                  transition-all duration-300 hover:border-synapse-violet/50
                  ${activeSection === 1 ? 'glow-synapse' : ''}
                `}>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-synapse-violet to-synapse-cyan flex items-center justify-center text-white mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stack Section */}
      <section data-section className="relative z-10 py-16 px-4 bg-card/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-foreground mb-4">{t("synapse.stackTitle")}</h2>
            <p className="text-muted-foreground">{t("synapse.stackSubtitle")}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="p-6 bg-card/80 backdrop-blur border-border h-full">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-synapse-violet" />
                  {t("synapse.backend")}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {backendStack.map((tech) => (
                    <Badge key={tech.name} className={tech.color}>
                      {tech.name}
                    </Badge>
                  ))}
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Card className="p-6 bg-card/80 backdrop-blur border-border h-full">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-synapse-cyan" />
                  {t("synapse.frontend")}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {frontendStack.map((tech) => (
                    <Badge key={tech.name} className={tech.color}>
                      {tech.name}
                    </Badge>
                  ))}
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Card className="p-6 bg-card/80 backdrop-blur border-border h-full">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Database className="w-5 h-5 text-synapse-violet" />
                  {t("synapse.database")}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {databaseStack.map((tech) => (
                    <Badge key={tech.name} className={tech.color}>
                      {tech.name}
                    </Badge>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pipeline Section */}
      <section data-section className="relative z-10 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-foreground mb-4">{t("synapse.pipelineTitle")}</h2>
            <p className="text-muted-foreground">{t("synapse.pipelineSubtitle")}</p>
          </motion.div>

          <Card className="p-8 bg-card/80 backdrop-blur border-border">
            <div className="flex flex-wrap items-center justify-center gap-4">
              {pipelineSteps.map((step, index) => (
                <motion.div
                  key={step.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center"
                >
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-synapse-violet to-synapse-cyan flex items-center justify-center text-white mb-2">
                      {step.icon}
                    </div>
                    <span className="text-xs text-muted-foreground text-center">{step.label}</span>
                  </div>
                  {index < pipelineSteps.length - 1 && (
                    <ArrowRight className="w-6 h-6 text-synapse-violet/50 mx-2 hidden sm:block" />
                  )}
                </motion.div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section data-section className="relative z-10 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="p-8 bg-gradient-to-br from-synapse-violet/20 to-synapse-cyan/20 border-synapse-violet/30">
              <Brain className="w-12 h-12 text-synapse-cyan mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-foreground mb-4">{t("synapse.ctaTitle")}</h2>
              <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                {t("synapse.ctaDescription")}
              </p>
              <Button asChild size="lg" className="bg-synapse-violet hover:bg-synapse-violet/90 text-white">
                <a href="https://github.com/jeanlisek/Synapse" target="_blank" rel="noopener noreferrer">
                  <Github className="w-5 h-5 mr-2" />
                  {t("synapse.viewGithub")}
                </a>
              </Button>
            </Card>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
