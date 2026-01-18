import React from "react";

import { Card } from "./Card";
import { SubscriptionPrice } from "./PriceDisplay";

interface SubscriptionPlan {
  id: string;
  name: string;
  months: number;
  pricePerBox: number;
  originalPricePerBox?: number;
  features?: string[];
  tier?: "popular" | "value";
}

interface SubscriptionCardProps {
  plan: SubscriptionPlan;
  isSelected?: boolean;
  onSelect?: (planId: string) => void;
  className?: string;
}

export function SubscriptionCard({
  plan,
  isSelected = false,
  onSelect,
  className = "",
}: SubscriptionCardProps) {
  const { id, name, months, pricePerBox, originalPricePerBox, features, tier } =
    plan;

  return (
    <Card
      hover
      onClick={() => onSelect?.(id)}
      className={`
        relative p-6 cursor-pointer transition-all duration-200
        ${isSelected ? "ring-2 ring-primary border-primary" : ""}
        ${tier === "popular" ? "border-2 border-primary" : ""}
        ${tier === "value" ? "border-2 border-accent" : ""}
        ${className}
      `}
    >
      {/* Tier badge */}
      {tier && (
        <div
          className={`
            absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wide
            ${tier === "popular" ? "bg-primary text-white" : "bg-accent text-text-primary"}
          `}
        >
          {tier === "popular" ? "Most Popular" : "Best Value"}
        </div>
      )}

      {/* Plan name */}
      <h3 className="font-display text-xl font-semibold text-text-primary text-center mt-2 mb-4">
        {name}
      </h3>

      {/* Duration */}
      <div className="text-center text-text-secondary text-sm mb-4">
        {months === 1 ? "Billed monthly" : `Prepay ${months} months`}
      </div>

      {/* Pricing */}
      <div className="flex justify-center mb-6">
        <SubscriptionPrice
          monthlyPrice={pricePerBox}
          months={months}
          originalMonthlyPrice={originalPricePerBox}
        />
      </div>

      {/* Features list */}
      {features && features.length > 0 && (
        <ul className="space-y-2 mb-6">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-2 text-sm">
              <svg
                className="w-5 h-5 text-success flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-text-secondary">{feature}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Select button */}
      <button
        className={`
          w-full py-3 rounded-xl font-semibold transition-all duration-200 cursor-pointer
          ${
            isSelected
              ? "bg-primary text-white"
              : "bg-background-secondary text-text-primary hover:bg-primary hover:text-white"
          }
        `}
      >
        {isSelected ? "Selected" : "Choose Plan"}
      </button>
    </Card>
  );
}

// Horizontal comparison table for subscriptions
interface SubscriptionTableProps {
  plans: SubscriptionPlan[];
  selectedPlanId?: string;
  onSelectPlan?: (planId: string) => void;
  className?: string;
}

export function SubscriptionTable({
  plans,
  selectedPlanId,
  onSelectPlan,
  className = "",
}: SubscriptionTableProps) {
  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ${className}`}
    >
      {plans.map((plan) => (
        <SubscriptionCard
          key={plan.id}
          plan={plan}
          isSelected={selectedPlanId === plan.id}
          onSelect={onSelectPlan}
        />
      ))}
    </div>
  );
}
