"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { AnimatedBackground } from "@/components/animated-background"
import { useLanguage } from "@/lib/language-context"
import { assetPath } from "@/lib/asset-path"
import {
  Mail,
  Phone,
  Linkedin,
  Github,
  GraduationCap,
  Briefcase,
  Code2,
  Award,
  Languages,
  Heart,
  Gamepad2,
  Music,
  Mountain,
  Plane,
  Sparkles,
} from "lucide-react"

const skills = [
  { name: "Python", category: "code" },
  { name: "SQL", category: "code" },
  { name: "NoSQL", category: "code" },
  { name: "Data cleaning", category: "code" },
  { name: "Data visualization", category: "code" },
  { name: "Machine Learning", category: "code" },
  { name: "NoCode", category: "tool" },
  { name: "Power BI", category: "tool" },
  { name: "Dataiku", category: "tool" },
  { name: "Google Sheets", category: "tool" },
  { name: "CRM", category: "tool" },
  { name: "Canva", category: "tool" },
  { name: "Shopify", category: "tool" },
  { name: "WordPress", category: "tool" },
  { name: "Brevo", category: "tool" },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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

export default function AboutPage() {
  const { t, language } = useLanguage()

  const education = [
    {
      degree: "MSc AI Applied to Business",
      school: "Eugenia School",
      period: "2025-2027",
      current: true,
    },
    {
      degree: "Bachelor Marketing Digital, IA et Data",
      school: "INSEEC",
      period: "2024-2025",
      current: false,
    },
    {
      degree: language === "fr" ? "BTS Management Commercial Opérationnel" : "BTS Commercial Operations Management",
      school: "CFA AFIPE | Vente & Commerce",
      period: "2022-2024",
      current: false,
    },
  ]

  const experience = [
    {
      role: "Business Developer Digital & IT Products",
      company: "Air Liquide",
      period: language === "fr" ? "Depuis sept. 2025 - Alternance" : "Since Sep. 2025 - Apprenticeship",
      description: language === "fr" ? "Développement business sur des produits digitaux et IT dans un environnement industriel international." : "Business development for digital and IT products in an international industrial environment.",
    },
    {
      role: language === "fr" ? "Chargée de marketing digital" : "Digital Marketing Specialist",
      company: "Olover",
      period: language === "fr" ? "Oct. 2024 - août 2025 - Alternance" : "Oct. 2024 - Aug. 2025 - Apprenticeship",
      description: language === "fr" ? "Création Shopify, newsletters Brevo, CRM, réseaux sociaux, suivi KPI et accompagnement de la refonte du site." : "Shopify website creation, Brevo newsletters, CRM, social media, KPI tracking and support during the website redesign.",
    },
    {
      role: language === "fr" ? "Apprentie manager" : "Manager Apprentice",
      company: "Carrefour City",
      period: language === "fr" ? "Oct. 2022 - août 2024 - Alternance" : "Oct. 2022 - Aug. 2024 - Apprenticeship",
      description: language === "fr" ? "Management opérationnel, relation client, approvisionnement, gestion des flux et suivi des rayons rentables." : "Operational management, customer relations, supply management, flow management and tracking of profitable shelves.",
    },
    {
      role: language === "fr" ? "Conseillère commerciale" : "Sales Advisor",
      company: "Les Jardins du Mesnil",
      period: "2019-2022",
      description: language === "fr" ? "Vente, conseil client, gestion des stocks, commandes fournisseurs et contrôle qualité des marchandises." : "Sales, customer advice, inventory management, supplier orders and quality control of goods.",
    },
  ]

  const certifications = [
    {
      name: "Dataiku Core Designer",
      issuer: "Dataiku",
      period: language === "fr" ? "Délivrée en janv. 2026" : "Issued Jan. 2026",
    },
    {
      name: "No Code - TechAway niv1 (FR)",
      issuer: "DataScientest.com",
      period: language === "fr" ? "Certification No Code" : "No-code certification",
    },
    {
      name: "Google Sheets Marketing",
      issuer: "DataScientest.com",
      period: language === "fr" ? "Certification LinkedIn" : "LinkedIn certification",
    },
  ]

  const interests = [
    { icon: <Gamepad2 className="h-5 w-5" />, label: t("about.interest.gaming") },
    { icon: <Music className="h-5 w-5" />, label: t("about.interest.singing") },
    { icon: <Sparkles className="h-5 w-5" />, label: t("about.interest.asian") },
    { icon: <Mountain className="h-5 w-5" />, label: t("about.interest.climbing") },
    { icon: <Heart className="h-5 w-5" />, label: t("about.interest.dance") },
    { icon: <Plane className="h-5 w-5" />, label: t("about.interest.travel") },
  ]

  return (
    <div className="min-h-screen bg-background">
      <AnimatedBackground />
      <Header />

      {/* Hero Section */}
      <section className="relative px-4 pb-12 pt-24">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 text-center"
          >
            <Badge className="mb-4 border-primary/30 bg-primary/20 text-primary">
              {t("about.badge")}
            </Badge>
            <h1 className="mb-4 text-4xl font-bold text-foreground sm:text-5xl">
              {t("about.title")}
            </h1>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              {t("about.subtitle")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative px-4 pb-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Left Column - Profile */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-6 lg:col-span-1"
            >
              {/* Avatar */}
              <motion.div variants={itemVariants}>
                <Card className="border-border bg-card p-6">
                  <div className="mx-auto mb-4 h-32 w-32 overflow-hidden rounded-full border-4 border-primary/30">
                    <Image
                      src={assetPath("/images/profile.jpg")}
                      alt="Aurelie Perichon"
                      width={128}
                      height={128}
                      className="h-full w-full object-cover"
                      priority
                    />
                  </div>
                  <h2 className="mb-2 text-center text-xl font-bold text-foreground">
                    Aurelie Perichon
                  </h2>
                  <p className="text-center text-sm text-muted-foreground">
                    MSc AI Applied to Business
                  </p>
                </Card>
              </motion.div>

              {/* Contact */}
              <motion.div variants={itemVariants}>
                <Card className="border-border bg-card p-6">
                  <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-foreground">
                    <Mail className="h-5 w-5 text-primary" />
                    {t("about.contact")}
                  </h3>
                  <div className="space-y-3">
                    <a
                      href="mailto:aurelieperichon@gmail.com"
                      className="flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      <Mail className="h-4 w-4" />
                      aurelieperichon@gmail.com
                    </a>
                    <a
                      href="tel:+33644808941"
                      className="flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      <Phone className="h-4 w-4" />
                      06-44-80-89-41
                    </a>
                    <a
                      href="https://www.linkedin.com/in/aurélie-perichon-4451122b9/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      <Linkedin className="h-4 w-4" />
                      LinkedIn
                    </a>
                    <a
                      href="https://github.com/aperichon-oss"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      <Github className="h-4 w-4" />
                      GitHub
                    </a>
                  </div>
                </Card>
              </motion.div>

              {/* Languages */}
              <motion.div variants={itemVariants}>
                <Card className="border-border bg-card p-6">
                  <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-foreground">
                    <Languages className="h-5 w-5 text-primary" />
                    {t("about.languages")}
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-foreground">{t("about.french")}</span>
                      <Badge variant="secondary">{t("about.native")}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-foreground">{t("about.english")}</span>
                      <Badge variant="outline">B2</Badge>
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* Interests */}
              <motion.div variants={itemVariants}>
                <Card className="border-border bg-card p-6">
                  <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-foreground">
                    <Heart className="h-5 w-5 text-primary" />
                    {t("about.interests")}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {interests.map((interest) => (
                      <Badge
                        key={interest.label}
                        variant="secondary"
                        className="flex items-center gap-1.5 py-1.5"
                      >
                        {interest.icon}
                        {interest.label}
                      </Badge>
                    ))}
                  </div>
                </Card>
              </motion.div>
            </motion.div>

            {/* Right Column - Details */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-6 lg:col-span-2"
            >
              {/* Profile Summary */}
              <motion.div variants={itemVariants}>
                <Card className="border-border bg-card p-6">
                  <h3 className="mb-4 text-lg font-semibold text-foreground">{t("about.profile")}</h3>
                  <p className="leading-relaxed text-muted-foreground">
                    {t("about.profileText")}
                  </p>
                </Card>
              </motion.div>

              {/* Education */}
              <motion.div variants={itemVariants}>
                <Card className="border-border bg-card p-6">
                  <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-foreground">
                    <GraduationCap className="h-5 w-5 text-primary" />
                    {t("about.education")}
                  </h3>
                  <div className="space-y-4">
                    {education.map((edu, index) => (
                      <div
                        key={edu.degree}
                        className={`relative pl-4 ${index !== education.length - 1 ? "border-l-2 border-border pb-4" : ""}`}
                      >
                        <div className="absolute -left-[5px] top-0 h-2 w-2 rounded-full bg-primary" />
                        <div className="mb-1 flex flex-wrap items-center gap-2">
                          <h4 className="font-medium text-foreground">{edu.degree}</h4>
                          {edu.current && (
                            <Badge className="border-primary/30 bg-primary/20 text-primary">
                              {t("about.current")}
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{edu.school}</p>
                        <p className="text-xs text-muted-foreground">{edu.period}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>

              {/* Experience */}
              <motion.div variants={itemVariants}>
                <Card className="border-border bg-card p-6">
                  <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-foreground">
                    <Briefcase className="h-5 w-5 text-primary" />
                    {t("about.experience")}
                  </h3>
                  <div className="space-y-4">
                    {experience.map((exp, index) => (
                      <div
                        key={exp.role}
                        className={`relative pl-4 ${index !== experience.length - 1 ? "border-l-2 border-border pb-4" : ""}`}
                      >
                        <div className="absolute -left-[5px] top-0 h-2 w-2 rounded-full bg-accent" />
                        <h4 className="font-medium text-foreground">{exp.role}</h4>
                        <p className="text-sm text-primary">{exp.company}</p>
                        <p className="mb-1 text-xs text-muted-foreground">{exp.period}</p>
                        <p className="text-sm text-muted-foreground">{exp.description}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>

              {/* Certifications */}
              <motion.div variants={itemVariants}>
                <Card className="border-border bg-card p-6">
                  <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-foreground">
                    <Award className="h-5 w-5 text-primary" />
                    {language === "fr" ? "Certifications" : "Certifications"}
                  </h3>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {certifications.map((cert) => (
                      <div key={cert.name} className="rounded-lg border border-border/70 bg-background/40 p-4">
                        <h4 className="font-medium text-foreground">{cert.name}</h4>
                        <p className="text-sm text-primary">{cert.issuer}</p>
                        <p className="mt-1 text-xs text-muted-foreground">{cert.period}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>

              {/* Skills */}
              <motion.div variants={itemVariants}>
                <Card className="border-border bg-card p-6">
                  <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-foreground">
                    <Code2 className="h-5 w-5 text-primary" />
                    {t("about.skills")}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <Badge
                        key={skill.name}
                        className={
                          skill.category === "code"
                            ? "border-primary/30 bg-primary/20 text-primary"
                            : "border-accent/30 bg-accent/20 text-accent"
                        }
                      >
                        {skill.name}
                      </Badge>
                    ))}
                  </div>
                </Card>
              </motion.div>

              {/* CTA */}
              <motion.div variants={itemVariants}>
                <Card className="border-primary/30 bg-gradient-to-br from-primary/20 to-accent/20 p-6">
                  <div className="text-center">
                    <h3 className="mb-2 text-xl font-bold text-foreground">
                      {t("about.ctaTitle")}
                    </h3>
                    <p className="mb-4 text-muted-foreground">
                      {t("about.ctaDescription")}
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                      <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
                        <a href="mailto:aurelieperichon@gmail.com">
                          <Mail className="mr-2 h-4 w-4" />
                          {t("about.contactMe")}
                        </a>
                      </Button>
                      <Button asChild variant="outline">
                        <a href="https://www.linkedin.com/in/aurélie-perichon-4451122b9/" target="_blank" rel="noopener noreferrer">
                          <Linkedin className="mr-2 h-4 w-4" />
                          LinkedIn
                        </a>
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
