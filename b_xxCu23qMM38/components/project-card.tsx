"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ProjectCardProps {
  title: string
  tagline: string
  icon: React.ReactNode
  href: string
  gradient: string
  glowClass: string
  exploreLabel?: string
}

export function ProjectCard({ title, tagline, icon, href, gradient, glowClass, exploreLabel = "Explorer" }: ProjectCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Link href={href} className="block group">
        <div className={`relative p-6 rounded-2xl bg-card border border-border overflow-hidden transition-all duration-300 group-hover:border-primary/50 group-hover:${glowClass}`}>
          {/* Gradient background */}
          <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 ${gradient}`} />
          
          {/* Content */}
          <div className="relative z-10 space-y-4">
            {/* Icon */}
            <div className={`w-14 h-14 rounded-xl ${gradient} flex items-center justify-center text-2xl`}>
              {icon}
            </div>
            
            {/* Title */}
            <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
              {title}
            </h3>
            
            {/* Tagline */}
            <p className="text-muted-foreground text-sm leading-relaxed">
              {tagline}
            </p>
            
            {/* CTA */}
            <Button variant="ghost" className="group/btn p-0 h-auto text-primary">
              {exploreLabel}
              <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
