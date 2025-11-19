import { useParams, useNavigate } from "react-router-dom";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { mockEvents } from "@/data/mockData";
import { ArrowLeft, Share2, MapPin, Calendar, Clock, Users, Heart, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { useState } from "react";
import { FriendsAttending } from "@/components/social/FriendsAttending";
import { ShareEventDialog } from "@/components/social/ShareEventDialog";
import { mockEventAttendees } from "@/data/mockSocialData";

export const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isFollowing, setIsFollowing] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  
  const event = mockEvents.find(e => e.id === id);
  const attendees = mockEventAttendees.find(a => a.eventId === id);
  
  if (!event) {
    return (
      <MobileLayout showNav={false}>
        <div className="p-4">Event not found</div>
      </MobileLayout>
    );
  }

  const formattedDate = format(new Date(event.date), "EEEE, MMMM d, yyyy");
  const lowestPrice = Math.min(...event.ticketTiers.map(t => t.price));

  return (
    <MobileLayout showNav={false}>
      <div className="relative">
        {/* Hero Image */}
        <div className="relative h-[400px] overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${event.image})` }}
          />
          <div 
            className="absolute inset-0"
            style={{ background: 'var(--gradient-hero)' }}
          />
          
          {/* Header Actions */}
          <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between">
            <Button 
              variant="ghost" 
              size="icon"
              className="bg-background/20 backdrop-blur-sm"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex gap-2">
              <Button 
                variant="ghost" 
                size="icon"
                className="bg-background/20 backdrop-blur-sm"
                onClick={() => setIsFollowing(!isFollowing)}
              >
                <Heart className={`h-5 w-5 ${isFollowing ? 'fill-primary text-primary' : ''}`} />
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                className="bg-background/20 backdrop-blur-sm"
                onClick={() => setShareOpen(true)}
              >
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Event Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="flex gap-2 mb-3">
              {event.isFanPresale && (
                <Badge className="bg-live-presale text-white border-0">
                  Fans First Presale
                </Badge>
              )}
              {event.isSoldOut && (
                <Badge variant="destructive">Sold Out</Badge>
              )}
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              {event.artist.name}
            </h1>
            <p className="text-lg text-gray-200">{event.title}</p>
          </div>
        </div>

        {/* Content */}
        <div className="px-4 py-6 space-y-6">
          {/* Quick Info */}
          <Card className="p-4 space-y-3">
            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-primary mt-0.5" />
              <div className="flex-1">
                <div className="font-semibold">{formattedDate}</div>
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
                Map
              </Button>
            </div>
            
            {attendees && attendees.totalFriends > 0 && (
              <>
                <Separator />
                <FriendsAttending 
                  friends={attendees.friends} 
                  total={attendees.totalFriends}
                  size="lg"
                />
              </>
            )}
          </Card>

          {/* Description */}
          {event.description && (
            <div>
              <h2 className="text-lg font-semibold mb-2">About</h2>
              <p className="text-muted-foreground leading-relaxed">
                {event.description}
              </p>
              {event.ageRestriction && (
                <p className="text-sm text-muted-foreground mt-2">
                  Age restriction: {event.ageRestriction}
                </p>
              )}
            </div>
          )}

          {/* Lineup */}
          {event.supportActs && event.supportActs.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold mb-3">Lineup</h2>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="text-sm font-semibold">HEADLINER</div>
                  <div className="flex-1 h-px bg-border" />
                </div>
                <div className="font-medium">{event.artist.name}</div>
                
                {event.supportActs.length > 0 && (
                  <>
                    <div className="flex items-center gap-3 mt-4">
                      <div className="text-sm font-semibold">SUPPORT</div>
                      <div className="flex-1 h-px bg-border" />
                    </div>
                    {event.supportActs.map(artist => (
                      <div key={artist.id} className="text-muted-foreground">
                        {artist.name}
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
          )}

          {/* Ticket Tiers */}
          <div>
            <h2 className="text-lg font-semibold mb-3">Tickets</h2>
            <div className="space-y-3">
              {event.ticketTiers.map(tier => (
                <Card 
                  key={tier.id} 
                  className="p-4 flex items-center justify-between"
                >
                  <div>
                    <div className="font-semibold">{tier.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {tier.availability === 'sold-out' ? 'Sold out' : 
                       tier.availability === 'low' ? `Only ${tier.remainingTickets} left` :
                       'Available'}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold">${tier.price}</div>
                    <div className="text-xs text-muted-foreground">all fees included</div>
                  </div>
                </Card>
              ))}
            </div>
            
            {event.hasResale && event.isSoldOut && (
              <Button 
                variant="outline" 
                className="w-full mt-3"
                onClick={() => navigate(`/event/${event.id}/resale`)}
              >
                View Verified Resale Tickets
              </Button>
            )}
          </div>

          {/* Mood Tags */}
          {event.mood && event.mood.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold mb-3">Vibe</h2>
              <div className="flex flex-wrap gap-2">
                {event.mood.map(m => (
                  <Badge key={m} variant="secondary" className="capitalize">
                    {m}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Fixed CTA */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur-sm border-t border-border">
          <div className="max-w-lg mx-auto">
            {event.isSoldOut ? (
              <div className="space-y-2">
                <Button 
                  className="w-full" 
                  variant="outline"
                  onClick={() => navigate(`/event/${event.id}/waitlist`)}
                >
                  Join Waitlist
                </Button>
                {event.hasResale && (
                  <Button 
                    className="w-full"
                    onClick={() => navigate(`/event/${event.id}/resale`)}
                  >
                    View Resale
                  </Button>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <div className="text-sm text-muted-foreground">From</div>
                  <div className="text-2xl font-bold">${lowestPrice}</div>
                </div>
                <Button 
                  size="lg" 
                  className="flex-1"
                  onClick={() => navigate(`/event/${event.id}/tickets`)}
                >
                  Get Tickets
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <ShareEventDialog 
        event={event}
        open={shareOpen}
        onOpenChange={setShareOpen}
      />
    </MobileLayout>
  );
};
