import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { OrnamentDivider } from '../components/OrnamentDivider'
import { Lightbox, LightboxImage } from '../components/Lightbox'
import { COPY } from '../data/weddingData'
import { familyLoveMomentsPhotos } from '../data/photos'
import { ZoomIn } from 'lucide-react'

interface FamilyCardProps {
  src: string
  alt: string
  caption?: string
  index: number
  onClick: () => void
}

const FamilyCard: React.FC<FamilyCardProps> = ({
  src,
  alt,
  caption,
  onClick,
}) => {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.15 })

  return (
    <motion.div
      ref={ref}
      className="w-full flex justify-center px-0 md:px-4"
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
    >
      <button
        className="relative group text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold overflow-hidden bg-ivory/90 shadow-md w-full max-w-3xl cursor-pointer"
        style={{
          transform: 'none', // Straight, level portrait
        }}
        onClick={onClick}
        aria-label={`View ${alt} in fullscreen`}
      >
        {/* Gold border frame */}
        <div className="absolute inset-0 border border-gold/30 z-10 pointer-events-none" aria-hidden="true" />
        <div className="absolute inset-[3px] border border-gold/15 z-10 pointer-events-none" aria-hidden="true" />

        {/* Corner marks */}
        {(['tl', 'tr', 'bl', 'br'] as const).map((pos) => (
          <div
            key={pos}
            className={`absolute w-3.5 h-3.5 border-gold/60 z-20 pointer-events-none ${pos === 'tl' ? 'top-0 left-0 border-t border-l' :
                pos === 'tr' ? 'top-0 right-0 border-t border-r' :
                  pos === 'bl' ? 'bottom-0 left-0 border-b border-l' :
                    'bottom-0 right-0 border-b border-r'
              }`}
            aria-hidden="true"
          />
        ))}

        {/* Image — full width, natural aspect ratio, straight with zero cropping */}
        <div className="w-full overflow-hidden relative">
          <img
            src={src}
            alt={alt}
            loading="lazy"
            decoding="async"
            className="w-full h-auto block object-contain transition-transform duration-700 group-hover:scale-[1.02] group-focus-visible:scale-[1.02]"
          />

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/20 transition-colors duration-300 flex items-center justify-center">
            <ZoomIn
              size={32}
              className="text-ivory opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-md"
              aria-hidden="true"
            />
          </div>
        </div>

        {/* Caption */}
        {caption && (
          <div className="py-3 px-4 border-t border-gold/25 bg-ivory text-center">
            <p className="font-body text-[0.68rem] md:text-[0.75rem] tracking-[0.25em] uppercase text-brown/70 font-medium">
              {caption}
            </p>
          </div>
        )}
      </button>
    </motion.div>
  )
}

export const FamilyLoveMoments: React.FC = () => {
  const [ref, inView] = useInView<HTMLElement>({ threshold: 0.1 })
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const lightboxImages: LightboxImage[] = familyLoveMomentsPhotos.map(p => ({
    src: p.src,
    alt: p.alt,
    caption: p.caption,
  }))

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.8, ease: 'easeOut', delay },
  })

  return (
    <section
      id="family-love-moments"
      ref={ref}
      className="relative py-14 md:py-24 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #F7F1E5 0%, #EDE5D0 50%, #F7F1E5 100%)' }}
      aria-label="Family Love Moments gallery"
    >
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(198,146,46,0.3), transparent)' }}
        aria-hidden="true"
      />

      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-10 md:mb-14">
          <motion.p className="eyebrow text-gold mb-4" {...fadeUp(0)}>
            {COPY.familyLoveMoments.eyebrow}
          </motion.p>
          <div className="overflow-hidden">
            <motion.h2
              className="font-display font-light text-navy"
              style={{ fontSize: 'clamp(2rem, 7vw, 3.5rem)' }}
              initial={{ y: '100%' }}
              animate={inView ? { y: '0%' } : {}}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            >
              {COPY.familyLoveMoments.heading}
            </motion.h2>
          </div>
          <motion.div className="max-w-xs mx-auto mt-4 mb-4" {...fadeUp(0.25)} aria-hidden="true">
            <OrnamentDivider />
          </motion.div>
          <motion.p
            className="font-display italic text-navy/75 max-w-md mx-auto"
            style={{ fontSize: 'clamp(0.95rem, 2.5vw, 1.15rem)' }}
            {...fadeUp(0.3)}
          >
            {COPY.familyLoveMoments.subheading}
          </motion.p>
        </div>

        {/* Straightened Family Portraits Showcase */}
        <div className="flex flex-col gap-10 md:gap-14 items-center">
          {familyLoveMomentsPhotos.map((item, i) => (
            <FamilyCard
              key={i}
              src={item.src}
              alt={item.alt}
              caption={item.caption}
              index={i}
              onClick={() => setLightboxIndex(i)}
            />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <Lightbox
        images={lightboxImages}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNext={() => setLightboxIndex(i => i === null ? 0 : (i + 1) % lightboxImages.length)}
        onPrev={() => setLightboxIndex(i => i === null ? 0 : (i - 1 + lightboxImages.length) % lightboxImages.length)}
      />
    </section>
  )
}
