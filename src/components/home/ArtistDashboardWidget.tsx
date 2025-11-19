import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, Users, Music, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const ArtistDashboardWidget = () => {
  const navigate = useNavigate();

  // Mock artist stats
  const stats = {
    upcomingEvents: 3,
    totalRevenue: 45280,
    activeFans: 12453,
    ticketsSold: 2847
  };

  return (
    <Card className="p-4 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold tracking-tight">Artist Dashboard</h3>
          <p className="text-sm text-muted-foreground">Manage your events & fans</p>
        </div>
        <Music className="h-8 w-8 text-primary" />
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            <span>Events</span>
          </div>
          <p className="text-2xl font-bold">{stats.upcomingEvents}</p>
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Users className="h-3 w-3" />
            <span>Active Fans</span>
          </div>
          <p className="text-2xl font-bold">{stats.activeFans.toLocaleString()}</p>
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <TrendingUp className="h-3 w-3" />
            <span>Revenue</span>
          </div>
          <p className="text-2xl font-bold">${(stats.totalRevenue / 1000).toFixed(1)}k</p>
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Music className="h-3 w-3" />
            <span>Tickets Sold</span>
          </div>
          <p className="text-2xl font-bold">{stats.ticketsSold.toLocaleString()}</p>
        </div>
      </div>

      <Button 
        onClick={() => navigate('/artist/dashboard')}
        className="w-full"
        size="sm"
      >
        Open Dashboard
      </Button>
    </Card>
  );
};
