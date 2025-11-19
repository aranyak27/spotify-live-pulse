// Social features types

export interface Friend {
  id: string;
  name: string;
  image?: string;
  isFollowing: boolean;
}

export interface FriendActivity {
  id: string;
  friend: Friend;
  type: 'attending' | 'interested' | 'rated' | 'followed-artist';
  eventId?: string;
  eventTitle?: string;
  artistName?: string;
  artistId?: string;
  timestamp: string;
  rating?: number;
}

export interface EventAttendee {
  eventId: string;
  friends: Friend[];
  totalFriends: number;
}

export interface FollowedArtist {
  artistId: string;
  artistName: string;
  artistImage: string;
  followedDate: string;
  upcomingShows: number;
  hasNotifications: boolean;
}
