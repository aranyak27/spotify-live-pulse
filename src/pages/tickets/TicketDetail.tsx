import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { mockTickets } from "@/data/mockData";
import { ArrowLeft, Calendar, MapPin, Navigation, Download, Share2, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { NFTTicketBadge } from "@/components/nft/NFTTicketBadge";

export const TicketDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showFullScreen, setShowFullScreen] = useState(false);
  
  const ticket = mockTickets.find(t => t.id === id);
  
  if (!ticket) {
    return (
      <MobileLayout showNav={false}>
        <div className="p-4">Ticket not found</div>
      </MobileLayout>
    );
  }

  const event = ticket.event;

  if (showFullScreen) {
    return (
      <div 
        className="fixed inset-0 bg-background z-50 flex flex-col items-center justify-center p-6"
        onClick={() => setShowFullScreen(false)}
      >
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-1">{event.artist.name}</h2>
          <p className="text-muted-foreground">
            {format(new Date(event.date), "MMM d, yyyy")}
          </p>
        </div>
        
        <div className="bg-white p-8 rounded-2xl">
          <div className="w-64 h-64 bg-gray-900 rounded-lg flex items-center justify-center">
            <div className="text-white text-center">
              <div className="text-6xl mb-2">||||| |||</div>
              <div className="text-xs">QR CODE</div>
            </div>
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground mt-6">
          Tap anywhere to close
        </p>
      </div>
    );
  }

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
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
            <Button 
              variant="ghost" 
              size="icon"
              className="bg-background/20 backdrop-blur-sm"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              className="bg-background/20 backdrop-blur-sm"
            >
              <MoreVertical className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="px-4 py-6 space-y-6">
          {/* Event Info */}
          <div>
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h1 className="text-2xl font-bold mb-1">{event.artist.name}</h1>
                <p className="text-muted-foreground">{event.title}</p>
              </div>
              <NFTTicketBadge isNFT={ticket.isNFT} />
            </div>

            <Card className="p-4 space-y-3">
              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-primary mt-0.5" />
                <div className="flex-1">
                  <div className="font-semibold">
                    {format(new Date(event.date), "EEEE, MMMM d, yyyy")}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Doors: {event.doors} • Show: {event.time}
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5" />
                <div className="flex-1">
                  <div className="font-semibold">{event.venue.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {event.venue.address}, {event.venue.city}
                  </div>
                </div>
                <Button variant="outline" size="sm" className="gap-2">
                  <Navigation className="h-3.5 w-3.5" />
                  Directions
                </Button>
              </div>
            </Card>
          </div>

          {/* QR Code */}
          <Card className="p-6">
            <h2 className="font-semibold mb-4 text-center">Your Entry Pass</h2>
            
            <div 
              className="bg-white p-6 rounded-lg mx-auto max-w-[280px] cursor-pointer"
              onClick={() => setShowFullScreen(true)}
            >
              <div className="aspect-square bg-gray-900 rounded-lg flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="text-4xl mb-2">||||| |||</div>
                  <div className="text-xs">QR CODE</div>
                  <div className="text-xs mt-2">Tap to enlarge</div>
                </div>
              </div>
            </div>

            <div className="mt-4 text-center text-sm text-muted-foreground">
              Present this code at the entrance
            </div>
          </Card>

          {/* Ticket Details */}
          <Card className="p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Section</span>
              <span className="font-medium">{ticket.section || ticket.tier.name}</span>
            </div>
            {ticket.row && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Row</span>
                <span className="font-medium">{ticket.row}</span>
              </div>
            )}
            {ticket.seat && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Seat</span>
                <span className="font-medium">{ticket.seat}</span>
              </div>
            )}
            <Separator className="my-2" />
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Quantity</span>
              <span className="font-medium">{ticket.quantity}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Order ID</span>
              <span className="font-mono text-xs">{ticket.id.toUpperCase()}</span>
            </div>
          </Card>

          {/* Actions */}
          <div className="grid grid-cols-2 gap-3">
            <Button 
              variant="outline" 
              className="gap-2"
              onClick={() => navigate(`/ticket/${id}/sell`)}
            >
              Sell Ticket
            </Button>
            <Button variant="outline" className="gap-2">
              <Share2 className="h-4 w-4" />
              Transfer
            </Button>
          </div>

          {/* Important Info */}
          <Card className="p-4 bg-muted/30">
            <h3 className="font-semibold text-sm mb-2">Important Information</h3>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• Arrive at least 30 minutes before doors open</li>
              <li>• Valid photo ID required for entry</li>
              <li>• This ticket is saved offline and will work without internet</li>
              <li>• Do not share screenshots of your QR code</li>
            </ul>
          </Card>
        </div>
      </div>
    </MobileLayout>
  );
};
