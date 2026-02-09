// Product Types
export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  originalPrice: number;
  salePrice: number;
  images: string[];
  category: string;
  occasion: string[];
  recipient: string[];
  tags: string[];
  contents: ProductContent[];
  totalValue: number;
  inStock: boolean;
  stockCount: number;
  rating: number;
  reviewCount: number;
  isBestseller: boolean;
  isNew: boolean;
  createdAt: string;
}

export interface ProductContent {
  name: string;
  description?: string;
  value: number;
  quantity: number;
}

// Bundle Types
export interface Bundle {
  id: string;
  name: string;
  slug: string;
  description: string;
  products: Product[];
  originalPrice: number;
  bundlePrice: number;
  savingsPercentage: number;
  image: string;
  isActive: boolean;
  validUntil?: string;
}

// Subscription Types
export interface SubscriptionPlan {
  id: string;
  name: string;
  months: number;
  pricePerBox: number;
  originalPricePerBox: number;
  features: string[];
  tier?: "popular" | "value";
  isActive: boolean;
}

export interface Subscription {
  id: string;
  userId: string;
  planId: string;
  plan: SubscriptionPlan;
  status: "active" | "paused" | "cancelled" | "expired";
  startDate: string;
  nextBillingDate: string;
  endDate?: string;
}

// Cart Types
export interface CartItem {
  productId: string;
  product: Product;
  quantity: number;
  isGift: boolean;
  giftMessage?: string;
  hidePrice: boolean;
  giftWrap: boolean;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  shippingCost: number;
  giftWrapTotal: number;
  discount: number;
  total: number;
}

// Order Types
export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  shippingAddress: Address;
  billingAddress: Address;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  paymentStatus: "pending" | "paid" | "refunded";
  subtotal: number;
  shippingCost: number;
  discount: number;
  total: number;
  trackingNumber?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Address {
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone?: string;
}

// User Types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: "customer" | "admin";
  avatar?: string;
  createdAt: string;
}

// Filter Types
export interface ProductFilters {
  priceMin?: number;
  priceMax?: number;
  categories?: string[];
  occasions?: string[];
  recipients?: string[];
  inStock?: boolean;
  sortBy?: "price-asc" | "price-desc" | "newest" | "bestseller" | "rating";
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Digital Gift Types
export interface QuizConfig {
  question: string;
  answer: string;
}

export interface MemoryElement {
  id: string;
  type: "text" | "image" | "sticker";
  content: string;
  position: { x: number; y: number };
  size?: { width: number; height: number };
  style?: Record<string, string | number>;
  rotation?: number;
}

export interface MemoryConfig {
  images: string[];
  message: string;
  theme: "romantic" | "fun" | "simple";
  music?: string;
  elements?: MemoryElement[];
  bgImage?: string;
}

export interface DigitalGift {
  id: string;
  quiz: QuizConfig;
  memory: MemoryConfig;
  createdAt: string;
}

export enum MemoryBuilderType {
  QUIZZ = "quiz",
  MEMORY = "memory",
  FINISH = "finish"
}