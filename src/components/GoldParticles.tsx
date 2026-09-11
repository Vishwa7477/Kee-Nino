import React, { useEffect, useMemo, useState } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'

interface Particle {
  id: number
  x: number
  y: number
  size: number
  duration: number
  delay: number
  opacity: number
  drift: number
}

interface GoldParticlesProps {
  count?: number
  className?: string
}

/**
 * Subtle floating gold particles for the opening screen and hero.
 * Uses CSS animation for performance — no canvas.
 * Automatically disabled when prefers-reduced-motion is set.
 */
export const GoldParticles: React.FC<GoldParticlesProps> = ({
  count = 24,
  className = '',
}) => {
  const reduced = useReducedMotion()

  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 8 + 6,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.5 + 0.1,
      drift: (Math.random() - 0.5) * 30,
    }))
  }, [count])

  if (reduced) return null

  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: p.size > 2.5
              ? `radial-gradient(circle, #F0D98A, #C6922E)`
              : '#C6922E',
            opacity: p.opacity,
            animation: `goldFloat ${p.duration}s ease-in-out ${p.delay}s infinite`,
            '--drift': `${p.drift}px`,
          } as React.CSSProperties}
        />
      ))}
      <style>{`
        @keyframes goldFloat {
          0%   { transform: translateY(0) translateX(0) scale(1); opacity: var(--op, 0.3); }
          33%  { transform: translateY(-18px) translateX(var(--drift)) scale(1.1); }
          66%  { transform: translateY(-8px) translateX(calc(var(--drift) * 0.5)) scale(0.9); }
          100% { transform: translateY(0) translateX(0) scale(1); }
        }
      `}</style>
    </div>
  )
}

/**
 * Falling petal particles — soft romantic effect for hero section
 */
interface PetalParticlesProps {
  count?: number
  className?: string
  color?: string
}

export const PetalParticles: React.FC<PetalParticlesProps> = ({
  count = 16,
  className = '',
  color = '#547FC5',
}) => {
  const reduced = useReducedMotion()

  const petals = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 8 + 6,
      duration: Math.random() * 8 + 10,
      delay: -(Math.random() * 18),
      rotation: Math.random() * 360,
      opacity: Math.random() * 0.4 + 0.35,
      drift: (Math.random() - 0.5) * 60,
    }))
  }, [count])

  if (reduced) return null

  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {petals.map((p) => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            left: `${p.x}%`,
            top: '-5%',
            width: `${p.size}px`,
            height: `${p.size * 0.6}px`,
            background: color,
            borderRadius: '50% 0 50% 0',
            opacity: p.opacity,
            animation: `petalFallAnim ${p.duration}s linear ${p.delay}s infinite`,
            '--pdrift': `${p.drift}px`,
            '--prot': `${p.rotation}deg`,
          } as React.CSSProperties}
        />
      ))}
      <style>{`
        @keyframes petalFallAnim {
          0%   { transform: translateY(-20px) translateX(0) rotate(var(--prot)); opacity: 0; }
          6%   { opacity: 0.8; }
          90%  { opacity: 0.8; }
          100% { transform: translateY(110vh) translateX(var(--pdrift)) rotate(calc(var(--prot) + 540deg)); opacity: 0; }
        }
      `}</style>
    </div>
  )
}

/**
 * A single, viewport-fixed petal layer for the invitation after it opens.
 * Keeping this mounted at the app root lets individual petals keep their
 * animation progress while the visitor scrolls or opens interface controls.
 */
export const GlobalPetalAnimation: React.FC = () => {
  const reduced = useReducedMotion()
  const [count, setCount] = useState(() =>
    typeof window !== 'undefined' && window.innerWidth >= 768 ? 20 : 12,
  )

  useEffect(() => {
    const updateCount = () => setCount(window.innerWidth >= 768 ? 20 : 12)
    window.addEventListener('resize', updateCount, { passive: true })
    return () => window.removeEventListener('resize', updateCount)
  }, [])

  const petals = useMemo(() => (
    Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 8 + 6,
      duration: Math.random() * 8 + 10,
      // Negative delays fill the viewport immediately without synchronising petals.
      delay: -(Math.random() * 18),
      rotation: Math.random() * 360,
      opacity: Math.random() * 0.4 + 0.35,
      drift: (Math.random() - 0.5) * 60,
    }))
  ), [count])

  // Do not force motion for visitors who have requested reduced motion.
  if (reduced) return null

  return (
    <div className="global-petal-layer" aria-hidden="true">
      {petals.map((petal) => (
        <span
          key={petal.id}
          className="global-petal"
          style={{
            left: `${petal.x}%`,
            width: `${petal.size}px`,
            height: `${petal.size * 0.6}px`,
            animationDuration: `${petal.duration}s`,
            animationDelay: `${petal.delay}s`,
            '--petal-drift': `${petal.drift}px`,
            '--petal-rotation': `${petal.rotation}deg`,
            '--petal-opacity': petal.opacity,
          } as React.CSSProperties}
        />
      ))}
    </div>
  )
}
