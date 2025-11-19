import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { mockEvents } from "@/data/mockData";
import { ArrowLeft, ZoomIn, ZoomOut, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export const VenueMap = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const event = mockEvents.find(e => e.id === id);
  
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);

  if (!event) return null;

  // Mock venue sections with availability
  const venueSections = [
    { id: "ga-floor", name: "GA Floor", x: 40, y: 60, width: 20, height: 25, price: event.ticketTiers[0].price, available: true },
    { id: "balcony-left", name: "Balcony Left", x: 15, y: 25, width: 20, height: 15, price: event.ticketTiers[1]?.price || 95, available: true },
    { id: "balcony-right", name: "Balcony Right", x: 65, y: 25, width: 20, height: 15, price: event.ticketTiers[1]?.price || 95, available: false },
    { id: "vip-section", name: "VIP Section", x: 35, y: 45, width: 30, height: 10, price: 120, available: false },
  ];

  const selectedSectionData = venueSections.find(s => s.id === selectedSection);

  return (
    <MobileLayout showNav={false}>
      <div className="min-h-screen flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex-1">
              <h1 className="text-xl font-bold">Venue Map</h1>
              <p className="text-sm text-muted-foreground">{event.venue.name}</p>
            </div>
          </div>
        </div>

        {/* Venue Map */}
        <div className="flex-1 relative overflow-hidden bg-muted/30">
          {/* Zoom Controls */}
          <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setZoom(Math.min(2, zoom + 0.2))}
              className="bg-background/90 backdrop-blur-sm"
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setZoom(Math.max(0.5, zoom - 0.2))}
              className="bg-background/90 backdrop-blur-sm"
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setZoom(1)}
              className="bg-background/90 backdrop-blur-sm"
            >
              <Maximize2 className="h-4 w-4" />
            </Button>
          </div>

          {/* SVG Venue Layout */}
          <div className="p-4 flex items-center justify-center h-full">
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full max-w-md max-h-[500px]"
              style={{ transform: `scale(${zoom})`, transition: 'transform 0.2s' }}
            >
              {/* Stage */}
              <rect x="30" y="5" width="40" height="8" fill="hsl(var(--primary))" rx="2" />
              <text x="50" y="10" textAnchor="middle" fill="hsl(var(--primary-foreground))" fontSize="3">
                STAGE
              </text>

              {/* Venue Sections */}
              {venueSections.map(section => (
                <g
                  key={section.id}
                  onClick={() => setSelectedSection(section.id)}
                  className="cursor-pointer"
                >
                  <rect
                    x={section.x}
                    y={section.y}
                    width={section.width}
                    height={section.height}
                    fill={
                      selectedSection === section.id
                        ? "hsl(var(--primary))"
                        : section.available
                        ? "hsl(var(--card))"
                        : "hsl(var(--muted))"
                    }
                    stroke={
                      selectedSection === section.id
                        ? "hsl(var(--primary))"
                        : "hsl(var(--border))"
                    }
                    strokeWidth="0.5"
                    rx="1"
                    opacity={section.available ? 1 : 0.5}
                    className="transition-all"
                  />
                  <text
                    x={section.x + section.width / 2}
                    y={section.y + section.height / 2}
                    textAnchor="middle"
                    fill={
                      selectedSection === section.id
                        ? "hsl(var(--primary-foreground))"
                        : "hsl(var(--foreground))"
                    }
                    fontSize="2.5"
                    className="pointer-events-none"
                  >
                    {section.name}
                  </text>
                </g>
              ))}

              {/* Entrance */}
              <rect x="45" y="93" width="10" height="5" fill="hsl(var(--muted-foreground))" rx="1" />
              <text x="50" y="96.5" textAnchor="middle" fill="hsl(var(--background))" fontSize="2">
                ENTRANCE
              </text>
            </svg>
          </div>

          {/* Legend */}
          <div className="absolute bottom-4 left-4 right-4">
            <Card className="p-3 bg-background/90 backdrop-blur-sm">
              <div className="flex gap-4 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-card border border-border rounded" />
                  <span>Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-muted border border-border rounded opacity-50" />
                  <span>Sold Out</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-primary border border-primary rounded" />
                  <span>Selected</span>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Section Details */}
        {selectedSectionData && (
          <div className="p-4 border-t border-border">
            <Card className="p-4">
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-1">{selectedSectionData.name}</h3>
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant={selectedSectionData.available ? "default" : "destructive"}
                      className={cn(!selectedSectionData.available && "bg-muted text-muted-foreground")}
                    >
                      {selectedSectionData.available ? "Available" : "Sold Out"}
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">${selectedSectionData.price}</div>
                  <div className="text-xs text-muted-foreground">per ticket</div>
                </div>
              </div>

              {selectedSectionData.available ? (
                <Button 
                  className="w-full"
                  onClick={() => navigate(`/event/${id}/tickets`)}
                >
                  Select Section
                </Button>
              ) : (
                <div className="space-y-2">
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => navigate(`/event/${id}/waitlist`)}
                  >
                    Join Waitlist
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full"
                    onClick={() => navigate(`/event/${id}/resale`)}
                  >
                    View Resale
                  </Button>
                </div>
              )}
            </Card>
          </div>
        )}
      </div>
    </MobileLayout>
  );
};
