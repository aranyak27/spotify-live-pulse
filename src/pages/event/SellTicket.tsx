import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { mockTickets } from "@/data/mockData";
import { ArrowLeft, TrendingUp, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

export const SellTicket = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const ticket = mockTickets.find(t => t.id === id);
  
  const [price, setPrice] = useState(ticket?.tier.price || 0);
  
  if (!ticket) return null;

  const originalPrice = ticket.tier.price;
  const maxPrice = originalPrice * 1.1;
  const markup = ((price - originalPrice) / originalPrice * 100).toFixed(1);
  const canList = price >= originalPrice && price <= maxPrice;

  const handleList = () => {
    toast({
      title: "Ticket Listed",
      description: "Your ticket is now available for resale",
    });
    navigate(`/ticket/${id}`);
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
            <h1 className="text-xl font-bold">Sell Ticket</h1>
          </div>
          
          <div className="bg-card p-3 rounded-lg">
            <div className="font-semibold">{ticket.event.artist.name}</div>
            <div className="text-sm text-muted-foreground">
              {format(new Date(ticket.event.date), "EEEE, MMM d")} • {ticket.event.venue.name}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-4 space-y-6 overflow-y-auto">
          {/* Warning */}
          <Card className="p-4 border-live-low-tickets/30 bg-live-low-tickets/10">
            <div className="flex gap-3">
              <AlertCircle className="h-5 w-5 text-live-low-tickets flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-semibold text-sm mb-1">Important</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Once listed, your ticket will be disabled for entry until it's sold 
                  or you cancel the listing. Maximum markup is 10% above face value.
                </p>
              </div>
            </div>
          </Card>

          {/* Ticket Info */}
          <Card className="p-4">
            <h3 className="font-semibold mb-3">Ticket Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Section:</span>
                <span className="font-medium">{ticket.tier.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Quantity:</span>
                <span className="font-medium">{ticket.quantity}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Original price:</span>
                <span className="font-medium">${originalPrice}</span>
              </div>
            </div>
          </Card>

          {/* Pricing */}
          <Card className="p-6">
            <Label htmlFor="resale-price" className="text-base font-semibold mb-4 block">
              Set your price per ticket
            </Label>
            
            <div className="space-y-4">
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold">
                  $
                </span>
                <Input
                  id="resale-price"
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(Math.min(maxPrice, parseFloat(e.target.value) || 0))}
                  className="pl-10 h-14 text-2xl font-bold text-center"
                  min={originalPrice}
                  max={maxPrice}
                  step="1"
                />
              </div>

              <div className="text-center">
                {parseFloat(markup) > 0 ? (
                  <div className="text-sm">
                    <span className="text-muted-foreground">Markup: </span>
                    <span className={`font-bold ${parseFloat(markup) > 10 ? 'text-destructive' : 'text-live-highlight'}`}>
                      +{markup}%
                    </span>
                  </div>
                ) : (
                  <div className="text-sm text-muted-foreground">
                    Selling at face value
                  </div>
                )}
              </div>

              <input
                type="range"
                min={originalPrice}
                max={maxPrice}
                value={price}
                onChange={(e) => setPrice(parseFloat(e.target.value))}
                className="w-full accent-primary"
                step="1"
              />

              <div className="flex justify-between text-xs text-muted-foreground">
                <span>${originalPrice} (face value)</span>
                <span>${maxPrice} (max)</span>
              </div>
            </div>
          </Card>

          {/* Earnings */}
          <Card className="p-4 bg-muted/30">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Sale price</span>
                <span>${price * ticket.quantity}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Platform fee (2%)</span>
                <span>-${(price * ticket.quantity * 0.02).toFixed(2)}</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between font-bold">
                <span>Your earnings</span>
                <span className="text-primary">
                  ${(price * ticket.quantity * 0.98).toFixed(2)}
                </span>
              </div>
            </div>
          </Card>

          {/* Fair Trading Info */}
          <Card className="p-4">
            <div className="flex gap-3">
              <TrendingUp className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-sm mb-1">Fair Trading</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Spotify Live maintains fair pricing by capping resale markups at 10%. 
                  This protects fans from scalpers while giving you flexibility to recoup 
                  costs if you can't attend.
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border">
          <Button 
            size="lg" 
            className="w-full"
            disabled={!canList}
            onClick={handleList}
          >
            {canList ? 'List for Resale' : 'Price exceeds maximum allowed'}
          </Button>
          {canList && (
            <p className="text-xs text-center text-muted-foreground mt-2">
              Your ticket will be listed immediately
            </p>
          )}
        </div>
      </div>
    </MobileLayout>
  );
};
