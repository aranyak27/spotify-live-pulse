import { MobileLayout } from "@/components/layout/MobileLayout";
import { mockEvents, mockPlaylists, mockGenres, mockRecentlyPlayed, mockJumpBackIn } from "@/data/mockData";
import { Music, Calendar, Play, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Index = () => {
  const navigate = useNavigate();
  const liveEvents = mockEvents.slice(0, 3);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <MobileLayout>
      <div className="space-y-6 pb-6">
        {/* Header */}
        <div className="px-4 pt-6">
          <h1 className="text-2xl font-bold tracking-tight">{getGreeting()}</h1>
        </div>

        {/* Live Event Banners - Multiple Carousel */}
        <div className="px-4 relative">
          <Carousel className="w-full">
            <CarouselContent>
              {liveEvents.map((event) => (
                <CarouselItem key={event.id}>
                  <div 
                    className="relative h-[200px] overflow-hidden rounded-lg cursor-pointer"
                    onClick={() => navigate(`/event/${event.id}`)}
                  >
                    <div 
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url(${event.image})` }}
                    />
                    <div 
                      className="absolute inset-0"
                      style={{ background: 'var(--gradient-hero)' }}
                    />
                    <div className="absolute inset-0 flex flex-col justify-end p-5">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs text-gray-300">
                          <Calendar className="h-3.5 w-3.5" />
                          <span>{format(new Date(event.date), "EEE, MMM d")}</span>
                        </div>
                        <h3 className="text-2xl font-bold text-white leading-tight">
                          {event.artist.name}
                        </h3>
                        <p className="text-sm text-gray-200">{event.venue.city}</p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>
        </div>

        {/* Jump Back In */}
        <div className="px-4">
          <h2 className="text-xl font-bold tracking-tight mb-3">Jump back in</h2>
          <div className="grid grid-cols-2 gap-3">
            {mockJumpBackIn.map((item) => (
              <Card 
                key={item.id}
                className="p-3 cursor-pointer hover:bg-accent/50 transition-colors"
              >
                <div className="space-y-2">
                  <div className="relative aspect-square rounded overflow-hidden group">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center">
                        <Play className="h-5 w-5 text-primary-foreground" fill="currentColor" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold text-sm truncate">{item.title}</p>
                    <p className="text-xs text-muted-foreground truncate">{item.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Recently Played */}
        <div className="px-4">
          <h2 className="text-xl font-bold tracking-tight mb-3">Recently played</h2>
          <div className="grid grid-cols-2 gap-3">
            {mockRecentlyPlayed.slice(0, 4).map((track) => (
              <Card 
                key={track.id} 
                className="p-3 cursor-pointer hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="relative h-12 w-12 rounded overflow-hidden flex-shrink-0">
                    <img 
                      src={track.image} 
                      alt={track.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-sm truncate">{track.title}</p>
                    <p className="text-xs text-muted-foreground truncate">{track.artist}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Your Top Genres */}
        <div className="px-4">
          <h2 className="text-xl font-bold tracking-tight mb-3">Your top genres</h2>
          <div className="grid grid-cols-2 gap-3">
            {mockGenres.slice(0, 4).map((genre) => (
              <div
                key={genre.id}
                className={`h-24 rounded-lg bg-gradient-to-br ${genre.color} p-4 cursor-pointer hover:scale-105 transition-transform`}
              >
                <h3 className="text-lg font-bold text-white">{genre.name}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* Made For You */}
        <div className="px-4">
          <h2 className="text-xl font-bold tracking-tight mb-3">Made for you</h2>
          <div className="grid grid-cols-2 gap-3">
            {mockPlaylists.slice(0, 4).map((playlist) => (
              <Card 
                key={playlist.id}
                className="p-3 cursor-pointer hover:bg-accent/50 transition-colors"
              >
                <div className="space-y-2">
                  <div className="relative aspect-square rounded overflow-hidden group">
                    <img 
                      src={playlist.image} 
                      alt={playlist.name}
                      className="h-full w-full object-cover"
                    />
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
        </div>

        {/* Your Mixes */}
        <div className="px-4">
          <h2 className="text-xl font-bold tracking-tight mb-3">Your mixes</h2>
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4">
            {mockPlaylists.map((playlist) => (
              <div 
                key={playlist.id}
                className="flex-shrink-0 w-36 cursor-pointer group"
              >
                <div className="relative aspect-square rounded overflow-hidden mb-2">
                  <img 
                    src={playlist.image} 
                    alt={playlist.name}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center">
                      <Play className="h-5 w-5 text-primary-foreground" fill="currentColor" />
                    </div>
                  </div>
                </div>
                <p className="font-semibold text-sm truncate">{playlist.name}</p>
                <p className="text-xs text-muted-foreground truncate">{playlist.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MobileLayout>
  );
};

export default Index;
