import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FriendActivity } from "@/types/social";
import { Ticket, Heart, Star, UserPlus } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useNavigate } from "react-router-dom";

interface SocialFeedProps {
  activities: FriendActivity[];
}

export const SocialFeed = ({ activities }: SocialFeedProps) => {
  const navigate = useNavigate();

  const getActivityIcon = (type: FriendActivity['type']) => {
    switch (type) {
      case "attending":
        return <Ticket className="h-4 w-4 text-live-primary" />;
      case "interested":
        return <Heart className="h-4 w-4 text-live-accent" />;
      case "rated":
        return <Star className="h-4 w-4 text-live-gold" />;
      case "followed-artist":
        return <UserPlus className="h-4 w-4 text-live-secondary" />;
    }
  };

  const getActivityText = (activity: FriendActivity) => {
    switch (activity.type) {
      case "attending":
        return `is going to ${activity.eventTitle}`;
      case "interested":
        return `is interested in ${activity.eventTitle}`;
      case "rated":
        return `rated ${activity.eventTitle} ${activity.rating} stars`;
      case "followed-artist":
        return `started following ${activity.artistName}`;
    }
  };

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-muted-foreground px-1">Friend Activity</h3>
      {activities.map((activity) => (
        <Card
          key={activity.id}
          className="p-4 cursor-pointer hover:ring-2 hover:ring-live-primary/50 transition-all"
          onClick={() => activity.eventId && navigate(`/event/${activity.eventId}`)}
        >
          <div className="flex items-start gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={activity.friend.image} alt={activity.friend.name} />
              <AvatarFallback>
                {activity.friend.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                {getActivityIcon(activity.type)}
                <span className="text-sm">
                  <span className="font-semibold">{activity.friend.name}</span>
                  {' '}
                  <span className="text-muted-foreground">{getActivityText(activity)}</span>
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
              </p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
