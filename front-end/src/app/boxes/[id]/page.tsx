"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useState } from "react";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, ProductCard } from "@/components/ui/Card";
import { GiftOptionsPanel } from "@/components/ui/GiftOptionsPanel";
import { PriceDisplay, ValueCallout } from "@/components/ui/PriceDisplay";
import { SubscriptionCard } from "@/components/ui/SubscriptionCard";
import { getProductBySlug, products } from "@/data/products";
import { subscriptionPlans } from "@/data/subscriptions";

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params?.id as string;
  const product = getProductBySlug(slug);

  const [selectedImage, setSelectedImage] = useState(0);
  const [purchaseType, setPurchaseType] = useState<"one-time" | "subscription">(
    "one-time",
  );
  const [selectedPlan, setSelectedPlan] = useState("quarterly");
  const [quantity, setQuantity] = useState(1);
  const [showContents, setShowContents] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-24 flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="font-display text-2xl font-bold text-text-primary mb-4">
              Product Not Found
            </h1>
            <p className="text-text-secondary mb-6">
              The gift box you&apos;re looking for doesn&apos;t exist.
            </p>
            <Link href="/boxes">
              <Button variant="primary">Browse All Gift Boxes</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const relatedProducts = products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  const savings = Math.round(
    ((product.originalPrice - product.salePrice) / product.originalPrice) * 100,
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="pt-24">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <nav className="flex items-center gap-2 text-sm text-text-muted">
            <Link href="/" className="hover:text-primary">
              Home
            </Link>
            <span>/</span>
            <Link href="/boxes" className="hover:text-primary">
              Gift Boxes
            </Link>
            <span>/</span>
            <span className="text-text-primary">{product.name}</span>
          </nav>
        </div>

        {/* Main Product Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative aspect-square rounded-3xl overflow-hidden bg-background-secondary">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {savings > 0 && (
                  <div className="absolute top-4 left-4">
                    <Badge variant="sale">Save {savings}%</Badge>
                  </div>
                )}
                {product.isBestseller && (
                  <div className="absolute top-4 right-4">
                    <Badge variant="bestseller">Bestseller</Badge>
                  </div>
                )}
              </div>

              {/* Thumbnail Gallery */}
              {product.images.length > 1 && (
                <div className="flex gap-3">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`
                        w-20 h-20 rounded-xl overflow-hidden border-2 transition-colors cursor-pointer
                        ${selectedImage === idx ? "border-primary" : "border-transparent hover:border-border-hover"}
                      `}
                    >
                      <img
                        src={img}
                        alt={`${product.name} view ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div>
              {/* Title & Rating */}
              <div className="mb-6">
                <h1 className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-3">
                  {product.name}
                </h1>
                <div className="flex items-center gap-4">
                  {/* Rating */}
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${i < Math.floor(product.rating) ? "text-accent" : "text-border"}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="text-text-secondary text-sm ml-2">
                      {product.rating} ({product.reviewCount} reviews)
                    </span>
                  </div>
                </div>
              </div>

              {/* Price */}
              <div className="mb-6">
                <PriceDisplay
                  originalPrice={product.originalPrice}
                  salePrice={product.salePrice}
                  size="lg"
                />
              </div>

              {/* Value callout */}
              <div className="mb-6">
                <ValueCallout value={product.totalValue} />
              </div>

              {/* Description */}
              <p className="text-text-secondary leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Purchase Type Toggle */}
              <div className="mb-6">
                <div className="flex gap-3 p-1 bg-background-secondary rounded-xl">
                  <button
                    onClick={() => setPurchaseType("one-time")}
                    className={`
                      flex-1 py-3 rounded-lg font-medium transition-all cursor-pointer
                      ${purchaseType === "one-time" ? "bg-surface shadow text-primary" : "text-text-secondary hover:text-text-primary"}
                    `}
                  >
                    One-Time Purchase
                  </button>
                  <button
                    onClick={() => setPurchaseType("subscription")}
                    className={`
                      flex-1 py-3 rounded-lg font-medium transition-all cursor-pointer
                      ${purchaseType === "subscription" ? "bg-surface shadow text-primary" : "text-text-secondary hover:text-text-primary"}
                    `}
                  >
                    Subscribe & Save
                  </button>
                </div>
              </div>

              {/* Subscription Options */}
              {purchaseType === "subscription" && (
                <div className="mb-6 p-4 bg-background-secondary rounded-2xl">
                  <h3 className="font-semibold text-text-primary mb-4">
                    Choose Your Plan
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {subscriptionPlans.slice(0, 4).map((plan) => (
                      <button
                        key={plan.id}
                        onClick={() => setSelectedPlan(plan.id)}
                        className={`
                          p-3 rounded-xl border-2 text-left transition-all cursor-pointer
                          ${selectedPlan === plan.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}
                        `}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">
                            {plan.name}
                          </span>
                          {plan.tier && (
                            <span className="text-xs bg-accent/20 text-accent-hover px-2 py-0.5 rounded">
                              {plan.tier === "popular"
                                ? "Popular"
                                : "Best Value"}
                            </span>
                          )}
                        </div>
                        <div className="text-primary font-bold">
                          ${plan.pricePerBox}/box
                        </div>
                        {plan.originalPricePerBox > plan.pricePerBox && (
                          <div className="text-xs text-success">
                            Save $
                            {(
                              plan.originalPricePerBox - plan.pricePerBox
                            ).toFixed(2)}
                            /box
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              {purchaseType === "one-time" && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Quantity
                  </label>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 border border-border rounded-lg flex items-center justify-center hover:bg-background-secondary cursor-pointer"
                    >
                      -
                    </button>
                    <span className="w-12 text-center font-semibold">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 border border-border rounded-lg flex items-center justify-center hover:bg-background-secondary cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>
              )}

              {/* Add to Cart */}
              <div className="flex gap-4 mb-6">
                <Button size="lg" variant="primary" className="flex-1">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                  Add to Cart
                </Button>
                <Button size="lg" variant="outline">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </Button>
              </div>

              {/* Gift Options */}
              <GiftOptionsPanel className="mb-6" />

              {/* Trust badges */}
              <div className="flex flex-wrap gap-4 text-sm text-text-secondary">
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-success"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                    />
                  </svg>
                  Free Shipping $100+
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-success"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Quality Guarantee
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* What's Inside Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <h2 className="font-display text-2xl font-bold text-text-primary mb-6">
            What&apos;s Inside
          </h2>
          <Card padding="md" hover={false}>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {product.contents.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-4 p-4 bg-background-secondary rounded-xl"
                >
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-5 h-5 text-primary"
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
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-text-primary">
                        {item.name}
                      </h4>
                      <span className="text-sm text-accent font-semibold">
                        ${item.value}
                      </span>
                    </div>
                    {item.description && (
                      <p className="text-sm text-text-muted mt-1">
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t border-border flex items-center justify-between">
              <span className="text-text-secondary">Total Retail Value</span>
              <span className="text-2xl font-bold text-accent">
                ${product.totalValue}+
              </span>
            </div>
          </Card>
        </section>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
            <h2 className="font-display text-2xl font-bold text-text-primary mb-6">
              You May Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard
                  key={p.id}
                  image={p.images[0]}
                  title={p.name}
                  description={p.shortDescription}
                  originalPrice={p.originalPrice}
                  salePrice={p.salePrice}
                  onAddToCart={() => console.log("Add to cart:", p.id)}
                  onQuickView={() => {
                    window.location.href = `/boxes/${p.slug}`;
                  }}
                />
              ))}
            </div>
          </section>
        )}
      </div>

      <Footer />
    </div>
  );
}
