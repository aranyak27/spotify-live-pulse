import { MobileLayout } from "@/components/layout/MobileLayout";
import { EventCard } from "@/components/live/EventCard";
import { mockEvents } from "@/data/mockData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const LiveTab = () => {
  const navigate = useNavigate();

  const forYouEvents = mockEvents.filter(e => e.isFanPresale || e.friendsAttending);
  const nearYouEvents = mockEvents;
  const moodEvents = mockEvents.filter(e => e.mood && e.mood.length > 0);

  return (
    <MobileLayout>
      <div className="px-4 pt-6 pb-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Live</h1>
            <p className="text-sm text-muted-foreground">Concerts & Events</p>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-primary rounded-full" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => navigate("/settings")}>
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <Tabs defaultValue="for-you" className="w-full">
          <TabsList className="w-full grid grid-cols-3 mb-6">
            <TabsTrigger value="for-you">For You</TabsTrigger>
            <TabsTrigger value="near-you">Near You</TabsTrigger>
            <TabsTrigger value="by-mood">By Mood</TabsTrigger>
          </TabsList>

          <TabsContent value="for-you" className="space-y-4 animate-fade-in">
            <div>
              <h2 className="text-lg font-semibold mb-3">Recommended for You</h2>
              <p className="text-sm text-muted-foreground mb-4">
                Based on your listening history and favorite artists
              </p>
            </div>
            {forYouEvents.length > 0 ? (
              <div className="space-y-4">
                {forYouEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No personalized events yet</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Keep listening to discover concerts near you
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="near-you" className="space-y-4 animate-fade-in">
            <div>
              <h2 className="text-lg font-semibold mb-3">Concerts Near You</h2>
              <p className="text-sm text-muted-foreground mb-4">
                San Francisco Bay Area • Within 50 miles
              </p>
            </div>
            <div className="space-y-4">
              {nearYouEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="by-mood" className="space-y-4 animate-fade-in">
            <div>
              <h2 className="text-lg font-semibold mb-3">Find Your Vibe</h2>
              <p className="text-sm text-muted-foreground mb-4">
                Concerts matched to your mood and energy
              </p>
            </div>
            <div className="space-y-4">
              {moodEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MobileLayout>
  );
};
