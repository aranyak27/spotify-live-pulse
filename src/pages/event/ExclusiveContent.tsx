import { useParams, useNavigate } from "react-router-dom";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { mockEvents } from "@/data/mockData";
import { ArrowLeft, Play, Download, Music, Award, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export const ExclusiveContent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const event = mockEvents.find(e => e.id === id);

  if (!event) return null;

  return (
    <MobileLayout showNav={false}>
      <div className="min-h-screen">
        {/* Header */}
        <div className="relative">
          <div 
            className="h-48 bg-cover bg-center"
            style={{ backgroundImage: `url(${event.image})` }}
          />
          <div 
            className="absolute inset-0"
            style={{ background: 'var(--gradient-hero)' }}
          />
          <div className="absolute top-4 left-4">
            <Button 
              variant="ghost" 
              size="icon"
              className="bg-background/20 backdrop-blur-sm"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </div>
          <div className="absolute bottom-4 left-4 right-4">
            <Badge className="bg-primary text-primary-foreground mb-2">
              Exclusive Content Unlocked
            </Badge>
            <h1 className="text-2xl font-bold text-white">
              Thanks for Coming!
            </h1>
          </div>
        </div>

        <div className="px-4 py-6 space-y-6">
          {/* Artist Message */}
          <Card className="p-4 bg-gradient-to-br from-primary/10 to-live-presale/10 border-primary/30">
            <div className="flex gap-3 mb-3">
              <Heart className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold mb-1">Message from {event.artist.name}</h3>
                <p className="text-sm leading-relaxed">
                  "Thank you so much for coming to the show! Your energy was incredible. 
                  Here's a special recording from that night just for you. Hope to see you again soon! ❤️"
                </p>
              </div>
            </div>
          </Card>

          {/* Live Recording */}
          <Card className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <Music className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold">Live Recording</h2>
            </div>
            <Separator className="mb-4" />
            
            <div className="space-y-3">
              {["Intro / Opening", "Best Song Ever (Live)", "Fan Favorite", "Encore Performance"].map((track, i) => (
                <div 
                  key={i}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                >
                  <div className="bg-primary/20 rounded-full p-2">
                    <Play className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">{track}</div>
                    <div className="text-xs text-muted-foreground">
                      {event.venue.name} • Live
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {Math.floor(Math.random() * 3 + 3)}:{String(Math.floor(Math.random() * 60)).padStart(2, '0')}
                  </span>
                </div>
              ))}
            </div>

            <Button variant="outline" className="w-full mt-4 gap-2">
              <Download className="h-4 w-4" />
              Download All
            </Button>
          </Card>

          {/* Tour Photos */}
          <Card className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <Award className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold">Tour Photo Gallery</h2>
            </div>
            <Separator className="mb-4" />
            
            <div className="grid grid-cols-2 gap-3">
              {[1, 2, 3, 4].map((i) => (
                <div 
                  key={i}
                  className="aspect-square rounded-lg bg-muted/50 flex items-center justify-center cursor-pointer hover:ring-2 hover:ring-primary transition-all"
                >
                  <div className="text-center">
                    <div className="text-3xl mb-1">📸</div>
                    <div className="text-xs text-muted-foreground">Photo {i}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Attendance Badge */}
          <Card className="p-6 text-center bg-gradient-to-br from-live-presale/20 to-primary/20 border-live-presale/30">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/20 mb-4">
              <Award className="h-10 w-10 text-primary" />
            </div>
            <h3 className="font-bold text-lg mb-2">Concert Badge Earned!</h3>
            <p className="text-sm text-muted-foreground mb-4">
              You attended {event.artist.name} live
            </p>
            <Badge variant="secondary" className="text-xs">
              {event.venue.city} • 2025
            </Badge>
          </Card>

          {/* Actions */}
          <div className="space-y-3">
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => navigate("/tickets")}
            >
              View All Your Tickets
            </Button>
            <Button 
              variant="ghost" 
              className="w-full"
              onClick={() => navigate("/")}
            >
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    </MobileLayout>
  );
};
