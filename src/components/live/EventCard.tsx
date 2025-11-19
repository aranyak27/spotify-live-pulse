import { Event } from "@/types/live";
import { Calendar, MapPin, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

interface EventCardProps {
  event: Event;
  variant?: "compact" | "full";
}

export const EventCard = ({ event, variant = "compact" }: EventCardProps) => {
  const navigate = useNavigate();
  
  const formattedDate = format(new Date(event.date), "MMM d");
  const lowestPrice = Math.min(...event.ticketTiers.map(t => t.price));

  return (
    <Card 
      className="overflow-hidden cursor-pointer hover:ring-2 hover:ring-primary transition-all"
      onClick={() => navigate(`/event/${event.id}`)}
    >
      <div className="relative aspect-[16/9] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url(${event.image})`,
          }}
        />
        <div 
          className="absolute inset-0"
          style={{ background: 'var(--gradient-card)' }}
        />
        
        <div className="absolute top-3 right-3 flex gap-2">
          {event.isFanPresale && (
            <Badge className="bg-live-presale text-white border-0">
              Fans First
            </Badge>
          )}
          {event.isSoldOut && (
            <Badge variant="destructive">
              Sold Out
            </Badge>
          )}
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white mb-1 line-clamp-1">
                {event.artist.name}
              </h3>
              <p className="text-sm text-gray-200 line-clamp-1">
                {event.title}
              </p>
            </div>
            {!event.isSoldOut && (
              <div className="text-right">
                <div className="text-xs text-gray-300">From</div>
                <div className="text-lg font-bold text-primary">
                  ${lowestPrice}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="p-4 space-y-2">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="h-4 w-4" />
            <span className="line-clamp-1">{event.venue.city}</span>
          </div>
        </div>

        {event.friendsAttending && event.friendsAttending > 0 && (
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>{event.friendsAttending} friends going</span>
          </div>
        )}

        {event.mood && event.mood.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {event.mood.slice(0, 3).map((m) => (
              <Badge key={m} variant="secondary" className="text-xs">
                {m}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};
