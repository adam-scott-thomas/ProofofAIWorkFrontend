import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Sparkles, CreditCard, Lock } from "lucide-react";
import { useState } from "react";

interface PaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onComplete: () => void;
}

export function PaymentModal({ open, onOpenChange, onComplete }: PaymentModalProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = () => {
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      onOpenChange(false);
      onComplete();
    }, 1500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Sparkles className="h-5 w-5" />
            Run AI Sort — $7
          </DialogTitle>
          <DialogDescription>
            Preview your results and complete payment to unlock AI-organized work
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Preview of what they're buying */}
          <div className="rounded-md border-2 border-[var(--score-execution)] bg-[#FAFAFA] p-6">
            <div className="mb-4 text-[11px] uppercase tracking-wider text-[#717182]">
              Your Result
            </div>
            <div className="mb-4 text-5xl tracking-tight font-medium">
              ADVANCED–INTERMEDIATE
            </div>
            <div className="border-l-4 border-[rgba(0,0,0,0.08)] pl-4">
              <p className="mb-3 text-[15px] leading-relaxed text-[#3A3A3A]">
                You control direction and get outcomes.
              </p>
              <p className="text-[15px] leading-relaxed text-[#717182]">
                But you don't define constraints early — so you waste cycles fixing things later.
              </p>
            </div>
          </div>

          {/* What you get */}
          <div className="space-y-2 text-[14px]">
            <div className="text-[13px] text-[#717182]">This unlocks:</div>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="text-[#717182]">→</span>
                <span>8 projects structured and grouped</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#717182]">→</span>
                <span>Verified profile scores (87% HLS, 4.37x CAI)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#717182]">→</span>
                <span>Shareable proof pages</span>
              </div>
            </div>
          </div>

          {/* Payment form */}
          <div className="space-y-4 border-t border-[rgba(0,0,0,0.06)] pt-6">
            <div className="flex items-center gap-2 text-[13px] text-[#717182]">
              <Lock className="h-3.5 w-3.5" />
              <span>Secure payment powered by Stripe</span>
            </div>

            <div className="space-y-3">
              <div>
                <Label htmlFor="card-number" className="text-[13px]">
                  Card number
                </Label>
                <div className="relative">
                  <Input
                    id="card-number"
                    placeholder="4242 4242 4242 4242"
                    className="pr-10"
                  />
                  <CreditCard className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#717182]" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="expiry" className="text-[13px]">
                    Expiry
                  </Label>
                  <Input id="expiry" placeholder="MM / YY" />
                </div>
                <div>
                  <Label htmlFor="cvc" className="text-[13px]">
                    CVC
                  </Label>
                  <Input id="cvc" placeholder="123" maxLength={3} />
                </div>
              </div>

              <div>
                <Label htmlFor="name" className="text-[13px]">
                  Cardholder name
                </Label>
                <Input id="name" placeholder="Alex Chen" />
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3 border-t border-[rgba(0,0,0,0.06)] pt-6">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => onOpenChange(false)}
              disabled={isProcessing}
            >
              Cancel
            </Button>
            <Button
              className="flex-1"
              onClick={handlePayment}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>Processing...</>
              ) : (
                <>
                  Pay $7
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
