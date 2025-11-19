import { useState } from "react";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Bell, BellOff, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { mockFollowedArtists } from "@/data/mockSocialData";
import { toast } from "sonner";

const FollowedArtists = () => {
  const navigate = useNavigate();
  const [artists, setArtists] = useState(mockFollowedArtists);

  const toggleNotifications = (artistId: string) => {
    setArtists(prev => prev.map(artist => 
      artist.artistId === artistId 
        ? { ...artist, hasNotifications: !artist.hasNotifications }
        : artist
    ));
    const artist = artists.find(a => a.artistId === artistId);
    toast.success(
      artist?.hasNotifications 
        ? "Notifications disabled" 
        : "Notifications enabled"
    );
  };

  const unfollowArtist = (artistId: string) => {
    setArtists(prev => prev.filter(artist => artist.artistId !== artistId));
    toast.success("Artist unfollowed");
  };

  return (
    <MobileLayout>
      <div className="px-4 pt-6 pb-4 space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/profile")}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">Followed Artists</h1>
        </div>

        <div className="space-y-3">
          {artists.map((artist) => (
            <Card key={artist.artistId} className="p-4">
              <div className="flex gap-4">
                <img
                  src={artist.artistImage}
                  alt={artist.artistName}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-lg mb-1">{artist.artistName}</h3>
                  <div className="flex items-center gap-2 mb-2">
                    {artist.upcomingShows > 0 ? (
                      <Badge variant="secondary" className="bg-live-primary/20 text-live-primary">
                        <Calendar className="h-3 w-3 mr-1" />
                        {artist.upcomingShows} upcoming show{artist.upcomingShows > 1 ? 's' : ''}
                      </Badge>
                    ) : (
                      <span className="text-xs text-muted-foreground">No upcoming shows</span>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2">
                      {artist.hasNotifications ? (
                        <Bell className="h-4 w-4 text-live-primary" />
                      ) : (
                        <BellOff className="h-4 w-4 text-muted-foreground" />
                      )}
                      <span className="text-sm text-muted-foreground">Notifications</span>
                    </div>
                    <Switch
                      checked={artist.hasNotifications}
                      onCheckedChange={() => toggleNotifications(artist.artistId)}
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2 mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => toast.info("Artist profile coming soon")}
                >
                  View Profile
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => unfollowArtist(artist.artistId)}
                >
                  Unfollow
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {artists.length === 0 && (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground mb-4">
              You're not following any artists yet
            </p>
            <Button onClick={() => navigate("/search")}>
              Discover Artists
            </Button>
          </Card>
        )}
      </div>
    </MobileLayout>
  );
};

export default FollowedArtists;
