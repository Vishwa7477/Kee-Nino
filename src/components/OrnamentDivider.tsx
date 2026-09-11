import React from 'react'

interface OrnamentDividerProps {
  className?: string
  color?: string
  size?: 'sm' | 'md' | 'lg'
}

/**
 * A gold ornamental divider with central diamond motif.
 * Used between sections and as decorative breaks.
 */
export const OrnamentDivider: React.FC<OrnamentDividerProps> = ({
  className = '',
  color = '#C6922E',
  size = 'md',
}) => {
  const heights = { sm: 16, md: 20, lg: 28 }
  const h = heights[size]

  return (
    <div className={`flex items-center justify-center w-full ${className}`} aria-hidden="true">
      <svg
        width="280"
        height={h + 8}
        viewBox={`0 0 280 ${h + 8}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="max-w-full"
      >
        {/* Left line */}
        <line x1="0" y1={(h + 8) / 2} x2="108" y2={(h + 8) / 2} stroke={color} strokeWidth="0.75" strokeOpacity="0.6" />
        {/* Left flourish */}
        <path
          d={`M 108 ${(h + 8) / 2} Q 118 ${(h + 8) / 2 - h * 0.4} 124 ${(h + 8) / 2}`}
          stroke={color}
          strokeWidth="0.75"
          strokeOpacity="0.8"
          fill="none"
        />
        {/* Central diamond */}
        <rect
          x="136"
          y={(h + 8) / 2 - 5}
          width="8"
          height="8"
          transform={`rotate(45 140 ${(h + 8) / 2})`}
          fill={color}
          opacity="0.9"
        />
        {/* Small dots */}
        <circle cx="126" cy={(h + 8) / 2} r="1.5" fill={color} opacity="0.7" />
        <circle cx="154" cy={(h + 8) / 2} r="1.5" fill={color} opacity="0.7" />
        {/* Right flourish */}
        <path
          d={`M 156 ${(h + 8) / 2} Q 162 ${(h + 8) / 2 - h * 0.4} 172 ${(h + 8) / 2}`}
          stroke={color}
          strokeWidth="0.75"
          strokeOpacity="0.8"
          fill="none"
        />
        {/* Right line */}
        <line x1="172" y1={(h + 8) / 2} x2="280" y2={(h + 8) / 2} stroke={color} strokeWidth="0.75" strokeOpacity="0.6" />
      </svg>
    </div>
  )
}

/**
 * Simple thin gold line divider
 */
export const GoldLine: React.FC<{ className?: string; opacity?: number }> = ({
  className = '',
  opacity = 0.4,
}) => (
  <div
    className={`w-full h-px ${className}`}
    style={{ background: `linear-gradient(90deg, transparent, rgba(198,146,46,${opacity}), transparent)` }}
    aria-hidden="true"
  />
)

/**
 * Ornamental corner decoration SVG
 */
export const CornerOrnament: React.FC<{
  position: 'tl' | 'tr' | 'bl' | 'br'
  size?: number
  color?: string
  className?: string
}> = ({ position, size = 60, color = '#C6922E', className = '' }) => {
  const transforms = {
    tl: 'rotate(0)',
    tr: 'rotate(90)',
    bl: 'rotate(270)',
    br: 'rotate(180)',
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
      style={{ transform: transforms[position] }}
    >
      {/* Outer L */}
      <path d="M2 2 L2 22" stroke={color} strokeWidth="1" strokeOpacity="0.8" />
      <path d="M2 2 L22 2" stroke={color} strokeWidth="1" strokeOpacity="0.8" />
      {/* Inner curl */}
      <path d="M2 14 Q8 8 14 2" stroke={color} strokeWidth="0.6" strokeOpacity="0.5" fill="none" />
      {/* Corner diamond */}
      <rect x="0" y="0" width="4" height="4" transform="rotate(45 2 2)" fill={color} opacity="0.9" />
      {/* Floral dot cluster */}
      <circle cx="10" cy="10" r="1.5" fill={color} opacity="0.6" />
      <circle cx="7" cy="13" r="1" fill={color} opacity="0.4" />
      <circle cx="13" cy="7" r="1" fill={color} opacity="0.4" />
    </svg>
  )
}
