import { MobileLayout } from "@/components/layout/MobileLayout";
import { useParams, useNavigate } from "react-router-dom";
import { mockArtists, mockEvents, mockSongs, mockAlbums } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Play, Shuffle, Users, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EventCard } from "@/components/live/EventCard";

const ArtistProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const artist = mockArtists.find(a => a.id === id);
  const artistSongs = mockSongs.filter(s => s.artist === artist?.name);
  const artistAlbums = mockAlbums.filter(a => a.artist === artist?.name);
  const artistEvents = mockEvents.filter(e => e.artist.id === id);
  
  if (!artist) {
    return (
      <MobileLayout>
        <div className="p-4">Artist not found</div>
      </MobileLayout>
    );
  }

  return (
    <MobileLayout>
      <div className="pb-6">
        {/* Header with background */}
        <div className="relative h-[320px]">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${artist.image})` }}
          />
          <div 
            className="absolute inset-0"
            style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.8) 100%)' }}
          />
          
          <div className="absolute top-0 left-0 right-0 p-4">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-6 space-y-3">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-primary text-primary-foreground">
                <Users className="h-3 w-3 mr-1" />
                {(artist.followers / 1000000).toFixed(1)}M followers
              </Badge>
            </div>
            <h1 className="text-4xl font-bold text-white">{artist.name}</h1>
            <div className="flex flex-wrap gap-2">
              {artist.genre.map((g, i) => (
                <span key={i} className="text-sm text-gray-300">{g}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="px-4 py-4 flex gap-3">
          <Button className="flex-1" size="lg">
            <Play className="h-5 w-5 mr-2" fill="currentColor" />
            Play
          </Button>
          <Button variant="outline" size="lg">
            <Shuffle className="h-5 w-5" />
          </Button>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="w-full grid grid-cols-3 mx-4" style={{ width: 'calc(100% - 2rem)' }}>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="songs">Songs</TabsTrigger>
            <TabsTrigger value="live">Live</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6 mt-4">
            {/* Popular Tracks */}
            <div className="px-4">
              <h2 className="text-xl font-bold mb-3">Popular</h2>
              <div className="space-y-2">
                {artistSongs.slice(0, 5).map((song, index) => (
                  <div key={song.id} className="flex items-center gap-3 p-2 rounded hover:bg-accent/50 cursor-pointer">
                    <span className="text-muted-foreground w-4 text-sm">{index + 1}</span>
                    <div className="h-10 w-10 rounded overflow-hidden flex-shrink-0">
                      <img src={song.image} alt={song.title} className="h-full w-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{song.title}</p>
                      <p className="text-xs text-muted-foreground truncate">{song.album}</p>
                    </div>
                    <span className="text-xs text-muted-foreground">{song.duration}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Albums */}
            {artistAlbums.length > 0 && (
              <div className="px-4">
                <h2 className="text-xl font-bold mb-3">Albums</h2>
                <div className="grid grid-cols-2 gap-3">
                  {artistAlbums.map((album) => (
                    <Card key={album.id} className="p-3 cursor-pointer hover:bg-accent/50 transition-colors">
                      <div className="space-y-2">
                        <div className="aspect-square rounded overflow-hidden">
                          <img src={album.image} alt={album.title} className="h-full w-full object-cover" />
                        </div>
                        <div>
                          <p className="font-semibold text-sm truncate">{album.title}</p>
                          <p className="text-xs text-muted-foreground">{album.year} · {album.tracks} tracks</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Upcoming Shows */}
            {artistEvents.length > 0 && (
              <div className="px-4">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-xl font-bold">Upcoming shows</h2>
                  <Button variant="ghost" size="sm" onClick={() => navigate("/live")}>
                    See all
                  </Button>
                </div>
                <div className="space-y-3">
                  {artistEvents.map((event) => (
                    <EventCard key={event.id} event={event} variant="compact" />
                  ))}
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="songs" className="mt-4 px-4">
            <div className="space-y-2">
              {artistSongs.map((song, index) => (
                <div key={song.id} className="flex items-center gap-3 p-2 rounded hover:bg-accent/50 cursor-pointer">
                  <span className="text-muted-foreground w-6 text-sm">{index + 1}</span>
                  <div className="h-12 w-12 rounded overflow-hidden flex-shrink-0">
                    <img src={song.image} alt={song.title} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{song.title}</p>
                    <p className="text-xs text-muted-foreground truncate">{song.album}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{song.duration}</span>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="live" className="mt-4 px-4">
            {artistEvents.length > 0 ? (
              <div className="space-y-3">
                {artistEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                <p className="text-muted-foreground">No upcoming shows</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </MobileLayout>
  );
};

export default ArtistProfile;
