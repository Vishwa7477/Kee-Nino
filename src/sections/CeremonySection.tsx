import React from 'react'
import { useInView } from '../hooks/useInView'
import { COPY, WEDDING } from '../data/weddingData'
import '../styles/ceremony.css'

/* ════════════════════════════════════════════════════════════════════
   SVG CLIP PATH — objectBoundingBox arch shape
   Coords are 0–1 fractions of element width/height.
   Shape: arch top (peaks at centre-top), organic rounded bottom.
════════════════════════════════════════════════════════════════════ */
const ArchClipDefs: React.FC = () => (
  <svg
    width="0"
    height="0"
    aria-hidden="true"
    focusable="false"
    style={{ position: 'absolute', overflow: 'hidden', pointerEvents: 'none' }}
  >
    <defs>
      {/*
        Top arch:  left side starts at (0, 0.27), curves up to peak (0.5, 0), curves to (1, 0.27)
        Right side: down from (1, 0.27) to (1, 0.80)
        Bottom wave: organic curve from (1, 0.80) → (0.5, 1.0) → (0, 0.80)
        Close back to (0, 0.27)
      */}
      <clipPath id="csec-arch-clip" clipPathUnits="objectBoundingBox">
        <path d="
          M 0,0.27
          C 0,0.04 0.24,0 0.50,0
          C 0.76,0 1,0.04 1,0.27
          L 1,0.80
          C 0.91,0.96 0.72,1 0.50,1
          C 0.28,1 0.09,0.96 0,0.80
          Z
        " />
      </clipPath>
    </defs>
  </svg>
)

/* ════════════════════════════════════════════════════════════════════
   BOTANICAL SVGs
════════════════════════════════════════════════════════════════════ */

/** Left-side botanical — stems + jasmine flowers + a gold tendril */
const LeftBotanical: React.FC = () => (
  <svg
    className="csec-bot csec-bot--left"
    viewBox="0 0 80 260"
    fill="none"
    aria-hidden="true"
  >
    <g stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round">
      {/* main stem */}
      <path d="M52 258C52 200 36 170 44 128C50 98 36 72 46 30" />
      {/* branches */}
      <path d="M48 210C28 196 14 170 20 148" />
      <path d="M46 168C64 155 70 132 62 112" />
      <path d="M50 230C70 224 80 202 76 186" />
      {/* leaves */}
      <path d="M20 148C8 132 10 116 14 110C24 118 28 134 20 148Z" />
      <path d="M48 210C32 200 26 184 30 176C40 182 48 198 48 210Z" />
      <path d="M76 186C86 170 90 156 86 148C76 154 72 168 76 186Z" />
      <path d="M62 112C52 94 56 80 60 74C70 82 72 96 62 112Z" />
    </g>
    {/* jasmine flower clusters */}
    {([[46,30],[20,148],[48,210],[76,186]] as [number,number][]).map(([x,y],i) => (
      <g key={i} transform={`translate(${x} ${y})`}>
        {[0,72,144,216,288].map(a => (
          <path
            key={a}
            transform={`rotate(${a})`}
            d="M0 0C-3.5-2-2.5-7 0-9C2.5-6 3.5-2 0 0Z"
            stroke="currentColor"
            strokeWidth="0.75"
            fill="none"
          />
        ))}
        <circle r="1.2" fill="#B88A3B" opacity="0.85" />
      </g>
    ))}
    {/* gold tendril accent */}
    <path
      stroke="#B88A3B"
      strokeWidth="0.7"
      fill="none"
      d="M46 30C68 36 76 52 70 72M70 72C64 66 66 58 70 56C75 62 74 68 70 72Z"
    />
  </svg>
)

/** Right-side botanical */
const RightBotanical: React.FC = () => (
  <svg
    className="csec-bot csec-bot--right"
    viewBox="0 0 80 240"
    fill="none"
    aria-hidden="true"
  >
    <g stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round">
      <path d="M28 10C28 62 46 102 38 148C32 176 44 198 34 228" />
      <path d="M34 64C56 78 64 106 54 128" />
      <path d="M36 116C16 130 10 156 20 174" />
      <path d="M32 42C10 34 0 56 4 76" />
      <path d="M54 128C66 144 62 160 58 164C48 156 48 140 54 128Z" />
      <path d="M20 174C8 188 12 202 16 206C24 196 24 184 20 174Z" />
      <path d="M4 76C-8 90 -4 106 0 112C10 102 12 88 4 76Z" />
    </g>
    {([[28,10],[54,128],[20,174],[4,76]] as [number,number][]).map(([x,y],i) => (
      <g key={i} transform={`translate(${x} ${y})`}>
        {[0,72,144,216,288].map(a => (
          <path
            key={a}
            transform={`rotate(${a})`}
            d="M0 0C-3.5-2-2.5-7 0-9C2.5-6 3.5-2 0 0Z"
            stroke="currentColor"
            strokeWidth="0.75"
            fill="none"
          />
        ))}
        <circle r="1.2" fill="#B88A3B" opacity="0.85" />
      </g>
    ))}
  </svg>
)

/* ════════════════════════════════════════════════════════════════════
   BETTER TOGETHER SEAL — strictly 68 × 68 px decorative badge
════════════════════════════════════════════════════════════════════ */
const BetterTogetherSeal: React.FC = () => (
  <div className="csec-seal" aria-hidden="true">
    <svg viewBox="0 0 68 68" fill="none">
      <circle cx="34" cy="34" r="31" stroke="#B88A3B" strokeWidth="1" strokeOpacity="0.75" />
      <circle cx="34" cy="34" r="26" stroke="#B88A3B" strokeWidth="0.5" strokeOpacity="0.4" />
      <path id="csec-s-arc" d="M 8 34 A 26 26 0 0 1 60 34" fill="none" />
      <text fontFamily="'Cormorant Garamond',Georgia,serif" fontSize="6.5" fill="#B88A3B" letterSpacing="1.2">
        <textPath href="#csec-s-arc" startOffset="6%">BETTER · TOGETHER ·</textPath>
      </text>
      {/* small heart */}
      <path
        d="M34 47C34 47 26 42 26 36C26 32.7 28.7 30 32 30C33 30 34 31 34 31C34 31 35 30 36 30C39.3 30 42 32.7 42 36C42 42 34 47 34 47Z"
        fill="#B88A3B"
        opacity="0.7"
      />
    </svg>
  </div>
)

/* ════════════════════════════════════════════════════════════════════
   MANDAP WATERMARK
════════════════════════════════════════════════════════════════════ */
const MandapWatermark: React.FC = () => (
  <svg
    className="csec-mandap"
    viewBox="0 0 380 120"
    fill="none"
    aria-hidden="true"
    preserveAspectRatio="xMidYMax meet"
  >
    <g stroke="#B88A3B" strokeWidth="0.8" strokeLinecap="round">
      <line x1="10" y1="115" x2="370" y2="115" />
      <line x1="30" y1="108" x2="350" y2="108" />
      <line x1="50" y1="100" x2="330" y2="100" />
      <line x1="55" y1="100" x2="55" y2="60" />
      <line x1="95" y1="100" x2="95" y2="52" />
      <line x1="140" y1="100" x2="140" y2="44" />
      <line x1="190" y1="100" x2="190" y2="30" />
      <line x1="240" y1="100" x2="240" y2="44" />
      <line x1="285" y1="100" x2="285" y2="52" />
      <line x1="325" y1="100" x2="325" y2="60" />
      <path d="M55 60 Q70 50 95 52" />
      <path d="M95 52 Q118 40 140 44" />
      <path d="M140 44 Q165 28 190 30" />
      <path d="M190 30 Q215 28 240 44" />
      <path d="M240 44 Q262 40 285 52" />
      <path d="M285 52 Q305 50 325 60" />
      <path d="M175 30 Q190 10 205 30" />
      <line x1="190" y1="10" x2="190" y2="30" />
      <polygon points="190,4 194,12 186,12" strokeWidth="0.6" />
      <path d="M55 80 Q75 68 95 80" fill="none" />
      <path d="M95 72 Q118 58 140 72" fill="none" />
      <path d="M140 65 Q165 50 190 55" fill="none" />
      <path d="M190 55 Q215 50 240 65" fill="none" />
      <path d="M240 72 Q262 58 285 72" fill="none" />
      <path d="M285 80 Q305 68 325 80" fill="none" />
    </g>
  </svg>
)

/* ════════════════════════════════════════════════════════════════════
   ICONS
════════════════════════════════════════════════════════════════════ */
const CalendarIcon: React.FC = () => (
  <svg className="csec-icon" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <rect x="2" y="3" width="16" height="15" rx="2" stroke="currentColor" strokeWidth="1.1" />
    <line x1="2" y1="8" x2="18" y2="8" stroke="currentColor" strokeWidth="1.1" />
    <line x1="6" y1="1" x2="6" y2="5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
    <line x1="14" y1="1" x2="14" y2="5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
  </svg>
)
const ClockIcon: React.FC = () => (
  <svg className="csec-icon" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.1" />
    <path d="M10 6V10L13 12.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
const PinIcon: React.FC = () => (
  <svg className="csec-icon" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M10 2C7.24 2 5 4.24 5 7C5 11 10 18 10 18C10 18 15 11 15 7C15 4.24 12.76 2 10 2Z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" />
    <circle cx="10" cy="7" r="2" stroke="currentColor" strokeWidth="1.1" />
  </svg>
)

/* ════════════════════════════════════════════════════════════════════
   MAIN SECTION COMPONENT
════════════════════════════════════════════════════════════════════ */
export const CeremonySection: React.FC = () => {
  const [ref, inView] = useInView<HTMLElement>({ threshold: 0.06 })
  const [day, month, year] = WEDDING.date.display.split(' ')

  return (
    <section
      id="ceremony"
      ref={ref}
      className="csec"
      data-visible={inView}
      aria-labelledby="csec-title"
    >
      {/* paper texture */}
      <div className="csec-texture" aria-hidden="true" />

      {/* corner L brackets */}
      <div className="csec-corner csec-corner--tl" aria-hidden="true" />
      <div className="csec-corner csec-corner--tr" aria-hidden="true" />

      {/* arch clip path def — zero-size, hidden */}
      <ArchClipDefs />

      {/* ── COMPACT HEADER ─────────────────────────────────── */}
      <div className="csec-hdr csec-anim" style={{ '--d': '0s' } as React.CSSProperties}>
        <div className="csec-eyebrow">THE WEDDING CEREMONY</div>
        <div className="csec-monogram">VK</div>
        <div className="csec-together">TOGETHER ALWAYS</div>
        <div className="csec-rule" aria-hidden="true">
          <span /><i /><span />
        </div>
      </div>

      {/* ── FULL-BLEED ARCH PHOTO ──────────────────────────── */}
      <div className="csec-photo-outer csec-anim" style={{ '--d': '0.06s' } as React.CSSProperties}>

        {/* Arch-clipped photo */}
        <div className="csec-arch-clip">
          <img
            src="/photos/ring-portrait.webp"
            alt="Vasanth placing the ring on Keerthana's finger during the wedding ceremony, both smiling joyfully"
            width="1200"
            height="800"
            loading="eager"
            decoding="async"
            className="csec-photo-img"
          />
        </div>

        {/* Gold accent curve — follows bottom of arch */}
        <svg
          className="csec-arch-accent"
          viewBox="0 0 400 22"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M 0,11 C 60,2 130,20 200,11 C 270,2 340,20 400,11"
            stroke="#B88A3B"
            strokeWidth="1.3"
            strokeOpacity="0.4"
            fill="none"
            strokeLinecap="round"
          />
          <circle cx="8" cy="14" r="2" fill="#B88A3B" opacity="0.35" />
          <circle cx="200" cy="4" r="2" fill="#B88A3B" opacity="0.3" />
          <circle cx="392" cy="14" r="2" fill="#B88A3B" opacity="0.35" />
        </svg>

        {/* Left botanical — overlaps arch edge */}
        <LeftBotanical />

        {/* Right botanical — overlaps arch edge */}
        <RightBotanical />

        {/* Better Together seal — lower-right, strictly 68×68 */}
        <BetterTogetherSeal />
      </div>

      {/* ── CONTENT BELOW PHOTO ────────────────────────────── */}
      <div className="csec-content">

        {/* JOIN US */}
        <header className="csec-headline csec-anim" style={{ '--d': '0.3s' } as React.CSSProperties}>
          <h2 id="csec-title" className="csec-join-us">Join Us</h2>
          <div className="csec-divider" aria-hidden="true">
            <span /><i /><span />
          </div>
          <p className="csec-invite-text">{COPY.ceremony.subheading}</p>
        </header>

        {/* COUPLE NAMES */}
        <div className="csec-names csec-anim" style={{ '--d': '0.5s' } as React.CSSProperties}>
          <p className="csec-name csec-name--groom">{WEDDING.groom.name}</p>
          <span className="csec-amp" aria-hidden="true">&amp;</span>
          <p className="csec-name csec-name--bride">{WEDDING.bride.name}</p>
        </div>

        {/* EVENT DETAILS */}
        <div className="csec-event-grid csec-anim" style={{ '--d': '0.7s' } as React.CSSProperties}>
          {/* DATE */}
          <div className="csec-event-cell">
            <CalendarIcon />
            <time dateTime={WEDDING.date.iso} aria-label={WEDDING.date.display}>
              <span className="csec-day">{day}</span>
              <span className="csec-month">{month}</span>
              <span className="csec-year">{year}</span>
            </time>
          </div>
          <div className="csec-event-sep" aria-hidden="true" />
          {/* TIME */}
          <div className="csec-event-cell">
            <ClockIcon />
            <span className="csec-event-label">Time</span>
            <span className="csec-event-val">{WEDDING.date.timeDisplay}</span>
          </div>
          <div className="csec-event-sep" aria-hidden="true" />
          {/* VENUE */}
          <div className="csec-event-cell">
            <PinIcon />
            <span className="csec-event-label">Venue</span>
            <span className="csec-event-val csec-event-val--venue">
              {WEDDING.venue.name},<br />{WEDDING.venue.city}
            </span>
          </div>
        </div>

        {/* VIEW LOCATION */}
        <div className="csec-btn-row csec-anim" style={{ '--d': '0.85s' } as React.CSSProperties}>
          <a
            href={WEDDING.venue.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="csec-loc-btn"
            aria-label={`View location of ${WEDDING.venue.fullName} on Google Maps (opens in new tab)`}
          >
            VIEW LOCATION
            <svg viewBox="0 0 22 10" fill="none" aria-hidden="true" className="csec-btn-arrow">
              <path
                d="M0 5H20M15 1L20 5L15 9"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>

      {/* ── HERITAGE FOOTER ────────────────────────────────── */}
      <div className="csec-heritage csec-anim" style={{ '--d': '0.95s' } as React.CSSProperties}>
        <MandapWatermark />
        <p className="csec-celebrate">CELEBRATE &nbsp;|&nbsp; BLESS &nbsp;|&nbsp; BE A PART</p>
      </div>

    </section>
  )
}
