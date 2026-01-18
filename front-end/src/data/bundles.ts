import { Bundle } from "@/types";

import { products } from "./products";

export const bundles: Bundle[] = [
  {
    id: "1",
    name: "Ultimate Relaxation Bundle",
    slug: "ultimate-relaxation",
    description:
      "Combine our best-selling relaxation boxes for the ultimate self-care experience. Perfect for anyone who deserves a break.",
    products: [products[0], products[2]], // Cozy Night In + Self-Care Sanctuary
    originalPrice: 169.98,
    bundlePrice: 139.99,
    savingsPercentage: 18,
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600",
    isActive: true,
  },
  {
    id: "2",
    name: "Gourmet Lovers Duo",
    slug: "gourmet-lovers-duo",
    description:
      "Double the flavors, double the delight! Combine our Foodie and Coffee boxes for the ultimate culinary gift.",
    products: [products[1], products[6]], // Gourmet Foodie + Coffee Connoisseur
    originalPrice: 194.98,
    bundlePrice: 159.99,
    savingsPercentage: 18,
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600",
    isActive: true,
  },
  {
    id: "3",
    name: "Creative & Cozy Collection",
    slug: "creative-cozy-collection",
    description:
      "Inspire creativity during cozy evenings. Arts supplies paired with comfort essentials for the perfect creative session.",
    products: [products[5], products[0]], // Creative Arts + Cozy Night In
    originalPrice: 149.98,
    bundlePrice: 119.99,
    savingsPercentage: 20,
    image: "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=600",
    isActive: true,
  },
  {
    id: "4",
    name: "New Parents Complete Care",
    slug: "new-parents-care",
    description:
      "Everything new parents need: baby essentials plus self-care for exhausted moms and dads. Bundle and save!",
    products: [products[4], products[2]], // New Parent + Self-Care
    originalPrice: 168.98,
    bundlePrice: 129.99,
    savingsPercentage: 23,
    image: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=600",
    isActive: true,
  },
  {
    id: "5",
    name: "Bookworm's Dream Bundle",
    slug: "bookworms-dream",
    description:
      "For those who love getting lost in stories. Books, coffee, and cozy essentials for the perfect reading weekend.",
    products: [products[7], products[6], products[0]], // Book Lover + Coffee + Cozy
    originalPrice: 229.97,
    bundlePrice: 179.99,
    savingsPercentage: 22,
    image: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=600",
    isActive: true,
  },
  {
    id: "6",
    name: "Adventure Ready Pack",
    slug: "adventure-ready",
    description:
      "Prepare for outdoor adventures with energy-boosting gourmet treats and all the gear you need.",
    products: [products[3], products[1]], // Adventure + Gourmet Foodie
    originalPrice: 189.98,
    bundlePrice: 149.99,
    savingsPercentage: 21,
    image: "https://images.unsplash.com/photo-1533227268428-f9ed0900fb3b?w=600",
    isActive: true,
  },
];

// Helper functions
export const getBundleById = (id: string): Bundle | undefined =>
  bundles.find((b) => b.id === id);

export const getBundleBySlug = (slug: string): Bundle | undefined =>
  bundles.find((b) => b.slug === slug);

export const getActiveBundles = (): Bundle[] =>
  bundles.filter((b) => b.isActive);

export const getBundleSavings = (bundle: Bundle): number =>
  bundle.originalPrice - bundle.bundlePrice;
