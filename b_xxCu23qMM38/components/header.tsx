"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Github, Linkedin, Mail, ChevronDown, Brain } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useLanguage } from "@/lib/language-context"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [projectsOpen, setProjectsOpen] = useState(false)
  const pathname = usePathname()
  const { language, setLanguage, t } = useLanguage()

  const projectItems = [
    {
      href: "/mario-kart",
      label: "Mario Kart",
      icon: "/images/mario-icon.png"
    },
    {
      href: "/zigzag",
      label: "ZigZag",
      icon: "/images/zigzag-logo.webp"
    },
    {
      href: "/synapse",
      label: "Synapse",
      icon: null
    },
  ]

  const isProjectPage = ["/mario-kart", "/zigzag", "/synapse"].includes(pathname)

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
                src="/images/profile.jpg"
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
                          src={item.icon}
                          alt={item.label}
                          width={20}
                          height={20}
                          className="w-5 h-5 object-contain"
                        />
                      ) : (
                        <Brain className="w-5 h-5 text-synapse-violet" />
                      )}
                      <span>{item.label}</span>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link href="/about">
              <Button
                variant={pathname === "/about" ? "secondary" : "ghost"}
                size="sm"
                className="relative"
              >
                {t("nav.about")}
              </Button>
            </Link>
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
              <span className={`text-lg ${language === "fr" ? "opacity-100" : "opacity-40"}`} title="Francais">
                🇫🇷
              </span>
              <span className="text-muted-foreground">/</span>
              <span className={`text-lg ${language === "en" ? "opacity-100" : "opacity-40"}`} title="English">
                🇬🇧
              </span>
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
              <span className={`text-base ${language === "fr" ? "opacity-100" : "opacity-40"}`}>🇫🇷</span>
              <span className="text-muted-foreground text-xs">/</span>
              <span className={`text-base ${language === "en" ? "opacity-100" : "opacity-40"}`}>🇬🇧</span>
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
                                src={item.icon}
                                alt={item.label}
                                width={20}
                                height={20}
                                className="w-5 h-5 object-contain"
                              />
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

              <Link href="/about" onClick={() => setIsOpen(false)}>
                <Button
                  variant={pathname === "/about" ? "secondary" : "ghost"}
                  className="w-full justify-start"
                >
                  {t("nav.about")}
                </Button>
              </Link>

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
