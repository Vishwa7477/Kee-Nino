import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { OrnamentDivider } from '../components/OrnamentDivider'
import { FloralSprig, LotusDecor } from '../components/FloralDecor'
import { COPY, WEDDING } from '../data/weddingData'

export const InvitationMessage: React.FC = () => {
  const [ref, inView] = useInView<HTMLElement>({ threshold: 0.2 })

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.9, ease: 'easeOut', delay },
  })

  return (
    <section
      id="invitation"
      ref={ref}
      className="relative pt-10 pb-4 md:pt-16 md:pb-6 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #F7F1E5 0%, #EDE5D0 100%)' }}
      aria-label="Wedding invitation message"
    >
      {/* Subtle background mark */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        aria-hidden="true"
      >
        <span
          className="font-script text-navy/[0.025]"
          style={{ fontSize: 'clamp(8rem, 30vw, 18rem)', whiteSpace: 'nowrap' }}
        >
          {WEDDING.groom.name} &amp; {WEDDING.bride.name}
        </span>
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-6 text-center flex flex-col items-center gap-5 md:gap-6">

        {/* Parents welcome photo */}
        <motion.div
          className="relative w-full max-w-sm"
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0 }}
        >
          <div className="aspect-[4/3] overflow-hidden bg-ivory/80 shadow-md">
            <img
              src="/photos/welcome.webp"
              alt="Welcome — Parents with flower garlands"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover object-center"
            />
          </div>
          {/* Gold border */}
          <div className="absolute inset-0 border border-gold/40 pointer-events-none" aria-hidden="true" />
          <div className="absolute inset-[3px] border border-gold/20 pointer-events-none" aria-hidden="true" />
        </motion.div>

        {/* Floral accent below photo */}
        <motion.div {...fadeUp(0.1)} aria-hidden="true">
          <FloralSprig
            className="w-28"
            horizontal
            opacity={0.6}
            color="#547FC5"
            accentColor="#C6922E"
          />
        </motion.div>

        {/* Heading — invitation */}
        <motion.h2
          className="font-display font-light text-navy leading-tight"
          style={{ fontSize: 'clamp(1.75rem, 5vw, 3rem)' }}
          {...fadeUp(0.15)}
        >
          {COPY.invitation.heading}
        </motion.h2>

        <motion.div className="w-full max-w-xs" {...fadeUp(0.25)} aria-hidden="true">
          <OrnamentDivider />
        </motion.div>

        {/* Body paragraph 1 */}
        <motion.p
          className="font-display italic text-navy font-semibold leading-relaxed"
          style={{ fontSize: 'clamp(1.1rem, 3.6vw, 1.5rem)' }}
          {...fadeUp(0.25)}
        >
          {COPY.invitation.body1}
        </motion.p>

        {/* Body paragraph 2 */}
        <motion.div
          className="flex flex-col gap-2 max-w-lg"
          {...fadeUp(0.3)}
        >
          {COPY.invitation.body2.split('\n').map((line, i) => (
            <p
              key={i}
              className={`font-display text-navy font-semibold leading-relaxed ${i === 0 ? 'italic' : ''}`}
              style={{ fontSize: 'clamp(1.05rem, 3.3vw, 1.4rem)' }}
            >
              {line}
            </p>
          ))}
        </motion.div>

        <motion.div className="w-full max-w-xs" {...fadeUp(0.4)} aria-hidden="true">
          <OrnamentDivider />
        </motion.div>

        {/* Couple signature */}
        <motion.div className="flex flex-col items-center gap-1" {...fadeUp(0.45)}>
          <p className="font-script text-gold" style={{ fontSize: 'clamp(2.2rem, 7.5vw, 3.2rem)' }}>
            {WEDDING.groom.name} &amp; {WEDDING.bride.name}
          </p>
          <p className="font-body tracking-[0.25em] uppercase text-navy font-bold" style={{ fontSize: 'clamp(0.85rem, 2.2vw, 1.05rem)', letterSpacing: '0.28em' }}>
            {WEDDING.date.numeric}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
