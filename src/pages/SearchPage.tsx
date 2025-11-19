import { useState } from "react";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { Input } from "@/components/ui/input";
import { Search, Music, User, Disc, ListMusic, Calendar, Play } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockSongs, mockArtists, mockAlbums, mockPlaylists, mockEvents } from "@/data/mockData";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // Filter functions
  const filteredSongs = mockSongs.filter(
    song => 
      song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.album.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredArtists = mockArtists.filter(
    artist => 
      artist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      artist.genre.some(g => g.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filteredAlbums = mockAlbums.filter(
    album => 
      album.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      album.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredPlaylists = mockPlaylists.filter(
    playlist => 
      playlist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      playlist.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredEvents = mockEvents.filter(
    event => 
      event.artist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.venue.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.venue.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const hasResults = searchQuery.length > 0 && (
    filteredSongs.length > 0 ||
    filteredArtists.length > 0 ||
    filteredAlbums.length > 0 ||
    filteredPlaylists.length > 0 ||
    filteredEvents.length > 0
  );

  return (
    <MobileLayout>
      <div className="space-y-4 pb-6">
        {/* Header */}
        <div className="px-4 pt-6">
          <h1 className="text-3xl font-bold mb-4">Search</h1>
          
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Artists, songs, albums, or live events"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 text-base"
            />
          </div>
        </div>

        {!searchQuery ? (
          // Browse Categories when no search
          <div className="px-4">
            <h2 className="text-xl font-bold mb-3">Browse all</h2>
            <div className="grid grid-cols-2 gap-3">
              {["Live Events", "Made For You", "New Releases", "Indie", "Rock", "Electronic", "Pop", "Hip-Hop"].map((category, i) => (
                <div
                  key={i}
                  className={`h-24 rounded-lg p-4 cursor-pointer hover:scale-105 transition-transform`}
                  style={{
                    background: [
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                      "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
                      "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
                      "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
                      "linear-gradient(135deg, #30cfd0 0%, #330867 100%)",
                      "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
                      "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
                    ][i]
                  }}
                >
                  <h3 className="text-lg font-bold text-white">{category}</h3>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="w-full grid grid-cols-6 mx-4 h-auto" style={{ width: 'calc(100% - 2rem)' }}>
              <TabsTrigger value="all" className="text-xs">All</TabsTrigger>
              <TabsTrigger value="songs" className="text-xs">Songs</TabsTrigger>
              <TabsTrigger value="artists" className="text-xs">Artists</TabsTrigger>
              <TabsTrigger value="albums" className="text-xs">Albums</TabsTrigger>
              <TabsTrigger value="playlists" className="text-xs">Playlists</TabsTrigger>
              <TabsTrigger value="live" className="text-xs">Live</TabsTrigger>
            </TabsList>

            {/* All Tab */}
            <TabsContent value="all" className="mt-4 space-y-6">
              {filteredArtists.length > 0 && (
                <div className="px-4">
                  <h2 className="text-lg font-bold mb-3">Artists</h2>
                  <div className="grid grid-cols-2 gap-3">
                    {filteredArtists.slice(0, 4).map((artist) => (
                      <Card 
                        key={artist.id}
                        className="p-3 cursor-pointer hover:bg-accent/50 transition-colors"
                        onClick={() => navigate(`/artist/${artist.id}`)}
                      >
                        <div className="space-y-2">
                          <div className="aspect-square rounded-full overflow-hidden">
                            <img src={artist.image} alt={artist.name} className="h-full w-full object-cover" />
                          </div>
                          <div>
                            <p className="font-semibold text-sm truncate">{artist.name}</p>
                            <p className="text-xs text-muted-foreground">Artist</p>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {filteredSongs.length > 0 && (
                <div className="px-4">
                  <h2 className="text-lg font-bold mb-3">Songs</h2>
                  <div className="space-y-2">
                    {filteredSongs.slice(0, 5).map((song) => (
                      <div key={song.id} className="flex items-center gap-3 p-2 rounded hover:bg-accent/50 cursor-pointer">
                        <div className="h-12 w-12 rounded overflow-hidden flex-shrink-0">
                          <img src={song.image} alt={song.title} className="h-full w-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">{song.title}</p>
                          <p className="text-xs text-muted-foreground truncate">{song.artist}</p>
                        </div>
                        <span className="text-xs text-muted-foreground">{song.duration}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {filteredEvents.length > 0 && (
                <div className="px-4">
                  <h2 className="text-lg font-bold mb-3">Live Events</h2>
                  <div className="space-y-3">
                    {filteredEvents.slice(0, 3).map((event) => (
                      <Card 
                        key={event.id}
                        className="overflow-hidden cursor-pointer hover:bg-accent/50 transition-colors"
                        onClick={() => navigate(`/event/${event.id}`)}
                      >
                        <div className="flex gap-3 p-3">
                          <div className="h-20 w-20 rounded overflow-hidden flex-shrink-0">
                            <img src={event.image} alt={event.title} className="h-full w-full object-cover" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-sm truncate mb-1">{event.artist.name}</p>
                            <p className="text-xs text-muted-foreground truncate mb-2">{event.venue.name}, {event.venue.city}</p>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Calendar className="h-3 w-3" />
                              <span>{format(new Date(event.date), "MMM d, yyyy")}</span>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {!hasResults && (
                <div className="px-4 py-12 text-center">
                  <Search className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                  <p className="text-muted-foreground">No results found for "{searchQuery}"</p>
                </div>
              )}
            </TabsContent>

            {/* Songs Tab */}
            <TabsContent value="songs" className="mt-4 px-4">
              {filteredSongs.length > 0 ? (
                <div className="space-y-2">
                  {filteredSongs.map((song) => (
                    <div key={song.id} className="flex items-center gap-3 p-2 rounded hover:bg-accent/50 cursor-pointer">
                      <div className="h-12 w-12 rounded overflow-hidden flex-shrink-0">
                        <img src={song.image} alt={song.title} className="h-full w-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{song.title}</p>
                        <p className="text-xs text-muted-foreground truncate">{song.artist} · {song.album}</p>
                      </div>
                      <span className="text-xs text-muted-foreground">{song.duration}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center">
                  <Music className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                  <p className="text-muted-foreground">No songs found</p>
                </div>
              )}
            </TabsContent>

            {/* Artists Tab */}
            <TabsContent value="artists" className="mt-4 px-4">
              {filteredArtists.length > 0 ? (
                <div className="grid grid-cols-2 gap-3">
                  {filteredArtists.map((artist) => (
                    <Card 
                      key={artist.id}
                      className="p-3 cursor-pointer hover:bg-accent/50 transition-colors"
                      onClick={() => navigate(`/artist/${artist.id}`)}
                    >
                      <div className="space-y-2">
                        <div className="aspect-square rounded-full overflow-hidden">
                          <img src={artist.image} alt={artist.name} className="h-full w-full object-cover" />
                        </div>
                        <div>
                          <p className="font-semibold text-sm truncate">{artist.name}</p>
                          <p className="text-xs text-muted-foreground">Artist</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center">
                  <User className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                  <p className="text-muted-foreground">No artists found</p>
                </div>
              )}
            </TabsContent>

            {/* Albums Tab */}
            <TabsContent value="albums" className="mt-4 px-4">
              {filteredAlbums.length > 0 ? (
                <div className="grid grid-cols-2 gap-3">
                  {filteredAlbums.map((album) => (
                    <Card key={album.id} className="p-3 cursor-pointer hover:bg-accent/50 transition-colors">
                      <div className="space-y-2">
                        <div className="aspect-square rounded overflow-hidden">
                          <img src={album.image} alt={album.title} className="h-full w-full object-cover" />
                        </div>
                        <div>
                          <p className="font-semibold text-sm truncate">{album.title}</p>
                          <p className="text-xs text-muted-foreground truncate">{album.artist}</p>
                          <p className="text-xs text-muted-foreground">{album.year}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center">
                  <Disc className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                  <p className="text-muted-foreground">No albums found</p>
                </div>
              )}
            </TabsContent>

            {/* Playlists Tab */}
            <TabsContent value="playlists" className="mt-4 px-4">
              {filteredPlaylists.length > 0 ? (
                <div className="grid grid-cols-2 gap-3">
                  {filteredPlaylists.map((playlist) => (
                    <Card key={playlist.id} className="p-3 cursor-pointer hover:bg-accent/50 transition-colors">
                      <div className="space-y-2">
                        <div className="aspect-square rounded overflow-hidden group relative">
                          <img src={playlist.image} alt={playlist.name} className="h-full w-full object-cover" />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center">
                              <Play className="h-5 w-5 text-primary-foreground" fill="currentColor" />
                            </div>
                          </div>
                        </div>
                        <div>
                          <p className="font-semibold text-sm truncate">{playlist.name}</p>
                          <p className="text-xs text-muted-foreground truncate">{playlist.description}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center">
                  <ListMusic className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                  <p className="text-muted-foreground">No playlists found</p>
                </div>
              )}
            </TabsContent>

            {/* Live Events Tab */}
            <TabsContent value="live" className="mt-4 px-4">
              {filteredEvents.length > 0 ? (
                <div className="space-y-3">
                  {filteredEvents.map((event) => (
                    <Card 
                      key={event.id}
                      className="overflow-hidden cursor-pointer hover:bg-accent/50 transition-colors"
                      onClick={() => navigate(`/event/${event.id}`)}
                    >
                      <div className="flex gap-3 p-3">
                        <div className="h-24 w-24 rounded overflow-hidden flex-shrink-0">
                          <img src={event.image} alt={event.title} className="h-full w-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0 flex flex-col justify-center">
                          <p className="font-semibold text-sm truncate mb-1">{event.artist.name}</p>
                          <p className="text-xs text-muted-foreground truncate mb-2">{event.venue.name}</p>
                          <p className="text-xs text-muted-foreground truncate mb-2">{event.venue.city}</p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            <span>{format(new Date(event.date), "MMM d, yyyy")}</span>
                          </div>
                        </div>
                        {event.isSoldOut ? (
                          <Badge variant="secondary" className="self-start">Sold Out</Badge>
                        ) : (
                          <div className="text-right self-center">
                            <p className="text-sm font-semibold">From ${event.ticketTiers[0].price}</p>
                          </div>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center">
                  <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                  <p className="text-muted-foreground">No live events found</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        )}
      </div>
    </MobileLayout>
  );
};

export default SearchPage;
