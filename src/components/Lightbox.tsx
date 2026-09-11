import React, { useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

export interface LightboxImage {
  src: string
  alt: string
  caption?: string
}

interface LightboxProps {
  images: LightboxImage[]
  currentIndex: number | null
  onClose: () => void
  onNext: () => void
  onPrev: () => void
}

/**
 * Full-screen lightbox with keyboard navigation, swipe support, and gold accent styling.
 */
export const Lightbox: React.FC<LightboxProps> = ({
  images,
  currentIndex,
  onClose,
  onNext,
  onPrev,
}) => {
  const isOpen = currentIndex !== null
  const image = currentIndex !== null ? images[currentIndex] : null

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onNext()
      if (e.key === 'ArrowLeft') onPrev()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isOpen, onClose, onNext, onPrev])

  // Prevent body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  // Touch/swipe support
  const touchStartX = React.useRef(0)
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 50) {
      if (diff > 0) onNext()
      else onPrev()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && image && (
        <motion.div
          className="lightbox-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          role="dialog"
          aria-modal="true"
          aria-label={`Image ${(currentIndex ?? 0) + 1} of ${images.length}: ${image.alt}`}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-50 w-10 h-10 flex items-center justify-center rounded-full border border-gold/40 text-ivory hover:text-gold hover:border-gold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            aria-label="Close lightbox"
          >
            <X size={18} aria-hidden="true" />
          </button>

          {/* Prev button */}
          {images.length > 1 && (
            <button
              onClick={onPrev}
              className="absolute left-3 md:left-6 z-50 w-10 h-10 flex items-center justify-center rounded-full border border-gold/30 text-ivory/70 hover:text-gold hover:border-gold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              aria-label="Previous image"
            >
              <ChevronLeft size={22} aria-hidden="true" />
            </button>
          )}

          {/* Next button */}
          {images.length > 1 && (
            <button
              onClick={onNext}
              className="absolute right-3 md:right-6 z-50 w-10 h-10 flex items-center justify-center rounded-full border border-gold/30 text-ivory/70 hover:text-gold hover:border-gold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              aria-label="Next image"
            >
              <ChevronRight size={22} aria-hidden="true" />
            </button>
          )}

          {/* Image */}
          <motion.div
            key={currentIndex}
            className="relative max-w-[90vw] max-h-[80vh] flex flex-col items-center"
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Gold border */}
            <div className="relative border border-gold/25 p-0.5">
              <img
                src={image.src}
                alt={image.alt}
                className="max-w-[85vw] max-h-[72vh] w-auto h-auto object-contain block"
                draggable={false}
              />
            </div>

            {/* Caption + counter */}
            <div className="mt-4 flex flex-col items-center gap-1">
              {image.caption && (
                <p className="font-display italic text-ivory/70 text-sm">
                  {image.caption}
                </p>
              )}
              <p className="font-body text-ivory/30 text-[0.6rem] tracking-[0.2em] uppercase">
                {(currentIndex ?? 0) + 1} / {images.length}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
