import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { mockEvents, mockTickets } from "@/data/mockData";
import { Star, Music, Image as ImageIcon, Award, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

export const PostEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const ticket = mockTickets.find(t => t.id === id);
  const event = ticket?.event;
  
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [wouldSeeAgain, setWouldSeeAgain] = useState<boolean | null>(null);

  if (!event) return null;

  const handleSubmit = () => {
    toast({
      title: "Thanks for your feedback!",
      description: "Your review helps other fans discover great shows",
    });
    
    // Show exclusive content after submission
    setTimeout(() => {
      navigate(`/event/${event.id}/exclusive`);
    }, 1500);
  };

  return (
    <MobileLayout showNav={false}>
      <div className="min-h-screen">
        {/* Header */}
        <div className="relative">
          <div 
            className="h-32 bg-cover bg-center"
            style={{ backgroundImage: `url(${event.image})` }}
          />
          <div 
            className="absolute inset-0"
            style={{ background: 'var(--gradient-hero)' }}
          />
        </div>

        <div className="px-4 py-6 space-y-6">
          {/* Title */}
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2">How was the show?</h1>
            <p className="text-muted-foreground">
              {event.artist.name} • {format(new Date(event.date), "MMM d, yyyy")}
            </p>
          </div>

          {/* Star Rating */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4 text-center">Rate Your Experience</h2>
            <div className="flex justify-center gap-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={`h-10 w-10 ${
                      star <= rating
                        ? "fill-primary text-primary"
                        : "text-muted-foreground"
                    }`}
                  />
                </button>
              ))}
            </div>
            {rating > 0 && (
              <p className="text-center text-sm text-muted-foreground mt-3">
                {rating === 5 && "Amazing! 🎉"}
                {rating === 4 && "Great show!"}
                {rating === 3 && "Pretty good"}
                {rating === 2 && "Could be better"}
                {rating === 1 && "Not great"}
              </p>
            )}
          </Card>

          {/* Would See Again */}
          <Card className="p-4">
            <h3 className="font-semibold mb-3">Would you see them again?</h3>
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant={wouldSeeAgain === true ? "default" : "outline"}
                onClick={() => setWouldSeeAgain(true)}
              >
                Yes, definitely!
              </Button>
              <Button
                variant={wouldSeeAgain === false ? "default" : "outline"}
                onClick={() => setWouldSeeAgain(false)}
              >
                Maybe not
              </Button>
            </div>
          </Card>

          {/* Feedback */}
          <Card className="p-4">
            <h3 className="font-semibold mb-3">Share Your Thoughts (Optional)</h3>
            <Textarea
              placeholder="Tell us about your experience..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="min-h-[120px] resize-none"
              maxLength={500}
            />
            <p className="text-xs text-muted-foreground mt-2 text-right">
              {feedback.length}/500
            </p>
          </Card>

          {/* Exclusive Content Preview */}
          <Card className="p-4 bg-gradient-to-br from-primary/20 to-live-presale/20 border-primary/30">
            <div className="flex gap-3">
              <Award className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-semibold mb-1">Unlock Exclusive Content</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Submit your review to unlock live recordings, photos, and a special message from the artist!
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="gap-1">
                    <Music className="h-3 w-3" />
                    Live Audio
                  </Badge>
                  <Badge variant="secondary" className="gap-1">
                    <ImageIcon className="h-3 w-3" />
                    Tour Photos
                  </Badge>
                  <Badge variant="secondary" className="gap-1">
                    <Award className="h-3 w-3" />
                    Badge
                  </Badge>
                </div>
              </div>
            </div>
          </Card>

          {/* Recommendations */}
          {rating >= 4 && (
            <Card className="p-4">
              <h3 className="font-semibold mb-2">You Might Also Like</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Based on what you enjoyed
              </p>
              <div className="space-y-2">
                {mockEvents.slice(1, 3).map((e) => (
                  <button
                    key={e.id}
                    onClick={() => navigate(`/event/${e.id}`)}
                    className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors text-left"
                  >
                    <div
                      className="w-12 h-12 rounded bg-cover bg-center flex-shrink-0"
                      style={{ backgroundImage: `url(${e.image})` }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium line-clamp-1">{e.artist.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {format(new Date(e.date), "MMM d")} • {e.venue.city}
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                  </button>
                ))}
              </div>
            </Card>
          )}

          {/* Submit Button */}
          <Button
            size="lg"
            className="w-full"
            onClick={handleSubmit}
            disabled={rating === 0}
          >
            {rating === 0 ? "Rate to Continue" : "Submit Review"}
          </Button>
        </div>
      </div>
    </MobileLayout>
  );
};
