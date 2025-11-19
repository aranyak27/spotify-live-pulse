import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { mockEvents } from "@/data/mockData";
import { ArrowLeft, Bell, CheckCircle2, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

export const Waitlist = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const event = mockEvents.find(e => e.id === id);
  
  const [quantity, setQuantity] = useState(1);
  const [maxPrice, setMaxPrice] = useState(
    event?.ticketTiers[0].price ? event.ticketTiers[0].price * 1.1 : 0
  );
  const [isJoined, setIsJoined] = useState(false);

  if (!event) return null;

  const faceValue = event.ticketTiers[0].price;
  const maxAllowedPrice = faceValue * 1.1;

  const handleJoinWaitlist = () => {
    setIsJoined(true);
    toast({
      title: "Joined Waitlist",
      description: "We'll notify you when tickets become available",
    });
    
    setTimeout(() => {
      navigate(-1);
    }, 2000);
  };

  if (isJoined) {
    return (
      <MobileLayout showNav={false}>
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="max-w-md w-full space-y-6 animate-fade-in text-center">
            <div className="flex justify-center">
              <div className="bg-primary rounded-full p-6">
                <CheckCircle2 className="h-16 w-16 text-background" />
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-2">You're on the List!</h1>
              <p className="text-muted-foreground">
                We'll notify you as soon as tickets become available
              </p>
            </div>
            <Card className="p-4 bg-muted/30">
              <p className="text-sm text-muted-foreground">
                You'll be notified via push notification and email when tickets 
                matching your criteria are available
              </p>
            </Card>
          </div>
        </div>
      </MobileLayout>
    );
  }

  return (
    <MobileLayout showNav={false}>
      <div className="min-h-screen flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-3 mb-4">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-bold">Join Waitlist</h1>
          </div>
          
          <div className="bg-card p-3 rounded-lg">
            <div className="font-semibold">{event.artist.name}</div>
            <div className="text-sm text-muted-foreground">
              {format(new Date(event.date), "EEEE, MMM d")} • {event.venue.name}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-4 space-y-6 overflow-y-auto">
          {/* Info */}
          <Card className="p-4 bg-primary/10 border-primary/30">
            <div className="flex gap-3">
              <Bell className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-semibold text-sm mb-1">How It Works</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  We'll monitor ticket availability and notify you immediately when 
                  tickets matching your preferences become available. You'll have priority 
                  access before they're listed publicly.
                </p>
              </div>
            </div>
          </Card>

          {/* Quantity */}
          <Card className="p-6">
            <Label className="text-base font-semibold mb-4 block">
              How many tickets do you need?
            </Label>
            <div className="flex items-center justify-center gap-6">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity === 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <div className="text-4xl font-bold w-16 text-center">
                {quantity}
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(Math.min(6, quantity + 1))}
                disabled={quantity === 6}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </Card>

          {/* Max Price */}
          <Card className="p-6">
            <Label htmlFor="max-price" className="text-base font-semibold mb-4 block">
              Maximum price per ticket
            </Label>
            <div className="space-y-4">
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold">
                  $
                </span>
                <Input
                  id="max-price"
                  type="number"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Math.min(maxAllowedPrice, parseFloat(e.target.value) || 0))}
                  className="pl-10 h-14 text-2xl font-bold text-center"
                  min={faceValue}
                  max={maxAllowedPrice}
                  step="1"
                />
              </div>
              
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex justify-between">
                  <span>Face value:</span>
                  <span className="font-medium">${faceValue}</span>
                </div>
                <div className="flex justify-between">
                  <span>Maximum allowed:</span>
                  <span className="font-medium">${maxAllowedPrice}</span>
                </div>
              </div>

              <Separator />

              <input
                type="range"
                min={faceValue}
                max={maxAllowedPrice}
                value={maxPrice}
                onChange={(e) => setMaxPrice(parseFloat(e.target.value))}
                className="w-full accent-primary"
                step="1"
              />
            </div>
          </Card>

          {/* Summary */}
          <Card className="p-4 bg-muted/30">
            <h3 className="font-semibold text-sm mb-3">Your Preferences</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tickets needed:</span>
                <span className="font-medium">{quantity}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Max price per ticket:</span>
                <span className="font-medium">${maxPrice}</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between font-semibold">
                <span>Total budget:</span>
                <span>${(maxPrice * quantity).toFixed(2)}</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border">
          <Button 
            size="lg" 
            className="w-full"
            onClick={handleJoinWaitlist}
          >
            Join Waitlist
          </Button>
          <p className="text-xs text-center text-muted-foreground mt-2">
            Free to join • No payment required until tickets are available
          </p>
        </div>
      </div>
    </MobileLayout>
  );
};
