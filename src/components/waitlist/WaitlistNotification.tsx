import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, Ticket, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface WaitlistAlert {
  id: string;
  eventId: string;
  eventTitle: string;
  artistName: string;
  ticketsAvailable: number;
  price: number;
  source: "cancellation" | "resale";
  timestamp: Date;
}

export const WaitlistNotification = () => {
  const navigate = useNavigate();
  const [alerts, setAlerts] = useState<WaitlistAlert[]>([]);
  const [dismissed, setDismissed] = useState<string[]>([]);

  // Simulate real-time notifications
  useEffect(() => {
    const simulateNotification = () => {
      const mockAlert: WaitlistAlert = {
        id: `alert-${Date.now()}`,
        eventId: "2",
        eventTitle: "Tame Impala - Currents World Tour",
        artistName: "Tame Impala",
        ticketsAvailable: 2,
        price: 85,
        source: Math.random() > 0.5 ? "cancellation" : "resale",
        timestamp: new Date()
      };
      
      setAlerts(prev => [mockAlert, ...prev].slice(0, 3));
    };

    // Simulate notifications every 30 seconds
    const interval = setInterval(simulateNotification, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const handleDismiss = (id: string) => {
    setDismissed(prev => [...prev, id]);
  };

  const handleClaimTicket = (eventId: string, alertId: string) => {
    handleDismiss(alertId);
    navigate(`/event/${eventId}/ticket-selection`);
  };

  const visibleAlerts = alerts.filter(alert => !dismissed.includes(alert.id));

  if (visibleAlerts.length === 0) return null;

  return (
    <div className="space-y-3">
      {visibleAlerts.map(alert => (
        <Card 
          key={alert.id}
          className="p-4 bg-gradient-to-r from-primary/10 to-accent/10 border-primary/30 animate-in slide-in-from-top"
        >
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
              <Bell className="h-5 w-5 text-primary" />
            </div>
            
            <div className="flex-1 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Badge 
                      variant={alert.source === "cancellation" ? "default" : "secondary"}
                      className="text-xs"
                    >
                      {alert.source === "cancellation" ? "Cancellation" : "Verified Resale"}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {Math.floor((Date.now() - alert.timestamp.getTime()) / 1000)}s ago
                    </span>
                  </div>
                  <h4 className="font-semibold text-sm">{alert.artistName}</h4>
                  <p className="text-xs text-muted-foreground line-clamp-1">
                    {alert.eventTitle}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0"
                  onClick={() => handleDismiss(alert.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <Ticket className="h-4 w-4 text-primary" />
                <span className="font-medium">{alert.ticketsAvailable} tickets</span>
                <span className="text-muted-foreground">•</span>
                <span className="font-bold">${alert.price}</span>
              </div>

              <Button 
                onClick={() => handleClaimTicket(alert.eventId, alert.id)}
                size="sm"
                className="w-full"
              >
                Claim Now
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
