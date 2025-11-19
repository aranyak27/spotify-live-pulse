import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { mockEvents } from "@/data/mockData";
import { ArrowLeft, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";

export const TicketSelection = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const event = mockEvents.find(e => e.id === id);
  
  const [quantity, setQuantity] = useState(1);
  const [selectedTier, setSelectedTier] = useState(
    event?.ticketTiers.find(t => t.availability !== 'sold-out')?.id || ""
  );

  if (!event) return null;

  const tier = event.ticketTiers.find(t => t.id === selectedTier);
  const total = tier ? tier.price * quantity : 0;
  const availableTiers = event.ticketTiers.filter(t => t.availability !== 'sold-out');

  const handleCheckout = () => {
    navigate(`/event/${id}/checkout`, {
      state: { quantity, tierId: selectedTier, total }
    });
  };

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
            <h1 className="text-xl font-bold">Select Tickets</h1>
          </div>
          
          <div className="bg-card p-3 rounded-lg">
            <div className="font-semibold">{event.artist.name}</div>
            <div className="text-sm text-muted-foreground">
              {format(new Date(event.date), "EEEE, MMM d")} • {event.venue.name}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-4 space-y-6">
          {/* Quantity Selector */}
          <Card className="p-6">
            <h2 className="font-semibold mb-4">Number of Tickets</h2>
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
            <p className="text-xs text-center text-muted-foreground mt-3">
              Maximum 6 tickets per order
            </p>
          </Card>

          {/* Tier Selection */}
          <div>
            <h2 className="font-semibold mb-3">Select Ticket Type</h2>
            <RadioGroup value={selectedTier} onValueChange={setSelectedTier}>
              <div className="space-y-3">
                {availableTiers.map(tier => (
                  <Card key={tier.id} className="p-4">
                    <div className="flex items-start gap-3">
                      <RadioGroupItem value={tier.id} id={tier.id} className="mt-1" />
                      <Label htmlFor={tier.id} className="flex-1 cursor-pointer">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1">
                            <div className="font-semibold mb-1">{tier.name}</div>
                            {tier.section && (
                              <div className="text-sm text-muted-foreground">
                                Section: {tier.section}
                              </div>
                            )}
                            {tier.availability === 'low' && (
                              <div className="text-sm text-live-low-tickets font-medium mt-1">
                                Only {tier.remainingTickets} left
                              </div>
                            )}
                          </div>
                          <div className="text-right">
                            <div className="text-xl font-bold">${tier.price}</div>
                            <div className="text-xs text-muted-foreground">per ticket</div>
                          </div>
                        </div>
                      </Label>
                    </div>
                  </Card>
                ))}
              </div>
            </RadioGroup>
          </div>

          {/* Price Info */}
          <Card className="p-4 bg-muted/30">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tickets ({quantity}x)</span>
                <span>${tier ? tier.price * quantity : 0}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Fees</span>
                <span className="text-primary font-medium">$0</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${total}</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-3 text-center">
              All fees included • No hidden charges
            </p>
          </Card>
        </div>

        {/* Footer CTA */}
        <div className="p-4 border-t border-border">
          <Button 
            size="lg" 
            className="w-full"
            onClick={handleCheckout}
            disabled={!selectedTier}
          >
            Continue to Payment • ${total}
          </Button>
        </div>
      </div>
    </MobileLayout>
  );
};
