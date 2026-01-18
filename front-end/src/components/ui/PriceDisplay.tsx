import React from "react";

interface PriceDisplayProps {
  originalPrice?: number;
  salePrice: number;
  size?: "sm" | "md" | "lg";
  showSavings?: boolean;
  className?: string;
}

const sizeStyles = {
  sm: {
    original: "text-xs",
    sale: "text-base",
    savings: "text-xs",
  },
  md: {
    original: "text-sm",
    sale: "text-xl",
    savings: "text-sm",
  },
  lg: {
    original: "text-base",
    sale: "text-3xl",
    savings: "text-base",
  },
};

export function PriceDisplay({
  originalPrice,
  salePrice,
  size = "md",
  showSavings = true,
  className = "",
}: PriceDisplayProps) {
  const savings = originalPrice
    ? Math.round(((originalPrice - salePrice) / originalPrice) * 100)
    : 0;
  const styles = sizeStyles[size];

  return (
    <div className={`flex items-center flex-wrap gap-2 ${className}`}>
      {originalPrice && originalPrice > salePrice && (
        <span className={`text-text-muted line-through ${styles.original}`}>
          ${originalPrice.toFixed(2)}
        </span>
      )}
      <span className={`text-primary font-bold ${styles.sale}`}>
        ${salePrice.toFixed(2)}
      </span>
      {showSavings && savings > 0 && (
        <span
          className={`bg-accent/20 text-accent-hover px-2 py-0.5 rounded-full font-semibold ${styles.savings}`}
        >
          Save {savings}%
        </span>
      )}
    </div>
  );
}

// Subscription price display with breakdown
interface SubscriptionPriceProps {
  monthlyPrice: number;
  months: number;
  originalMonthlyPrice?: number;
  className?: string;
}

export function SubscriptionPrice({
  monthlyPrice,
  months,
  originalMonthlyPrice,
  className = "",
}: SubscriptionPriceProps) {
  const totalPrice = monthlyPrice * months;
  const savings = originalMonthlyPrice
    ? (originalMonthlyPrice - monthlyPrice) * months
    : 0;

  return (
    <div className={`space-y-2 ${className}`}>
      {/* Per-box pricing */}
      <div className="flex items-baseline gap-2">
        {originalMonthlyPrice && originalMonthlyPrice > monthlyPrice && (
          <span className="text-text-muted line-through text-sm">
            ${originalMonthlyPrice.toFixed(2)}
          </span>
        )}
        <span className="text-primary font-bold text-2xl">
          ${monthlyPrice.toFixed(2)}
        </span>
        <span className="text-text-secondary text-sm">/box</span>
      </div>

      {/* Total cost */}
      <div className="text-text-secondary text-sm">
        Total: <span className="font-semibold">${totalPrice.toFixed(2)}</span>
        <span className="text-text-muted"> + Shipping</span>
      </div>

      {/* Savings callout */}
      {savings > 0 && (
        <div className="inline-flex items-center gap-1.5 bg-success-light text-success px-3 py-1 rounded-full text-sm font-medium">
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          You save ${savings.toFixed(2)}!
        </div>
      )}

      {/* Billing info */}
      {months > 1 && (
        <div className="text-text-muted text-xs">
          Charged every {months} months
        </div>
      )}
    </div>
  );
}

// Value callout component
interface ValueCalloutProps {
  value: number;
  label?: string;
  className?: string;
}

export function ValueCallout({
  value,
  label = "worth of goodies",
  className = "",
}: ValueCalloutProps) {
  return (
    <div
      className={`inline-flex items-center gap-2 bg-accent/10 border border-accent/30 text-accent-hover px-4 py-2 rounded-lg ${className}`}
    >
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M5 2a2 2 0 00-2 2v14l3.5-2 3.5 2 3.5-2 3.5 2V4a2 2 0 00-2-2H5zm4.707 5.707a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L8.414 11H14a1 1 0 100-2H8.414l1.293-1.293z"
          clipRule="evenodd"
        />
      </svg>
      <span className="font-semibold">Over ${value}+</span>
      <span className="text-text-secondary">{label}</span>
    </div>
  );
}
