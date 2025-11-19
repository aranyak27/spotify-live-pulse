import { useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { mockEvents } from "@/data/mockData";
import { CheckCircle2, Calendar, Download, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { format } from "date-fns";

export const Confirmation = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { quantity, tier, total } = location.state || {};
  
  const event = mockEvents.find(e => e.id === id);

  useEffect(() => {
    // Confetti animation could go here
    const timer = setTimeout(() => {
      // Auto-scroll to show full content
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  if (!event) return null;

  return (
    <MobileLayout showNav={false}>
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md space-y-6 animate-fade-in">
          {/* Success Icon */}
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-full animate-pulse-glow" />
              <div className="relative bg-primary rounded-full p-6">
                <CheckCircle2 className="h-16 w-16 text-background" />
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-2">You're Going!</h1>
              <p className="text-lg text-muted-foreground">
                See you at the show
              </p>
            </div>
          </div>

          {/* Event Details */}
          <Card className="p-6 space-y-4">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">{event.artist.name}</h2>
              <p className="text-muted-foreground">{event.title}</p>
            </div>
            
            <div className="pt-4 border-t border-border space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>{format(new Date(event.date), "EEEE, MMMM d, yyyy")}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="h-4 w-4" />
                <span>{event.venue.name}, {event.venue.city}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-border space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{tier?.name} x {quantity}</span>
                <span className="font-medium">${total}</span>
              </div>
              <div className="text-xs text-muted-foreground">
                Order #{Math.random().toString(36).substring(2, 11).toUpperCase()}
              </div>
            </div>
          </Card>

          {/* Actions */}
          <div className="space-y-3">
            <Button 
              size="lg" 
              className="w-full"
              onClick={() => navigate("/tickets")}
            >
              View Your Tickets
            </Button>
            
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" size="lg" className="gap-2">
                <Calendar className="h-4 w-4" />
                Add to Calendar
              </Button>
              <Button variant="outline" size="lg" className="gap-2">
                <Share2 className="h-4 w-4" />
                Share
              </Button>
            </div>

            <Button 
              variant="ghost" 
              className="w-full"
              onClick={() => navigate("/")}
            >
              Back to Home
            </Button>
          </div>

          {/* Info Card */}
          <Card className="p-4 bg-muted/30">
            <p className="text-sm text-center text-muted-foreground">
              Your tickets have been sent to your email and are available in the Your Tickets section
            </p>
          </Card>
        </div>
      </div>
    </MobileLayout>
  );
};
