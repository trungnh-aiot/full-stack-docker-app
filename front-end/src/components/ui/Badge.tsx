import React from "react";

type BadgeVariant =
  | "sale"
  | "savings"
  | "bestseller"
  | "new"
  | "value"
  | "popular"
  | "default";

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  sale: "bg-error text-white",
  savings: "bg-accent text-text-primary",
  bestseller: "bg-primary text-white",
  new: "bg-secondary text-white",
  value: "bg-gradient-to-r from-accent to-accent-hover text-text-primary",
  popular: "bg-primary text-white",
  default: "bg-background-secondary text-text-secondary",
};

export function Badge({
  variant = "default",
  children,
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center px-2.5 py-1 text-xs font-semibold
        rounded-full uppercase tracking-wide
        ${variantStyles[variant]}
        ${className}
      `}
    >
      {children}
    </span>
  );
}

// Specialized badge for showing savings percentage
interface SavingsBadgeProps {
  percentage: number;
  className?: string;
}

export function SavingsBadge({
  percentage,
  className = "",
}: SavingsBadgeProps) {
  return (
    <Badge variant="savings" className={className}>
      Save {percentage}%
    </Badge>
  );
}

// Badge for subscription tiers
interface TierBadgeProps {
  tier: "popular" | "value";
  className?: string;
}

export function TierBadge({ tier, className = "" }: TierBadgeProps) {
  const labels = {
    popular: "Most Popular",
    value: "Best Value",
  };

  return (
    <Badge
      variant={tier === "popular" ? "popular" : "value"}
      className={className}
    >
      {labels[tier]}
    </Badge>
  );
}
