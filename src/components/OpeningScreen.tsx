import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { COPY, WEDDING } from '../data/weddingData'
import { useReducedMotion } from '../hooks/useReducedMotion'
import '../styles/opening.css'

interface OpeningScreenProps { onOpen: () => void }

const JasmineFlower: React.FC<{ x: number; y: number; rotate?: number }> = ({ x, y, rotate = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${rotate})`}>
    {[0, 72, 144, 216, 288].map(angle => (
      <path key={angle} transform={`rotate(${angle})`} d="M0 0C-6-4-5-13-1-16C4-12 6-4 0 0Z" />
    ))}
    <circle r="2" className="opening-botanical-gold" />
  </g>
)

/** Two compositions share botanical vocabulary, with different stems and flowers. */
const Jasmine: React.FC<{ right?: boolean }> = ({ right = false }) => (
  <svg viewBox="0 0 160 360" fill="none" aria-hidden="true">
    <g stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
      <path d={right
        ? 'M18 360C30 309 70 285 55 227C40 167 23 145 44 92C54 65 55 47 46 24M53 236C78 209 106 213 112 168M38 155C16 142 10 113 16 86M42 308C85 297 116 276 124 244'
        : 'M16 360C39 316 22 270 40 222C56 181 27 148 40 102C49 69 39 52 47 28M34 275C68 253 80 231 77 202M42 206C20 189 10 159 18 132M38 137C74 127 90 102 88 73M29 322C65 323 105 305 118 282'} />
      <path d="M31 298C9 289 8 270 11 261C28 269 36 280 31 298ZM35 282C50 274 54 259 52 251C39 257 34 271 35 282ZM43 237C25 222 25 207 29 196C43 206 48 222 43 237ZM41 178C51 167 65 164 72 166C66 178 55 183 41 178ZM37 151C21 140 22 127 27 118C36 128 40 139 37 151ZM45 86C48 71 61 64 70 65C68 78 58 86 45 86ZM72 306C81 288 95 286 101 288C95 301 83 307 72 306" />
      <path className="opening-botanical-gold" d="M20 352C63 333 74 309 75 281M40 225C65 203 74 182 71 158M39 110C21 91 23 70 25 61M64 324C97 330 126 317 139 304M74 283C63 272 65 260 71 255C81 262 81 275 74 283ZM71 158C62 149 62 140 68 135C76 142 78 151 71 158ZM25 61C19 53 20 43 25 39C32 47 32 55 25 61Z" />
      {right ? <><JasmineFlower x={46} y={24} rotate={-12} /><JasmineFlower x={112} y={168} rotate={30} /><JasmineFlower x={16} y={86} /><JasmineFlower x={124} y={244} rotate={18} /></>
        : <><JasmineFlower x={47} y={28} rotate={16} /><JasmineFlower x={88} y={73} rotate={-18} /><JasmineFlower x={18} y={132} rotate={30} /><JasmineFlower x={77} y={202} /><JasmineFlower x={118} y={282} rotate={20} /></>}
    </g>
  </svg>
)

const Sparkle: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg className={`opening-sparkle ${className}`} viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <path d="M8 0C8.8 5.7 10.3 7.2 16 8C10.3 8.8 8.8 10.3 8 16C7.2 10.3 5.7 8.8 0 8C5.7 7.2 7.2 5.7 8 0Z" />
  </svg>
)

const MandapamArch: React.FC = () => (
  <svg className="opening-arch" viewBox="0 0 340 420" fill="none" preserveAspectRatio="none" aria-hidden="true">
    <g stroke="currentColor" strokeWidth="1.1">
      <path d="M22 415V148H32V130C32 97 48 88 71 88C68 61 91 48 115 52C116 30 145 30 170 8C195 30 224 30 225 52C249 48 272 61 269 88C292 88 308 97 308 130V148H318V415" />
      <path d="M36 415V154H46V132C46 108 58 101 87 102C78 76 98 64 128 68C125 47 152 44 170 25C188 44 215 47 212 68C242 64 262 76 253 102C282 101 294 108 294 132V154H304V415M16 163H51M289 163H324M18 172H49M291 172H322M19 390H49M291 390H321M12 402H55M285 402H328M12 413H55M285 413H328" />
      <path d="M29 180V381M311 180V381M156 26L170 39L184 26M161 18L170 27L179 18M170 0V8M68 88L75 93M272 88L265 93" />
    </g>
  </svg>
)

export const OpeningScreen: React.FC<OpeningScreenProps> = ({ onOpen }) => {
  const reduced = useReducedMotion()
  const [pressed, setPressed] = useState(false)
  return (
    <motion.div className="opening-screen" exit={{ opacity: 0 }} transition={{ duration: reduced ? 0.01 : 0.5, ease: [0.25, 0.1, 0.25, 1] }}>
      <section className="opening-card" aria-label="Wedding invitation cover">
        <div className="opening-illumination" aria-hidden="true" />
        <MandapamArch />
        <div className="opening-frame" aria-hidden="true">
          <svg className="opening-frame-line" width="100%" height="100%"><rect x="0.5" y="0.5" width="calc(100% - 1px)" height="calc(100% - 1px)" pathLength="1" /></svg>
          {['tl', 'tr', 'bl', 'br'].map(corner => (
            <svg key={corner} className={`opening-corner opening-corner--${corner}`} viewBox="0 0 32 32" fill="none"><path d="M0 25V0H25M6 23V13M13 6H23M3 3L10 10M7 13L13 7L19 13L13 19ZM10 13L13 10L16 13L13 16Z" /><circle cx="23" cy="6" r="1" /><circle cx="6" cy="23" r="1" /></svg>
          ))}
        </div>
        <div className="opening-botanical opening-botanical--left"><Jasmine /></div>
        <div className="opening-botanical opening-botanical--right"><Jasmine right /></div>
        <div className="opening-petals" aria-hidden="true">
          {[0, 1, 2, 3].map(petal => <svg key={petal} className={`opening-petal opening-petal--${petal}`} viewBox="0 0 18 28" fill="none"><path d="M9 25C-1 18 2 7 9 2C16 8 19 18 9 25ZM9 25C8 18 10 11 9 7" stroke="currentColor" strokeWidth="0.8" /></svg>)}
        </div>
        <div className="opening-content">
          <div className="opening-heading">
            <div className="opening-monogram opening-reveal" aria-hidden="true">
              <svg viewBox="0 0 68 84" fill="none">
                <g stroke="currentColor" strokeWidth="0.65">
                  <ellipse cx="34" cy="42" rx="25" ry="33" /><path d="M34 4C40 13 54 16 54 42C54 68 40 71 34 80C28 71 14 68 14 42C14 16 28 13 34 4ZM30 6L34 1L38 6L34 11ZM30 78L34 73L38 78L34 83ZM5 42H12M56 42H63" />
                  <path d="M25 17C26 10 31 11 34 15C37 11 42 10 43 17M25 67C26 74 31 73 34 69C37 73 42 74 43 67" />
                </g>
                <text x="18" y="47" fill="currentColor">V</text><text x="33" y="55" fill="currentColor" fontStyle="italic">K</text>
              </svg>
              <Sparkle className="opening-sparkle--crest" />
            </div>
            <p className="opening-eyebrow opening-reveal">THE WEDDING OF</p>
          </div>
          <div className="opening-names">
            <span className="opening-watermark" aria-hidden="true">VK</span>
            <h1><span className="opening-name opening-name--groom opening-reveal">{WEDDING.groom.name}</span><span className="opening-ampersand opening-reveal"><span>&amp;</span><Sparkle className="opening-sparkle--ampersand" /></span><span className="opening-name opening-name--bride opening-reveal">{WEDDING.bride.name}</span></h1>
          </div>
          <div className="opening-date opening-reveal">
            <time dateTime={WEDDING.date.iso} aria-label={WEDDING.date.display}>
              <span className="opening-date-day">{WEDDING.date.display.split(' ')[0]}</span>
              <span className="opening-divider" aria-hidden="true"><span /><Sparkle /><span /></span>
              <span className="opening-date-month">{WEDDING.date.display.split(' ').slice(1).join(' ').toUpperCase()}</span>
            </time>
          </div>
          <div className="opening-action opening-reveal">
            <p className="opening-awaits">YOUR INVITATION AWAITS</p>
            <button
              type="button"
              onClick={onOpen}
              onPointerDown={() => setPressed(true)}
              onPointerUp={() => setPressed(false)}
              onPointerCancel={() => setPressed(false)}
              onPointerLeave={() => setPressed(false)}
              onBlur={() => setPressed(false)}
              data-pressed={pressed}
              className="opening-button"
              aria-label="Open the wedding invitation"
            >
              <span>{COPY.opening.cta}</span>
              <svg viewBox="0 0 28 12" fill="none" aria-hidden="true"><path d="M0 6H26M21 1L26 6L21 11" stroke="currentColor" strokeWidth="0.9" /></svg>
            </button>
            <p className="opening-hint">Tap to enter the celebration</p>
            <span className="opening-enter-indicator" aria-hidden="true" />
          </div>
        </div>
      </section>
    </motion.div>
  )
}



