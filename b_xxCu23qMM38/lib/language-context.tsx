"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

type Language = "fr" | "en"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations: Record<Language, Record<string, string>> = {
  fr: {
    // Navigation
    "nav.home": "Accueil",
    "nav.about": "A propos",
    "nav.projects": "Projets",
    "nav.openMenu": "Ouvrir le menu",
    "nav.closeMenu": "Fermer le menu",
    
    // Home Page
    "home.badge": "Portfolio 2025",
    "home.title": "Aurelie Perichon",
    "home.subtitle": "Etudiante en MSc AI Applied to Business",
    "home.description": "Passionnee par l'analyse de donnees au service de la strategie et de l'innovation. Je combine expertise technique et vision business pour creer des solutions impactantes.",
    "home.cta": "Decouvrir mes projets",
    "home.projectsTitle": "Mes Projets",
    "home.projectsDescription": "Decouvrez mes realisations a travers des experiences interactives uniques. Chaque projet raconte une histoire differente.",
    "home.explore": "Explorer",
    "home.stat.projects": "Projets realises",
    "home.stat.tech": "Technologies",
    "home.stat.degree": "Formation en cours",
    "home.stat.experience": "Experience retail",
    
    // Project Cards
    "project.marioKart.title": "Mario Kart",
    "project.marioKart.tagline": "Web scraping des records mondiaux de Mario Kart 8. Extraction et analyse de donnees de performance.",
    "project.zigzag.title": "ZigZag",
    "project.zigzag.tagline": "Jeu multijoueur en ligne ou les messages se transforment. Experience temps reel avec authentification.",
    "project.synapse.title": "Synapse",
    "project.synapse.tagline": "Chatbot RAG pour la recherche scientifique. Acces a 182K+ theses francaises avec citations.",
    
    // Mario Kart Page
    "mario.badge": "Projet Data",
    "mario.title": "Mario Kart World Records",
    "mario.description": "Controlez la voiture avec les fleches ou en cliquant pour decouvrir le projet de web scraping des records mondiaux de Mario Kart 8",
    "mario.startRace": "Commencer la course",
    "mario.restart": "Recommencer",
    "mario.continue": "Continuer",
    "mario.finish": "Arrivee",
    "mario.controls": "Controles",
    "mario.controlsDesc": "Fleches gauche/droite ou cliquez sur les cotes",
    "mario.checkpoint.context": "Contexte",
    "mario.checkpoint.demo": "Demo",
    "mario.checkpoint.presentation": "Presentation",
    "mario.context.title": "Web Scraping Mario Kart 8",
    "mario.context.description": "Extraction et analyse des records mondiaux de Mario Kart 8 depuis le site Mario Kart World Records.",
    "mario.context.detail1": "Scraping automatise des temps records sur toutes les pistes",
    "mario.context.detail2": "Extraction des donnees joueurs, vehicules et configurations",
    "mario.context.detail3": "Objectif : Identifier les meilleures meta et strategies competitives",
    "mario.demo.title": "Demo du Scraping",
    "mario.demo.description": "Cette video montre le processus de scraping en action. Le script extrait les donnees et genere un fichier CSV contenant toutes les informations nettoyees et structurees.",
    "mario.demo.csvOutput": "Export CSV avec donnees nettoyees",
    "mario.presentation.title": "Presentation du Projet",
    "mario.presentation.description": "Decouvrez l'analyse complete des donnees, les insights et les resultats dans la presentation Canva.",
    "mario.presentation.view": "Voir la presentation",
    "mario.tech.title": "Stack Technique",
    "mario.tech.used": "Technologies utilisees",
    "mario.tech.files": "Fichiers principaux",
    "mario.results.title": "Resultats du Projet",
    "mario.results.execTime": "Temps d'execution",
    "mario.results.dataExtracted": "Donnees extraites",
    "mario.results.realtime": "Temps reel",
    "mario.sourceCode": "Code source",
    "mario.viewResults": "Voir les resultats",
    "mario.raceComplete": "Course terminee !",
    "mario.raceCompleteDesc": "Vous avez decouvert tous les aspects du projet Mario Kart World Records",
    "mario.viewGithub": "Voir sur GitHub",
    "mario.replay": "Rejouer",
    
    // ZigZag Page
    "zigzag.badge": "Mini-Jeu",
    "zigzag.title": "ZigZag",
    "zigzag.description": "Jouez au mini-jeu pour decouvrir le projet ! Cliquez pour changer de direction et atteignez les objectifs de chaque niveau.",
    "zigzag.level": "Niveau",
    "zigzag.tutorial": "Tutoriel",
    "zigzag.intermediate": "Intermediaire",
    "zigzag.challenger": "Challenger",
    "zigzag.play": "Jouer",
    "zigzag.restart": "Recommencer",
    "zigzag.gameOver": "Game Over!",
    "zigzag.score": "Score",
    "zigzag.clickToChange": "Cliquez ou appuyez pour changer de direction",
    "zigzag.levelComplete": "Niveau {level} complete !",
    "zigzag.nextLevel": "Niveau suivant",
    "zigzag.replay": "Rejouer",
    "zigzag.projectLinks": "Liens du projet",
    "zigzag.playOnSite": "Jouer sur zig-zag.fun",
    "zigzag.viewSource": "Voir le code source",
    "zigzag.progress": "Progression",
    "zigzag.pointsRequired": "points requis",
    "zigzag.info1.title": "ZigZag - Jeu Multijoueur",
    "zigzag.info1.description": "Jeu multijoueur en ligne ou les messages se transforment. Une experience sociale unique et ludique.",
    "zigzag.info2.title": "Stack Technique",
    "zigzag.info2.description": "Application moderne avec authentification securisee et base de donnees temps reel.",
    "zigzag.info3.title": "Fonctionnalites",
    "zigzag.info3.description": "Experience complete avec synchronisation instantanee et deploiement production.",
    "zigzag.technologies": "Technologies",
    "zigzag.features": "Fonctionnalites",
    "zigzag.realtime": "Temps reel",
    "zigzag.auth": "Authentification",
    "zigzag.deployed": "Deploye sur zig-zag.fun",
    
    // Synapse Page
    "synapse.badge": "Chatbot RAG",
    "synapse.title": "Synapse",
    "synapse.subtitle": "Chatbot RAG pour la Recherche Scientifique",
    "synapse.description": "Communication entre donnees et intelligence artificielle. Explorez 182K+ theses francaises avec des questions/reponses contextuelles.",
    "synapse.viewGithub": "Voir sur GitHub",
    "synapse.explore": "Explorer",
    "synapse.featuresTitle": "Fonctionnalites",
    "synapse.featuresSubtitle": "Trois piliers pour une recherche intelligente",
    "synapse.feature1.title": "Recherche HAL",
    "synapse.feature1.description": "Acces a 182K+ theses francaises via l'API HAL",
    "synapse.feature2.title": "Chat RAG",
    "synapse.feature2.description": "Questions/Reponses contextuelles avec citations",
    "synapse.feature3.title": "ML Features",
    "synapse.feature3.description": "Classification, resumes, recommandations",
    "synapse.stackTitle": "Stack Technique",
    "synapse.stackSubtitle": "Technologies modernes pour une architecture robuste",
    "synapse.backend": "Backend",
    "synapse.frontend": "Frontend",
    "synapse.database": "Base de donnees",
    "synapse.pipelineTitle": "Pipeline RAG",
    "synapse.pipelineSubtitle": "De la question a la reponse contextualisee",
    "synapse.pipeline.request": "Requete",
    "synapse.pipeline.api": "HAL API",
    "synapse.pipeline.extraction": "Extraction PDF",
    "synapse.pipeline.vectorization": "Vectorisation",
    "synapse.pipeline.chat": "Chat",
    "synapse.pipeline.response": "Reponse",
    "synapse.ctaTitle": "Explorez le projet",
    "synapse.ctaDescription": "Decouvrez le code source, la documentation et contribuez au developpement de Synapse sur GitHub.",
    
    // About Page
    "about.badge": "A propos",
    "about.title": "Aurelie Perichon",
    "about.subtitle": "Etudiante en MSc AI Applied to Business",
    "about.contact": "Contact",
    "about.languages": "Langues",
    "about.french": "Francais",
    "about.english": "Anglais",
    "about.native": "Natif",
    "about.interests": "Centres d'interet",
    "about.interest.gaming": "Jeux video",
    "about.interest.singing": "Chant",
    "about.interest.asian": "Culture asiatique",
    "about.interest.climbing": "Escalade",
    "about.interest.dance": "Danse",
    "about.interest.travel": "Voyage",
    "about.profile": "Profil",
    "about.profileText": "Forte d'une experience en marketing digital et de 5 ans dans le retail, je me specialise aujourd'hui dans la data. Passionnee par l'analyse de donnees au service de la strategie et de l'innovation, je combine expertise technique et vision business pour creer des solutions impactantes.",
    "about.education": "Formation",
    "about.current": "En cours",
    "about.experience": "Experience",
    "about.skills": "Competences",
    "about.ctaTitle": "Interesse(e) par mon profil ?",
    "about.ctaDescription": "N'hesitez pas a me contacter pour discuter de projets ou opportunites.",
    "about.contactMe": "Me contacter",
    
    // Footer
    "footer.description": "Etudiante en MSc AI Applied to Business, passionnee par l'analyse de donnees au service de la strategie et de l'innovation.",
    "footer.projects": "Projets",
    "footer.contact": "Contact",
    "footer.rights": "Tous droits reserves.",
    "footer.marioKart": "Mario Kart - Web Scraping",
    "footer.zigzag": "ZigZag - Mini-Jeu",
    "footer.synapse": "Synapse - Chatbot RAG",
  },
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.about": "About",
    "nav.projects": "Projects",
    "nav.openMenu": "Open menu",
    "nav.closeMenu": "Close menu",
    
    // Home Page
    "home.badge": "Portfolio 2025",
    "home.title": "Aurelie Perichon",
    "home.subtitle": "MSc AI Applied to Business Student",
    "home.description": "Passionate about data analysis to drive strategy and innovation. I combine technical expertise and business vision to create impactful solutions.",
    "home.cta": "Discover my projects",
    "home.projectsTitle": "My Projects",
    "home.projectsDescription": "Explore my work through unique interactive experiences. Each project tells a different story.",
    "home.explore": "Explore",
    "home.stat.projects": "Projects completed",
    "home.stat.tech": "Technologies",
    "home.stat.degree": "Ongoing degree",
    "home.stat.experience": "Retail experience",
    
    // Project Cards
    "project.marioKart.title": "Mario Kart",
    "project.marioKart.tagline": "Web scraping of Mario Kart 8 world records. Performance data extraction and analysis.",
    "project.zigzag.title": "ZigZag",
    "project.zigzag.tagline": "Online multiplayer game where messages transform. Real-time experience with authentication.",
    "project.synapse.title": "Synapse",
    "project.synapse.tagline": "RAG Chatbot for scientific research. Access to 182K+ French theses with citations.",
    
    // Mario Kart Page
    "mario.badge": "Data Project",
    "mario.title": "Mario Kart World Records",
    "mario.description": "Control the car with arrow keys or by clicking to discover the web scraping project of Mario Kart 8 world records",
    "mario.startRace": "Start the race",
    "mario.restart": "Restart",
    "mario.continue": "Continue",
    "mario.finish": "Finish",
    "mario.controls": "Controls",
    "mario.controlsDesc": "Left/right arrows or click on sides",
    "mario.checkpoint.context": "Context",
    "mario.checkpoint.demo": "Demo",
    "mario.checkpoint.presentation": "Presentation",
    "mario.context.title": "Mario Kart 8 Web Scraping",
    "mario.context.description": "Extraction and analysis of Mario Kart 8 world records from Mario Kart World Records website.",
    "mario.context.detail1": "Automated scraping of record times on all tracks",
    "mario.context.detail2": "Extraction of player, vehicle and configuration data",
    "mario.context.detail3": "Goal: Identify the best competitive meta and strategies",
    "mario.demo.title": "Scraping Demo",
    "mario.demo.description": "This video shows the scraping process in action. The script extracts data and generates a CSV file containing all cleaned and structured information.",
    "mario.demo.csvOutput": "CSV export with cleaned data",
    "mario.presentation.title": "Project Presentation",
    "mario.presentation.description": "Discover the complete data analysis, insights and results in the Canva presentation.",
    "mario.presentation.view": "View presentation",
    "mario.tech.title": "Tech Stack",
    "mario.tech.used": "Technologies used",
    "mario.tech.files": "Main files",
    "mario.results.title": "Project Results",
    "mario.results.execTime": "Execution time",
    "mario.results.dataExtracted": "Data extracted",
    "mario.results.realtime": "Real-time",
    "mario.sourceCode": "Source code",
    "mario.viewResults": "View results",
    "mario.raceComplete": "Race complete!",
    "mario.raceCompleteDesc": "You have discovered all aspects of the Mario Kart World Records project",
    "mario.viewGithub": "View on GitHub",
    "mario.replay": "Replay",
    
    // ZigZag Page
    "zigzag.badge": "Mini-Game",
    "zigzag.title": "ZigZag",
    "zigzag.description": "Play the mini-game to discover the project! Click to change direction and reach each level's goals.",
    "zigzag.level": "Level",
    "zigzag.tutorial": "Tutorial",
    "zigzag.intermediate": "Intermediate",
    "zigzag.challenger": "Challenger",
    "zigzag.play": "Play",
    "zigzag.restart": "Restart",
    "zigzag.gameOver": "Game Over!",
    "zigzag.score": "Score",
    "zigzag.clickToChange": "Click or tap to change direction",
    "zigzag.levelComplete": "Level {level} complete!",
    "zigzag.nextLevel": "Next level",
    "zigzag.replay": "Replay",
    "zigzag.projectLinks": "Project links",
    "zigzag.playOnSite": "Play on zig-zag.fun",
    "zigzag.viewSource": "View source code",
    "zigzag.progress": "Progress",
    "zigzag.pointsRequired": "points required",
    "zigzag.info1.title": "ZigZag - Multiplayer Game",
    "zigzag.info1.description": "Online multiplayer game where messages transform. A unique and fun social experience.",
    "zigzag.info2.title": "Tech Stack",
    "zigzag.info2.description": "Modern application with secure authentication and real-time database.",
    "zigzag.info3.title": "Features",
    "zigzag.info3.description": "Complete experience with instant synchronization and production deployment.",
    "zigzag.technologies": "Technologies",
    "zigzag.features": "Features",
    "zigzag.realtime": "Real-time",
    "zigzag.auth": "Authentication",
    "zigzag.deployed": "Deployed on zig-zag.fun",
    
    // Synapse Page
    "synapse.badge": "RAG Chatbot",
    "synapse.title": "Synapse",
    "synapse.subtitle": "RAG Chatbot for Scientific Research",
    "synapse.description": "Communication between data and artificial intelligence. Explore 182K+ French theses with contextual Q&A.",
    "synapse.viewGithub": "View on GitHub",
    "synapse.explore": "Explore",
    "synapse.featuresTitle": "Features",
    "synapse.featuresSubtitle": "Three pillars for intelligent research",
    "synapse.feature1.title": "HAL Search",
    "synapse.feature1.description": "Access to 182K+ French theses via HAL API",
    "synapse.feature2.title": "RAG Chat",
    "synapse.feature2.description": "Contextual Q&A with citations",
    "synapse.feature3.title": "ML Features",
    "synapse.feature3.description": "Classification, summaries, recommendations",
    "synapse.stackTitle": "Tech Stack",
    "synapse.stackSubtitle": "Modern technologies for a robust architecture",
    "synapse.backend": "Backend",
    "synapse.frontend": "Frontend",
    "synapse.database": "Database",
    "synapse.pipelineTitle": "RAG Pipeline",
    "synapse.pipelineSubtitle": "From question to contextualized answer",
    "synapse.pipeline.request": "Request",
    "synapse.pipeline.api": "HAL API",
    "synapse.pipeline.extraction": "PDF Extraction",
    "synapse.pipeline.vectorization": "Vectorization",
    "synapse.pipeline.chat": "Chat",
    "synapse.pipeline.response": "Response",
    "synapse.ctaTitle": "Explore the project",
    "synapse.ctaDescription": "Discover the source code, documentation and contribute to Synapse development on GitHub.",
    
    // About Page
    "about.badge": "About",
    "about.title": "Aurelie Perichon",
    "about.subtitle": "MSc AI Applied to Business Student",
    "about.contact": "Contact",
    "about.languages": "Languages",
    "about.french": "French",
    "about.english": "English",
    "about.native": "Native",
    "about.interests": "Interests",
    "about.interest.gaming": "Video games",
    "about.interest.singing": "Singing",
    "about.interest.asian": "Asian culture",
    "about.interest.climbing": "Climbing",
    "about.interest.dance": "Dance",
    "about.interest.travel": "Travel",
    "about.profile": "Profile",
    "about.profileText": "With experience in digital marketing and 5 years in retail, I now specialize in data. Passionate about data analysis to drive strategy and innovation, I combine technical expertise and business vision to create impactful solutions.",
    "about.education": "Education",
    "about.current": "Current",
    "about.experience": "Experience",
    "about.skills": "Skills",
    "about.ctaTitle": "Interested in my profile?",
    "about.ctaDescription": "Feel free to contact me to discuss projects or opportunities.",
    "about.contactMe": "Contact me",
    
    // Footer
    "footer.description": "MSc AI Applied to Business student, passionate about data analysis to drive strategy and innovation.",
    "footer.projects": "Projects",
    "footer.contact": "Contact",
    "footer.rights": "All rights reserved.",
    "footer.marioKart": "Mario Kart - Web Scraping",
    "footer.zigzag": "ZigZag - Mini-Game",
    "footer.synapse": "Synapse - RAG Chatbot",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("fr")

  useEffect(() => {
    const saved = localStorage.getItem("portfolio-language") as Language
    if (saved && (saved === "fr" || saved === "en")) {
      setLanguageState(saved)
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem("portfolio-language", lang)
  }

  const t = (key: string): string => {
    return translations[language][key] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
