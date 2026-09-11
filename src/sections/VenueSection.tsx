import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { OrnamentDivider } from '../components/OrnamentDivider'
import { COPY, WEDDING } from '../data/weddingData'
import { MapPin, ExternalLink } from 'lucide-react'

export const VenueSection: React.FC = () => {
  const [ref, inView] = useInView<HTMLElement>({ threshold: 0.15 })
  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.85, ease: 'easeOut', delay },
  })

  return (
    <section
      id="venue"
      ref={ref}
      className="relative py-12 md:py-20 overflow-hidden"
      style={{ background: '#F7F1E5' }}
      aria-label="Wedding venue"
    >
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(198,146,46,0.3), transparent)' }}
        aria-hidden="true"
      />

      <div className="max-w-5xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-8 md:mb-10">
          <motion.p className="eyebrow text-gold mb-4" {...fadeUp(0)}>
            {COPY.venue.eyebrow}
          </motion.p>
          <div className="overflow-hidden">
            <motion.h2
              className="font-display font-light text-navy leading-none"
              style={{ fontSize: 'clamp(2.5rem, 9vw, 5.5rem)' }}
              initial={{ y: '100%' }}
              animate={inView ? { y: '0%' } : {}}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            >
              {COPY.venue.heading}
            </motion.h2>
          </div>
          <div className="overflow-hidden">
            <motion.h3
              className="font-display font-light text-navy/50 leading-tight"
              style={{ fontSize: 'clamp(1.2rem, 4vw, 2.2rem)' }}
              initial={{ y: '100%' }}
              animate={inView ? { y: '0%' } : {}}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            >
              {COPY.venue.city}
            </motion.h3>
          </div>
          <motion.div className="max-w-xs mx-auto mt-5" {...fadeUp(0.25)} aria-hidden="true">
            <OrnamentDivider />
          </motion.div>
        </div>

        {/* Venue photo + info — side by side on desktop, stacked on mobile */}
        <div className="flex flex-col items-center">
          {/* Info */}
          <motion.div
            className="w-full max-w-xl flex flex-col items-center gap-5 text-center"
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          >
            {/* Location icon + name */}
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-gold/70 shrink-0" aria-hidden="true" />
              <div>
                <h3
                  className="font-display font-medium text-navy"
                  style={{ fontSize: 'clamp(1.1rem, 3.5vw, 1.6rem)' }}
                >
                  {WEDDING.venue.name}
                </h3>
                <p
                  className="font-body tracking-[0.2em] uppercase text-brown/50"
                  style={{ fontSize: 'clamp(0.58rem, 1.5vw, 0.65rem)' }}
                >
                  {WEDDING.venue.city}, Tamil Nadu
                </p>
              </div>
            </div>

            {/* Date & time recap */}
            <div className="border-l-2 border-gold/30 pl-4 flex flex-col gap-1">
              <p
                className="font-display text-navy/70 italic"
                style={{ fontSize: 'clamp(0.9rem, 2.8vw, 1.1rem)' }}
              >
                {WEDDING.date.display}
              </p>
              <p
                className="font-body tracking-[0.18em] uppercase text-brown/50"
                style={{ fontSize: 'clamp(0.58rem, 1.5vw, 0.65rem)' }}
              >
                {WEDDING.date.timeDisplay}
              </p>
            </div>

            <div className="w-full max-w-[200px] lg:max-w-none" aria-hidden="true">
              <OrnamentDivider size="sm" />
            </div>

            {/* Directions CTA */}
            <a
              href={WEDDING.venue.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold inline-flex items-center gap-2 focus-visible:outline-none"
              aria-label={`Get directions to ${WEDDING.venue.name} on Google Maps (opens new tab)`}
            >
              <MapPin size={13} aria-hidden="true" />
              {COPY.venue.directions}
              <ExternalLink size={11} aria-hidden="true" />
            </a>

            {/* QR hint — for when QR code image is supplied */}
            <div className="flex flex-col items-center lg:items-start gap-2 opacity-50">
              {/*
                ============================================================
                REPLACE: Supply the QR code image from the invitation.
                Place at /public/photos/qr-code.png and uncomment below.
                ============================================================
                <img
                  src="/photos/qr-code.png"
                  alt="Scan to get venue directions"
                  width="80"
                  height="80"
                  className="border border-gold/30 p-1"
                />
              */}
              <div className="w-16 h-16 border border-gold/25 flex items-center justify-center">
                <svg viewBox="0 0 16 16" fill="none" width="28" height="28" aria-hidden="true">
                  <rect x="1" y="1" width="6" height="6" fill="#C6922E" opacity="0.4"/>
                  <rect x="2" y="2" width="4" height="4" fill="#C6922E" opacity="0.4"/>
                  <rect x="9" y="1" width="6" height="6" fill="#C6922E" opacity="0.4"/>
                  <rect x="10" y="2" width="4" height="4" fill="#C6922E" opacity="0.4"/>
                  <rect x="1" y="9" width="6" height="6" fill="#C6922E" opacity="0.4"/>
                  <rect x="2" y="10" width="4" height="4" fill="#C6922E" opacity="0.4"/>
                  <rect x="9" y="9" width="2" height="2" fill="#C6922E" opacity="0.4"/>
                  <rect x="13" y="9" width="2" height="2" fill="#C6922E" opacity="0.4"/>
                  <rect x="9" y="13" width="2" height="2" fill="#C6922E" opacity="0.4"/>
                  <rect x="13" y="13" width="2" height="2" fill="#C6922E" opacity="0.4"/>
                  <rect x="11" y="11" width="2" height="2" fill="#C6922E" opacity="0.4"/>
                </svg>
              </div>
              <p
                className="font-body tracking-[0.18em] uppercase text-brown/40"
                style={{ fontSize: 'clamp(0.5rem, 1.2vw, 0.58rem)' }}
              >
                {COPY.venue.qrHint}
              </p>
            </div>
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
