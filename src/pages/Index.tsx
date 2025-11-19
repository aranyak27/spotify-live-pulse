import { MobileLayout } from "@/components/layout/MobileLayout";
import { EventCard } from "@/components/live/EventCard";
import { mockEvents } from "@/data/mockData";
import { Music, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { SocialFeed } from "@/components/social/SocialFeed";
import { mockFriendActivity } from "@/data/mockSocialData";
import { format } from "date-fns";

const Index = () => {
  const navigate = useNavigate();
  const featuredEvent = mockEvents[0];
  const presaleEvents = mockEvents.filter(e => e.isFanPresale);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <MobileLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="px-4 pt-6 flex items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
            <Music className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{getGreeting()}</h1>
            <p className="text-sm text-muted-foreground">Discover live music</p>
          </div>
        </div>

        {/* Featured Live Show - Hero style */}
        <div className="relative h-[280px] overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
              backgroundImage: `url(${featuredEvent.image})`,
            }}
          />
          <div 
            className="absolute inset-0"
            style={{ background: 'var(--gradient-hero)' }}
          />
          
          <div className="absolute inset-0 flex flex-col justify-end p-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-gray-300">
                <Calendar className="h-3.5 w-3.5" />
                <span>{format(new Date(featuredEvent.date), "EEEE, MMM d")}</span>
              </div>
              <h2 className="text-3xl font-bold text-white leading-tight">
                {featuredEvent.artist.name}
              </h2>
              <p className="text-sm text-gray-200">{featuredEvent.venue.name}, {featuredEvent.venue.city}</p>
              <Button 
                size="sm" 
                className="mt-3 bg-white text-black hover:bg-gray-100"
                onClick={() => navigate(`/event/${featuredEvent.id}`)}
              >
                View show
              </Button>
            </div>
          </div>
        </div>

        {/* Live shows for you */}
        {presaleEvents.length > 0 && (
          <div className="px-4">
            <div className="flex items-baseline justify-between mb-3">
              <h2 className="text-xl font-bold tracking-tight">Live shows for you</h2>
              <button 
                className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => navigate("/live")}
              >
                Show all
              </button>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Early access based on your listening
            </p>
            <div className="space-y-3">
              {presaleEvents.slice(0, 2).map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        )}

        {/* Concerts near you */}
        <div className="px-4">
          <div className="flex items-baseline justify-between mb-3">
            <h2 className="text-xl font-bold tracking-tight">Concerts near you</h2>
            <button 
              className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => navigate("/live")}
            >
              Show all
            </button>
          </div>
          <div className="space-y-3">
            {mockEvents.slice(1, 3).map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>

        {/* Friend Activity */}
        <div className="px-4 pb-6">
          <h2 className="text-xl font-bold tracking-tight mb-4">Friend activity</h2>
          <SocialFeed activities={mockFriendActivity} />
        </div>
      </div>
    </MobileLayout>
  );
};

export default Index;
