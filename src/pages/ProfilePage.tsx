import { MobileLayout } from "@/components/layout/MobileLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Settings, Ticket, Heart, Calendar, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const navigate = useNavigate();

  const menuItems = [
    { icon: Ticket, label: "Your Tickets", to: "/tickets", badge: "1" },
    { icon: Heart, label: "Followed Artists", to: "/followed" },
    { icon: Calendar, label: "Upcoming Shows", to: "/upcoming" },
    { icon: Settings, label: "Settings", to: "/settings" },
  ];

  return (
    <MobileLayout>
      <div className="px-4 pt-6 pb-4 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Profile</h1>
          <Button variant="ghost" size="icon" onClick={() => navigate("/settings")}>
            <Settings className="h-5 w-5" />
          </Button>
        </div>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                ME
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-2xl font-bold">Music Fan</h2>
              <p className="text-sm text-muted-foreground">Premium Subscriber</p>
            </div>
          </div>
        </Card>

        <div className="space-y-2">
          {menuItems.map((item) => (
            <Card 
              key={item.to}
              className="p-4 cursor-pointer hover:ring-2 hover:ring-primary transition-all"
              onClick={() => navigate(item.to)}
            >
              <div className="flex items-center gap-4">
                <item.icon className="h-5 w-5 text-muted-foreground" />
                <span className="flex-1 font-medium">{item.label}</span>
                {item.badge && (
                  <span className="bg-primary text-primary-foreground text-xs font-bold px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </div>
            </Card>
          ))}
        </div>

        <Card className="p-4 bg-muted/30">
          <p className="text-sm text-center text-muted-foreground">
            Member since 2024 • 1 concert attended
          </p>
        </Card>
      </div>
    </MobileLayout>
  );
};

export default ProfilePage;
