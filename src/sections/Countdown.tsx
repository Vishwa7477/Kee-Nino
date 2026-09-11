import React, { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useCountdown } from '../hooks/useCountdown'
import { useInView } from '../hooks/useInView'
import { OrnamentDivider } from '../components/OrnamentDivider'
import { COPY, WEDDING } from '../data/weddingData'

interface DigitProps {
  value: number
  label: string
  delay: number
}

const CountdownDigit: React.FC<DigitProps> = ({ value, label, delay }) => {
  const [prev, setPrev] = useState(value)
  const [animKey, setAnimKey] = useState(0)

  useEffect(() => {
    if (value !== prev) {
      setPrev(value)
      setAnimKey((k) => k + 1)
    }
  }, [value, prev])

  const padded = String(value).padStart(2, '0')

  return (
    <motion.div
      className="flex flex-col items-center"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut', delay }}
    >
      {/* Number card */}
      <div className="relative">
        {/* Background card */}
        <div
          className="relative flex items-center justify-center rounded-sm"
          style={{
            width: 'clamp(72px, 18vw, 120px)',
            height: 'clamp(80px, 20vw, 134px)',
            background: 'linear-gradient(180deg, #0D315A 0%, #0A2848 100%)',
            boxShadow: '0 8px 32px rgba(13,49,90,0.25), inset 0 1px 0 rgba(198,146,46,0.2)',
            border: '1px solid rgba(198,146,46,0.25)',
          }}
        >
          {/* Top highlight */}
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(198,146,46,0.5), transparent)' }}
            aria-hidden="true"
          />
          {/* Middle fold line */}
          <div
            className="absolute left-0 right-0"
            style={{
              top: '50%',
              height: '1px',
              background: 'rgba(0,0,0,0.25)',
              boxShadow: '0 1px 0 rgba(255,255,255,0.03)',
            }}
            aria-hidden="true"
          />

          {/* Animated digit */}
          <motion.span
            key={animKey}
            className="font-display font-light text-ivory leading-none select-none"
            style={{ fontSize: 'clamp(2.2rem, 10vw, 4.5rem)', letterSpacing: '-0.02em' }}
            initial={{ y: -16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            aria-live="polite"
            aria-atomic="true"
          >
            {padded}
          </motion.span>

          {/* Gold corner accents */}
          {(['tl','tr','bl','br'] as const).map((pos) => (
            <div
              key={pos}
              className={`absolute w-2.5 h-2.5 pointer-events-none ${
                pos === 'tl' ? 'top-1.5 left-1.5 border-t border-l' :
                pos === 'tr' ? 'top-1.5 right-1.5 border-t border-r' :
                pos === 'bl' ? 'bottom-1.5 left-1.5 border-b border-l' :
                               'bottom-1.5 right-1.5 border-b border-r'
              } border-gold/40`}
              aria-hidden="true"
            />
          ))}
        </div>
      </div>

      {/* Label */}
      <p
        className="font-body font-bold tracking-[0.25em] uppercase text-gold/80 mt-3"
        style={{ fontSize: 'clamp(0.55rem, 1.5vw, 0.65rem)' }}
      >
        {label}
      </p>
    </motion.div>
  )
}

export const Countdown: React.FC = () => {
  const { days, hours, minutes, seconds, isWeddingDay } = useCountdown(WEDDING.date.countdownTarget)
  const [ref, inView] = useInView<HTMLElement>({ threshold: 0.2 })

  const values = [
    { value: days,    label: COPY.countdown.labels[0], delay: 0.1 },
    { value: hours,   label: COPY.countdown.labels[1], delay: 0.2 },
    { value: minutes, label: COPY.countdown.labels[2], delay: 0.3 },
    { value: seconds, label: COPY.countdown.labels[3], delay: 0.4 },
  ]

  return (
    <section
      id="countdown"
      ref={ref}
      className="relative py-12 md:py-16 overflow-hidden"
      style={{ background: '#F7F1E5' }}
      aria-label="Wedding countdown timer"
    >
      {/* Subtle top/bottom lines */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(198,146,46,0.3), transparent)' }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(198,146,46,0.3), transparent)' }}
        aria-hidden="true"
      />

      {/* Subtle radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(13,49,90,0.04) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">

        {isWeddingDay ? (
          /* Wedding day celebration state */
          <motion.div
            className="flex flex-col items-center gap-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <p className="eyebrow text-gold">{COPY.countdown.heading}</p>
            <OrnamentDivider />
            <h2
              className="font-display font-light text-navy"
              style={{ fontSize: 'clamp(2rem, 7vw, 4rem)' }}
            >
              {COPY.countdown.weddingDayMessage} ❤️
            </h2>
            <p
              className="font-body text-brown/60 tracking-[0.2em] uppercase"
              style={{ fontSize: 'clamp(0.7rem, 2vw, 0.8rem)' }}
            >
              {COPY.countdown.weddingDaySubtext}
            </p>
          </motion.div>
        ) : (
          <>
            {/* Heading */}
            <motion.p
              className="eyebrow text-gold mb-4"
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              {COPY.countdown.heading}
            </motion.p>

            <motion.div
              className="mb-6"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <OrnamentDivider />
            </motion.div>

            {/* Digits grid */}
            <div
              className="flex items-start justify-center gap-4 md:gap-6 lg:gap-8"
              role="timer"
              aria-label={`${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds until the wedding`}
            >
              {values.map((v, i) => (
                <React.Fragment key={v.label}>
                  {inView && (
                    <CountdownDigit
                      value={v.value}
                      label={v.label}
                      delay={v.delay}
                    />
                  )}
                  {/* Colon separator — hide on smallest screens */}
                  {i < 3 && (
                    <div
                      className="hidden sm:flex flex-col gap-2 self-center pb-8"
                      aria-hidden="true"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-gold/50" />
                      <div className="w-1.5 h-1.5 rounded-full bg-gold/50" />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Wedding date label below */}
            <motion.div
              className="mt-6 flex flex-col items-center gap-3"
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.6 }}
            >
              <OrnamentDivider size="sm" />
              <p
                className="font-display italic text-navy/50"
                style={{ fontSize: 'clamp(0.85rem, 2.5vw, 1.1rem)' }}
              >
                {WEDDING.date.display} &nbsp;·&nbsp; {WEDDING.date.timeDisplay}
              </p>
              <p
                className="font-body text-brown/40 tracking-[0.2em] uppercase"
                style={{ fontSize: 'clamp(0.55rem, 1.5vw, 0.65rem)' }}
              >
                {WEDDING.venue.fullName}
              </p>
            </motion.div>
          </>
        )}
      </div>
    </section>
  )
}
