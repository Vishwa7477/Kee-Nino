import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { OrnamentDivider } from '../components/OrnamentDivider'
import { FloralCornerLeft, FloralCornerRight } from '../components/FloralDecor'
import { PhotoFrame } from '../components/PhotoFrame'
import { COPY } from '../data/weddingData'
import { familyPhotos } from '../data/photos'

export const FamilySection: React.FC = () => {
  const [ref, inView] = useInView<HTMLElement>({ threshold: 0.1 })

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 28 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.85, ease: 'easeOut', delay },
  })

  return (
    <section
      id="family"
      ref={ref}
      className="relative py-12 md:py-20 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #EDE5D0 0%, #F7F1E5 100%)' }}
      aria-label="Family introduction"
    >
      {/* Subtle floral edges */}
      <div className="absolute left-0 bottom-0 w-28 md:w-44 pointer-events-none z-0 opacity-40" aria-hidden="true">
        <FloralCornerLeft />
      </div>
      <div className="absolute right-0 bottom-0 w-28 md:w-44 pointer-events-none z-0 opacity-40" aria-hidden="true">
        <FloralCornerRight />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <motion.p
            className="eyebrow text-gold mb-4"
            {...fadeUp(0)}
          >
            {COPY.family.eyebrow}
          </motion.p>

          <div className="overflow-hidden">
            <motion.h2
              className="font-display font-light text-navy leading-tight"
              style={{ fontSize: 'clamp(2rem, 7vw, 3.75rem)' }}
              initial={{ y: '100%' }}
              animate={inView ? { y: '0%' } : {}}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            >
              {COPY.family.heading.split('\n').map((line, i) => (
                <span key={i} className="block">{line}</span>
              ))}
            </motion.h2>
          </div>

          <motion.div className="max-w-xs mx-auto mt-4 mb-4" {...fadeUp(0.3)} aria-hidden="true">
            <OrnamentDivider />
          </motion.div>

          <motion.p
            className="font-display italic text-navy/75 max-w-md mx-auto leading-relaxed"
            style={{ fontSize: 'clamp(0.95rem, 2.8vw, 1.2rem)' }}
            {...fadeUp(0.4)}
          >
            {COPY.family.subheading}
          </motion.p>
        </div>

        {/* Photo grid — staggered reveal */}
        {familyPhotos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {familyPhotos.map((photo, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40, scale: 0.97 }}
                animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.2 + i * 0.15,
                }}
                // Slight alternating rotation for editorial feel
                style={{
                  transform: `rotate(${i % 2 === 0 ? '-0.5' : '0.5'}deg)`,
                }}
              >
                <PhotoFrame
                  src={photo.src}
                  alt={photo.alt}
                  caption={photo.caption}
                  placeholder={photo.placeholder || !photo.src}
                  placeholderLabel={photo.alt}
                  aspectRatio={photo.aspect === 'portrait' ? 'aspect-[2/3]' : 'aspect-[3/2]'}
                />
              </motion.div>
            ))}
          </div>
        ) : (
          /* Placeholder grid when familyPhotos array is empty */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {[
              { label: 'Family Portrait', ratio: 'aspect-[4/3]' },
              { label: "Keerthana's Family", ratio: 'aspect-[3/4]' },
              { label: "Groom's Family", ratio: 'aspect-[3/4]' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 + i * 0.15 }}
                style={{ transform: `rotate(${i % 2 === 0 ? '-0.5' : '0.5'}deg)` }}
              >
                <PhotoFrame
                  src=""
                  alt={item.label}
                  placeholder
                  placeholderLabel={item.label}
                  aspectRatio={item.ratio}
                />
              </motion.div>
            ))}
          </div>
        )}

        {/* Bottom quote */}
        <motion.div
          className="mt-8 md:mt-12 text-center flex flex-col items-center gap-3"
          {...fadeUp(0.5)}
        >
          <OrnamentDivider size="sm" />
          <p
            className="font-display italic text-navy/85 max-w-sm"
            style={{ fontSize: 'clamp(1rem, 2.8vw, 1.25rem)' }}
          >
            "A family is where life begins and love never ends."
          </p>
        </motion.div>
      </div>
    </section>
  )
}
