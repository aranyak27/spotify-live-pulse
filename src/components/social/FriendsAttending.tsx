import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Friend } from "@/types/social";
import { Users } from "lucide-react";

interface FriendsAttendingProps {
  friends: Friend[];
  total: number;
  size?: "sm" | "lg";
}

export const FriendsAttending = ({ friends, total, size = "sm" }: FriendsAttendingProps) => {
  const displayFriends = friends.slice(0, 3);
  const remaining = total - displayFriends.length;
  const avatarSize = size === "sm" ? "h-6 w-6" : "h-8 w-8";
  const textSize = size === "sm" ? "text-xs" : "text-sm";

  if (total === 0) return null;

  return (
    <div className="flex items-center gap-2">
      <Users className={`${size === "sm" ? "h-4 w-4" : "h-5 w-5"} text-muted-foreground`} />
      <div className="flex -space-x-2">
        {displayFriends.map((friend) => (
          <Avatar key={friend.id} className={`${avatarSize} border-2 border-background`}>
            <AvatarImage src={friend.image} alt={friend.name} />
            <AvatarFallback className="text-xs">
              {friend.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
        ))}
      </div>
      <span className={`${textSize} text-muted-foreground`}>
        {displayFriends.map(f => f.name.split(' ')[0]).join(', ')}
        {remaining > 0 && ` +${remaining} other${remaining > 1 ? 's' : ''}`}
        {' '}going
      </span>
    </div>
  );
};
