"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ProjectCardProps {
  title: string
  tagline: string
  icon: React.ReactNode
  href: string
  gradient?: string
  glowClass: string
  exploreLabel?: string
  external?: boolean
  characterImage?: string
  characterAlt?: string
}

export function ProjectCard({
  title,
  tagline,
  icon,
  href,
  gradient,
  glowClass,
  exploreLabel = "Explorer",
  external = false,
  characterImage,
  characterAlt = "",
}: ProjectCardProps) {
  const CardContent = (
    <div className={`relative p-6 rounded-2xl bg-card border border-border overflow-hidden transition-all duration-300 group-hover:border-primary/50 group-hover:${glowClass}`}>
      {/* Gradient background */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 ${gradient || 'bg-gradient-to-br from-primary to-accent'}`} />
      {characterImage && (
        <img
          src={characterImage}
          alt={characterAlt}
          aria-hidden={!characterAlt}
          className="pointer-events-none absolute right-4 top-4 z-0 h-20 w-32 object-contain object-right-top opacity-100 transition-transform duration-300 group-hover:scale-105 sm:h-24 sm:w-40"
        />
      )}
      
      {/* Content */}
      <div className="relative z-10 space-y-4 pr-24 sm:pr-32">
        {/* Icon */}
        <div className="flex h-14 w-14 items-center justify-center text-2xl">
          {icon}
        </div>
        
        {/* Title */}
        <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors flex items-center gap-2">
          {title}
          {external && <ExternalLink className="w-4 h-4 text-muted-foreground" />}
        </h3>
        
        {/* Tagline */}
        <p className="text-muted-foreground text-sm leading-relaxed">
          {tagline}
        </p>
        
        {/* CTA */}
        <Button variant="ghost" className="group/btn p-0 h-auto text-primary">
          {external ? (exploreLabel === "Explorer" ? "Voir sur GitHub" : "View on GitHub") : exploreLabel}
          <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
        </Button>
      </div>
    </div>
  )

  if (external) {
    return (
      <motion.div
        whileHover={{ y: -5 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <a href={href} target="_blank" rel="noopener noreferrer" className="block group">
          {CardContent}
        </a>
      </motion.div>
    )
  }

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Link href={href} className="block group">
        {CardContent}
      </Link>
    </motion.div>
  )
}
