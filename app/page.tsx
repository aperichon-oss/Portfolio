"use client"

import { motion, type Variants } from "framer-motion"
import Image from "next/image"
import { ArrowDown, Brain, GraduationCap, BarChart3 } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProjectCard } from "@/components/project-card"
import { AnimatedBackground } from "@/components/animated-background"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/language-context"
import { assetPath } from "@/lib/asset-path"

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
    },
  },
}

export default function HomePage() {
  const { t } = useLanguage()

  const projects = [
    {
      title: t("project.supplyBrain.title"),
      tagline: t("project.supplyBrain.tagline"),
      icon: <BarChart3 className="w-10 h-10 text-blue-500" />,
      href: "/supply-brain",
      glowClass: "glow-synapse",
      characterImage: "/images/project-characters/personnage-supply-brain.png",
      characterAlt: "Personnage Supply Brain",
    },
    {
      title: t("project.synapse.title"),
      tagline: t("project.synapse.tagline"),
      icon: <Brain className="w-10 h-10 text-synapse-violet" />,
      href: "/synapse",
      glowClass: "glow-synapse",
      characterImage: "/images/project-characters/personnage-synapse.png",
      characterAlt: "Personnage Synapse",
    },
    {
      title: t("project.eugenia.title"),
      tagline: t("project.eugenia.tagline"),
      icon: <GraduationCap className="w-10 h-10 text-[#8B2346]" />,
      href: "/eugenia-school",
      glowClass: "glow-mario",
      characterImage: "/images/project-characters/personnage-eugenia-school.png",
      characterAlt: "Personnage Eugenia School",
    },
    {
      title: t("project.zigzag.title"),
      tagline: t("project.zigzag.tagline"),
      icon: <Image src={assetPath("/images/zigzag-logo.webp")} alt="ZigZag" width={32} height={32} className="w-10 h-10 object-contain rounded-full" />,
      href: "/zigzag",
      glowClass: "glow-zigzag",
      characterImage: "/images/project-characters/personnage-zigzag.png",
      characterAlt: "Personnage ZigZag",
    },
    {
      title: t("project.marioKart.title"),
      tagline: t("project.marioKart.tagline"),
      icon: <Image src={assetPath("/images/mario-icon.png")} alt="Mario" width={32} height={32} className="w-10 h-10 object-contain" />,
      href: "/mario-kart",
      glowClass: "glow-mario",
      characterImage: "/images/project-characters/personnage-mario-kart.png",
      characterAlt: "Personnage Mario Kart",
    },
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

            {/* CTA */}
            <motion.div variants={itemVariants} className="pt-40 sm:pt-48 md:pt-56">
              <Button
                size="lg"
                onClick={scrollToProjects}
                className="group relative overflow-visible bg-primary hover:bg-primary/90 text-primary-foreground px-10 py-8 text-xl sm:px-12 sm:py-9 sm:text-2xl"
              >
                <span className="pointer-events-none absolute left-0 top-0 z-20">
                    <img
                    src={assetPath("/images/home/personnage-interrogatif.png")}
                      alt=""
                      aria-hidden="true"
                      className="block w-44 max-w-none origin-[23%_82%] -translate-x-[24%] -translate-y-[66%] rotate-[4deg] sm:w-64 sm:-translate-x-[49%] sm:-translate-y-[62%]"
                    />
                </span>
                <span className="relative z-10">{t("home.cta")}</span>
                <ArrowDown className="relative z-10 ml-2 h-6 w-6 group-hover:translate-y-1 transition-transform sm:h-7 sm:w-7" />
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

      <Footer />
    </div>
  )
}
