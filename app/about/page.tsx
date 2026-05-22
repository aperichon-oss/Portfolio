"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Briefcase, GraduationCap, Heart, Languages, Mail, MapPin } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useLanguage } from "@/lib/language-context"
import { assetPath } from "@/lib/asset-path"

export default function AboutPage() {
  const { t } = useLanguage()

  const interests = [
    t("about.interest.gaming"),
    t("about.interest.singing"),
    t("about.interest.asian"),
    t("about.interest.climbing"),
    t("about.interest.dance"),
    t("about.interest.travel"),
  ]

  const skills = ["Python", "SQL", "React", "TypeScript", "SEO/GEO", "Data analysis", "AI/RAG", "Business strategy"]

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="container mx-auto px-4 pt-24 pb-16">
        <Link href="/" className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
          <ArrowLeft className="h-4 w-4" />
          {t("nav.home")}
        </Link>

        <section className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <Card className="overflow-hidden border-border/70 bg-card/80">
            <div className="bg-gradient-to-br from-primary/25 via-background to-cyan-500/15 p-8 text-center">
              <div className="mx-auto mb-5 h-36 w-36 overflow-hidden rounded-full border-4 border-primary/30 bg-background">
                <Image
                  src={assetPath("/images/profile.jpg")}
                  alt="Aurelie Perichon"
                  width={256}
                  height={256}
                  className="h-full w-full object-cover"
                  priority
                />
              </div>
              <Badge className="mb-3 bg-primary/15 text-primary hover:bg-primary/15">{t("about.badge")}</Badge>
              <h1 className="text-3xl font-bold">{t("about.title")}</h1>
              <p className="mt-2 text-muted-foreground">{t("about.subtitle")}</p>
            </div>

            <div className="space-y-4 p-6">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 text-primary" />
                <a href="mailto:aurelieperichon@gmail.com" className="hover:text-foreground">aurelieperichon@gmail.com</a>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                Paris, France
              </div>
              <Button asChild className="w-full">
                <a href="mailto:aurelieperichon@gmail.com">
                  <Mail className="h-4 w-4" />
                  {t("about.contactMe")}
                </a>
              </Button>
            </div>
          </Card>

          <div className="space-y-6">
            <Card className="border-border/70 bg-card/80 p-6">
              <div className="mb-4 flex items-center gap-3">
                <Briefcase className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold">{t("about.profile")}</h2>
              </div>
              <p className="leading-relaxed text-muted-foreground">{t("about.profileText")}</p>
            </Card>

            <div className="grid gap-6 md:grid-cols-2">
              <Card className="border-border/70 bg-card/80 p-6">
                <div className="mb-4 flex items-center gap-3">
                  <GraduationCap className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-semibold">{t("about.education")}</h2>
                </div>
                <p className="font-medium">MSc AI Applied to Business</p>
                <p className="mt-1 text-sm text-muted-foreground">{t("about.current")}</p>
              </Card>

              <Card className="border-border/70 bg-card/80 p-6">
                <div className="mb-4 flex items-center gap-3">
                  <Languages className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-semibold">{t("about.languages")}</h2>
                </div>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>{t("about.french")} - {t("about.native")}</p>
                  <p>{t("about.english")}</p>
                </div>
              </Card>
            </div>

            <Card className="border-border/70 bg-card/80 p-6">
              <h2 className="mb-4 text-xl font-semibold">{t("about.skills")}</h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <Badge key={skill} variant="outline" className="border-primary/35 text-primary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </Card>

            <Card className="border-border/70 bg-card/80 p-6">
              <div className="mb-4 flex items-center gap-3">
                <Heart className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold">{t("about.interests")}</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {interests.map((interest) => (
                  <Badge key={interest} variant="secondary">
                    {interest}
                  </Badge>
                ))}
              </div>
            </Card>

            <Card className="border-primary/30 bg-primary/10 p-6">
              <h2 className="text-xl font-semibold">{t("about.ctaTitle")}</h2>
              <p className="mt-2 text-muted-foreground">{t("about.ctaDescription")}</p>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
