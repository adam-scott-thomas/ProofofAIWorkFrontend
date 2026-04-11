import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Sparkles, Lock, CreditCard, Bitcoin, ExternalLink, Loader2, AlertCircle, CheckCircle2, Tag } from "lucide-react";
import { useState } from "react";
import { usePaymentConfig } from "../../hooks/useApi";
import { apiPost } from "../../lib/api";
import SquarePaymentForm from "./SquarePaymentForm";

interface PaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onComplete: () => void;
}

type PaymentTab = "card" | "crypto";

export function PaymentModal({ open, onOpenChange, onComplete }: PaymentModalProps) {
  const { data: paymentConfig } = usePaymentConfig();

  const [tab, setTab] = useState<PaymentTab>("card");
  const [cardLoading, setCardLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cryptoLoading, setCryptoLoading] = useState(false);
  const [cryptoInvoiceUrl, setCryptoInvoiceUrl] = useState<string | null>(null);
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);

  const VALID_COUPONS: Record<string, number> = {
    "MAELSTROM99": 100,
  };

  const couponDiscount = VALID_COUPONS[coupon.trim().toUpperCase()] ?? 0;
  const isFreeWithCoupon = couponApplied && couponDiscount === 100;

  const handleApplyCoupon = () => {
    const code = coupon.trim().toUpperCase();
    if (VALID_COUPONS[code]) {
      setCouponApplied(true);
      setError(null);
    } else {
      setError("Invalid coupon code");
      setCouponApplied(false);
    }
  };

  const [unlocking, setUnlocking] = useState(false);

  const runAiSort = async () => {
    setUnlocking(true);
    setError(null);
    try {
      // Fire and forget — don't block the UI waiting for LLM clustering
      apiPost("/projects/ai-cluster", {}).catch(() => {});
      // Close immediately and let the dashboard refresh
      onOpenChange(false);
      onComplete();
    } finally {
      setUnlocking(false);
    }
  };

  const handleFreeUnlock = () => {
    runAiSort();
  };

  const handleClose = (open: boolean) => {
    if (!open) {
      setTab("card");
      setError(null);
      setCryptoInvoiceUrl(null);
      setCoupon("");
      setCouponApplied(false);
    }
    onOpenChange(open);
  };

  const handleCardToken = async (sourceId: string) => {
    setError(null);
    setCardLoading(true);
    try {
      await apiPost("/payments/ai-sort", { source_id: sourceId });
      // Payment succeeded — fire clustering async and close
      apiPost("/projects/ai-cluster", {}).catch(() => {});
      onOpenChange(false);
      onComplete();
    } catch (e: any) {
      setError(e.message || "Payment failed. Please try again.");
    } finally {
      setCardLoading(false);
    }
  };

  const handleCryptoPay = async () => {
    setError(null);
    setCryptoLoading(true);
    try {
      const res = await apiPost<{ invoice_url: string }>("/payments/crypto-invoice", { feature: "ai_sort" });
      setCryptoInvoiceUrl(res.invoice_url);
      window.open(res.invoice_url, "_blank");
    } catch (e: any) {
      setError(e.message || "Could not create crypto invoice. Please try again.");
    } finally {
      setCryptoLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Sparkles className="h-5 w-5" />
            Run AI Sort
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
                <span>Projects structured and grouped</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#717182]">→</span>
                <span>Verified profile scores and shareable proof pages</span>
              </div>
            </div>
          </div>

          {/* Coupon */}
          <div className="border-t border-[rgba(0,0,0,0.06)] pt-4">
            <div className="flex items-center gap-2">
              <Tag className="h-3.5 w-3.5 text-[#717182]" />
              <span className="text-[13px] text-[#717182]">Have a coupon?</span>
            </div>
            <div className="mt-2 flex gap-2">
              <Input
                value={coupon}
                onChange={(e) => { setCoupon(e.target.value); setCouponApplied(false); setError(null); }}
                placeholder="Enter code"
                className="h-9 text-[13px] uppercase"
                disabled={couponApplied}
              />
              <Button
                variant="outline"
                size="sm"
                onClick={handleApplyCoupon}
                disabled={!coupon.trim() || couponApplied}
              >
                {couponApplied ? <CheckCircle2 className="h-3.5 w-3.5 text-green-600" /> : "Apply"}
              </Button>
            </div>
            {couponApplied && (
              <p className="mt-2 text-[13px] text-green-600">
                {couponDiscount}% off applied{isFreeWithCoupon ? " — free unlock!" : ""}
              </p>
            )}
          </div>

          {/* Free unlock with coupon */}
          {isFreeWithCoupon ? (
            <div className="space-y-3">
              <Button className="w-full" size="lg" onClick={handleFreeUnlock} disabled={unlocking}>
                {unlocking ? (
                  <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Running AI Sort...</>
                ) : (
                  <><Sparkles className="mr-2 h-5 w-5" /> Unlock — Free</>
                )}
              </Button>
              <p className="text-center text-[12px] text-[#717182]">
                Coupon {coupon.trim().toUpperCase()} applied. No payment required.
              </p>
            </div>
          ) : (
          /* Payment section */
          <div className="space-y-4">
            {/* Payment method tabs */}
            <div className="flex gap-2">
              <button
                onClick={() => { setTab("card"); setError(null); }}
                className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-[13px] transition-colors ${
                  tab === "card"
                    ? "bg-[#030213] text-white"
                    : "bg-gray-100 text-[#717182] hover:bg-gray-200"
                }`}
              >
                <CreditCard className="h-3.5 w-3.5" />
                Card — $7
              </button>
              <button
                onClick={() => { setTab("crypto"); setError(null); }}
                className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-[13px] transition-colors ${
                  tab === "crypto"
                    ? "bg-[#030213] text-white"
                    : "bg-gray-100 text-[#717182] hover:bg-gray-200"
                }`}
              >
                <Bitcoin className="h-3.5 w-3.5" />
                Crypto — $5.90
              </button>
            </div>

            {/* Error display */}
            {error && (
              <div className="flex items-center gap-2 rounded-md bg-red-50 px-3 py-2 text-[13px] text-red-700">
                <AlertCircle className="h-4 w-4 shrink-0" />
                {error}
              </div>
            )}

            {/* Card tab */}
            {tab === "card" && (
              <>
                <div className="flex items-center gap-2 text-[13px] text-[#717182]">
                  <Lock className="h-3.5 w-3.5" />
                  <span>Secure payment powered by Square</span>
                </div>

                {paymentConfig?.app_id && paymentConfig?.location_id ? (
                  <SquarePaymentForm
                    appId={paymentConfig.app_id}
                    locationId={paymentConfig.location_id}
                    onToken={handleCardToken}
                    onCancel={() => onOpenChange(false)}
                    submitLabel="Pay $7"
                    loading={cardLoading}
                  />
                ) : (
                  <div className="flex items-center gap-2 text-[13px] text-[#717182]">
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    Loading payment configuration...
                  </div>
                )}
              </>
            )}

            {/* Crypto tab */}
            {tab === "crypto" && (
              <div className="space-y-4">
                {!cryptoInvoiceUrl ? (
                  <>
                    <p className="text-[13px] text-[#717182]">
                      Pay with 300+ cryptocurrencies via NowPayments. You'll be redirected to a secure payment page.
                    </p>
                    <div className="flex gap-3 justify-end">
                      <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() => onOpenChange(false)}
                        disabled={cryptoLoading}
                      >
                        Cancel
                      </Button>
                      <Button
                        className="flex-1"
                        onClick={handleCryptoPay}
                        disabled={cryptoLoading}
                      >
                        {cryptoLoading && <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />}
                        <Bitcoin className="mr-2 h-3.5 w-3.5" />
                        Pay with Crypto — $5.90
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="space-y-3">
                    <div className="rounded-md bg-amber-50 border border-amber-200 px-4 py-3">
                      <div className="flex items-center gap-2 mb-1">
                        <CheckCircle2 className="h-4 w-4 text-amber-700" />
                        <p className="text-[13px] text-amber-800 font-medium">Invoice created</p>
                      </div>
                      <p className="text-[12px] text-amber-700">
                        Complete your payment in the NowPayments window. Your access will be activated once confirmed.
                      </p>
                    </div>
                    <div className="flex gap-3 justify-end">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setCryptoInvoiceUrl(null);
                          setError(null);
                        }}
                      >
                        Back
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => window.open(cryptoInvoiceUrl, "_blank")}
                      >
                        <ExternalLink className="mr-2 h-3.5 w-3.5" />
                        Open Payment Page
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
