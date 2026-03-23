"use client"

import { useRef, useEffect, useState, useCallback } from "react"
import {
  useScroll, useTransform, useSpring, useMotionValue,
  type MotionValue,
} from "framer-motion"

// ========== CLASSIC HOOKS (IntersectionObserver-based) ==========

/** Fade-in when element scrolls into view (for non-Framer components) */
export function useFadeInOnScroll(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, isVisible }
}

/** Parallax effect on scroll */
export function useParallax(speed = 0.1) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const handleScroll = () => {
      const rect = node.getBoundingClientRect()
      const scrolled = window.innerHeight - rect.top
      if (scrolled > 0) {
        const yOffset = scrolled * speed
        const img = node.querySelector(".parallax-img") as HTMLElement
        if (img) img.style.transform = `translateY(${yOffset}px)`
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [speed])

  return ref
}

// ========== FRAMER MOTION SCROLL HOOKS ==========

/**
 * useScrollParallax — smooth parallax driven by Framer Motion's useScroll.
 * @param ref  Target reference for scroll tracking
 * @param offset  How far the element travels relative to scroll (default 80px)
 * @param spring  Spring smoothing config
 */
export function useScrollParallax(ref: React.RefObject<HTMLElement | null>, offset = 80, spring = { stiffness: 100, damping: 30 }) {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })
  const rawY = useTransform(scrollYProgress, [0, 1], [offset, -offset])
  return useSpring(rawY, spring)
}

/**
 * useScrollScale — element scales from `from` to `to` as it enters the viewport.
 */
export function useScrollScale(ref: React.RefObject<HTMLElement | null>, from = 0.85, to = 1) {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })
  const rawScale = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [from, to, to, from])
  return useSpring(rawScale, { stiffness: 120, damping: 20 })
}

/**
 * useScrollRotate — subtle rotation driven by scroll position.
 */
export function useScrollRotate(ref: React.RefObject<HTMLElement | null>, degrees = 15) {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })
  const rawRotate = useTransform(scrollYProgress, [0, 1], [-degrees, degrees])
  return useSpring(rawRotate, { stiffness: 80, damping: 20 })
}

/**
 * useScrollOpacity — element fades in as it enters, fades out as it leaves.
 */
export function useScrollOpacity(ref: React.RefObject<HTMLElement | null>) {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })
  return useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
}

/**
 * useScrollX — horizontal translate driven by vertical scroll.
 */
export function useScrollX(ref: React.RefObject<HTMLElement | null>, distance = 100, direction: "left" | "right" = "left") {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })
  const sign = direction === "left" ? -1 : 1
  const rawX = useTransform(scrollYProgress, [0, 0.5, 1], [sign * distance, 0, sign * -distance * 0.3])
  return useSpring(rawX, { stiffness: 100, damping: 25 })
}

// ========== FRAMER MOTION VARIANTS ==========

/**
 * Curva de easing estándar del sitio — usada en todas las variantes de animación.
 * Equivale a cubic-bezier(0.22, 1, 0.36, 1): entrada rápida, salida suave.
 * Centralizada aquí para mantener consistencia visual en todo el sitio (DRY).
 */
const EASE = [0.22, 1, 0.36, 1] as const

/** Stagger children on viewport entry */
export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
}

/** Fade up from below */
export const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
}

/** Fade down from above */
export const fadeDown = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
}

/** Fade in from left */
export const fadeLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: EASE },
  },
}

/** Fade in from right */
export const fadeRight = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: EASE },
  },
}

/** Scale up from 0.85 */
export const scaleUp = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: EASE },
  },
}

/** Blur-in reveal */
export const blurIn = {
  hidden: { opacity: 0, filter: "blur(12px)" },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: EASE },
  },
}

/** Card hover animation (for whileHover) */
export const cardHover = {
  y: -6,
  scale: 1.02,
  transition: { duration: 0.3, ease: "easeOut" as const },
}

/** Rotate in on scroll */
export const rotateIn = {
  hidden: { opacity: 0, rotate: -5, scale: 0.95 },
  visible: {
    opacity: 1,
    rotate: 0,
    scale: 1,
    transition: { duration: 0.6, ease: EASE },
  },
}

/** Counter animation — smooth number count */
export function useCountUp(end: number, duration = 2000, startOnView = true) {
  const [count, setCount] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!startOnView) {
      setHasStarted(true)
      return
    }
    const node = ref.current
    if (!node) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [startOnView])

  useEffect(() => {
    if (!hasStarted) return
    let start = 0
    const startTime = performance.now()

    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * end))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [hasStarted, end, duration])

  return { count, ref }
}

/** Viewport-based trigger config for motion components */
export const viewportOnce = { once: true, amount: 0.2 as const }
