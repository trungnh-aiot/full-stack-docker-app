import { SubscriptionPlan } from "@/types";

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: "monthly",
    name: "Monthly",
    months: 1,
    pricePerBox: 39.99,
    originalPricePerBox: 39.99,
    features: [
      "1 curated gift box monthly",
      "Free shipping on orders $50+",
      "Exclusive member discounts",
      "Cancel anytime",
    ],
    isActive: true,
  },
  {
    id: "quarterly",
    name: "3-Month Prepay",
    months: 3,
    pricePerBox: 36.99,
    originalPricePerBox: 39.99,
    features: [
      "3 curated gift boxes",
      "Save $9 total",
      "Free shipping always",
      "Priority customer support",
      "Early access to new boxes",
    ],
    tier: "popular",
    isActive: true,
  },
  {
    id: "biannual",
    name: "6-Month Prepay",
    months: 6,
    pricePerBox: 34.99,
    originalPricePerBox: 39.99,
    features: [
      "6 curated gift boxes",
      "Save $30 total",
      "Free shipping always",
      "Priority customer support",
      "Early access to new boxes",
      "Exclusive bonus items",
    ],
    tier: "value",
    isActive: true,
  },
  {
    id: "annual",
    name: "12-Month Prepay",
    months: 12,
    pricePerBox: 32.99,
    originalPricePerBox: 39.99,
    features: [
      "12 curated gift boxes",
      "Save $84 total",
      "Free shipping always",
      "VIP customer support",
      "Early access to new boxes",
      "Exclusive bonus items",
      "Birthday surprise box",
    ],
    isActive: true,
  },
];

// Helper functions
export const getPlanById = (id: string): SubscriptionPlan | undefined =>
  subscriptionPlans.find((p) => p.id === id);

export const getActivePlans = (): SubscriptionPlan[] =>
  subscriptionPlans.filter((p) => p.isActive);

export const calculateSavings = (plan: SubscriptionPlan): number =>
  (plan.originalPricePerBox - plan.pricePerBox) * plan.months;

export const getTotalPrice = (plan: SubscriptionPlan): number =>
  plan.pricePerBox * plan.months;
