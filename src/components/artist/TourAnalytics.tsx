import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, TrendingUp, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface CityInsight {
  city: string;
  state: string;
  activeListeners: number;
  monthlyGrowth: number;
  avgStreamTime: number;
  topSongs: string[];
  venueRecommendations: string[];
}

const mockCityInsights: CityInsight[] = [
  {
    city: "Austin",
    state: "TX",
    activeListeners: 18500,
    monthlyGrowth: 15,
    avgStreamTime: 45,
    topSongs: ["Sunset", "Monsters", "Los Angeles"],
    venueRecommendations: ["Stubb's BBQ", "Emo's", "The Mohawk"],
  },
  {
    city: "Denver",
    state: "CO",
    activeListeners: 14200,
    monthlyGrowth: 22,
    avgStreamTime: 52,
    topSongs: ["Sunset", "Jason", "Brooklyn"],
    venueRecommendations: ["Red Rocks", "The Fillmore", "Gothic Theatre"],
  },
  {
    city: "Chicago",
    state: "IL",
    activeListeners: 21000,
    monthlyGrowth: 8,
    avgStreamTime: 38,
    topSongs: ["Monsters", "Sunset", "America 2"],
    venueRecommendations: ["Metro", "House of Blues", "Thalia Hall"],
  },
];

export const TourAnalytics = () => {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Tour Planning Insights</CardTitle>
          <CardDescription>
            Top cities with untapped fan potential based on your streaming data
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {mockCityInsights.map((insight, index) => (
            <div key={insight.city} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-bold text-primary">{index + 1}</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{insight.city}, {insight.state}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Users className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {insight.activeListeners.toLocaleString()} active listeners
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <Badge variant={insight.monthlyGrowth > 15 ? "default" : "secondary"}>
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +{insight.monthlyGrowth}%
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="bg-accent/50 rounded p-2">
                  <p className="text-muted-foreground text-xs">Avg. Stream Time</p>
                  <p className="font-semibold">{insight.avgStreamTime} min/session</p>
                </div>
                <div className="bg-accent/50 rounded p-2">
                  <p className="text-muted-foreground text-xs">Growth Rate</p>
                  <p className="font-semibold text-primary">+{insight.monthlyGrowth}% monthly</p>
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-muted-foreground mb-2">TOP SONGS</p>
                <div className="flex flex-wrap gap-1">
                  {insight.topSongs.map((song) => (
                    <Badge key={song} variant="outline" className="text-xs">
                      {song}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-muted-foreground mb-2">RECOMMENDED VENUES</p>
                <div className="space-y-1">
                  {insight.venueRecommendations.map((venue) => (
                    <div key={venue} className="flex items-center gap-2 text-sm">
                      <MapPin className="h-3 w-3 text-muted-foreground" />
                      <span>{venue}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Button className="w-full" size="sm">
                Plan Show in {insight.city}
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};
