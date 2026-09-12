// ============================================================
// WEDDING CONFIGURATION — Central source of truth
// Update all wedding details here. Nothing is hard-coded elsewhere.
// ============================================================

export const WEDDING = {
  bride: {
    name: 'Keerthana',
    shortName: 'Kee',
  },
  groom: {
    name: 'Vasanth',
    shortName: 'Nino',
  },
  date: {
    display: '17 September 2026',
    numeric: '17 · 09 · 2026',
    iso: '2026-09-17',
    // Wedding ceremony time — IST (Asia/Kolkata = UTC+5:30)
    // Stored as UTC: 10:30 IST = 05:00 UTC
    countdownTarget: new Date('2026-09-17T05:00:00Z'),
    timeDisplay: '10:30 AM – 11:30 AM',
    timezone: 'Asia/Kolkata',
  },
  venue: {
    name: 'Vassan Mahal',
    city: 'Musiri',
    fullName: 'Vassan Mahal, Musiri',
    // Update with actual Google Maps URL when verified
    googleMapsUrl: 'https://www.google.com/maps/search/Vassan+Mahal+Musiri+Tamil+Nadu',
    // If exact coordinates available, replace the search URL:
    // googleMapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=LAT,LNG',
  },
  creator: {
    name: 'Vishwa',
    relation: "Keerthana's Brother",
    credit: 'Website crafted with love by Vishwa',
  },
  seo: {
    title: 'Vasanth & Keerthana | Wedding Invitation',
    description:
      'Join us as Vasanth & Keerthana begin their beautiful new chapter on 17 September 2026.',
    ogImage: '/og-image.jpg', // Replace with actual OG image
    url: 'https://kee-nino.vercel.app', // Update with actual deployment URL
  },
  // Music file path — place file at src/assets/music/wedding.mp3
  // The app works silently if the file is missing
  music: {
    src: '/music/wedding.mp3',
    label: 'Wedding Music',
  },
} as const

// ============================================================
// SECTION COPY — All text content in one place
// ============================================================

export const COPY = {
  opening: {
    eyebrow: 'THE WEDDING',
    title: 'Vasanth & Keerthana',
    date: '17 September 2026',
    cta: 'Open Invitation',
  },
  hero: {
    eyebrow: '17 September 2026',
    groom: 'Vasanth',
    ampersand: '&',
    bride: 'Keerthana',
    tagline: 'Are Getting Married',
    time: '10:30 AM – 11:30 AM',
    venue: 'Vassan Mahal, Musiri',
  },
  countdown: {
    heading: 'The Big Day Is Almost Here',
    weddingDayMessage: 'Today Is The Day',
    weddingDaySubtext: 'Vasanth & Keerthana are getting married',
    labels: ['Days', 'Hours', 'Minutes', 'Seconds'],
  },
  blessing: {
    eyebrow: 'With The Blessings Of The Divine',
    heading: 'Shri Ganesha',
    subheading: 'Vignaharta · Mangalmurti',
    body: 'We begin this sacred journey under the divine blessings of Lord Ganesha, the remover of obstacles, as two families become one.',
  },
  family: {
    eyebrow: 'Two Families',
    heading: 'Two Families,\nOne Beautiful Beginning.',
    subheading: 'A new chapter begins with the blessings of two families.',
  },
  couple: {
    brideLabel: 'The Bride',
    groomLabel: 'The Groom',
    tagline: 'Two families. Two journeys.\nOne beautiful beginning.',
  },
  memories: {
    eyebrow: 'Memories We Cherish',
    heading: 'Couple Moments',
    subheading: 'A collection of cherished moments leading to this beautiful day.',
  },
  familyLoveMoments: {
    eyebrow: 'Cherished Bonds',
    heading: 'Family Love Moments',
    subheading: 'Surrounded by the warmth, blessings, and laughter of our families.',
  },
  dog: {
    eyebrow: 'The Family\'s Most Important Guest',
    heading: '"My humans are getting married!"',
    badge: 'PAW APPROVED ✓',
    subtext: 'Every great wedding has a VIP guest. Ours has paws.',
  },
  ceremony: {
    eyebrow: 'The Wedding Ceremony',
    heading: 'Join Us',
    subheading: 'We joyfully invite you to witness and celebrate the sacred union of',
  },
  venue: {
    eyebrow: 'The Venue',
    heading: 'Vassan Mahal',
    city: 'Musiri',
    directions: 'Get Directions',
    qrHint: 'Scan for Location',
  },
  invitation: {
    heading: 'You Are Invited',
    body1: 'Your presence means a lot to us.',
    body2: 'Come join us for the wedding,\nblessings, a little celebration,\nlots of food &\nbeautiful memories.',
  },
  final: {
    withLove: 'With Love,',
    relation: "Keerthana's Brother",
    name: 'Vishwa',
    coupleNames: 'Vasanth & Keerthana',
    date: '17 · 09 · 2026',
    thankyou: 'Thank you for being part of our celebration.',
    credit: 'Website crafted with love by Vishwa',
  },
} as const
