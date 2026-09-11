import React from 'react'

interface PhotoFrameProps {
  src: string
  alt: string
  caption?: string
  className?: string
  aspectRatio?: string
  placeholder?: boolean
  placeholderLabel?: string
  objectPosition?: string   // e.g. 'top', 'center', '50% 20%'
  onClick?: () => void
}

/**
 * Elegant photo frame with gold border and optional caption.
 * Shows a tasteful placeholder when no image src is provided.
 */
export const PhotoFrame: React.FC<PhotoFrameProps> = ({
  src,
  alt,
  caption,
  className = '',
  aspectRatio = 'aspect-[3/4]',
  placeholder = false,
  placeholderLabel = 'Photo Coming Soon',
  objectPosition = 'center',
  onClick,
}) => {
  const isEmpty = !src || placeholder

  return (
    <figure
      className={`relative group ${className} ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      {/* Gold border frame */}
      <div className="absolute inset-0 border border-gold/30 pointer-events-none z-10" aria-hidden="true" />
      <div className="absolute inset-[4px] border border-gold/15 pointer-events-none z-10" aria-hidden="true" />

      {/* Corner ornaments */}
      {(['tl', 'tr', 'bl', 'br'] as const).map((pos) => (
        <div
          key={pos}
          className={`absolute w-4 h-4 border-gold/60 z-20 pointer-events-none ${
            pos === 'tl' ? 'top-0 left-0 border-t border-l' :
            pos === 'tr' ? 'top-0 right-0 border-t border-r' :
            pos === 'bl' ? 'bottom-0 left-0 border-b border-l' :
                           'bottom-0 right-0 border-b border-r'
          }`}
          aria-hidden="true"
        />
      ))}

      {/* Image or Placeholder */}
      <div className={`overflow-hidden ${aspectRatio} w-full`}>
        {isEmpty ? (
          <div className="img-placeholder w-full h-full flex flex-col items-center justify-center gap-2 p-4">
            {/* Placeholder lotus icon */}
            <svg width="40" height="32" viewBox="0 0 80 60" fill="none" aria-hidden="true">
              <ellipse cx="40" cy="35" rx="8" ry="20" fill="#C6922E" opacity="0.3" />
              <ellipse cx="28" cy="38" rx="7" ry="18" transform="rotate(-20 28 38)" fill="#C6922E" opacity="0.3" />
              <ellipse cx="52" cy="38" rx="7" ry="18" transform="rotate(20 52 38)" fill="#C6922E" opacity="0.3" />
              <circle cx="40" cy="30" r="6" fill="#C6922E" opacity="0.4" />
              <circle cx="40" cy="30" r="3" fill="#C6922E" opacity="0.7" />
            </svg>
            <span className="text-center text-[10px] tracking-widest uppercase text-gold/60 font-body leading-tight">
              {placeholderLabel}
            </span>
          </div>
        ) : (
          <img
            src={src}
            alt={alt}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            style={{ objectPosition }}
          />
        )}
      </div>

      {/* Caption */}
      {caption && (
        <figcaption className="text-center mt-2 font-body text-[10px] tracking-[0.2em] uppercase text-brown/50">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

/**
 * Round portrait frame — for couple section
 */
export const RoundPortrait: React.FC<{
  src: string
  alt: string
  size?: string
  className?: string
  placeholder?: boolean
  placeholderLabel?: string
}> = ({
  src,
  alt,
  size = 'w-64 h-64',
  className = '',
  placeholder = false,
  placeholderLabel = 'Portrait',
}) => {
  const isEmpty = !src || placeholder

  return (
    <div className={`relative ${size} ${className}`}>
      {/* Outer ring */}
      <div className="absolute inset-0 rounded-full border border-gold/40" aria-hidden="true" />
      <div className="absolute inset-[6px] rounded-full border border-gold/20" aria-hidden="true" />

      <div className="absolute inset-[10px] rounded-full overflow-hidden">
        {isEmpty ? (
          <div className="img-placeholder w-full h-full rounded-full flex flex-col items-center justify-center gap-1">
            <svg width="32" height="26" viewBox="0 0 80 60" fill="none" aria-hidden="true">
              <ellipse cx="40" cy="35" rx="8" ry="20" fill="#C6922E" opacity="0.3" />
              <circle cx="40" cy="30" r="6" fill="#C6922E" opacity="0.5" />
            </svg>
            <span className="text-[9px] tracking-widest uppercase text-gold/50 font-body">
              {placeholderLabel}
            </span>
          </div>
        ) : (
          <img
            src={src}
            alt={alt}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover"
          />
        )}
      </div>
    </div>
  )
}
