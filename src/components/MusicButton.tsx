import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Music, VolumeX } from 'lucide-react'
import { WEDDING } from '../data/weddingData'

interface MusicButtonProps {
  /** Set to true after the user first interacts with the invitation (clicks Open) */
  canAutoplay?: boolean
}

/**
 * Floating music button — bottom right.
 * Does NOT autoplay. Music starts only after user clicks.
 * Gracefully handles missing audio file without throwing errors.
 */
export const MusicButton: React.FC<MusicButtonProps> = ({ canAutoplay = false }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasAudio, setHasAudio] = useState(true)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Initialise audio element once
  useEffect(() => {
    const audio = new Audio()
    audio.loop = true
    audio.volume = 0.45
    audio.preload = 'none'

    audio.addEventListener('error', () => {
      // Audio file missing or unsupported — silently disable
      setHasAudio(false)
    })

    audio.src = WEDDING.music.src
    audioRef.current = audio

    return () => {
      audio.pause()
      audio.src = ''
    }
  }, [])

  // After invitation opens, optionally start music
  useEffect(() => {
    if (canAutoplay && hasAudio && audioRef.current && !isPlaying) {
      // Do NOT autoplay — only enable the button
    }
  }, [canAutoplay, hasAudio, isPlaying])

  const toggleMusic = () => {
    if (!hasAudio || !audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      const playPromise = audioRef.current.play()
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(() => {
            // Autoplay blocked or file missing
            setHasAudio(false)
          })
      }
    }
  }

  // Don't render if no audio file
  if (!hasAudio) return null

  return (
    <motion.button
      onClick={toggleMusic}
      className="fixed bottom-6 right-5 z-40 w-11 h-11 rounded-full bg-navy border border-gold/40 flex items-center justify-center shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
      aria-label={isPlaying ? 'Pause wedding music' : 'Play wedding music'}
      aria-pressed={isPlaying}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.2, duration: 0.4, type: 'spring' }}
    >
      {/* Animated equaliser bars when playing */}
      {isPlaying ? (
        <div
          className="flex items-end gap-[2px] h-4"
          aria-hidden="true"
        >
          {[0, 0.15, 0.07, 0.22, 0.1].map((delay, i) => (
            <span
              key={i}
              className="w-[3px] rounded-full bg-gold"
              style={{
                height: `${[8, 14, 10, 16, 10][i]}px`,
                animation: `equaliser 0.8s ease-in-out ${delay}s infinite alternate`,
              }}
            />
          ))}
          <style>{`
            @keyframes equaliser {
              from { transform: scaleY(0.3); }
              to   { transform: scaleY(1); }
            }
          `}</style>
        </div>
      ) : (
        <Music size={16} className="text-gold" aria-hidden="true" />
      )}
    </motion.button>
  )
}
