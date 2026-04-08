"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { ArrowDown, Brain, Code2 } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProjectCard } from "@/components/project-card"
import { AnimatedBackground } from "@/components/animated-background"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/language-context"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
}

export default function HomePage() {
  const { t } = useLanguage()

  const projects = [
    {
      title: t("project.marioKart.title"),
      tagline: t("project.marioKart.tagline"),
      icon: <Image src="/images/mario-icon.png" alt="Mario" width={32} height={32} className="w-10 h-10 object-contain" />,
      href: "/mario-kart",
      glowClass: "glow-mario",
    },
    {
      title: t("project.zigzag.title"),
      tagline: t("project.zigzag.tagline"),
      icon: <Image src="/images/zigzag-logo.webp" alt="ZigZag" width={32} height={32} className="w-10 h-10 object-contain rounded-full" />,
      href: "/zigzag",
      glowClass: "glow-zigzag",
    },
    {
      title: t("project.synapse.title"),
      tagline: t("project.synapse.tagline"),
      icon: <Brain className="w-10 h-10 text-white" />,
      href: "/synapse",
      glowClass: "glow-synapse",
    },
  ]

  const stats = [
    { value: "3+", label: t("home.stat.projects") },
    { value: "5+", label: t("home.stat.tech") },
    { value: "MSc", label: t("home.stat.degree") },
    { value: "5 ans", label: t("home.stat.experience") },
  ]

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-background">
      <AnimatedBackground />
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center space-y-8"
          >
            {/* Badge */}
            <motion.div variants={itemVariants}>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
                <Code2 className="w-4 h-4" />
                {t("home.badge")}
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground text-balance"
            >
              {t("home.title")}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={itemVariants}
              className="text-xl sm:text-2xl text-primary font-medium"
            >
              {t("home.subtitle")}
            </motion.p>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed text-pretty"
            >
              {t("home.description")}
            </motion.p>

            {/* CTA */}
            <motion.div variants={itemVariants} className="pt-4">
              <Button
                size="lg"
                onClick={scrollToProjects}
                className="group bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg"
              >
                {t("home.cta")}
                <ArrowDown className="w-5 h-5 ml-2 group-hover:translate-y-1 transition-transform" />
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2"
          >
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-2 rounded-full bg-primary"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative py-20 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              {t("home.projectsTitle")}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t("home.projectsDescription")}
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {projects.map((project) => (
              <motion.div key={project.title} variants={itemVariants}>
                <ProjectCard {...project} exploreLabel={t("home.explore")} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-20 bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="space-y-2"
              >
                <div className="text-3xl sm:text-4xl font-bold text-primary">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
