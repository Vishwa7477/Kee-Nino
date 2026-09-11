import React from 'react'

// Styles
import './styles/globals.css'

// Components
import { Navigation } from './components/Navigation'

// Sections
import { Hero } from './sections/Hero'
import { CoupleSection } from './sections/CoupleSection'
import { FamilySection } from './sections/FamilySection'
import { MemoryGallery } from './sections/MemoryGallery'
import { FamilyLoveMoments } from './sections/FamilyLoveMoments'
import { DogSection } from './sections/DogSection'
import { CeremonySection } from './sections/CeremonySection'
import { InvitationMessage } from './sections/InvitationMessage'
import { FinalSection } from './sections/FinalSection'

const App: React.FC = () => {
  return (
    <div className="relative w-full overflow-x-hidden">
      {/* Persistent Navigation */}
      <Navigation />

      {/* ── Main Wedding Sections ── */}
      <main id="main-content">
        <Hero />
        <CoupleSection />
        <FamilySection />
        <MemoryGallery />
        <FamilyLoveMoments />
        <DogSection />
        <CeremonySection />
        <InvitationMessage />
        <FinalSection />
      </main>
    </div>
  )
}

export default App
