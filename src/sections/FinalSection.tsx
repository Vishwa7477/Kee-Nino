import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { OrnamentDivider, GoldLine } from '../components/OrnamentDivider'
import { FloralCornerLeft, FloralCornerRight, LotusDecor } from '../components/FloralDecor'
import { GoldParticles } from '../components/GoldParticles'
import { COPY, WEDDING } from '../data/weddingData'
import { vishwaPhoto } from '../data/photos'

export const FinalSection: React.FC = () => {
  const [ref, inView] = useInView<HTMLElement>({ threshold: 0.15 })

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.9, ease: 'easeOut', delay },
  })

  return (
    <section
      id="final"
      ref={ref}
      className="relative flex flex-col items-center overflow-hidden pt-4 pb-12 md:pt-6 md:pb-16"
      style={{ background: 'linear-gradient(180deg, #EDE5D0 0%, #F7F1E5 60%, #FAF6EC 100%)' }}
      aria-label="Final message"
    >
      {/* Paper texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
          opacity: 0.7,
        }}
        aria-hidden="true"
      />

      {/* Gold particles */}
      <GoldParticles count={14} className="z-0 opacity-60" />

      {/* Floral corners */}
      <div className="absolute left-0 bottom-0 w-40 md:w-60 pointer-events-none z-0" aria-hidden="true">
        <FloralCornerLeft opacity={0.5} />
      </div>
      <div className="absolute right-0 bottom-0 w-40 md:w-60 pointer-events-none z-0" aria-hidden="true">
        <FloralCornerRight opacity={0.5} />
      </div>
      <div
        className="absolute left-0 top-0 w-28 md:w-44 pointer-events-none z-0"
        style={{ transform: 'scaleY(-1)' }}
        aria-hidden="true"
      >
        <FloralCornerLeft opacity={0.25} />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 flex flex-col items-center gap-4 md:gap-5 max-w-2xl mx-auto">

        <motion.div className="w-full max-w-xs" {...fadeUp(0.05)} aria-hidden="true">
          <OrnamentDivider />
        </motion.div>

        {/* With Love */}
        <motion.p
          className="font-body font-bold tracking-[0.3em] uppercase text-gold/70"
          style={{ fontSize: 'clamp(0.58rem, 1.5vw, 0.65rem)' }}
          {...fadeUp(0.1)}
        >
          {COPY.final.withLove}
        </motion.p>

        {/* Relation */}
        <motion.p
          className="font-display italic text-navy/60"
          style={{ fontSize: 'clamp(1rem, 3vw, 1.3rem)' }}
          {...fadeUp(0.15)}
        >
          {COPY.final.relation}
        </motion.p>

        {/* Signature — large script */}
        <motion.div
          className="overflow-hidden px-8 py-3"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <motion.h2
            className="font-script text-navy leading-none inline-block"
            style={{
              fontSize: 'clamp(4rem, 16vw, 9rem)',
              paddingLeft: '0.25em',
              paddingRight: '0.2em',
              paddingTop: '0.08em',
              paddingBottom: '0.08em',
            }}
            initial={{ y: '110%' }}
            animate={inView ? { y: '0%' } : {}}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
          >
            {COPY.final.name}
          </motion.h2>
        </motion.div>

        {/* Vishwa & Keerthana framed photo — matching site style */}
        <motion.div
          className="relative group my-3"
          style={{ width: 'clamp(200px, 55vw, 280px)' }}
          {...fadeUp(0.35)}
        >
          {/* Outer gold border */}
          <div className="absolute inset-0 border border-gold/40 pointer-events-none z-10" aria-hidden="true" />
          <div className="absolute inset-[4px] border border-gold/20 pointer-events-none z-10" aria-hidden="true" />

          {/* Corner ornaments */}
          {(['tl', 'tr', 'bl', 'br'] as const).map((pos) => (
            <div
              key={pos}
              className={`absolute w-3.5 h-3.5 border-gold/70 z-20 pointer-events-none ${
                pos === 'tl' ? 'top-0 left-0 border-t border-l' :
                pos === 'tr' ? 'top-0 right-0 border-t border-r' :
                pos === 'bl' ? 'bottom-0 left-0 border-b border-l' :
                               'bottom-0 right-0 border-b border-r'
              }`}
              aria-hidden="true"
            />
          ))}

          {/* Image */}
          <div className="aspect-[2/3] overflow-hidden bg-ivory/50 shadow-sm">
            <img
              src={vishwaPhoto.src}
              alt={vishwaPhoto.alt}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        </motion.div>

        {/* Divider */}
        <motion.div className="w-full max-w-xs" {...fadeUp(0.4)} aria-hidden="true">
          <OrnamentDivider />
        </motion.div>

        {/* Couple names */}
        <motion.div
          className="flex flex-col items-center gap-1"
          {...fadeUp(0.45)}
        >
          <p
            className="font-display font-light text-navy/80"
            style={{ fontSize: 'clamp(1.5rem, 6vw, 3rem)' }}
          >
            {WEDDING.groom.name}
          </p>
          <span
            className="font-script text-gold"
            style={{ fontSize: 'clamp(1.8rem, 6vw, 3rem)', lineHeight: 1 }}
            aria-hidden="true"
          >
            &amp;
          </span>
          <p
            className="font-display font-light text-navy/80"
            style={{ fontSize: 'clamp(1.5rem, 6vw, 3rem)' }}
          >
            {WEDDING.bride.name}
          </p>
        </motion.div>

        {/* Numeric date */}
        <motion.p
          className="font-body font-bold tracking-[0.35em] uppercase text-navy"
          style={{ fontSize: 'clamp(0.85rem, 2.5vw, 1.1rem)', letterSpacing: '0.3em' }}
          {...fadeUp(0.5)}
        >
          {WEDDING.date.numeric}
        </motion.p>

        {/* Thank you line */}
        <motion.div className="w-full max-w-xs mt-2" {...fadeUp(0.55)} aria-hidden="true">
          <OrnamentDivider size="sm" />
        </motion.div>

        <motion.p
          className="font-display italic text-navy/50 max-w-sm leading-relaxed"
          style={{ fontSize: 'clamp(0.95rem, 2.8vw, 1.15rem)' }}
          {...fadeUp(0.6)}
        >
          {COPY.final.thankyou}
        </motion.p>

        {/* Bottom lotus */}
        <motion.div {...fadeUp(0.65)} aria-hidden="true">
          <LotusDecor size={44} opacity={0.35} color="#C6922E" accentColor="#F0D98A" />
        </motion.div>

        {/* Gold bottom line */}
        <motion.div
          className="w-32"
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
          aria-hidden="true"
        >
          <GoldLine opacity={0.5} />
        </motion.div>

        {/* Credit */}
        <motion.p
          className="font-body text-brown/30 tracking-[0.18em] uppercase"
          style={{ fontSize: 'clamp(0.5rem, 1.2vw, 0.58rem)' }}
          {...fadeUp(0.75)}
        >
          {COPY.final.credit}
        </motion.p>

        {/* Final fade to white at the very bottom */}
        <div
          className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, transparent, #FAF6EC)' }}
          aria-hidden="true"
        />
      </div>
    </section>
  )
}
