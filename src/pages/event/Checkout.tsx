import { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { mockEvents } from "@/data/mockData";
import { ArrowLeft, CreditCard, Shield, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";

export const Checkout = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { quantity, tierId, total } = location.state || {};
  
  const [paymentMethod, setPaymentMethod] = useState("saved-card");
  const [isProcessing, setIsProcessing] = useState(false);

  const event = mockEvents.find(e => e.id === id);
  const tier = event?.ticketTiers.find(t => t.id === tierId);

  if (!event || !tier) return null;

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    navigate(`/event/${id}/confirmation`, {
      state: { quantity, tier, total }
    });
  };

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
              disabled={isProcessing}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-bold">Payment</h1>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-4 space-y-6 overflow-y-auto">
          {/* Order Summary */}
          <Card className="p-4">
            <h2 className="font-semibold mb-3">Order Summary</h2>
            <div className="space-y-2">
              <div className="font-medium">{event.artist.name}</div>
              <div className="text-sm text-muted-foreground">
                {format(new Date(event.date), "EEEE, MMM d, yyyy")}
              </div>
              <div className="text-sm text-muted-foreground">
                {event.venue.name}, {event.venue.city}
              </div>
              <Separator className="my-3" />
              <div className="flex justify-between text-sm">
                <span>{tier.name} x {quantity}</span>
                <span>${total}</span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-2">
                <span>Total</span>
                <span>${total}</span>
              </div>
            </div>
          </Card>

          {/* Payment Methods */}
          <div>
            <h2 className="font-semibold mb-3">Payment Method</h2>
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
              <div className="space-y-3">
                {/* Saved Card */}
                <Card className="p-4">
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="saved-card" id="saved-card" />
                    <Label htmlFor="saved-card" className="flex-1 cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <CreditCard className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <div className="font-medium">•••• 4242</div>
                            <div className="text-sm text-muted-foreground">Expires 12/25</div>
                          </div>
                        </div>
                        <CheckCircle2 className={`h-5 w-5 ${paymentMethod === 'saved-card' ? 'text-primary' : 'text-muted'}`} />
                      </div>
                    </Label>
                  </div>
                </Card>

                {/* Apple Pay */}
                <Card className="p-4">
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="apple-pay" id="apple-pay" />
                    <Label htmlFor="apple-pay" className="flex-1 cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-12 bg-black rounded flex items-center justify-center text-white text-xs font-bold">
                            Pay
                          </div>
                          <div className="font-medium">Apple Pay</div>
                        </div>
                        <CheckCircle2 className={`h-5 w-5 ${paymentMethod === 'apple-pay' ? 'text-primary' : 'text-muted'}`} />
                      </div>
                    </Label>
                  </div>
                </Card>

                {/* Add New Card */}
                <Card className="p-4">
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="new-card" id="new-card" />
                    <Label htmlFor="new-card" className="flex-1 cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <CreditCard className="h-5 w-5 text-muted-foreground" />
                          <div className="font-medium">Add new card</div>
                        </div>
                        <CheckCircle2 className={`h-5 w-5 ${paymentMethod === 'new-card' ? 'text-primary' : 'text-muted'}`} />
                      </div>
                    </Label>
                  </div>
                </Card>
              </div>
            </RadioGroup>
          </div>

          {/* Security Notice */}
          <Card className="p-4 bg-muted/30">
            <div className="flex gap-3">
              <Shield className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <div className="font-medium text-sm mb-1">Secure Payment</div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Your payment information is encrypted and secure. Spotify Live charges transparent, 
                  lower fees with no hidden charges.
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Footer CTA */}
        <div className="p-4 border-t border-border">
          <Button 
            size="lg" 
            className="w-full"
            onClick={handlePayment}
            disabled={isProcessing}
          >
            {isProcessing ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 border-2 border-background border-t-transparent rounded-full animate-spin" />
                <span>Processing...</span>
              </div>
            ) : (
              `Complete Purchase • $${total}`
            )}
          </Button>
          <p className="text-xs text-center text-muted-foreground mt-2">
            By completing this purchase, you agree to the terms of service
          </p>
        </div>
      </div>
    </MobileLayout>
  );
};
