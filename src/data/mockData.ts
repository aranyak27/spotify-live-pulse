import { Event, Artist, Venue, Ticket } from "@/types/live";

// Mock Artists
export const mockArtists: Artist[] = [
  {
    id: "1",
    name: "The Midnight",
    image: "/images/artist-midnight.jpg",
    genre: ["Synthwave", "Electronic"],
    followers: 2500000,
  },
  {
    id: "2",
    name: "Tame Impala",
    image: "/images/artist-tame.jpg",
    genre: ["Psychedelic Rock", "Alternative"],
    followers: 8400000,
  },
  {
    id: "3",
    name: "Khruangbin",
    image: "/images/artist-khruangbin.jpg",
    genre: ["Psychedelic", "Funk"],
    followers: 3200000,
  },
  {
    id: "4",
    name: "Arctic Monkeys",
    image: "/images/artist-arctic.jpg",
    genre: ["Indie Rock", "Alternative"],
    followers: 15000000,
  },
  {
    id: "5",
    name: "SZA",
    image: "/images/artist-sza.jpg",
    genre: ["R&B", "Soul"],
    followers: 22000000,
  },
];

// Mock Venues
export const mockVenues: Venue[] = [
  {
    id: "1",
    name: "The Fillmore",
    city: "San Francisco",
    state: "CA",
    country: "USA",
    capacity: 1200,
    address: "1805 Geary Blvd",
    lat: 37.7841,
    lng: -122.4330,
  },
  {
    id: "2",
    name: "Brooklyn Steel",
    city: "Brooklyn",
    state: "NY",
    country: "USA",
    capacity: 1800,
    address: "319 Frost St",
    lat: 40.7218,
    lng: -73.9389,
  },
  {
    id: "3",
    name: "Echoplex",
    city: "Los Angeles",
    state: "CA",
    country: "USA",
    capacity: 700,
    address: "1154 Glendale Blvd",
    lat: 34.0786,
    lng: -118.2605,
  },
];

// Mock Events
export const mockEvents: Event[] = [
  {
    id: "1",
    title: "The Midnight - Heroes Tour",
    artist: mockArtists[0],
    supportActs: [],
    venue: mockVenues[0],
    date: "2025-12-15",
    time: "20:00",
    doors: "19:00",
    image: "/images/event-midnight.jpg",
    description: "Experience the synthwave legends live with a full production show featuring hits from Monsters and Heroes.",
    ageRestriction: "18+",
    genres: ["Synthwave", "Electronic"],
    ticketTiers: [
      {
        id: "1-ga",
        name: "General Admission",
        price: 45,
        availability: "good",
        remainingTickets: 800,
      },
      {
        id: "1-vip",
        name: "VIP Package",
        price: 120,
        availability: "low",
        remainingTickets: 15,
      },
    ],
    isSoldOut: false,
    hasResale: false,
    isFanPresale: true,
    presaleEnd: "2025-11-25T10:00:00Z",
    friendsAttending: 3,
    mood: ["chill", "energetic", "nostalgic"],
  },
  {
    id: "2",
    title: "Tame Impala - Currents World Tour",
    artist: mockArtists[1],
    supportActs: [mockArtists[2]],
    venue: mockVenues[1],
    date: "2025-12-20",
    time: "21:00",
    doors: "20:00",
    image: "/images/event-tame.jpg",
    description: "Kevin Parker brings his psychedelic masterpiece to life with mind-bending visuals and an unforgettable sonic journey.",
    ageRestriction: "All ages",
    genres: ["Psychedelic Rock", "Alternative"],
    ticketTiers: [
      {
        id: "2-ga",
        name: "General Admission",
        price: 75,
        availability: "sold-out",
        remainingTickets: 0,
      },
      {
        id: "2-balcony",
        name: "Balcony Reserved",
        price: 95,
        availability: "sold-out",
        remainingTickets: 0,
      },
    ],
    isSoldOut: true,
    hasResale: true,
    friendsAttending: 7,
    mood: ["trippy", "euphoric", "intense"],
  },
  {
    id: "3",
    title: "SZA - SOS Tour",
    artist: mockArtists[4],
    venue: mockVenues[2],
    date: "2025-12-18",
    time: "20:30",
    doors: "19:30",
    image: "/images/event-sza.jpg",
    description: "The queen of alternative R&B performs hits from her chart-topping album SOS in an intimate setting.",
    ageRestriction: "16+",
    genres: ["R&B", "Soul"],
    ticketTiers: [
      {
        id: "3-ga",
        name: "General Admission",
        price: 85,
        availability: "low",
        remainingTickets: 50,
      },
      {
        id: "3-meet",
        name: "Meet & Greet",
        price: 350,
        availability: "sold-out",
        remainingTickets: 0,
      },
    ],
    isSoldOut: false,
    hasResale: true,
    isFanPresale: false,
    friendsAttending: 2,
    mood: ["emotional", "intimate", "powerful"],
  },
];

// Mock user tickets
export const mockTickets: Ticket[] = [
  {
    id: "t1",
    event: mockEvents[0],
    tier: mockEvents[0].ticketTiers[0],
    quantity: 2,
    section: "GA Floor",
    qrCode: "QR123456789",
    purchaseDate: "2025-11-20T15:30:00Z",
    totalPrice: 90,
    status: "upcoming",
    isNFT: true,
  },
];

// Mock Playlists
export const mockPlaylists = [
  {
    id: "p1",
    name: "Your Top Songs 2024",
    description: "Your most played tracks this year",
    image: "/images/event-midnight.jpg",
    trackCount: 50,
  },
  {
    id: "p2",
    name: "Daily Mix 1",
    description: "The Midnight, Tame Impala, and more",
    image: "/images/event-tame.jpg",
    trackCount: 50,
  },
  {
    id: "p3",
    name: "Discover Weekly",
    description: "Your weekly mixtape of fresh music",
    image: "/images/event-sza.jpg",
    trackCount: 30,
  },
  {
    id: "p4",
    name: "Release Radar",
    description: "New music from artists you love",
    image: "/images/event-midnight.jpg",
    trackCount: 40,
  },
];

// Mock Genres
export const mockGenres = [
  { id: "g1", name: "Synthwave", color: "from-purple-500 to-pink-500" },
  { id: "g2", name: "Indie Rock", color: "from-green-500 to-teal-500" },
  { id: "g3", name: "R&B", color: "from-orange-500 to-red-500" },
  { id: "g4", name: "Electronic", color: "from-blue-500 to-cyan-500" },
  { id: "g5", name: "Alternative", color: "from-yellow-500 to-orange-500" },
  { id: "g6", name: "Psychedelic", color: "from-pink-500 to-purple-500" },
];

// Mock Recently Played
export const mockRecentlyPlayed = [
  {
    id: "rp1",
    title: "Sunset",
    artist: "The Midnight",
    image: "/images/event-midnight.jpg",
  },
  {
    id: "rp2",
    title: "The Less I Know The Better",
    artist: "Tame Impala",
    image: "/images/event-tame.jpg",
  },
  {
    id: "rp3",
    title: "Kill Bill",
    artist: "SZA",
    image: "/images/event-sza.jpg",
  },
  {
    id: "rp4",
    title: "Do I Wanna Know?",
    artist: "Arctic Monkeys",
    image: "/images/artist-arctic.jpg",
  },
  {
    id: "rp5",
    title: "Time Moves Slow",
    artist: "BADBADNOTGOOD",
    image: "/images/event-midnight.jpg",
  },
];
