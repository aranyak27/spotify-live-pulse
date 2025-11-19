import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";

interface NFTTicketBadgeProps {
  isNFT: boolean;
  size?: "sm" | "md" | "lg";
}

export const NFTTicketBadge = ({ isNFT, size = "md" }: NFTTicketBadgeProps) => {
  if (!isNFT) return null;

  const sizeClasses = {
    sm: "text-xs px-2 py-0.5",
    md: "text-sm px-3 py-1",
    lg: "text-base px-4 py-1.5"
  };

  return (
    <Badge 
      className={`bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 ${sizeClasses[size]}`}
    >
      <Sparkles className="h-3 w-3 mr-1" />
      NFT Ticket
    </Badge>
  );
};
