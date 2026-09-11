import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Menu } from 'lucide-react'
import { WEDDING } from '../data/weddingData'

interface NavItem {
  label: string
  href: string
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Home',       href: '#home' },
  { label: 'The Couple', href: '#couple' },
  { label: 'Family',     href: '#family' },
  { label: 'Memories',   href: '#memories' },
  { label: 'Our Dog',    href: '#dog' },
  { label: 'Ceremony',   href: '#ceremony' },
]

export const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll when menu open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const handleNavClick = (href: string) => {
    setIsOpen(false)
    setTimeout(() => {
      const el = document.querySelector(href)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 300)
  }

  return (
    <>
      {/* Desktop nav — minimal top bar */}
      <nav
        className={`hidden md:flex fixed top-0 left-0 right-0 z-40 items-center justify-between px-8 lg:px-16 py-5 transition-all duration-500 ${
          scrolled
            ? 'bg-ivory/95 backdrop-blur-sm border-b border-gold/15 shadow-sm'
            : 'bg-transparent'
        }`}
        aria-label="Main navigation"
      >
        {/* Logo / name */}
        <a
          href="#home"
          onClick={(e) => { e.preventDefault(); handleNavClick('#home') }}
          className="font-script text-navy text-2xl leading-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          aria-label="Back to top"
        >
          {WEDDING.groom.name} &amp; {WEDDING.bride.name}
        </a>

        {/* Desktop links */}
        <ul className="flex items-center gap-8" role="list">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(item.href) }}
                className="font-body text-[0.65rem] tracking-[0.22em] uppercase text-brown/60 hover:text-gold transition-colors duration-200 focus-visible:outline-none focus-visible:text-gold"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile floating menu button */}
      <motion.button
        className="md:hidden fixed top-5 right-5 z-50 w-11 h-11 flex items-center justify-center rounded-full bg-ivory/90 border border-gold/40 shadow-md backdrop-blur-sm"
        onClick={() => setIsOpen((v) => !v)}
        aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={isOpen}
        aria-controls="mobile-nav-menu"
        whileTap={{ scale: 0.92 }}
        animate={scrolled && !isOpen
          ? { backgroundColor: 'rgba(247,241,229,0.97)', boxShadow: '0 2px 12px rgba(13,49,90,0.12)' }
          : {}
        }
      >
        <AnimatePresence mode="wait" initial={false}>
          {isOpen ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X size={18} className="text-navy" aria-hidden="true" />
            </motion.span>
          ) : (
            <motion.span
              key="menu"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Menu size={18} className="text-navy" aria-hidden="true" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Mobile full-screen nav overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-nav-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            className="md:hidden fixed inset-0 z-40 flex flex-col items-center justify-center"
            style={{ background: '#0D315A' }}
            initial={{ clipPath: 'circle(0% at calc(100% - 2.75rem) 2.75rem)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 2.75rem) 2.75rem)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 2.75rem) 2.75rem)' }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
          >
            {/* Background texture */}
            <div
              className="absolute inset-0 pointer-events-none opacity-5"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.15'/%3E%3C/svg%3E")`,
              }}
              aria-hidden="true"
            />

            {/* Couple name at top */}
            <motion.p
              className="font-script text-gold/60 text-2xl mb-10"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              {WEDDING.groom.name} &amp; {WEDDING.bride.name}
            </motion.p>

            {/* Nav items */}
            <nav aria-label="Mobile navigation">
              <ul className="flex flex-col items-center gap-6" role="list">
                {NAV_ITEMS.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.07, duration: 0.4 }}
                  >
                    <a
                      href={item.href}
                      onClick={(e) => { e.preventDefault(); handleNavClick(item.href) }}
                      className="font-display text-ivory/90 hover:text-gold transition-colors duration-200 focus-visible:outline-none focus-visible:text-gold"
                      style={{ fontSize: 'clamp(1.6rem, 6vw, 2.2rem)', fontWeight: 300 }}
                    >
                      {item.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>

            {/* Decorative line */}
            <motion.div
              className="w-16 h-px bg-gold/30 mt-10"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              aria-hidden="true"
            />

            {/* Date */}
            <motion.p
              className="font-body text-ivory/30 text-[0.6rem] tracking-[0.3em] uppercase mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              {WEDDING.date.display}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
