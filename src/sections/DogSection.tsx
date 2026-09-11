import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { OrnamentDivider } from '../components/OrnamentDivider'
import { COPY } from '../data/weddingData'
import { dogPhoto } from '../data/photos'
import { useReducedMotion } from '../hooks/useReducedMotion'

/** SVG paw print icon */
const PawPrint: React.FC<{ className?: string; size?: number; color?: string }> = ({
  className = '',
  size = 24,
  color = '#C6922E',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={color}
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <ellipse cx="5"  cy="10.5" rx="1.8" ry="2.5" opacity="0.8" />
    <ellipse cx="9"  cy="8"    rx="1.8" ry="2.5" opacity="0.8" />
    <ellipse cx="15" cy="8"    rx="1.8" ry="2.5" opacity="0.8" />
    <ellipse cx="19" cy="10.5" rx="1.8" ry="2.5" opacity="0.8" />
    <path d="M 7 13 Q 6 18 9 20 Q 12 22.5 15 20 Q 18 18 17 13 Q 15 11 12 11 Q 9 11 7 13 Z" opacity="0.9" />
  </svg>
)

/** Gold heart tag — mimics the invitation illustration */
const HeartTag: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Tag body */}
    <circle cx="20" cy="22" r="14" fill="#C6922E" opacity="0.9" />
    <circle cx="20" cy="22" r="11" fill="#C6922E" opacity="0.6" stroke="#F0D98A" strokeWidth="0.5" />
    {/* Heart */}
    <path
      d="M 20 28 C 20 28 13 23 13 18.5 C 13 16.5 14.8 15 17 16 C 18.2 16.6 19.2 17.5 20 18.5 C 20.8 17.5 21.8 16.6 23 16 C 25.2 15 27 16.5 27 18.5 C 27 23 20 28 20 28 Z"
      fill="#F7F1E5"
      opacity="0.9"
    />
    {/* Chain link */}
    <line x1="20" y1="8" x2="20" y2="2" stroke="#C6922E" strokeWidth="1.5" strokeOpacity="0.7" />
    <circle cx="20" cy="2" r="2" fill="none" stroke="#C6922E" strokeWidth="1" strokeOpacity="0.7" />
  </svg>
)

/** Animated floating paw prints that drift across the section */
const FloatingPaws: React.FC = () => {
  const reduced = useReducedMotion()
  if (reduced) return null

  const paws = [
    { x: '12%',  delay: 0,    size: 16, opacity: 0.3, dur: 3.5 },
    { x: '28%',  delay: 0.8,  size: 12, opacity: 0.2, dur: 4.2 },
    { x: '55%',  delay: 1.4,  size: 18, opacity: 0.35, dur: 3.8 },
    { x: '72%',  delay: 0.4,  size: 14, opacity: 0.25, dur: 4.5 },
    { x: '88%',  delay: 1.8,  size: 16, opacity: 0.2, dur: 3.2 },
    { x: '42%',  delay: 2.2,  size: 10, opacity: 0.15, dur: 5.0 },
  ]

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {paws.map((p, i) => (
        <div
          key={i}
          className="absolute bottom-8"
          style={{
            left: p.x,
            animation: `pawFloat ${p.dur}s ease-in-out ${p.delay}s infinite`,
            opacity: p.opacity,
          }}
        >
          <PawPrint size={p.size} color="#C6922E" />
        </div>
      ))}
      <style>{`
        @keyframes pawFloat {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          30%       { transform: translateY(-12px) rotate(-8deg); }
          70%       { transform: translateY(-6px) rotate(5deg); }
        }
      `}</style>
    </div>
  )
}

export const DogSection: React.FC = () => {
  const [ref, inView] = useInView<HTMLElement>({ threshold: 0.2 })
  const reduced = useReducedMotion()
  const isEmpty = !dogPhoto.src || dogPhoto.placeholder

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 28 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.85, ease: 'easeOut', delay },
  })

  return (
    <section
      id="dog"
      ref={ref}
      className="relative py-12 md:py-20 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #EDE5D0 0%, #F7F1E5 100%)' }}
      aria-label="The family dog"
    >
      {/* Floating paws background */}
      <FloatingPaws />

      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(198,146,46,0.3), transparent)' }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <motion.p className="eyebrow text-gold mb-4" {...fadeUp(0)}>
            {COPY.dog.eyebrow}
          </motion.p>

          <div className="overflow-hidden">
            <motion.h2
              className="font-display font-light text-navy"
              style={{ fontSize: 'clamp(1.6rem, 6vw, 3rem)' }}
              initial={{ y: '100%' }}
              animate={inView ? { y: '0%' } : {}}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            >
              {COPY.dog.heading}
            </motion.h2>
          </div>

          <motion.div className="max-w-xs mx-auto mt-5" {...fadeUp(0.2)} aria-hidden="true">
            <OrnamentDivider />
          </motion.div>
        </div>

        {/* Dog photo + tag */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">

          {/* Photo */}
          <motion.div
            className="relative w-64 md:w-72 lg:w-80"
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          >
            {/* Gold frame */}
            <div className="absolute inset-0 border border-gold/30 rounded-lg z-10 pointer-events-none" aria-hidden="true" />
            <div className="absolute inset-[4px] border border-gold/15 rounded-md z-10 pointer-events-none" aria-hidden="true" />

            {/* Corner ornaments */}
            {(['tl','tr','bl','br'] as const).map((pos) => (
              <div
                key={pos}
                className={`absolute w-3.5 h-3.5 pointer-events-none z-20 border-gold/50 ${
                  pos === 'tl' ? 'top-0 left-0 border-t border-l' :
                  pos === 'tr' ? 'top-0 right-0 border-t border-r' :
                  pos === 'bl' ? 'bottom-0 left-0 border-b border-l' :
                                 'bottom-0 right-0 border-b border-r'
                }`}
                aria-hidden="true"
              />
            ))}

            <div className="aspect-[3/4] overflow-hidden rounded-lg">
              {isEmpty ? (
                /* ==========================================================
                   REPLACE: Place the dog photo here.
                   The invitation features a black dog with a gold heart tag.
                   Expected: dogPhoto.src = '/photos/dog.webp' in photos.ts
                   ========================================================== */
                <div className="img-placeholder w-full h-full flex flex-col items-center justify-center gap-3">
                  <PawPrint size={48} color="#C6922E" />
                  <span className="font-body text-[10px] tracking-widest uppercase text-gold/50">
                    Dog Photo Coming Soon
                  </span>
                </div>
              ) : (
                <motion.img
                  src={dogPhoto.src}
                  alt={dogPhoto.alt}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-top"
                  // Subtle tail-wag effect via gentle rotate — only if motion allowed
                  animate={!reduced ? {
                    rotate: [0, 1.5, -1.5, 1.5, 0],
                  } : {}}
                  transition={{
                    duration: 2,
                    ease: 'easeInOut',
                    repeat: Infinity,
                    repeatDelay: 3,
                  }}
                />
              )}
            </div>

            {/* Floating heart tag */}
            <motion.div
              className="absolute -bottom-5 -right-5 z-30"
              animate={!reduced ? {
                y: [0, -6, 0],
                rotate: [0, 8, -8, 0],
              } : {}}
              transition={{
                duration: 2.5,
                ease: 'easeInOut',
                repeat: Infinity,
                repeatDelay: 1,
              }}
              aria-hidden="true"
            >
              <HeartTag className="w-12 h-12 drop-shadow-md" />
            </motion.div>
          </motion.div>

          {/* Text side */}
          <motion.div
            className="flex flex-col items-center md:items-start gap-5 text-center md:text-left max-w-sm"
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          >
            {/* Paw badge */}
            <div className="flex items-center gap-2 px-4 py-2 border border-gold/30 bg-gold/5 rounded-sm">
              <PawPrint size={14} color="#C6922E" />
              <span className="font-body font-bold text-[0.6rem] tracking-[0.22em] uppercase text-gold">
                {COPY.dog.badge}
              </span>
            </div>

            <p
              className="font-display italic text-navy/65 leading-relaxed"
              style={{ fontSize: 'clamp(1rem, 3vw, 1.25rem)' }}
            >
              {COPY.dog.subtext}
            </p>

            {/* Bhairav's name */}
            <div className="flex flex-col items-center md:items-start gap-1">
              <p
                className="font-script text-gold"
                style={{ fontSize: 'clamp(2rem, 7vw, 2.8rem)', lineHeight: 1.1 }}
              >
                Bhairav
              </p>
              <p
                className="font-body tracking-[0.2em] uppercase text-brown/40"
                style={{ fontSize: 'clamp(0.55rem, 1.5vw, 0.62rem)' }}
              >
                With Bhairav's Full Approval
              </p>
            </div>

            {/* Paw prints decoration */}
            <div className="flex gap-3 mt-2" aria-hidden="true">
              {[0, 1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  animate={!reduced ? {
                    y: [0, -4, 0],
                    opacity: [0.4, 0.8, 0.4],
                  } : {}}
                  transition={{
                    duration: 1.5,
                    ease: 'easeInOut',
                    repeat: Infinity,
                    delay: i * 0.25,
                  }}
                >
                  <PawPrint size={18} color="#C6922E" />
                </motion.div>
              ))}
            </div>

            <div aria-hidden="true">
              <OrnamentDivider size="sm" />
            </div>

            <p
              className="font-body text-brown/40 tracking-[0.18em] uppercase"
              style={{ fontSize: 'clamp(0.55rem, 1.5vw, 0.62rem)' }}
            >
              The Wedding's Most Distinguished Guest
            </p>
          </motion.div>
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(198,146,46,0.3), transparent)' }}
        aria-hidden="true"
      />
    </section>
  )
}
