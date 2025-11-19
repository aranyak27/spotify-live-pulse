// Core types for Spotify Live

export interface Artist {
  id: string;
  name: string;
  image: string;
  genre: string[];
  followers: number;
}

export interface Venue {
  id: string;
  name: string;
  city: string;
  state?: string;
  country: string;
  capacity: number;
  address: string;
  lat: number;
  lng: number;
}

export interface TicketTier {
  id: string;
  name: string;
  price: number;
  availability: 'good' | 'low' | 'sold-out';
  remainingTickets?: number;
  section?: string;
}

export interface Event {
  id: string;
  title: string;
  artist: Artist;
  supportActs?: Artist[];
  venue: Venue;
  date: string;
  time: string;
  doors: string;
  image: string;
  description: string;
  ageRestriction?: string;
  genres: string[];
  ticketTiers: TicketTier[];
  isSoldOut: boolean;
  hasResale: boolean;
  isFanPresale?: boolean;
  presaleEnd?: string;
  friendsAttending?: number;
  mood?: string[];
}

export interface Ticket {
  id: string;
  event: Event;
  tier: TicketTier;
  quantity: number;
  section?: string;
  row?: string;
  seat?: string;
  qrCode: string;
  purchaseDate: string;
  totalPrice: number;
  status: 'upcoming' | 'used' | 'cancelled' | 'on-resale';
  isNFT: boolean;
}

export interface ResaleListing {
  id: string;
  ticket: Ticket;
  price: number;
  maxPriceMarkup: number;
  listedDate: string;
  expiryDate?: string;
}

export interface WaitlistEntry {
  id: string;
  userId: string;
  event: Event;
  quantity: number;
  maxPrice: number;
  status: 'waiting' | 'notified' | 'expired';
  createdDate: string;
}

export interface Notification {
  id: string;
  type: 'tour-announced' | 'presale-starting' | 'on-sale' | 'reminder' | 'post-event';
  title: string;
  message: string;
  eventId?: string;
  artistId?: string;
  timestamp: string;
  read: boolean;
}

export interface UserPreferences {
  notifications: {
    tourAnnounced: boolean;
    presale: boolean;
    onSale: boolean;
    reminders: boolean;
    postEvent: boolean;
    emailEnabled: boolean;
    pushEnabled: boolean;
  };
  location: {
    enabled: boolean;
    city?: string;
    radius: number; // in miles
  };
  favoriteGenres: string[];
}
