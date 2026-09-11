import React from 'react'

/**
 * SVG floral and botanical decorations inspired by the wedding invitation.
 * Hand-painted blue floral aesthetic with gold accents.
 */

interface FloralProps {
  className?: string
  opacity?: number
  color?: string
  accentColor?: string
}

/**
 * Large corner floral cluster — invitation-inspired blue florals
 */
export const FloralCornerLeft: React.FC<FloralProps> = ({
  className = '',
  opacity = 0.85,
  color = '#547FC5',
  accentColor = '#C6922E',
}) => (
  <svg
    viewBox="0 0 220 320"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
    style={{ opacity }}
  >
    {/* Main stem */}
    <path d="M 40 320 Q 50 240 60 180 Q 70 120 80 60" stroke={color} strokeWidth="1.5" strokeOpacity="0.6" fill="none" />
    {/* Branch left */}
    <path d="M 55 230 Q 20 210 5 190" stroke={color} strokeWidth="1" strokeOpacity="0.5" fill="none" />
    {/* Branch right */}
    <path d="M 65 170 Q 95 155 115 130" stroke={color} strokeWidth="1" strokeOpacity="0.5" fill="none" />
    {/* Large bloom top */}
    <circle cx="82" cy="52" r="18" fill={color} opacity="0.15" />
    <circle cx="82" cy="52" r="12" fill={color} opacity="0.2" />
    <circle cx="82" cy="52" r="6" fill={color} opacity="0.7" />
    {/* Petals for top bloom */}
    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
      <ellipse
        key={i}
        cx={82 + Math.cos((angle * Math.PI) / 180) * 15}
        cy={52 + Math.sin((angle * Math.PI) / 180) * 15}
        rx="6"
        ry="4"
        transform={`rotate(${angle} ${82 + Math.cos((angle * Math.PI) / 180) * 15} ${52 + Math.sin((angle * Math.PI) / 180) * 15})`}
        fill={color}
        opacity="0.35"
      />
    ))}
    {/* Medium bloom mid */}
    <circle cx="115" cy="128" r="14" fill={color} opacity="0.12" />
    <circle cx="115" cy="128" r="8" fill={color} opacity="0.2" />
    <circle cx="115" cy="128" r="4" fill={accentColor} opacity="0.6" />
    {/* Small buds */}
    <circle cx="6" cy="188" r="8" fill={color} opacity="0.25" />
    <circle cx="6" cy="188" r="4" fill={color} opacity="0.5" />
    {/* Leaves */}
    <ellipse cx="40" cy="270" rx="14" ry="6" transform="rotate(-30 40 270)" fill={color} opacity="0.2" />
    <ellipse cx="72" cy="200" rx="16" ry="7" transform="rotate(20 72 200)" fill={color} opacity="0.18" />
    <ellipse cx="90" cy="140" rx="12" ry="5" transform="rotate(-15 90 140)" fill={color} opacity="0.2" />
    {/* Gold pollen dots */}
    {[
      [82, 52], [115, 128], [6, 188],
    ].map(([cx, cy], i) => (
      <circle key={i} cx={cx} cy={cy} r="2" fill={accentColor} opacity="0.8" />
    ))}
    {/* Small scattered buds */}
    <circle cx="35" cy="290" r="5" fill={color} opacity="0.3" />
    <circle cx="50" cy="310" r="3" fill={color} opacity="0.2" />
    <circle cx="20" cy="250" r="6" fill={color} opacity="0.25" />
    {/* Tiny leaf veins */}
    <path d="M 40 270 L 52 265" stroke={color} strokeWidth="0.5" strokeOpacity="0.4" />
    <path d="M 72 200 L 84 196" stroke={color} strokeWidth="0.5" strokeOpacity="0.4" />
  </svg>
)

/**
 * Mirror of FloralCornerLeft for right side
 */
export const FloralCornerRight: React.FC<FloralProps> = ({
  className = '',
  opacity = 0.85,
  color = '#547FC5',
  accentColor = '#C6922E',
}) => (
  <svg
    viewBox="0 0 220 320"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
    style={{ opacity, transform: 'scaleX(-1)' }}
  >
    <path d="M 40 320 Q 50 240 60 180 Q 70 120 80 60" stroke={color} strokeWidth="1.5" strokeOpacity="0.6" fill="none" />
    <path d="M 55 230 Q 20 210 5 190" stroke={color} strokeWidth="1" strokeOpacity="0.5" fill="none" />
    <path d="M 65 170 Q 95 155 115 130" stroke={color} strokeWidth="1" strokeOpacity="0.5" fill="none" />
    <circle cx="82" cy="52" r="18" fill={color} opacity="0.15" />
    <circle cx="82" cy="52" r="12" fill={color} opacity="0.2" />
    <circle cx="82" cy="52" r="6" fill={color} opacity="0.7" />
    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
      <ellipse
        key={i}
        cx={82 + Math.cos((angle * Math.PI) / 180) * 15}
        cy={52 + Math.sin((angle * Math.PI) / 180) * 15}
        rx="6"
        ry="4"
        transform={`rotate(${angle} ${82 + Math.cos((angle * Math.PI) / 180) * 15} ${52 + Math.sin((angle * Math.PI) / 180) * 15})`}
        fill={color}
        opacity="0.35"
      />
    ))}
    <circle cx="115" cy="128" r="14" fill={color} opacity="0.12" />
    <circle cx="115" cy="128" r="8" fill={color} opacity="0.2" />
    <circle cx="115" cy="128" r="4" fill={accentColor} opacity="0.6" />
    <circle cx="6" cy="188" r="8" fill={color} opacity="0.25" />
    <circle cx="6" cy="188" r="4" fill={color} opacity="0.5" />
    <ellipse cx="40" cy="270" rx="14" ry="6" transform="rotate(-30 40 270)" fill={color} opacity="0.2" />
    <ellipse cx="72" cy="200" rx="16" ry="7" transform="rotate(20 72 200)" fill={color} opacity="0.18" />
    <ellipse cx="90" cy="140" rx="12" ry="5" transform="rotate(-15 90 140)" fill={color} opacity="0.2" />
    {[[82, 52], [115, 128], [6, 188]].map(([cx, cy], i) => (
      <circle key={i} cx={cx} cy={cy} r="2" fill={accentColor} opacity="0.8" />
    ))}
    <circle cx="35" cy="290" r="5" fill={color} opacity="0.3" />
    <circle cx="50" cy="310" r="3" fill={color} opacity="0.2" />
    <circle cx="20" cy="250" r="6" fill={color} opacity="0.25" />
  </svg>
)

/**
 * Small decorative floral sprig for inline use
 */
export const FloralSprig: React.FC<FloralProps & { horizontal?: boolean }> = ({
  className = '',
  opacity = 0.7,
  color = '#547FC5',
  accentColor = '#C6922E',
  horizontal = false,
}) => (
  <svg
    viewBox="0 0 120 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
    style={{ opacity, transform: horizontal ? 'none' : 'rotate(90deg)' }}
    width="120"
    height="40"
  >
    <path d="M 10 20 Q 60 10 110 20" stroke={color} strokeWidth="1" strokeOpacity="0.6" fill="none" />
    <circle cx="10" cy="20" r="5" fill={color} opacity="0.3" />
    <circle cx="10" cy="20" r="2.5" fill={color} opacity="0.7" />
    <circle cx="60" cy="14" r="4" fill={color} opacity="0.2" />
    <circle cx="60" cy="14" r="2" fill={accentColor} opacity="0.6" />
    <circle cx="110" cy="20" r="5" fill={color} opacity="0.3" />
    <circle cx="110" cy="20" r="2.5" fill={color} opacity="0.7" />
    <ellipse cx="35" cy="16" rx="7" ry="3" transform="rotate(-20 35 16)" fill={color} opacity="0.15" />
    <ellipse cx="85" cy="16" rx="7" ry="3" transform="rotate(20 85 16)" fill={color} opacity="0.15" />
  </svg>
)

/**
 * Temple silhouette backdrop — South Indian gopuram inspired
 */
export const TempleSilhouette: React.FC<FloralProps> = ({
  className = '',
  opacity = 0.065,
  color = '#0D315A',
}) => (
  <svg
    viewBox="0 0 800 300"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
    style={{ opacity }}
    preserveAspectRatio="xMidYMax meet"
  >
    {/* Central gopuram */}
    <path d="M 400 0 L 380 40 L 370 80 L 360 120 L 340 150 L 320 170 L 310 200 L 300 230 L 280 260 L 260 280 L 260 300 L 540 300 L 540 280 L 520 260 L 500 230 L 490 200 L 480 170 L 460 150 L 440 120 L 430 80 L 420 40 Z"
      fill={color} />
    {/* Left tower */}
    <path d="M 200 80 L 188 110 L 180 140 L 170 165 L 158 185 L 148 210 L 140 240 L 132 270 L 130 300 L 270 300 L 268 270 L 260 240 L 252 210 L 242 185 L 230 165 L 220 140 L 212 110 Z"
      fill={color} />
    {/* Right tower */}
    <path d="M 600 80 L 588 110 L 580 140 L 570 165 L 558 185 L 548 210 L 540 240 L 532 270 L 530 300 L 670 300 L 668 270 L 660 240 L 652 210 L 642 185 L 630 165 L 620 140 L 612 110 Z"
      fill={color} />
    {/* Far left small tower */}
    <path d="M 60 140 L 50 165 L 44 190 L 38 215 L 30 240 L 24 270 L 22 300 L 120 300 L 118 270 L 112 240 L 104 215 L 98 190 L 92 165 L 80 140 Z"
      fill={color} />
    {/* Far right small tower */}
    <path d="M 740 140 L 730 165 L 724 190 L 718 215 L 710 240 L 704 270 L 702 300 L 800 300 L 800 270 L 792 240 L 784 215 L 778 190 L 772 165 L 760 140 Z"
      fill={color} />
    {/* Base wall */}
    <rect x="0" y="285" width="800" height="15" fill={color} />
    {/* Decorative arch openings — central */}
    <ellipse cx="400" cy="270" rx="25" ry="30" fill={color} opacity="0.4" />
    {/* Decorative tiers on gopuram */}
    <rect x="365" y="155" width="70" height="3" fill={color} opacity="0.5" />
    <rect x="355" y="175" width="90" height="2" fill={color} opacity="0.4" />
    <rect x="345" y="195" width="110" height="2" fill={color} opacity="0.3" />
  </svg>
)

/**
 * Lotus flower decoration
 */
export const LotusDecor: React.FC<FloralProps & { size?: number }> = ({
  className = '',
  opacity = 0.6,
  color = '#547FC5',
  accentColor = '#C6922E',
  size = 80,
}) => (
  <svg
    viewBox="0 0 80 60"
    width={size}
    height={(size * 60) / 80}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
    style={{ opacity }}
  >
    {/* Outer petals */}
    <ellipse cx="40" cy="35" rx="8" ry="20" fill={color} opacity="0.2" />
    <ellipse cx="28" cy="38" rx="7" ry="18" transform="rotate(-20 28 38)" fill={color} opacity="0.2" />
    <ellipse cx="52" cy="38" rx="7" ry="18" transform="rotate(20 52 38)" fill={color} opacity="0.2" />
    <ellipse cx="18" cy="44" rx="6" ry="15" transform="rotate(-38 18 44)" fill={color} opacity="0.15" />
    <ellipse cx="62" cy="44" rx="6" ry="15" transform="rotate(38 62 44)" fill={color} opacity="0.15" />
    {/* Inner petals */}
    <ellipse cx="40" cy="32" rx="5" ry="15" fill={color} opacity="0.4" />
    <ellipse cx="33" cy="35" rx="4.5" ry="13" transform="rotate(-15 33 35)" fill={color} opacity="0.35" />
    <ellipse cx="47" cy="35" rx="4.5" ry="13" transform="rotate(15 47 35)" fill={color} opacity="0.35" />
    {/* Center */}
    <circle cx="40" cy="30" r="6" fill={color} opacity="0.5" />
    <circle cx="40" cy="30" r="3" fill={accentColor} opacity="0.8" />
    {/* Stamens */}
    <circle cx="36" cy="26" r="1" fill={accentColor} opacity="0.6" />
    <circle cx="44" cy="26" r="1" fill={accentColor} opacity="0.6" />
    <circle cx="40" cy="24" r="1" fill={accentColor} opacity="0.6" />
    {/* Stem */}
    <path d="M 40 50 Q 38 55 40 60" stroke={color} strokeWidth="1.5" strokeOpacity="0.5" fill="none" />
    {/* Leaves */}
    <ellipse cx="28" cy="55" rx="14" ry="5" transform="rotate(-15 28 55)" fill={color} opacity="0.2" />
    <ellipse cx="52" cy="55" rx="14" ry="5" transform="rotate(15 52 55)" fill={color} opacity="0.2" />
  </svg>
)
