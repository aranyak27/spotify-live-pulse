import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Event } from "@/types/live";
import { Share2, Copy, Check, MessageCircle, Mail } from "lucide-react";
import { toast } from "sonner";

interface ShareEventDialogProps {
  event: Event;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ShareEventDialog = ({ event, open, onOpenChange }: ShareEventDialogProps) => {
  const [copied, setCopied] = useState(false);
  const shareUrl = `https://spotify.com/live/event/${event.id}`;
  const shareText = `Check out ${event.artist.name} at ${event.venue.name} on ${new Date(event.date).toLocaleDateString()}!`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    toast.success("Link copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = (platform: string) => {
    let url = "";
    switch (platform) {
      case "sms":
        url = `sms:?&body=${encodeURIComponent(shareText + " " + shareUrl)}`;
        break;
      case "email":
        url = `mailto:?subject=${encodeURIComponent(shareText)}&body=${encodeURIComponent(shareUrl)}`;
        break;
    }
    if (url) window.location.href = url;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Share2 className="h-5 w-5" />
            Share Event
          </DialogTitle>
          <DialogDescription>
            Share this event with friends
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Input value={shareUrl} readOnly className="flex-1" />
            <Button size="icon" variant="outline" onClick={handleCopy}>
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={() => handleShare("sms")}
            >
              <MessageCircle className="h-4 w-4" />
              Message
            </Button>
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={() => handleShare("email")}
            >
              <Mail className="h-4 w-4" />
              Email
            </Button>
          </div>

          <div className="pt-2 border-t">
            <p className="text-sm text-muted-foreground text-center">
              {shareText}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
