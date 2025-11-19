import { MobileLayout } from "@/components/layout/MobileLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  MapPin, 
  MessageSquare, 
  Package,
  Ticket,
  BarChart3,
  Calendar,
  Mail
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

const ArtistDashboard = () => {
  // Mock data for the dashboard
  const upcomingEvents = [
    {
      id: "1",
      name: "The Midnight - Heroes Tour",
      venue: "The Fillmore, San Francisco",
      date: "2025-12-15",
      ticketsSold: 850,
      totalCapacity: 1200,
      revenue: 38250,
    },
    {
      id: "2",
      name: "The Midnight - LA Show",
      venue: "Echoplex, Los Angeles",
      date: "2025-12-20",
      ticketsSold: 450,
      totalCapacity: 700,
      revenue: 20250,
    },
  ];

  const demographics = {
    ageGroups: [
      { range: "18-24", percentage: 35 },
      { range: "25-34", percentage: 45 },
      { range: "35-44", percentage: 15 },
      { range: "45+", percentage: 5 },
    ],
    topCities: [
      { city: "Los Angeles", fans: 15420 },
      { city: "San Francisco", fans: 12350 },
      { city: "Seattle", fans: 9800 },
      { city: "Portland", fans: 8200 },
    ],
  };

  return (
    <MobileLayout>
      <div className="space-y-6 pb-6">
        {/* Header */}
        <div className="px-4 pt-6">
          <h1 className="text-3xl font-bold mb-2">Artist Dashboard</h1>
          <p className="text-muted-foreground">Manage your shows and connect with fans</p>
        </div>

        {/* Overview Stats */}
        <div className="px-4 grid grid-cols-2 gap-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Sales</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-primary" />
                <span className="text-2xl font-bold">$58.5K</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">+12% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Tickets Sold</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Ticket className="h-4 w-4 text-primary" />
                <span className="text-2xl font-bold">1,300</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Across 2 events</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="events" className="w-full">
          <TabsList className="w-full grid grid-cols-4 mx-4" style={{ width: 'calc(100% - 2rem)' }}>
            <TabsTrigger value="events" className="text-xs">Events</TabsTrigger>
            <TabsTrigger value="analytics" className="text-xs">Analytics</TabsTrigger>
            <TabsTrigger value="fans" className="text-xs">Fans</TabsTrigger>
            <TabsTrigger value="bundles" className="text-xs">Bundles</TabsTrigger>
          </TabsList>

          {/* Events Tab */}
          <TabsContent value="events" className="mt-4 space-y-4 px-4">
            {upcomingEvents.map((event) => (
              <Card key={event.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-base">{event.name}</CardTitle>
                      <CardDescription className="flex items-center gap-1 mt-1">
                        <MapPin className="h-3 w-3" />
                        {event.venue}
                      </CardDescription>
                      <CardDescription className="flex items-center gap-1 mt-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(event.date).toLocaleDateString()}
                      </CardDescription>
                    </div>
                    <Badge variant="secondary">Upcoming</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Ticket Sales</span>
                      <span className="font-semibold">
                        {event.ticketsSold} / {event.totalCapacity}
                      </span>
                    </div>
                    <Progress value={(event.ticketsSold / event.totalCapacity) * 100} />
                  </div>
                  
                  <div className="flex justify-between items-center pt-2 border-t">
                    <span className="text-sm text-muted-foreground">Revenue</span>
                    <span className="text-lg font-bold">${event.revenue.toLocaleString()}</span>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      Message Fans
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <BarChart3 className="h-4 w-4 mr-1" />
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}

            <Button className="w-full" size="lg">
              <Calendar className="h-5 w-5 mr-2" />
              Schedule New Event
            </Button>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="mt-4 space-y-4 px-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Tour Planning Insights</CardTitle>
                <CardDescription>Cities with untapped fan potential</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {demographics.topCities.map((city, index) => (
                  <div key={city.city} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-sm font-bold text-primary">{index + 1}</span>
                      </div>
                      <div>
                        <p className="font-semibold text-sm">{city.city}</p>
                        <p className="text-xs text-muted-foreground">{city.fans.toLocaleString()} active listeners</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      Plan Tour
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Audience Demographics</CardTitle>
                <CardDescription>Age distribution of ticket buyers</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {demographics.ageGroups.map((group) => (
                  <div key={group.range}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">{group.range} years</span>
                      <span className="font-semibold">{group.percentage}%</span>
                    </div>
                    <Progress value={group.percentage} />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Fans Tab */}
          <TabsContent value="fans" className="mt-4 space-y-4 px-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Fan Communication</CardTitle>
                <CardDescription>Connect directly with your ticket holders</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" variant="outline">
                  <Mail className="h-4 w-4 mr-2" />
                  Send Thank You Message
                </Button>
                <Button className="w-full" variant="outline">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Tease New Song
                </Button>
                <Button className="w-full" variant="outline">
                  <Users className="h-4 w-4 mr-2" />
                  Announce Meet & Greet
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Fan Presale Management</CardTitle>
                <CardDescription>Exclusive early access for your biggest fans</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-accent/50 rounded-lg">
                  <div>
                    <p className="font-semibold text-sm">Active Presale</p>
                    <p className="text-xs text-muted-foreground">SF Show - 250 tickets reserved</p>
                  </div>
                  <Badge>Live</Badge>
                </div>
                <Button className="w-full" variant="outline">
                  Create New Presale
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Bundles Tab */}
          <TabsContent value="bundles" className="mt-4 space-y-4 px-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">VIP Packages</CardTitle>
                <CardDescription>Manage premium experiences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 border rounded-lg space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold">Meet & Greet + Early Entry</p>
                      <p className="text-xs text-muted-foreground mt-1">SF Show</p>
                    </div>
                    <Badge variant="secondary">$150</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Sold</span>
                    <span className="font-semibold">15 / 20</span>
                  </div>
                  <Progress value={75} />
                </div>

                <Button className="w-full" variant="outline">
                  <Package className="h-4 w-4 mr-2" />
                  Create VIP Package
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Merch Bundles</CardTitle>
                <CardDescription>Add merchandise to ticket purchases</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-semibold">Tour T-Shirt Bundle</p>
                      <p className="text-xs text-muted-foreground mt-1">+$30 at checkout</p>
                    </div>
                    <Badge variant="secondary">Active</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">142 sold · $4,260 revenue</p>
                </div>

                <Button className="w-full" variant="outline">
                  Add Merch Bundle
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Virtual Experiences</CardTitle>
                <CardDescription>Live streams and remote content</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" variant="outline">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Create Live Stream Event
                </Button>
                <Button className="w-full" variant="outline">
                  Post-Concert Recording
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MobileLayout>
  );
};

export default ArtistDashboard;
