import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { OrnamentDivider } from '../components/OrnamentDivider'
import { FloralSprig } from '../components/FloralDecor'
import { PhotoFrame } from '../components/PhotoFrame'
import { COPY, WEDDING } from '../data/weddingData'
import { bridePhotos, groomPhotos } from '../data/photos'

export const CoupleSection: React.FC = () => {
  const [ref, inView] = useInView<HTMLElement>({ threshold: 0.1 })

  const slide = (dir: 'left' | 'right', delay: number) => ({
    initial: { opacity: 0, x: dir === 'left' ? -40 : 40 },
    animate: inView ? { opacity: 1, x: 0 } : {},
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1], delay },
  })

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.8, ease: 'easeOut', delay },
  })

  return (
    <section
      id="couple"
      ref={ref}
      className="relative py-12 md:py-20 overflow-hidden"
      style={{ background: '#F7F1E5' }}
      aria-label="The Bride and Groom"
    >
      {/* Top gold line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(198,146,46,0.3), transparent)' }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-6">

        {/* Section header */}
        <div className="text-center mb-8 md:mb-12">
          <motion.p className="eyebrow text-gold mb-4" {...fadeUp(0)}>
            The Couple
          </motion.p>
          <motion.div className="max-w-xs mx-auto" {...fadeUp(0.1)} aria-hidden="true">
            <OrnamentDivider />
          </motion.div>
          <motion.p
            className="font-display italic text-navy/60 mt-5 max-w-sm mx-auto leading-relaxed"
            style={{ fontSize: 'clamp(1rem, 3vw, 1.3rem)' }}
            {...fadeUp(0.2)}
          >
            {COPY.couple.tagline.split('\n').map((line, i) => (
              <span key={i}>{line}{i === 0 && <br />}</span>
            ))}
          </motion.p>
        </div>

        {/* Mobile: stacked. Desktop: side-by-side */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 lg:gap-16">

          {/* Bride */}
          <motion.article
            className="flex flex-col items-center gap-5 w-full max-w-[280px] md:max-w-[320px]"
            {...slide('left', 0.1)}
            aria-labelledby="bride-name"
          >
            <p className="eyebrow text-gold/70">{COPY.couple.brideLabel}</p>

            {/* Ornament above photo */}
            <FloralSprig
              className="w-24"
              horizontal
              opacity={0.5}
              color="#547FC5"
              accentColor="#C6922E"
            />

            <PhotoFrame
              src={bridePhotos[0]?.src ?? ''}
              alt={bridePhotos[0]?.alt ?? 'Keerthana — The Bride'}
              placeholderLabel="Keerthana's Portrait"
              aspectRatio="aspect-[3/4]"
              className="w-full"
              placeholder={!bridePhotos[0]?.src}
            />

            <div className="text-center">
              <h2
                id="bride-name"
                className="font-display font-light text-navy leading-none"
                style={{ fontSize: 'clamp(2rem, 7vw, 3rem)' }}
              >
                {WEDDING.bride.name}
              </h2>
            </div>
          </motion.article>

          {/* Centre divider — desktop only */}
          <motion.div
            className="hidden md:flex flex-col items-center gap-3"
            initial={{ opacity: 0, scaleY: 0 }}
            animate={inView ? { opacity: 1, scaleY: 1 } : {}}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
            style={{ transformOrigin: 'center' }}
            aria-hidden="true"
          >
            <div className="w-px h-20 bg-gradient-to-b from-transparent via-gold/30 to-transparent" />
            <span className="font-script text-gold" style={{ fontSize: '2.5rem' }}>&amp;</span>
            <div className="w-px h-20 bg-gradient-to-b from-transparent via-gold/30 to-transparent" />
          </motion.div>

          {/* Groom */}
          <motion.article
            className="flex flex-col items-center gap-5 w-full max-w-[280px] md:max-w-[320px]"
            {...slide('right', 0.1)}
            aria-labelledby="groom-name"
          >
            <p className="eyebrow text-gold/70">{COPY.couple.groomLabel}</p>

            <FloralSprig
              className="w-24"
              horizontal
              opacity={0.5}
              color="#547FC5"
              accentColor="#C6922E"
            />

            <PhotoFrame
              src={groomPhotos[0]?.src ?? ''}
              alt={groomPhotos[0]?.alt ?? 'Vasanth — The Groom'}
              placeholderLabel="Vasanth's Portrait"
              aspectRatio="aspect-[3/4]"
              objectPosition="top"
              className="w-full"
              placeholder={!groomPhotos[0]?.src}
            />

            <div className="text-center">
              <h2
                id="groom-name"
                className="font-display font-light text-navy leading-none"
                style={{ fontSize: 'clamp(2rem, 7vw, 3rem)' }}
              >
                {WEDDING.groom.name}
              </h2>
            </div>
          </motion.article>
        </div>

        {/* Bottom ornament */}
        <motion.div
          className="mt-8 md:mt-12 max-w-xs mx-auto"
          {...fadeUp(0.5)}
          aria-hidden="true"
        >
          <OrnamentDivider />
        </motion.div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(198,146,46,0.3), transparent)' }}
        aria-hidden="true"
      />
    </section>
  )
}
