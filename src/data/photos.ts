// ============================================================
// PHOTO REGISTRY — all images are in /public/photos/
// WebP compressed, auto-rotated, max 1400px wide
// ============================================================

export interface PhotoItem {
  src: string
  alt: string
  caption?: string
  placeholder?: boolean
  aspect?: 'portrait' | 'landscape'
}

// ── Couple ────────────────────────────────────────────────────────────────────

export const couplePhotos = {
  together: {
    src: '/photos/couple.webp',
    alt: 'Vasanth and Keerthana together — bride in cream silk saree, groom in deep purple sherwani under green foliage',
    placeholder: false,
  } as PhotoItem,
}

// ── Bride ─────────────────────────────────────────────────────────────────────

export const bridePhotos: PhotoItem[] = [
  {
    src: '/photos/keerthana.webp',
    alt: 'Keerthana — the bride, in orange-red silk saree with gold temple jewellery and maang tikka, smiling through palm leaves',
    caption: 'Keerthana',
    placeholder: false,
  },
]

// ── Groom ─────────────────────────────────────────────────────────────────────

export const groomPhotos: PhotoItem[] = [
  {
    src: '/photos/vasanth.webp',
    alt: 'Vasanth — the groom, in navy blue shirt and grey trousers, leaning against a wooden pillar',
    caption: 'Vasanth',
    placeholder: false,
  },
]

// ── Family ────────────────────────────────────────────────────────────────────

export const familyPhotos: PhotoItem[] = [
  {
    src: '/photos/keerthana-family.webp',
    alt: "Keerthana's family — parents, Keerthana, Vasanth and brother Vishwa on the wedding stage",
    caption: "Bride's Family",
    placeholder: false,
    aspect: 'landscape',
  },
  {
    src: '/photos/bride-family-2.webp',
    alt: "Keerthana's family portrait on the wedding stage",
    caption: "Bride's Family",
    placeholder: false,
    aspect: 'landscape',
  },
  {
    src: '/photos/vasanth-family.webp',
    alt: "Groom's family — Keerthana, Vasanth's parents, sister, family and Vasanth on the wedding stage",
    caption: "Groom's Family",
    placeholder: false,
    aspect: 'portrait',
  },
  {
    src: '/photos/both-family.webp',
    alt: 'Both families together — parents with flower garlands during the wedding ceremony under a floral mandap',
    caption: 'Two Families, One Beginning',
    placeholder: false,
    aspect: 'landscape',
  },
]

// ── Memories ──────────────────────────────────────────────────────────────────

export const memoryPhotos: PhotoItem[] = [
  {
    src: '/photos/proposal.webp',
    alt: 'The proposal — Vasanth on one knee proposing and placing the ring on Keerthana\'s finger with flower petals falling',
    caption: 'A Moment Forever',
    placeholder: false,
    aspect: 'portrait',
  },
  {
    src: '/photos/couple.webp',
    alt: 'Vasanth and Keerthana together under green foliage — a quiet, warm moment',
    caption: 'Together',
    placeholder: false,
    aspect: 'portrait',
  },
  {
    src: '/photos/gt.webp',
    alt: 'Vasanth and Keerthana together on a Royal Enfield Continental GT motorcycle under lush green trees',
    caption: 'Our Journey',
    placeholder: false,
    aspect: 'portrait',
  },
]

// ── Family Love Moments ───────────────────────────────────────────────────────

export const familyLoveMomentsPhotos: PhotoItem[] = [
  {
    src: '/photos/bride-family.webp',
    alt: "Bride's extended family on the wedding stage with Vasanth and Keerthana",
    caption: "Bride's Family",
    placeholder: false,
    aspect: 'landscape',
  },
  {
    src: '/photos/bride-family-2.webp',
    alt: "Keerthana's family portrait on the wedding stage",
    caption: "Bride's Family",
    placeholder: false,
    aspect: 'landscape',
  },
  {
    src: '/photos/groom-family.webp',
    alt: "Groom's extended family on the wedding stage with Vasanth and Keerthana",
    caption: "Groom's Family",
    placeholder: false,
    aspect: 'landscape',
  },
  {
    src: '/photos/bride-relatives.webp',
    alt: "Bride's relatives and elders on the wedding stage with Keerthana and Vasanth",
    caption: "Bride's Relatives",
    placeholder: false,
    aspect: 'landscape',
  },
]

// ── Dog ───────────────────────────────────────────────────────────────────────
// REPLACE: Place dog photo at /public/photos/dog.webp and update src below

export const dogPhoto: PhotoItem = {
  src: '/photos/bhairav.webp',
  alt: 'Bhairav — the family\'s black Labrador, sitting regally on marble steps wearing a gold chain',
  caption: 'Bhairav',
  placeholder: false,
}

// ── Venue ─────────────────────────────────────────────────────────────────────
// REPLACE: Place venue photo at /public/photos/venue.webp and update src below

export const venuePhoto: PhotoItem = {
  src: '',          // REPLACE WITH VENUE PHOTO — /photos/venue.webp
  alt: 'Vaasaan Mahal, Musiri — Wedding Venue',
  placeholder: true,
}

// ── Vishwa ────────────────────────────────────────────────────────────────────

export const vishwaPhoto: PhotoItem = {
  src: '/photos/viee-kee.webp',
  alt: 'Vishwa with his sister Keerthana',
  caption: 'Vishwa',
  placeholder: false,
}
