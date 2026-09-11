import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { OrnamentDivider } from '../components/OrnamentDivider'
import { Lightbox, LightboxImage } from '../components/Lightbox'
import { COPY } from '../data/weddingData'
import { memoryPhotos } from '../data/photos'
import { ZoomIn } from 'lucide-react'

interface MemoryCardProps {
  src: string
  alt: string
  caption?: string
  index: number
  placeholder: boolean
  placeholderLabel: string
  aspect?: 'portrait' | 'landscape'
  onClick: () => void
}

const MemoryCard: React.FC<MemoryCardProps> = ({
  src,
  alt,
  caption,
  index,
  placeholder,
  placeholderLabel,
  aspect,
  onClick,
}) => {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.15 })
  const [isLandscapeState, setIsLandscapeState] = useState(aspect === 'landscape')
  const isEmpty = placeholder || !src

  useEffect(() => {
    if (aspect) {
      setIsLandscapeState(aspect === 'landscape')
    }
  }, [aspect])

  const isLandscape = isLandscapeState

  // Alternating zig-zag alignment and subtle rotation for all cards
  const isEven = index % 2 === 0
  const rotations = [-1.4, 1.2, -0.9, 1.3, -1.1, 0.9, -1.3, 1.0]
  const rotation = rotations[index % rotations.length]

  return (
    <motion.div
      ref={ref}
      className={`flex ${isEven ? 'justify-start' : 'justify-end'} px-0 md:px-6 w-full`}
      initial={{ opacity: 0, y: 50, x: isEven ? -24 : 24 }}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      <button
        className="relative group text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold overflow-hidden bg-ivory/80 shadow-sm"
        style={{
          width: isLandscape ? 'clamp(280px, 78vw, 540px)' : 'clamp(230px, 60vw, 360px)',
          transform: `rotate(${rotation}deg)`,
          transformOrigin: isEven ? 'top left' : 'top right',
        }}
        onClick={onClick}
        aria-label={`View ${alt} in fullscreen`}
        disabled={isEmpty}
      >
        {/* Gold border frame */}
        <div className="absolute inset-0 border border-gold/25 z-10 pointer-events-none" aria-hidden="true" />
        <div className="absolute inset-[3px] border border-gold/10 z-10 pointer-events-none" aria-hidden="true" />

        {/* Corner marks */}
        {(['tl', 'tr', 'bl', 'br'] as const).map((pos) => (
          <div
            key={pos}
            className={`absolute w-3 h-3 border-gold/50 z-20 pointer-events-none ${
              pos === 'tl' ? 'top-0 left-0 border-t border-l' :
              pos === 'tr' ? 'top-0 right-0 border-t border-r' :
              pos === 'bl' ? 'bottom-0 left-0 border-b border-l' :
                             'bottom-0 right-0 border-b border-r'
            }`}
            aria-hidden="true"
          />
        ))}

        {/* Image — natural aspect ratio, full original width without cropping any members */}
        <div className="w-full overflow-hidden relative">
          {isEmpty ? (
            <div className="aspect-[3/2] img-placeholder w-full h-full flex flex-col items-center justify-center p-6">
              <svg width="36" height="28" viewBox="0 0 80 60" fill="none" aria-hidden="true">
                <ellipse cx="40" cy="35" rx="8" ry="20" fill="#C6922E" opacity="0.3" />
                <circle cx="40" cy="30" r="6" fill="#C6922E" opacity="0.5" />
                <circle cx="40" cy="30" r="3" fill="#C6922E" opacity="0.7" />
              </svg>
              <span className="text-[9px] tracking-widest uppercase text-gold/50 mt-2 font-body">
                {placeholderLabel}
              </span>
            </div>
          ) : (
            <>
              <img
                src={src}
                alt={alt}
                loading="lazy"
                decoding="async"
                onLoad={(e) => {
                  const img = e.currentTarget
                  if (img.naturalWidth > img.naturalHeight && !isLandscapeState) {
                    setIsLandscapeState(true)
                  }
                }}
                className="w-full h-auto block object-contain transition-transform duration-700 group-hover:scale-[1.02] group-focus-visible:scale-[1.02]"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/20 transition-colors duration-300 flex items-center justify-center">
                <ZoomIn
                  size={28}
                  className="text-ivory opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-md"
                  aria-hidden="true"
                />
              </div>
            </>
          )}
        </div>

        {/* Caption */}
        {caption && (
          <div className="pt-2.5 pb-2.5 px-3 border-t border-gold/20 bg-ivory/90 text-center">
            <p className="font-body text-[0.62rem] md:text-[0.68rem] tracking-[0.22em] uppercase text-brown/60 font-medium">
              {caption}
            </p>
          </div>
        )}
      </button>
    </motion.div>
  )
}

// Build placeholder memory items when no photos supplied
const PLACEHOLDER_MEMORIES = [
  { alt: 'Family Celebration',      caption: 'Family Celebrations' },
  { alt: 'Childhood Memory',        caption: 'Growing Up' },
  { alt: 'Childhood Memory',        caption: 'Cherished Moments' },
  { alt: 'Traditional Celebration', caption: 'Traditions & Culture' },
  { alt: 'Family Gathering',        caption: 'Family Gathering' },
  { alt: 'Special Moment',          caption: 'Precious Memories' },
]

export const MemoryGallery: React.FC = () => {
  const [ref, inView] = useInView<HTMLElement>({ threshold: 0.1 })
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  // Use real photos if available, else placeholders (no lightbox for placeholders)
  const photos = memoryPhotos.filter(p => p.src)
  const hasPhotos = photos.length > 0
  const displayItems = hasPhotos ? memoryPhotos : PLACEHOLDER_MEMORIES.map(p => ({
    ...p, src: '', placeholder: true,
  }))

  const lightboxImages: LightboxImage[] = photos.map(p => ({
    src: p.src,
    alt: p.alt,
    caption: p.caption,
  }))

  const handleOpen = (index: number) => {
    if (!hasPhotos) return
    // Map display index to photos-only index
    const photo = displayItems[index]
    const photoIdx = photos.findIndex(p => p.src === (photo as any).src)
    if (photoIdx >= 0) setLightboxIndex(photoIdx)
  }

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.8, ease: 'easeOut', delay },
  })

  return (
    <section
      id="memories"
      ref={ref}
      className="relative py-12 md:py-20 overflow-hidden"
      style={{ background: '#F7F1E5' }}
      aria-label="Family memories gallery"
    >
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(198,146,46,0.3), transparent)' }}
        aria-hidden="true"
      />

      <div className="max-w-5xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <motion.p className="eyebrow text-gold mb-4" {...fadeUp(0)}>
            {COPY.memories.eyebrow}
          </motion.p>
          <div className="overflow-hidden">
            <motion.h2
              className="font-display font-light text-navy"
              style={{ fontSize: 'clamp(2rem, 7vw, 3.5rem)' }}
              initial={{ y: '100%' }}
              animate={inView ? { y: '0%' } : {}}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            >
              {COPY.memories.heading}
            </motion.h2>
          </div>
          <motion.div className="max-w-xs mx-auto mt-4 mb-4" {...fadeUp(0.25)} aria-hidden="true">
            <OrnamentDivider />
          </motion.div>
          <motion.p
            className="font-display italic text-navy/50 max-w-sm mx-auto"
            style={{ fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)' }}
            {...fadeUp(0.3)}
          >
            {COPY.memories.subheading}
          </motion.p>
        </div>

        {/* Gallery — vertical staggered list */}
        <div className="flex flex-col gap-6 md:gap-8">
          {displayItems.map((item, i) => (
            <MemoryCard
              key={i}
              src={(item as any).src ?? ''}
              alt={item.alt}
              caption={(item as any).caption}
              index={i}
              placeholder={(item as any).placeholder || !(item as any).src}
              placeholderLabel={item.alt}
              aspect={(item as any).aspect}
              onClick={() => handleOpen(i)}
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
