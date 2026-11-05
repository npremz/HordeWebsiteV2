// Source unique des coordonnées publiques (NAP) de Horde Agence.
// Doit rester identique à la fiche Google Business Profile, Sortlist et LinkedIn.
export const BUSINESS = {
  name: 'Horde Agence',
  email: 'hello@hordeagence.com',
  telephone: '+32 487 47 97 98',
  telephoneHref: 'tel:+32487479798',
  bookingUrl: 'https://calendly.com/ni-premont/30min',
  address: {
    streetAddress: 'Cantersteen 12',
    postalCode: '1000',
    addressLocality: 'Bruxelles',
    addressRegion: 'Région de Bruxelles-Capitale',
    addressCountry: 'BE',
  },
  // Géocodage OpenStreetMap de Cantersteen 12, 1000 Bruxelles.
  geo: { latitude: 50.84557, longitude: 4.35749 },
  googleBusinessProfileUrl: 'https://www.google.com/maps?cid=12899482697467726429',
  openingHours: {
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '09:00',
    closes: '18:00',
  },
} as const;
