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
import { 
  Mail,
  Phone,
  Linkedin,
  Github,
  GraduationCap,
  Briefcase,
  Code2,
  Languages,
  Heart,
  Gamepad2,
  Music,
  Mountain,
  Plane,
  Sparkles
} from "lucide-react"

const skills = [
  { name: "Python", category: "code" },
  { name: "SQL", category: "code" },
  { name: "NoSQL", category: "code" },
  { name: "NoCode", category: "tool" },
  { name: "Power BI", category: "tool" },
  { name: "Canva", category: "tool" },
  { name: "Shopify", category: "tool" },
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
  ]

  const experience = [
    {
      role: language === "fr" ? "Chargee de marketing digital" : "Digital Marketing Manager",
      company: "Olover",
      period: "2024-2025",
      description: language === "fr" ? "Strategie digitale, SEO, campagnes marketing" : "Digital strategy, SEO, marketing campaigns",
    },
    {
      role: language === "fr" ? "Apprentie manager" : "Manager Apprentice",
      company: "Carrefour City",
      period: "2022-2024",
      description: language === "fr" ? "Gestion d'equipe, operations retail, relation client" : "Team management, retail operations, customer relations",
    },
  ]

  const interests = [
    { icon: <Gamepad2 className="w-5 h-5" />, label: t("about.interest.gaming") },
    { icon: <Music className="w-5 h-5" />, label: t("about.interest.singing") },
    { icon: <Sparkles className="w-5 h-5" />, label: t("about.interest.asian") },
    { icon: <Mountain className="w-5 h-5" />, label: t("about.interest.climbing") },
    { icon: <Heart className="w-5 h-5" />, label: t("about.interest.dance") },
    { icon: <Plane className="w-5 h-5" />, label: t("about.interest.travel") },
  ]

  return (
    <div className="min-h-screen bg-background">
      <AnimatedBackground />
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-12 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">
              {t("about.badge")}
            </Badge>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-foreground">
              {t("about.title")}
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t("about.subtitle")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative px-4 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Profile */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="lg:col-span-1 space-y-6"
            >
              {/* Avatar */}
              <motion.div variants={itemVariants}>
                <Card className="p-6 bg-card border-border">
                  <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-primary/30">
                    <Image
                      src="/images/profile.jpg"
                      alt="Aurelie Perichon"
                      width={128}
                      height={128}
                      className="w-full h-full object-cover"
                      priority
                    />
                  </div>
                  <h2 className="text-xl font-bold text-center text-foreground mb-2">
                    Aurelie Perichon
                  </h2>
                  <p className="text-muted-foreground text-center text-sm">
                    MSc AI Applied to Business
                  </p>
                </Card>
              </motion.div>

              {/* Contact */}
              <motion.div variants={itemVariants}>
                <Card className="p-6 bg-card border-border">
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Mail className="w-5 h-5 text-primary" />
                    {t("about.contact")}
                  </h3>
                  <div className="space-y-3">
                    <a 
                      href="mailto:aurelieperichon@gmail.com" 
                      className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                      aurelieperichon@gmail.com
                    </a>
                    <a 
                      href="tel:+33644808941" 
                      className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Phone className="w-4 h-4" />
                      06-44-80-89-41
                    </a>
                    <a 
                      href="https://www.linkedin.com/in/aurélie-perichon-4451122b9/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Linkedin className="w-4 h-4" />
                      LinkedIn
                    </a>
                    <a 
                      href="https://github.com/aperichon-oss"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      GitHub
                    </a>
                  </div>
                </Card>
              </motion.div>

              {/* Languages */}
              <motion.div variants={itemVariants}>
                <Card className="p-6 bg-card border-border">
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Languages className="w-5 h-5 text-primary" />
                    {t("about.languages")}
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-foreground">{t("about.french")}</span>
                      <Badge variant="secondary">{t("about.native")}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-foreground">{t("about.english")}</span>
                      <Badge variant="outline">B2</Badge>
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* Interests */}
              <motion.div variants={itemVariants}>
                <Card className="p-6 bg-card border-border">
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Heart className="w-5 h-5 text-primary" />
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
              className="lg:col-span-2 space-y-6"
            >
              {/* Profile Summary */}
              <motion.div variants={itemVariants}>
                <Card className="p-6 bg-card border-border">
                  <h3 className="text-lg font-semibold text-foreground mb-4">{t("about.profile")}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {t("about.profileText")}
                  </p>
                </Card>
              </motion.div>

              {/* Education */}
              <motion.div variants={itemVariants}>
                <Card className="p-6 bg-card border-border">
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-primary" />
                    {t("about.education")}
                  </h3>
                  <div className="space-y-4">
                    {education.map((edu, index) => (
                      <div 
                        key={edu.degree}
                        className={`relative pl-4 ${index !== education.length - 1 ? 'pb-4 border-l-2 border-border' : ''}`}
                      >
                        <div className="absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-primary" />
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <h4 className="font-medium text-foreground">{edu.degree}</h4>
                          {edu.current && (
                            <Badge className="bg-primary/20 text-primary border-primary/30">
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
                <Card className="p-6 bg-card border-border">
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-primary" />
                    {t("about.experience")}
                  </h3>
                  <div className="space-y-4">
                    {experience.map((exp, index) => (
                      <div 
                        key={exp.role}
                        className={`relative pl-4 ${index !== experience.length - 1 ? 'pb-4 border-l-2 border-border' : ''}`}
                      >
                        <div className="absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-accent" />
                        <h4 className="font-medium text-foreground">{exp.role}</h4>
                        <p className="text-sm text-primary">{exp.company}</p>
                        <p className="text-xs text-muted-foreground mb-1">{exp.period}</p>
                        <p className="text-sm text-muted-foreground">{exp.description}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>

              {/* Skills */}
              <motion.div variants={itemVariants}>
                <Card className="p-6 bg-card border-border">
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Code2 className="w-5 h-5 text-primary" />
                    {t("about.skills")}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <Badge 
                        key={skill.name}
                        className={
                          skill.category === "code" 
                            ? "bg-primary/20 text-primary border-primary/30" 
                            : "bg-accent/20 text-accent border-accent/30"
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
                <Card className="p-6 bg-gradient-to-br from-primary/20 to-accent/20 border-primary/30">
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      {t("about.ctaTitle")}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {t("about.ctaDescription")}
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                      <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
                        <a href="mailto:aurelieperichon@gmail.com">
                          <Mail className="w-4 h-4 mr-2" />
                          {t("about.contactMe")}
                        </a>
                      </Button>
                      <Button asChild variant="outline">
                        <a href="https://www.linkedin.com/in/aurélie-perichon-4451122b9/" target="_blank" rel="noopener noreferrer">
                          <Linkedin className="w-4 h-4 mr-2" />
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
