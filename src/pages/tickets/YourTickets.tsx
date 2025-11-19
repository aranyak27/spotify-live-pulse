import { MobileLayout } from "@/components/layout/MobileLayout";
import { mockTickets } from "@/data/mockData";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, ChevronRight, Ticket } from "lucide-react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

export const YourTickets = () => {
  const navigate = useNavigate();
  const upcomingTickets = mockTickets.filter(t => t.status === 'upcoming');
  const pastTickets = mockTickets.filter(t => t.status === 'used');

  return (
    <MobileLayout>
      <div className="px-4 pt-6 pb-4 space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Your Tickets</h1>
          <p className="text-muted-foreground">
            All your concert tickets in one place
          </p>
        </div>

        {upcomingTickets.length > 0 ? (
          <>
            <div>
              <h2 className="text-xl font-semibold mb-4">Upcoming Shows</h2>
              <div className="space-y-3">
                {upcomingTickets.map(ticket => (
                  <Card 
                    key={ticket.id} 
                    className="p-4 cursor-pointer hover:ring-2 hover:ring-primary transition-all"
                    onClick={() => navigate(`/ticket/${ticket.id}`)}
                  >
                    <div className="flex items-start gap-4">
                      <div 
                        className="w-20 h-20 rounded-lg bg-cover bg-center flex-shrink-0"
                        style={{ backgroundImage: `url(${ticket.event.image})` }}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h3 className="font-bold text-lg line-clamp-1">
                            {ticket.event.artist.name}
                          </h3>
                          {ticket.isNFT && (
                            <Badge variant="secondary" className="text-xs flex-shrink-0">
                              NFT
                            </Badge>
                          )}
                        </div>
                        <div className="space-y-1 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-3.5 w-3.5" />
                            <span>{format(new Date(ticket.event.date), "MMM d, yyyy")}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-3.5 w-3.5" />
                            <span className="line-clamp-1">{ticket.event.venue.name}</span>
                          </div>
                        </div>
                        <div className="mt-2 text-sm">
                          <span className="text-muted-foreground">
                            {ticket.quantity} {ticket.quantity === 1 ? 'ticket' : 'tickets'}
                          </span>
                          <span className="mx-2">•</span>
                          <span className="font-medium">{ticket.tier.name}</span>
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {pastTickets.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Past Events</h2>
                <div className="space-y-3">
                  {pastTickets.map(ticket => (
                    <Card 
                      key={ticket.id} 
                      className="p-4 opacity-60"
                    >
                      <div className="flex items-start gap-4">
                        <div 
                          className="w-16 h-16 rounded-lg bg-cover bg-center flex-shrink-0"
                          style={{ backgroundImage: `url(${ticket.event.image})` }}
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold line-clamp-1">
                            {ticket.event.artist.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {format(new Date(ticket.event.date), "MMM d, yyyy")}
                          </p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="mb-6 p-6 rounded-full bg-muted">
              <Ticket className="h-12 w-12 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-bold mb-2">No Tickets Yet</h2>
            <p className="text-muted-foreground mb-6 max-w-sm">
              Discover concerts and get tickets to see your favorite artists live
            </p>
            <Button onClick={() => navigate("/live")}>
              Explore Live Events
            </Button>
          </div>
        )}
      </div>
    </MobileLayout>
  );
};
