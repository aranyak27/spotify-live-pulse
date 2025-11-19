import { Friend, FriendActivity, EventAttendee, FollowedArtist } from "@/types/social";
import { mockEvents, mockArtists } from "./mockData";

export const mockFriends: Friend[] = [
  {
    id: "f1",
    name: "Sarah Chen",
    image: "/placeholder.svg",
    isFollowing: true,
  },
  {
    id: "f2",
    name: "Mike Johnson",
    image: "/placeholder.svg",
    isFollowing: true,
  },
  {
    id: "f3",
    name: "Emma Davis",
    image: "/placeholder.svg",
    isFollowing: true,
  },
  {
    id: "f4",
    name: "James Wilson",
    image: "/placeholder.svg",
    isFollowing: true,
  },
  {
    id: "f5",
    name: "Alex Rivera",
    image: "/placeholder.svg",
    isFollowing: true,
  },
];

export const mockEventAttendees: EventAttendee[] = [
  {
    eventId: "1",
    friends: [mockFriends[0], mockFriends[1], mockFriends[2]],
    totalFriends: 3,
  },
  {
    eventId: "2",
    friends: [mockFriends[1], mockFriends[3], mockFriends[4], mockFriends[0], mockFriends[2]],
    totalFriends: 7,
  },
  {
    eventId: "3",
    friends: [mockFriends[0], mockFriends[4]],
    totalFriends: 2,
  },
];

export const mockFriendActivity: FriendActivity[] = [
  {
    id: "a1",
    friend: mockFriends[0],
    type: "attending",
    eventId: "1",
    eventTitle: mockEvents[0].title,
    artistName: mockEvents[0].artist.name,
    timestamp: "2025-11-18T14:30:00Z",
  },
  {
    id: "a2",
    friend: mockFriends[1],
    type: "interested",
    eventId: "2",
    eventTitle: mockEvents[1].title,
    artistName: mockEvents[1].artist.name,
    timestamp: "2025-11-17T09:15:00Z",
  },
  {
    id: "a3",
    friend: mockFriends[2],
    type: "rated",
    eventId: "1",
    eventTitle: mockEvents[0].title,
    artistName: mockEvents[0].artist.name,
    timestamp: "2025-11-16T20:45:00Z",
    rating: 5,
  },
  {
    id: "a4",
    friend: mockFriends[3],
    type: "followed-artist",
    artistId: mockArtists[4].id,
    artistName: mockArtists[4].name,
    timestamp: "2025-11-15T11:20:00Z",
  },
  {
    id: "a5",
    friend: mockFriends[4],
    type: "attending",
    eventId: "3",
    eventTitle: mockEvents[2].title,
    artistName: mockEvents[2].artist.name,
    timestamp: "2025-11-14T16:00:00Z",
  },
];

export const mockFollowedArtists: FollowedArtist[] = [
  {
    artistId: "1",
    artistName: "The Midnight",
    artistImage: "/images/artist-midnight.jpg",
    followedDate: "2024-03-15T10:00:00Z",
    upcomingShows: 3,
    hasNotifications: true,
  },
  {
    artistId: "2",
    artistName: "Tame Impala",
    artistImage: "/images/artist-tame.jpg",
    followedDate: "2024-05-20T14:30:00Z",
    upcomingShows: 1,
    hasNotifications: true,
  },
  {
    artistId: "4",
    artistName: "Arctic Monkeys",
    artistImage: "/images/artist-arctic.jpg",
    followedDate: "2024-08-10T09:15:00Z",
    upcomingShows: 0,
    hasNotifications: false,
  },
  {
    artistId: "5",
    artistName: "SZA",
    artistImage: "/images/artist-sza.jpg",
    followedDate: "2024-10-05T18:45:00Z",
    upcomingShows: 2,
    hasNotifications: true,
  },
];
