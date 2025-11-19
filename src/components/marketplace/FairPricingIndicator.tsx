import { Badge } from "@/components/ui/badge";
import { Shield, TrendingDown, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";

interface FairPricingIndicatorProps {
  originalPrice: number;
  currentPrice: number;
  maxMarkup?: number;
}

export const FairPricingIndicator = ({ 
  originalPrice, 
  currentPrice,
  maxMarkup = 20 
}: FairPricingIndicatorProps) => {
  const markup = ((currentPrice - originalPrice) / originalPrice) * 100;
  const isFair = markup <= maxMarkup;

  return (
    <Card className={`p-3 border ${isFair ? 'border-green-500/30 bg-green-500/5' : 'border-amber-500/30 bg-amber-500/5'}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Shield className={`h-5 w-5 ${isFair ? 'text-green-500' : 'text-amber-500'}`} />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">
                {isFair ? 'Fair Price' : 'Market Price'}
              </span>
              <Badge 
                variant={isFair ? "default" : "secondary"}
                className="text-xs"
              >
                {markup > 0 ? '+' : ''}{markup.toFixed(0)}% markup
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              Original: ${originalPrice} • Current: ${currentPrice}
            </p>
          </div>
        </div>
        
        {markup > 0 ? (
          <TrendingUp className={`h-5 w-5 ${isFair ? 'text-green-500' : 'text-amber-500'}`} />
        ) : (
          <TrendingDown className="h-5 w-5 text-green-500" />
        )}
      </div>
      
      {isFair && (
        <p className="text-xs text-muted-foreground mt-2">
          ✓ Protected by fair resale cap ({maxMarkup}% max)
        </p>
      )}
    </Card>
  );
};
