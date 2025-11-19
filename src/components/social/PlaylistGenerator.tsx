import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { EventPlaylist, Friend } from "@/types/social";
import { Music, Play, Clock, Users, Sparkles } from "lucide-react";
import { toast } from "sonner";

interface PlaylistGeneratorProps {
  eventId: string;
  eventTitle: string;
  attendingFriends: Friend[];
  existingPlaylist?: EventPlaylist;
  onGenerate?: (playlist: EventPlaylist) => void;
}

export const PlaylistGenerator = ({
  eventId,
  eventTitle,
  attendingFriends,
  existingPlaylist,
  onGenerate,
}: PlaylistGeneratorProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [playlist, setPlaylist] = useState<EventPlaylist | undefined>(existingPlaylist);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatTotalDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    return `${mins} min`;
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    
    // Simulate playlist generation
    setTimeout(() => {
      const mockPlaylist: EventPlaylist = {
        id: `pl_${Date.now()}`,
        eventId,
        eventTitle,
        tracks: existingPlaylist?.tracks || [],
        contributingFriends: attendingFriends.slice(0, 3),
        generatedDate: new Date().toISOString(),
        totalDuration: existingPlaylist?.totalDuration || 0,
      };
      
      setPlaylist(mockPlaylist);
      onGenerate?.(mockPlaylist);
      setIsGenerating(false);
      toast.success("Playlist generated!", {
        description: `Created a ${formatTotalDuration(mockPlaylist.totalDuration)} hype playlist`,
      });
    }, 1500);
  };

  if (!playlist) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <CardTitle>Pre-Concert Hype Playlist</CardTitle>
          </div>
          <CardDescription>
            Generate a playlist from your friends' top tracks
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>{attendingFriends.length} friends attending</span>
          </div>
          <Button
            onClick={handleGenerate}
            disabled={isGenerating || attendingFriends.length === 0}
            className="w-full"
          >
            {isGenerating ? (
              <>
                <Sparkles className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Music className="mr-2 h-4 w-4" />
                Generate Playlist
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <CardTitle>Pre-Concert Hype</CardTitle>
            </div>
            <CardDescription className="mt-1">
              {eventTitle}
            </CardDescription>
          </div>
          <Button variant="ghost" size="icon">
            <Play className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Playlist Stats */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Music className="h-4 w-4" />
            <span>{playlist.tracks.length} tracks</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{formatTotalDuration(playlist.totalDuration)}</span>
          </div>
        </div>

        {/* Contributing Friends */}
        <div>
          <p className="text-xs text-muted-foreground mb-2">From your friends:</p>
          <div className="flex -space-x-2">
            {playlist.contributingFriends.map((friend) => (
              <Avatar key={friend.id} className="h-8 w-8 border-2 border-background">
                <AvatarImage src={friend.image} alt={friend.name} />
                <AvatarFallback className="text-xs">
                  {friend.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
            ))}
          </div>
        </div>

        {/* Track List */}
        <div className="space-y-2">
          {playlist.tracks.map((track, index) => (
            <div
              key={track.id}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <span className="text-xs text-muted-foreground w-4">{index + 1}</span>
              <img
                src={track.albumArt}
                alt={track.title}
                className="h-10 w-10 rounded object-cover"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{track.title}</p>
                <p className="text-xs text-muted-foreground truncate">{track.artist}</p>
              </div>
              <span className="text-xs text-muted-foreground">
                {formatDuration(track.duration)}
              </span>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button variant="outline" className="flex-1">
            <Music className="mr-2 h-4 w-4" />
            Open in Spotify
          </Button>
          <Button variant="outline" onClick={handleGenerate} disabled={isGenerating}>
            <Sparkles className="mr-2 h-4 w-4" />
            Regenerate
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
