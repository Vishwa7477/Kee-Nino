import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { OrnamentDivider } from '../components/OrnamentDivider'
import { COPY } from '../data/weddingData'
import { useReducedMotion } from '../hooks/useReducedMotion'

// ─── Ganesha SVG silhouette ───────────────────────────────────────────────────
const GaneshaSilhouette: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 120 160"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <ellipse cx="60" cy="110" rx="34" ry="40" fill="#C6922E" opacity="0.18" />
    <circle cx="60" cy="62" r="26" fill="#C6922E" opacity="0.22" />
    <ellipse cx="32" cy="60" rx="14" ry="18" fill="#C6922E" opacity="0.14" />
    <ellipse cx="88" cy="60" rx="14" ry="18" fill="#C6922E" opacity="0.14" />
    <path
      d="M 60 76 Q 50 92 46 104 Q 44 112 52 112"
      stroke="#C6922E" strokeWidth="5" strokeLinecap="round" strokeOpacity="0.45" fill="none"
    />
    <path d="M 38 42 Q 60 28 82 42" stroke="#C6922E" strokeWidth="1.5" strokeOpacity="0.5" fill="none" />
    <circle cx="60" cy="28" r="5" fill="#C6922E" opacity="0.5" />
    <circle cx="42" cy="36" r="3" fill="#C6922E" opacity="0.4" />
    <circle cx="78" cy="36" r="3" fill="#C6922E" opacity="0.4" />
    <circle cx="60" cy="58" r="2.5" fill="#C6922E" opacity="0.7" />
    <path d="M 30 90 Q 20 80 24 70" stroke="#C6922E" strokeWidth="4" strokeLinecap="round" strokeOpacity="0.3" fill="none" />
    <path d="M 90 90 Q 100 80 96 70" stroke="#C6922E" strokeWidth="4" strokeLinecap="round" strokeOpacity="0.3" fill="none" />
    <circle cx="97" cy="68" r="5" fill="#C6922E" opacity="0.3" />
    <ellipse cx="60" cy="148" rx="30" ry="8" fill="#C6922E" opacity="0.12" />
    <path d="M 34 148 Q 40 138 48 148" stroke="#C6922E" strokeWidth="1" strokeOpacity="0.25" fill="none" />
    <path d="M 48 148 Q 54 138 62 148" stroke="#C6922E" strokeWidth="1" strokeOpacity="0.25" fill="none" />
    <path d="M 62 148 Q 68 138 76 148" stroke="#C6922E" strokeWidth="1" strokeOpacity="0.25" fill="none" />
    <path d="M 76 148 Q 82 138 88 148" stroke="#C6922E" strokeWidth="1" strokeOpacity="0.25" fill="none" />
  </svg>
)

// ─── Three small diyas ────────────────────────────────────────────────────────
// Fixed pixel heights: left/right = 32px, centre = 38px  →  total row ≈ 38px
const DiyaTrio: React.FC = () => {
  const reduced = useReducedMotion()

  // One reusable diya shape — size driven by props
  const Diya = ({
    w, h, cx, cy,           // viewBox dimensions + flame centre
    fh,                     // flame outer height
    delay,
  }: {
    w: number; h: number; cx: number; cy: number
    fh: number; delay: number
  }) => {
    const bowlY = cy + fh + 2       // top of bowl
    const bowlBot = h - 6           // bottom of bowl shape

    return (
      <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Outer flame */}
        <motion.ellipse
          cx={cx} cy={cy} rx={Math.round(w * 0.18)} ry={fh}
          fill="#F0D98A" opacity="0.92"
          animate={reduced ? {} : { scaleY: [1, 1.2, 0.88, 1], scaleX: [1, 0.84, 1.06, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay }}
          style={{ transformOrigin: `${cx}px ${cy + fh * 0.6}px` }}
        />
        {/* Inner flame core */}
        <motion.ellipse
          cx={cx} cy={cy + 2} rx={Math.round(w * 0.11)} ry={fh * 0.65}
          fill="#C6922E" opacity="0.72"
          animate={reduced ? {} : { scaleY: [1, 1.25, 0.8, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay }}
          style={{ transformOrigin: `${cx}px ${cy + fh * 0.6}px` }}
        />
        {/* Wick */}
        <line
          x1={cx} y1={cy + fh} x2={cx} y2={bowlY + 4}
          stroke="#C6922E" strokeWidth="1" strokeOpacity="0.55"
        />
        {/* Bowl */}
        <path
          d={`M ${cx - w * 0.38} ${bowlY + 3} Q ${cx - w * 0.38} ${bowlBot} ${cx} ${bowlBot + 3} Q ${cx + w * 0.38} ${bowlBot} ${cx + w * 0.38} ${bowlY + 3} Z`}
          fill="#C6922E" opacity="0.22"
        />
        <path
          d={`M ${cx - w * 0.38} ${bowlY + 3} Q ${cx} ${bowlY + 7} ${cx + w * 0.38} ${bowlY + 3}`}
          stroke="#C6922E" strokeWidth="0.9" strokeOpacity="0.45" fill="none"
        />
        {/* Base plate */}
        <ellipse cx={cx} cy={h - 3} rx={w * 0.3} ry={2} fill="#C6922E" opacity="0.18" />
        {/* Soft glow */}
        <motion.ellipse
          cx={cx} cy={cy + fh * 0.8} rx={w * 0.38} ry={fh * 0.9}
          fill="#F0D98A" opacity="0.07"
          animate={reduced ? {} : { opacity: [0.04, 0.13, 0.04] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay }}
        />
      </svg>
    )
  }

  return (
    <div className="flex items-end justify-center gap-4" aria-hidden="true">
      <Diya w={24} h={32} cx={12} cy={7}  fh={5}   delay={0.25} />
      <Diya w={30} h={38} cx={15} cy={8}  fh={6}   delay={0}    />
      <Diya w={24} h={32} cx={12} cy={7}  fh={5}   delay={0.45} />
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────

export const BlessingSection: React.FC = () => {
  const [ref, inView] = useInView<HTMLElement>({ threshold: 0.15 })

  const fadeUp = (delay: number) => ({
    initial:  { opacity: 0, y: 14 },
    animate:  inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.65, ease: 'easeOut', delay },
  })

  return (
    <section
      id="blessing"
      ref={ref}
      /*
       * py-8  = 32px top + 32px bottom = 64px padding on mobile
       * Content stack (gap-3 = 12px × 6 gaps = 72px) + elements ≈ 300px
       * Total on 390px device: ~364px — solidly within 380–450px target
       * md:py-12 gives a bit more air on tablets/desktop without going tall
       */
      className="relative py-8 md:py-12 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0D315A 0%, #0A2848 100%)' }}
      aria-label="Divine blessings"
    >
      {/* Top gold accent */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(198,146,46,0.5), transparent)' }}
        aria-hidden="true"
      />

      {/* Very subtle centre glow — no particles, no silhouette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 55% 65% at 50% 45%, rgba(198,146,46,0.055) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/*
       * Content column
       * gap-3 (12px) between every item — keeps things close but not cramped
       * max-w-xs (320px) ensures nothing stretches oddly on wide phones
       */}
      <div className="relative z-10 w-full max-w-xs mx-auto px-5 text-center flex flex-col items-center gap-3">

        {/* ① Diya trio — ~38px tall */}
        <motion.div {...fadeUp(0)}>
          <DiyaTrio />
        </motion.div>

        {/* ② Eyebrow — "WITH THE BLESSINGS OF THE DIVINE" */}
        <motion.p
          className="font-body font-bold tracking-[0.26em] uppercase text-gold/65"
          style={{ fontSize: '0.58rem', lineHeight: 1.4 }}
          {...fadeUp(0.07)}
        >
          {COPY.blessing.eyebrow}
        </motion.p>

        {/* ③ Ganesha illustration — 72px on mobile, 88px on md+ */}
        <motion.div
          initial={{ opacity: 0, scale: 0.86 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.13 }}
          aria-hidden="true"
        >
          {/* w-[72px] is exactly 72px — tight but fully readable at this scale */}
          <GaneshaSilhouette className="w-[72px] md:w-[88px] mx-auto" />
        </motion.div>

        {/* ④ "Shri Ganesha" */}
        <motion.h2
          className="font-display font-light text-ivory leading-none"
          style={{ fontSize: 'clamp(1.65rem, 5.5vw, 2.5rem)' }}
          {...fadeUp(0.2)}
        >
          {COPY.blessing.heading}
        </motion.h2>

        {/* ⑤ "VIGHNAHARTA · MANGALMURTI" */}
        <motion.p
          className="font-body tracking-[0.22em] uppercase text-gold/50"
          style={{ fontSize: '0.58rem', lineHeight: 1.4 }}
          {...fadeUp(0.27)}
        >
          {COPY.blessing.subheading}
        </motion.p>

        {/* ⑥ Ornamental gold divider — draws in on scroll */}
        <motion.div
          className="w-[180px]"
          style={{ transformOrigin: 'center' }}
          initial={{ opacity: 0, scaleX: 0 }}
          animate={inView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 0.65, ease: 'easeOut', delay: 0.33 }}
          aria-hidden="true"
        >
          <OrnamentDivider color="#C6922E" size="sm" />
        </motion.div>

        {/* ⑦ Short blessing sentence */}
        <motion.p
          className="font-display italic text-ivory/50 leading-snug"
          style={{ fontSize: 'clamp(0.82rem, 2.4vw, 0.98rem)' }}
          {...fadeUp(0.4)}
        >
          Beginning this journey with the divine blessings of Lord Ganesha.
        </motion.p>

      </div>

      {/* Bottom gold accent */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(198,146,46,0.5), transparent)' }}
        aria-hidden="true"
      />
    </section>
  )
}
