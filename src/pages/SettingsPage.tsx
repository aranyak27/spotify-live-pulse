import { MobileLayout } from "@/components/layout/MobileLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Bell, MapPin, Shield, HelpCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const SettingsPage = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState({
    tourAnnounced: true,
    presale: true,
    onSale: true,
    reminders: true,
    postEvent: false,
    emailEnabled: true,
    pushEnabled: true,
  });

  const [location, setLocation] = useState({
    enabled: true,
    radius: 50,
  });

  return (
    <MobileLayout showNav={false}>
      <div className="min-h-screen">
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
            <h1 className="text-xl font-bold">Settings</h1>
          </div>
        </div>

        <div className="p-4 space-y-6">
          {/* Notifications */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Bell className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold">Notifications</h2>
            </div>
            
            <Card className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <Label htmlFor="tour-announced" className="text-base cursor-pointer">
                    Tour Announcements
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    When artists you follow announce tours
                  </p>
                </div>
                <Switch 
                  id="tour-announced"
                  checked={notifications.tourAnnounced}
                  onCheckedChange={(checked) => 
                    setNotifications(prev => ({ ...prev, tourAnnounced: checked }))
                  }
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <Label htmlFor="presale" className="text-base cursor-pointer">
                    Presale Alerts
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Early access for top listeners
                  </p>
                </div>
                <Switch 
                  id="presale"
                  checked={notifications.presale}
                  onCheckedChange={(checked) => 
                    setNotifications(prev => ({ ...prev, presale: checked }))
                  }
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <Label htmlFor="on-sale" className="text-base cursor-pointer">
                    On Sale Notifications
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    When tickets go on sale
                  </p>
                </div>
                <Switch 
                  id="on-sale"
                  checked={notifications.onSale}
                  onCheckedChange={(checked) => 
                    setNotifications(prev => ({ ...prev, onSale: checked }))
                  }
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <Label htmlFor="reminders" className="text-base cursor-pointer">
                    Event Reminders
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Reminders before your concerts
                  </p>
                </div>
                <Switch 
                  id="reminders"
                  checked={notifications.reminders}
                  onCheckedChange={(checked) => 
                    setNotifications(prev => ({ ...prev, reminders: checked }))
                  }
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <Label htmlFor="post-event" className="text-base cursor-pointer">
                    Post-Show Feedback
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Rate your experience after events
                  </p>
                </div>
                <Switch 
                  id="post-event"
                  checked={notifications.postEvent}
                  onCheckedChange={(checked) => 
                    setNotifications(prev => ({ ...prev, postEvent: checked }))
                  }
                />
              </div>
            </Card>

            <Card className="p-4 mt-3 space-y-4">
              <h3 className="font-semibold text-sm">Delivery Preferences</h3>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="email" className="text-base cursor-pointer">
                  Email
                </Label>
                <Switch 
                  id="email"
                  checked={notifications.emailEnabled}
                  onCheckedChange={(checked) => 
                    setNotifications(prev => ({ ...prev, emailEnabled: checked }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="push" className="text-base cursor-pointer">
                  Push Notifications
                </Label>
                <Switch 
                  id="push"
                  checked={notifications.pushEnabled}
                  onCheckedChange={(checked) => 
                    setNotifications(prev => ({ ...prev, pushEnabled: checked }))
                  }
                />
              </div>
            </Card>
          </div>

          {/* Location */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold">Location</h2>
            </div>
            
            <Card className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <Label htmlFor="location" className="text-base cursor-pointer">
                    Location Services
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Show concerts near you
                  </p>
                </div>
                <Switch 
                  id="location"
                  checked={location.enabled}
                  onCheckedChange={(checked) => 
                    setLocation(prev => ({ ...prev, enabled: checked }))
                  }
                />
              </div>

              {location.enabled && (
                <>
                  <Separator />
                  <div>
                    <Label className="text-sm">Search Radius</Label>
                    <p className="text-sm text-muted-foreground mb-2">
                      Within {location.radius} miles
                    </p>
                    <input 
                      type="range" 
                      min="10" 
                      max="200" 
                      value={location.radius}
                      onChange={(e) => setLocation(prev => ({ ...prev, radius: parseInt(e.target.value) }))}
                      className="w-full accent-primary"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>10 mi</span>
                      <span>200 mi</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <Label className="text-sm">Current Location</Label>
                    <p className="text-sm text-foreground">
                      San Francisco Bay Area, CA
                    </p>
                  </div>
                </>
              )}
            </Card>
          </div>

          {/* Other Options */}
          <div>
            <Card className="divide-y divide-border">
              <button className="w-full p-4 flex items-center gap-3 text-left hover:bg-muted/50 transition-colors">
                <Shield className="h-5 w-5 text-muted-foreground" />
                <div className="flex-1">
                  <div className="font-medium">Privacy & Security</div>
                  <div className="text-sm text-muted-foreground">
                    Manage your data and account
                  </div>
                </div>
              </button>
              
              <button className="w-full p-4 flex items-center gap-3 text-left hover:bg-muted/50 transition-colors">
                <HelpCircle className="h-5 w-5 text-muted-foreground" />
                <div className="flex-1">
                  <div className="font-medium">Help & Support</div>
                  <div className="text-sm text-muted-foreground">
                    FAQs and contact support
                  </div>
                </div>
              </button>
            </Card>
          </div>

          {/* Version */}
          <div className="text-center text-sm text-muted-foreground py-4">
            Spotify Live v1.0.0
          </div>
        </div>
      </div>
    </MobileLayout>
  );
};

export default SettingsPage;
