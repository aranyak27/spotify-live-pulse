import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Mail, MessageSquare, Send, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MessageTemplate {
  id: string;
  title: string;
  description: string;
  template: string;
}

const messageTemplates: MessageTemplate[] = [
  {
    id: "thank-you",
    title: "Thank You Message",
    description: "Show appreciation to ticket holders",
    template: "Hey everyone! 🎵 Thank you so much for grabbing tickets to the show. Can't wait to see you all there! This is going to be an unforgettable night. See you soon!",
  },
  {
    id: "song-tease",
    title: "Tease New Song",
    description: "Build excitement for new music",
    template: "Hey ticket holders! 👀 Got something special planned for the show... might debut a brand new unreleased track. You'll be the first to hear it live!",
  },
  {
    id: "meet-greet",
    title: "Meet & Greet Announcement",
    description: "Announce exclusive fan experience",
    template: "Special announcement for ticket holders! 🌟 We're hosting a limited meet & greet before the show. Keep an eye out for details coming soon!",
  },
  {
    id: "setlist-hint",
    title: "Setlist Hint",
    description: "Give fans a preview of what's coming",
    template: "What songs do you want to hear at the show? Drop your requests in the replies! Taking notes for the setlist 📝",
  },
];

export const FanCommunication = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const { toast } = useToast();

  const handleTemplateSelect = (template: MessageTemplate) => {
    setSelectedTemplate(template.id);
    setMessage(template.template);
  };

  const handleSendMessage = () => {
    toast({
      title: "Message Sent!",
      description: "Your message has been sent to all ticket holders.",
    });
    setMessage("");
    setSelectedTemplate("");
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Direct Fan Communication</CardTitle>
          <CardDescription>
            Send messages directly to your ticket holders
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-accent/50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <span className="font-semibold">Audience Reach</span>
              </div>
              <Badge variant="secondary">1,300 fans</Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              Your message will be sent to all ticket holders across your upcoming events
            </p>
          </div>

          <div>
            <Label className="text-sm font-semibold mb-3 block">Quick Templates</Label>
            <div className="grid grid-cols-2 gap-2">
              {messageTemplates.map((template) => (
                <Button
                  key={template.id}
                  variant={selectedTemplate === template.id ? "default" : "outline"}
                  size="sm"
                  className="h-auto flex-col items-start py-3 px-3"
                  onClick={() => handleTemplateSelect(template)}
                >
                  <span className="font-semibold text-xs mb-1">{template.title}</span>
                  <span className="text-xs opacity-80 font-normal text-left">
                    {template.description}
                  </span>
                </Button>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="message" className="text-sm font-semibold">Your Message</Label>
            <Textarea
              id="message"
              placeholder="Write your message to fans..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="mt-2 min-h-[120px]"
            />
            <p className="text-xs text-muted-foreground mt-2">
              {message.length} / 500 characters
            </p>
          </div>

          <div className="flex gap-2">
            <Button 
              className="flex-1" 
              disabled={!message}
              onClick={handleSendMessage}
            >
              <Send className="h-4 w-4 mr-2" />
              Send to All
            </Button>
            <Button variant="outline" disabled={!message}>
              <MessageSquare className="h-4 w-4 mr-2" />
              Preview
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Message History</CardTitle>
          <CardDescription>Recent communications with fans</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="border rounded-lg p-3">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="font-semibold text-sm">Thank You Message</span>
              </div>
              <span className="text-xs text-muted-foreground">2 days ago</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Thank you so much for grabbing tickets to the show...
            </p>
            <div className="flex gap-2 mt-2">
              <Badge variant="outline" className="text-xs">Sent to 850 fans</Badge>
              <Badge variant="outline" className="text-xs">92% opened</Badge>
            </div>
          </div>

          <div className="border rounded-lg p-3">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
                <span className="font-semibold text-sm">Setlist Request</span>
              </div>
              <span className="text-xs text-muted-foreground">1 week ago</span>
            </div>
            <p className="text-sm text-muted-foreground">
              What songs do you want to hear at the show?
            </p>
            <div className="flex gap-2 mt-2">
              <Badge variant="outline" className="text-xs">Sent to 450 fans</Badge>
              <Badge variant="outline" className="text-xs">156 replies</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
