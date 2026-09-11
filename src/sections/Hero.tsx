import React, { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { GoldParticles, PetalParticles } from '../components/GoldParticles'
import { FloralCornerLeft, FloralCornerRight, TempleSilhouette } from '../components/FloralDecor'
import { OrnamentDivider } from '../components/OrnamentDivider'
import { COPY, WEDDING } from '../data/weddingData'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { useCountdown } from '../hooks/useCountdown'

// ─── Inline hero countdown ────────────────────────────────────────────────────
// Ivory card · gold border · navy Playfair Display number · gold label

const AnimatedDigit: React.FC<{ value: number }> = ({ value }) => {
  const [key, setKey] = useState(0)
  const [prev, setPrev] = useState(value)

  useEffect(() => {
    if (value !== prev) { setPrev(value); setKey(k => k + 1) }
  }, [value, prev])

  return (
    <motion.span
      key={key}
      className="font-serif text-navy leading-none select-none"
      style={{
        fontSize: 'clamp(1.6rem, 7vw, 3.2rem)',
        fontWeight: 400,
        fontStyle: 'normal',
        letterSpacing: '0.02em',
      }}
      initial={{ y: -8, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      aria-live="polite"
      aria-atomic="true"
    >
      {String(value).padStart(2, '0')}
    </motion.span>
  )
}

const HeroCountdown: React.FC<{ staggerDelay: number }> = ({ staggerDelay }) => {
  const { days, hours, minutes, seconds, isWeddingDay } = useCountdown(WEDDING.date.countdownTarget)

  const units = [
    { value: days,    label: 'Days' },
    { value: hours,   label: 'Hours' },
    { value: minutes, label: 'Mins' },
    { value: seconds, label: 'Secs' },
  ]

  if (isWeddingDay) {
    return (
      <motion.p
        className="font-display italic text-navy/70"
        style={{ fontSize: 'clamp(1rem, 3vw, 1.3rem)' }}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: staggerDelay }}
      >
        Today is the day ❤️
      </motion.p>
    )
  }

  return (
    <motion.div
      className="flex items-start justify-center gap-2 sm:gap-2.5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: staggerDelay }}
      role="timer"
      aria-label={`${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds until the wedding`}
    >
      {units.map((u, i) => (
        <React.Fragment key={u.label}>

          {/* ── Card ── */}
          <div className="flex flex-col items-center gap-1.5">
            <div
              className="relative flex items-center justify-center"
              style={{
                width:      'clamp(54px, 13.5vw, 80px)',
                height:     'clamp(60px, 15vw, 88px)',
                background: '#F7F1E5',
                border:     '1px solid rgba(198,146,46,0.45)',
                boxShadow:  '0 2px 12px rgba(198,146,46,0.08), inset 0 1px 0 rgba(255,255,255,0.8)',
              }}
            >
              {/* Gold corner ticks */}
              {(['tl','tr','bl','br'] as const).map((pos) => (
                <div
                  key={pos}
                  className={`absolute w-2 h-2 pointer-events-none ${
                    pos === 'tl' ? 'top-[4px] left-[4px] border-t border-l' :
                    pos === 'tr' ? 'top-[4px] right-[4px] border-t border-r' :
                    pos === 'bl' ? 'bottom-[4px] left-[4px] border-b border-l' :
                                   'bottom-[4px] right-[4px] border-b border-r'
                  }`}
                  style={{ borderColor: 'rgba(198,146,46,0.6)' }}
                  aria-hidden="true"
                />
              ))}
              <AnimatedDigit value={u.value} />
            </div>

            {/* Label */}
            <span
              className="font-body font-bold tracking-[0.25em] uppercase"
              style={{ fontSize: 'clamp(0.5rem, 1.3vw, 0.6rem)', color: '#9E7020' }}
            >
              {u.label}
            </span>
          </div>

          {/* Dot separator */}
          {i < 3 && (
            <div className="flex flex-col gap-1 self-center pb-5" aria-hidden="true">
              <div className="w-[3px] h-[3px] rounded-full" style={{ background: 'rgba(198,146,46,0.35)' }} />
              <div className="w-[3px] h-[3px] rounded-full" style={{ background: 'rgba(198,146,46,0.35)' }} />
            </div>
          )}

        </React.Fragment>
      ))}
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────

// ─────────────────────────────────────────────────────────────────────────────

// ─── Scroll Indicator ────────────────────────────────────────────────────────

// Arrow dimensions — tweak here to resize the whole indicator
const ARROW_LINE_H  = 56   // px — length of the shaft
const ARROW_W       = 20   // px — full arrowhead width (each wing = half)
const ARROW_HEAD_H  = 10   // px — arrowhead height

// ─── Scroll Indicator ────────────────────────────────────────────────────────

const ScrollIndicator: React.FC = () => {
  const reduced = useReducedMotion()

  return (
    <motion.div
      className="mt-8 flex flex-col items-center select-none pointer-events-none"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.6, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      aria-label="Scroll down"
      role="presentation"
    >
      {/* ── SCROLL label in bold gold ── */}
      <div className="flex items-center gap-2.5 mb-2.5">
        <span className="w-2 h-2 rotate-45 bg-gold shadow-sm" aria-hidden="true" />
        <motion.span
          className="font-body tracking-[0.35em] uppercase"
          style={{
            fontSize: '0.72rem',
            fontWeight: 800,
            color: '#B88A3B',
            textShadow: '0 1px 2px rgba(184,138,59,0.15)',
          }}
          animate={reduced ? {} : { opacity: [0.85, 1, 0.85] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          Scroll
        </motion.span>
        <span className="w-2 h-2 rotate-45 bg-gold shadow-sm" aria-hidden="true" />
      </div>

      {/* ── Animated Bold Gold Arrow ── */}
      <motion.div
        className="relative flex flex-col items-center"
        animate={reduced ? {} : { y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg
          width="28"
          height="50"
          viewBox="0 0 28 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          className="overflow-visible"
        >
          {/* Static track */}
          <line
            x1="14"
            y1="2"
            x2="14"
            y2="34"
            stroke="#B88A3B"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeOpacity="0.45"
          />

          {/* Animated drawing shaft */}
          {!reduced && (
            <motion.line
              x1="14"
              y1="2"
              x2="14"
              y2="34"
              stroke="#B88A3B"
              strokeWidth="2.8"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: [0, 1, 1, 0],
                opacity: [0.4, 1, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
                times: [0, 0.5, 0.8, 1],
              }}
            />
          )}

          {/* Traveling gold pulse dot */}
          {!reduced && (
            <motion.circle
              cx="14"
              cy="4"
              r="3.5"
              fill="#C6922E"
              animate={{
                cy: [4, 32, 32],
                opacity: [0, 1, 0],
                r: [3, 4.2, 1.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
                times: [0, 0.65, 1],
              }}
            />
          )}

          {/* Primary Gold Arrowhead */}
          <path
            d="M7 26L14 35L21 26"
            stroke="#B88A3B"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Secondary Gold Chevron */}
          <path
            d="M8 35L14 43L20 35"
            stroke="#D4A843"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.9"
          />
        </svg>
      </motion.div>
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────

export const Hero: React.FC = () => {
  const reduced = useReducedMotion()
  const containerRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const bgY   = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '8%'])

  // Stagger delays for text children
  const stagger = (i: number) => ({ delay: 0.4 + i * 0.18 })

  const fadeUp = {
    hidden:  { opacity: 0, y: 32 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-between items-center overflow-hidden"
      style={{ background: '#F7F1E5' }}
      aria-label="Wedding invitation hero"
    >
      {/* Paper texture */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
        }}
        aria-hidden="true"
      />

      {/* Couple photo — right-anchored, fades in gently, parallaxes on scroll */}
      <motion.div
        className="absolute right-0 top-0 bottom-0 pointer-events-none z-0 hidden md:block"
        style={{ y: reduced ? 0 : bgY }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.8, delay: 0.8, ease: 'easeOut' }}
        aria-hidden="true"
      >
        {/* Gradient mask so the photo bleeds into the ivory background softly */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background: 'linear-gradient(to right, #F7F1E5 0%, rgba(247,241,229,0.5) 35%, rgba(247,241,229,0.05) 70%, transparent 100%)',
          }}
        />
        <div
          className="absolute inset-0 z-10"
          style={{
            background: 'linear-gradient(to bottom, rgba(247,241,229,0.6) 0%, transparent 20%, transparent 70%, #F7F1E5 100%)',
          }}
        />
        <img
          src="/photos/couple.webp"
          alt=""
          className="h-full w-auto object-cover object-center opacity-40"
          style={{ maxWidth: '55vw' }}
          draggable={false}
        />
      </motion.div>

      {/* Temple silhouette — anchored flush to the bottom ending */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 pointer-events-none z-0 flex items-end justify-center overflow-hidden"
        style={{ height: 'clamp(50px, 10vh, 100px)', y: reduced ? 0 : bgY }}
        aria-hidden="true"
      >
        <TempleSilhouette opacity={0.065} className="w-full h-full object-cover object-bottom" />
      </motion.div>

      {/* Floral corners */}
      <div className="absolute left-0 bottom-0 w-32 sm:w-44 md:w-60 lg:w-72 pointer-events-none z-10" aria-hidden="true">
        <FloralCornerLeft opacity={0.7} />
      </div>
      <div className="absolute right-0 bottom-0 w-32 sm:w-44 md:w-60 lg:w-72 pointer-events-none z-10" aria-hidden="true">
        <FloralCornerRight opacity={0.7} />
      </div>
      <div
        className="absolute left-0 top-0 w-28 sm:w-36 md:w-48 pointer-events-none z-10"
        style={{ transform: 'scaleY(-1)' }}
        aria-hidden="true"
      >
        <FloralCornerLeft opacity={0.35} />
      </div>
      <div
        className="absolute right-0 top-0 w-28 sm:w-36 md:w-48 pointer-events-none z-10"
        style={{ transform: 'scaleY(-1)' }}
        aria-hidden="true"
      >
        <FloralCornerRight opacity={0.35} />
      </div>

      {/* Particles */}
      <GoldParticles count={18} className="z-5" />
      <PetalParticles count={16} className="z-5" />

      {/* Main content */}
      <motion.div
        className="relative z-20 text-center px-4 pt-10 pb-4 sm:pt-14 sm:pb-6 md:py-16 flex flex-col items-center justify-center flex-1 my-auto w-full max-w-4xl"
        style={{ y: reduced ? 0 : textY }}
      >
        {/* Date eyebrow */}
        <motion.p
          className="eyebrow text-gold mb-3 md:mb-4"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.8, ease: 'easeOut', ...stagger(0) }}
        >
          {COPY.hero.eyebrow}
        </motion.p>

        {/* Decorative line */}
        <motion.div
          className="flex items-center gap-3 mb-3 md:mb-5"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.7, ease: 'easeOut', ...stagger(1) }}
          aria-hidden="true"
        >
          <div className="w-8 md:w-10 h-px bg-gold/40" />
          <div className="w-1.5 h-1.5 rotate-45 bg-gold/60" />
          <div className="w-8 md:w-10 h-px bg-gold/40" />
        </motion.div>

        {/* Groom name */}
        <div className="overflow-hidden mb-1 md:mb-2">
          <motion.h1
            className="font-display font-light text-navy leading-none tracking-wide"
            style={{ fontSize: 'clamp(2.6rem, 11vw, 7.5rem)' }}
            initial={{ y: '110%' }}
            animate={{ y: '0%' }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], ...stagger(2) }}
          >
            {WEDDING.groom.name}
          </motion.h1>
        </div>

        {/* Ampersand */}
        <div className="overflow-hidden mb-1 md:mb-2">
          <motion.span
            className="font-script text-gold block leading-none"
            style={{ fontSize: 'clamp(2.6rem, 12vw, 8rem)' }}
            initial={{ y: '110%' }}
            animate={{ y: '0%' }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], ...stagger(3) }}
            aria-hidden="true"
          >
            &amp;
          </motion.span>
        </div>

        {/* Bride name */}
        <div className="overflow-hidden mb-3 md:mb-5">
          <motion.h1
            className="font-display font-light text-navy leading-none tracking-wide"
            style={{ fontSize: 'clamp(2.6rem, 11vw, 7.5rem)' }}
            initial={{ y: '110%' }}
            animate={{ y: '0%' }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], ...stagger(4) }}
          >
            {WEDDING.bride.name}
          </motion.h1>
        </div>

        {/* OrnamentDivider */}
        <motion.div
          className="w-full max-w-xs md:max-w-sm mb-3 md:mb-5"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.7, ease: 'easeOut', ...stagger(5) }}
          aria-hidden="true"
        >
          <OrnamentDivider />
        </motion.div>

        {/* Are getting married */}
        <motion.p
          className="font-body text-brown/55 tracking-[0.25em] md:tracking-[0.3em] uppercase mb-2 md:mb-3"
          style={{ fontSize: 'clamp(0.58rem, 1.8vw, 0.72rem)' }}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.8, ease: 'easeOut', ...stagger(6) }}
        >
          {COPY.hero.tagline}
        </motion.p>

        {/* Time & venue block */}
        <motion.div
          className="flex flex-col items-center gap-1.5 md:gap-2"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.8, ease: 'easeOut', ...stagger(7) }}
        >
          <p
            className="font-display text-navy/70 italic"
            style={{ fontSize: 'clamp(0.9rem, 2.6vw, 1.25rem)' }}
          >
            {COPY.hero.time}
          </p>
          <div className="flex items-center gap-2" aria-hidden="true">
            <div className="w-4 h-px bg-gold/40" />
            <div className="w-1 h-1 rotate-45 bg-gold/50" />
            <div className="w-4 h-px bg-gold/40" />
          </div>
          <p
            className="font-body text-brown/60 tracking-[0.16em] uppercase"
            style={{ fontSize: 'clamp(0.6rem, 1.6vw, 0.72rem)' }}
          >
            {COPY.hero.venue}
          </p>
        </motion.div>

        {/* ── Hero countdown ── */}
        <motion.div
          className="mt-3 md:mt-5 mb-1 w-full flex flex-col items-center gap-2 md:gap-3"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.8, ease: 'easeOut', ...stagger(8) }}
        >
          {/* Thin gold divider above countdown */}
          <div className="flex items-center gap-3 w-full max-w-xs" aria-hidden="true">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-gold/30" />
            <div className="w-1 h-1 rotate-45 bg-gold/40" />
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-gold/30" />
          </div>
          <HeroCountdown staggerDelay={0} />
        </motion.div>

        {/* ── Premium scroll indicator ── */}
        <div className="mt-2 md:mt-4 mb-2">
          <ScrollIndicator />
        </div>
      </motion.div>

      {/* Bottom gold border accent */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px pointer-events-none z-20"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(198,146,46,0.4), transparent)' }}
        aria-hidden="true"
      />
    </section>
  )
}
