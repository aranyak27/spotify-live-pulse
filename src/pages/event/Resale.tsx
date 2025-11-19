import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { mockEvents } from "@/data/mockData";
import { ArrowLeft, Shield, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";

export const Resale = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const event = mockEvents.find(e => e.id === id);
  
  if (!event) return null;

  // Mock resale listings
  const resaleListings = [
    {
      id: "r1",
      tier: event.ticketTiers[0],
      originalPrice: event.ticketTiers[0].price,
      resalePrice: event.ticketTiers[0].price * 1.05,
      quantity: 2,
      seller: "Verified Fan",
      listedDate: "2025-11-15",
      markup: 5,
    },
    {
      id: "r2",
      tier: event.ticketTiers[1] || event.ticketTiers[0],
      originalPrice: (event.ticketTiers[1] || event.ticketTiers[0]).price,
      resalePrice: (event.ticketTiers[1] || event.ticketTiers[0]).price * 1.08,
      quantity: 1,
      seller: "Top Listener",
      listedDate: "2025-11-16",
      markup: 8,
    },
  ];

  return (
    <MobileLayout showNav={false}>
      <div className="min-h-screen">
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
            <h1 className="text-xl font-bold">Verified Resale</h1>
          </div>
          
          <div className="bg-card p-3 rounded-lg">
            <div className="font-semibold">{event.artist.name}</div>
            <div className="text-sm text-muted-foreground">
              {format(new Date(event.date), "EEEE, MMM d")} • {event.venue.name}
            </div>
          </div>
        </div>

        <div className="p-4 space-y-6">
          {/* Info Banner */}
          <Card className="p-4 bg-primary/10 border-primary/30">
            <div className="flex gap-3">
              <Shield className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-semibold text-sm mb-1">Fair Resale Promise</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  All resale tickets are verified and capped at 10% above face value. 
                  No scalping, no bots. Every ticket is protected and guaranteed.
                </p>
              </div>
            </div>
          </Card>

          {/* Resale Listings */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Available Tickets</h2>
              <Badge variant="secondary">{resaleListings.length} listings</Badge>
            </div>

            <div className="space-y-3">
              {resaleListings.map((listing) => (
                <Card key={listing.id} className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="font-semibold mb-1">{listing.tier.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {listing.quantity} {listing.quantity === 1 ? 'ticket' : 'tickets'}
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="secondary" className="text-xs">
                            {listing.seller}
                          </Badge>
                          <Badge 
                            className="text-xs bg-live-highlight/20 text-live-highlight border-live-highlight/30"
                          >
                            +{listing.markup}% markup
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold">${listing.resalePrice}</div>
                        <div className="text-xs text-muted-foreground line-through">
                          ${listing.originalPrice}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          per ticket
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between gap-3">
                      <div className="text-xs text-muted-foreground">
                        Listed {format(new Date(listing.listedDate), "MMM d")}
                      </div>
                      <Button 
                        size="sm"
                        onClick={() => navigate(`/event/${id}/tickets`)}
                      >
                        Purchase
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Price Info */}
          <Card className="p-4 bg-muted/30">
            <div className="flex gap-3">
              <TrendingUp className="h-5 w-5 text-muted-foreground flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-sm mb-1">Transparent Pricing</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  All prices include fees. Resellers can only charge up to 10% above the 
                  original ticket price. Original price was ${event.ticketTiers[0].price}.
                </p>
              </div>
            </div>
          </Card>

          {/* Waitlist Option */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-3">
              Can't find what you're looking for?
            </p>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => navigate(`/event/${id}/waitlist`)}
            >
              Join Waitlist for Better Prices
            </Button>
          </div>
        </div>
      </div>
    </MobileLayout>
  );
};
