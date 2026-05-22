"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Github, Linkedin, Mail, ChevronDown, Brain, GraduationCap, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useLanguage } from "@/lib/language-context"
import { assetPath } from "@/lib/asset-path"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [projectsOpen, setProjectsOpen] = useState(false)
  const pathname = usePathname()
  const { language, setLanguage, t } = useLanguage()

  const projectItems = [
    {
      href: "/supply-brain",
      label: t("project.supplyBrain.title"),
      icon: null,
      iconComponent: "chart"
    },
    {
      href: "/synapse",
      label: t("project.synapse.title"),
      icon: null,
      iconComponent: "brain"
    },
    {
      href: "/eugenia-school",
      label: t("project.eugenia.title"),
      icon: null,
      iconComponent: "graduation"
    },
    {
      href: "/zigzag",
      label: t("project.zigzag.title"),
      icon: "/images/zigzag-logo.webp"
    },
    {
      href: "/mario-kart",
      label: t("project.marioKart.title"),
      icon: "/images/mario-icon.png"
    },
  ]

  const isProjectPage = ["/mario-kart", "/zigzag", "/synapse", "/eugenia-school", "/supply-brain"].includes(pathname)

  const toggleLanguage = () => {
    setLanguage(language === "fr" ? "en" : "fr")
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <motion.div className="w-12 h-12 rounded-full overflow-hidden border-3 border-primary/30">
              <Image
                src={assetPath("/images/profile.jpg")}
                alt="Aurelie Perichon"
                width={128}
                height={128}
                className="w-full h-full object-cover"
                priority
              />

            </motion.div>
            <span className="font-semibold text-foreground hidden sm:block">Aurelie Perichon</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <Link href="/">
              <Button
                variant={pathname === "/" ? "secondary" : "ghost"}
                size="sm"
                className="relative"
              >
                {t("nav.home")}
              </Button>
            </Link>

            <Link href="/about">
              <Button
                variant={pathname === "/about" ? "secondary" : "ghost"}
                size="sm"
                className="relative"
              >
                {t("nav.about")}
              </Button>
            </Link>

            {/* Projects Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant={isProjectPage ? "secondary" : "ghost"}
                  size="sm"
                  className="gap-1"
                >
                  {t("nav.projects")}
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-48">
                {projectItems.map((item) => (
                  <DropdownMenuItem key={item.href} asChild>
                    <Link href={item.href} className="flex items-center gap-2 cursor-pointer">
                      {item.icon ? (
                        <Image
                          src={assetPath(item.icon)}
                          alt={item.label}
                          width={20}
                          height={20}
                          className="w-5 h-5 object-contain"
                        />
                      ) : item.iconComponent === "brain" ? (
                        <Brain className="w-5 h-5 text-synapse-violet" />
                      ) : item.iconComponent === "graduation" ? (
                        <GraduationCap className="w-5 h-5 text-[#8B2346]" />
                      ) : item.iconComponent === "chart" ? (
                        <BarChart3 className="w-5 h-5 text-blue-500" />
                      ) : (
                        <Brain className="w-5 h-5 text-synapse-violet" />
                      )}
                      <span>{item.label}</span>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

          </nav>

          {/* Language Toggle & Social Links - Desktop */}
          <div className="hidden md:flex items-center gap-2">
            {/* Language Toggle with Flags */}
            <Button
              variant="outline"
              size="sm"
              onClick={toggleLanguage}
              className="gap-2 font-medium px-3"
            >
              {/* French Flag */}
              <svg 
                className={`w-5 h-4 rounded-sm ${language === "fr" ? "opacity-100 ring-2 ring-primary ring-offset-1" : "opacity-50"}`} 
                viewBox="0 0 30 20"
                aria-label="Francais"
              >
                <rect width="10" height="20" fill="#002395"/>
                <rect x="10" width="10" height="20" fill="#FFFFFF"/>
                <rect x="20" width="10" height="20" fill="#ED2939"/>
              </svg>
              <span className="text-muted-foreground">/</span>
              {/* UK Flag */}
              <svg 
                className={`w-5 h-4 rounded-sm ${language === "en" ? "opacity-100 ring-2 ring-primary ring-offset-1" : "opacity-50"}`} 
                viewBox="0 0 60 30"
                aria-label="English"
              >
                <rect width="60" height="30" fill="#012169"/>
                <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6"/>
                <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="4" clipPath="url(#clip)"/>
                <path d="M30,0 V30 M0,15 H60" stroke="#fff" strokeWidth="10"/>
                <path d="M30,0 V30 M0,15 H60" stroke="#C8102E" strokeWidth="6"/>
              </svg>
            </Button>

            <div className="w-px h-6 bg-border mx-1" />

            <Button variant="ghost" size="icon" asChild>
              <a href="https://github.com/aperichon-oss" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Github className="w-4 h-4" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a href="https://www.linkedin.com/in/aurélie-perichon-4451122b9/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Linkedin className="w-4 h-4" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a href="mailto:aurelieperichon@gmail.com" aria-label="Email">
                <Mail className="w-4 h-4" />
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            {/* Language Toggle - Mobile with Flags */}
            <Button
              variant="outline"
              size="sm"
              onClick={toggleLanguage}
              className="gap-1.5 px-2"
            >
              {/* French Flag */}
              <svg 
                className={`w-5 h-3.5 rounded-sm ${language === "fr" ? "opacity-100 ring-1 ring-primary" : "opacity-50"}`} 
                viewBox="0 0 30 20"
              >
                <rect width="10" height="20" fill="#002395"/>
                <rect x="10" width="10" height="20" fill="#FFFFFF"/>
                <rect x="20" width="10" height="20" fill="#ED2939"/>
              </svg>
              <span className="text-muted-foreground text-xs">/</span>
              {/* UK Flag */}
              <svg 
                className={`w-5 h-3.5 rounded-sm ${language === "en" ? "opacity-100 ring-1 ring-primary" : "opacity-50"}`} 
                viewBox="0 0 60 30"
              >
                <rect width="60" height="30" fill="#012169"/>
                <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6"/>
                <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="4"/>
                <path d="M30,0 V30 M0,15 H60" stroke="#fff" strokeWidth="10"/>
                <path d="M30,0 V30 M0,15 H60" stroke="#C8102E" strokeWidth="6"/>
              </svg>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? t("nav.closeMenu") : t("nav.openMenu")}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-b border-border overflow-hidden"
          >
            <nav className="flex flex-col p-4 gap-2">
              <Link href="/" onClick={() => setIsOpen(false)}>
                <Button
                  variant={pathname === "/" ? "secondary" : "ghost"}
                  className="w-full justify-start"
                >
                  {t("nav.home")}
                </Button>
              </Link>

              <Link href="/about" onClick={() => setIsOpen(false)}>
                <Button
                  variant={pathname === "/about" ? "secondary" : "ghost"}
                  className="w-full justify-start"
                >
                  {t("nav.about")}
                </Button>
              </Link>

              {/* Projects Section - Mobile */}
              <div className="space-y-1">
                <Button
                  variant={isProjectPage ? "secondary" : "ghost"}
                  className="w-full justify-between"
                  onClick={() => setProjectsOpen(!projectsOpen)}
                >
                  {t("nav.projects")}
                  <ChevronDown className={`w-4 h-4 transition-transform ${projectsOpen ? 'rotate-180' : ''}`} />
                </Button>

                <AnimatePresence>
                  {projectsOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pl-4 space-y-1"
                    >
                      {projectItems.map((item) => (
                        <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)}>
                          <Button
                            variant={pathname === item.href ? "secondary" : "ghost"}
                            className="w-full justify-start gap-2"
                          >
                            {item.icon ? (
                              <Image
                                src={assetPath(item.icon)}
                                alt={item.label}
                                width={20}
                                height={20}
                                className="w-5 h-5 object-contain"
                              />
                            ) : item.iconComponent === "brain" ? (
                              <Brain className="w-5 h-5 text-synapse-violet" />
                            ) : item.iconComponent === "graduation" ? (
                              <GraduationCap className="w-5 h-5 text-[#8B2346]" />
                            ) : item.iconComponent === "chart" ? (
                              <BarChart3 className="w-5 h-5 text-blue-500" />
                            ) : (
                              <Brain className="w-5 h-5 text-synapse-violet" />
                            )}
                            {item.label}
                          </Button>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="flex items-center gap-2 pt-4 border-t border-border mt-2">
                <Button variant="ghost" size="icon" asChild>
                  <a href="https://github.com/aperichon-oss" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                    <Github className="w-4 h-4" />
                  </a>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                  <a href="https://www.linkedin.com/in/aurélie-perichon-4451122b9/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <Linkedin className="w-4 h-4" />
                  </a>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                  <a href="mailto:aurelieperichon@gmail.com" aria-label="Email">
                    <Mail className="w-4 h-4" />
                  </a>
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header >
  )
}
