import { MobileLayout } from "@/components/layout/MobileLayout";
import { EventCard } from "@/components/live/EventCard";
import { mockEvents } from "@/data/mockData";
import { Music, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  const featuredEvent = mockEvents[0];

  return (
    <MobileLayout>
      <div className="px-4 pt-6 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
            <Music className="h-6 w-6 text-background" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Good evening</h1>
            <p className="text-sm text-muted-foreground">Your music, now live</p>
          </div>
        </div>

        {/* Live Event Banner */}
        <Card className="p-4 bg-gradient-to-br from-live-presale/20 to-primary/10 border-live-presale/30">
          <div className="flex items-start gap-3">
            <Sparkles className="h-6 w-6 text-live-presale animate-pulse-glow" />
            <div className="flex-1">
              <h3 className="font-semibold mb-1">Fans First Presale</h3>
              <p className="text-sm text-muted-foreground mb-3">
                You're a top listener! Get early access to tickets
              </p>
              <Button 
                size="sm" 
                className="bg-live-presale hover:bg-live-presale/90"
                onClick={() => navigate("/live")}
              >
                View Presales
              </Button>
            </div>
          </div>
        </Card>

        {/* Concerts Near You */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Concerts Near You</h2>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate("/live")}
            >
              See all
            </Button>
          </div>
          <EventCard event={featuredEvent} />
        </div>

        {/* Because You Listen To... */}
        <div>
          <h2 className="text-xl font-bold mb-4">Because You Listen To</h2>
          <div className="space-y-4">
            {mockEvents.slice(1, 3).map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </div>
    </MobileLayout>
  );
};

export default Index;
