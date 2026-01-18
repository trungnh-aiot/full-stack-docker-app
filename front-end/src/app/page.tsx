"use client";

import Link from "next/link";
import React from "react";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ProductCard } from "@/components/ui/Card";
import { SubscriptionCard } from "@/components/ui/SubscriptionCard";
import { bundles } from "@/data/bundles";
import { getBestsellers, products } from "@/data/products";
import { subscriptionPlans } from "@/data/subscriptions";

export default function HomePage() {
  const bestsellers = getBestsellers();
  const featuredBundle = bundles[0];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Add spacing for floating header */}
      <div className="pt-24">
        {/* ========== HERO SECTION ========== */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary-light via-background to-accent-light">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Hero Content */}
              <div className="animate-fade-in-up">
                <Badge variant="new" className="mb-4">
                  New Collection Available
                </Badge>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary leading-tight mb-6">
                  Where Memories
                  <span className="text-primary block">Come Alive</span>
                </h1>
                <p className="text-text-secondary text-lg md:text-xl mb-8 leading-relaxed">
                  Curated gift boxes filled with thoughtfully selected
                  treasures. Create unforgettable moments for the people you
                  love most.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/boxes">
                    <Button size="lg" variant="primary">
                      Shop Gift Boxes
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
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </Button>
                  </Link>
                  <Link href="/subscriptions">
                    <Button size="lg" variant="outline">
                      Subscribe & Save
                    </Button>
                  </Link>
                </div>

                {/* Trust indicators */}
                <div className="flex items-center gap-6 mt-8 pt-8 border-t border-border">
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-success"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-sm text-text-secondary">
                      Free Shipping $100+
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-success"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-sm text-text-secondary">
                      Handwritten Note Free
                    </span>
                  </div>
                </div>
              </div>

              {/* Hero Image */}
              <div className="relative">
                <div className="relative z-10 rounded-3xl overflow-hidden shadow-xl hover-lift">
                  <img
                    src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800"
                    alt="Beautifully curated gift box with premium items"
                    className="w-full h-auto object-cover aspect-square"
                  />
                  {/* Floating price tag */}
                  <div className="absolute bottom-6 left-6 right-6 bg-surface/95 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-text-muted">Starting from</p>
                        <p className="text-2xl font-bold text-primary">
                          $59.99
                        </p>
                      </div>
                      <Badge variant="savings">Save up to 25%</Badge>
                    </div>
                  </div>
                </div>
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent/20 rounded-full blur-2xl" />
                <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
              </div>
            </div>
          </div>
        </section>

        {/* ========== BESTSELLERS SECTION ========== */}
        <section className="py-16 md:py-24 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            {/* Section header */}
            <div className="text-center mb-12">
              <Badge variant="bestseller" className="mb-4">
                Customer Favorites
              </Badge>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-4">
                Best Selling Gift Boxes
              </h2>
              <p className="text-text-secondary text-lg max-w-2xl mx-auto">
                Our most loved curated boxes, treasured by thousands of happy
                gift recipients.
              </p>
            </div>

            {/* Product grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {bestsellers.slice(0, 4).map((product) => (
                <ProductCard
                  key={product.id}
                  image={product.images[0]}
                  title={product.name}
                  description={product.shortDescription}
                  originalPrice={product.originalPrice}
                  salePrice={product.salePrice}
                  badge={
                    product.isBestseller ? (
                      <Badge variant="bestseller">Bestseller</Badge>
                    ) : product.isNew ? (
                      <Badge variant="new">New</Badge>
                    ) : undefined
                  }
                  onAddToCart={() => console.log("Add to cart:", product.id)}
                  onQuickView={() => console.log("Quick view:", product.id)}
                />
              ))}
            </div>

            {/* View all link */}
            <div className="text-center mt-10">
              <Link href="/boxes">
                <Button variant="outline" size="lg">
                  View All Gift Boxes
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
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* ========== BUNDLE & SAVE SECTION ========== */}
        <section className="py-16 md:py-24 bg-background-secondary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Content */}
              <div>
                <Badge variant="savings" className="mb-4">
                  Bundle & Save
                </Badge>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-6">
                  Incredible Value,
                  <span className="text-primary"> Amazing Savings</span>
                </h2>
                <p className="text-text-secondary text-lg mb-6 leading-relaxed">
                  Combine your favorite boxes and save up to 25%. Our curated
                  bundles offer premium products at unbeatable prices. More joy,
                  less cost.
                </p>

                {/* Featured bundle details */}
                <div className="bg-surface rounded-2xl p-6 border border-border mb-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-display text-xl font-semibold text-text-primary">
                        {featuredBundle.name}
                      </h3>
                      <p className="text-text-secondary text-sm mt-1">
                        {featuredBundle.description}
                      </p>
                    </div>
                    <Badge variant="sale">
                      Save {featuredBundle.savingsPercentage}%
                    </Badge>
                  </div>
                  <div className="flex items-baseline gap-3">
                    <span className="text-text-muted line-through text-lg">
                      ${featuredBundle.originalPrice.toFixed(2)}
                    </span>
                    <span className="text-primary font-bold text-3xl">
                      ${featuredBundle.bundlePrice.toFixed(2)}
                    </span>
                  </div>
                </div>

                <Link href="/bundles">
                  <Button size="lg" variant="primary">
                    Shop All Bundles
                  </Button>
                </Link>
              </div>

              {/* Bundle image grid */}
              <div className="grid grid-cols-2 gap-4">
                {bundles.slice(0, 4).map((bundle, idx) => (
                  <Link
                    key={bundle.id}
                    href={`/bundles/${bundle.slug}`}
                    className={`
                      relative group rounded-2xl overflow-hidden shadow-md hover-lift cursor-pointer
                      ${idx === 0 ? "col-span-2" : ""}
                    `}
                  >
                    <img
                      src={bundle.image}
                      alt={bundle.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="text-white font-semibold truncate">
                        {bundle.name}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-white/80 text-sm line-through">
                          ${bundle.originalPrice.toFixed(2)}
                        </span>
                        <span className="text-accent font-bold">
                          ${bundle.bundlePrice.toFixed(2)}
                        </span>
                      </div>
                    </div>
                    <div className="absolute top-3 right-3">
                      <Badge variant="sale">
                        Save {bundle.savingsPercentage}%
                      </Badge>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ========== SUBSCRIPTION SECTION ========== */}
        <section className="py-16 md:py-24 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            {/* Section header */}
            <div className="text-center mb-12">
              <Badge variant="value" className="mb-4">
                Subscribe & Save
              </Badge>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-4">
                Monthly Surprise Boxes
              </h2>
              <p className="text-text-secondary text-lg max-w-2xl mx-auto">
                Subscribe to receive curated gift boxes delivered to your door.
                Save more with longer prepay plans.
              </p>
            </div>

            {/* Subscription cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {subscriptionPlans.map((plan) => (
                <SubscriptionCard
                  key={plan.id}
                  plan={plan}
                  onSelect={(planId) => console.log("Selected plan:", planId)}
                />
              ))}
            </div>

            {/* Subscription benefits */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                    />
                  ),
                  title: "Exclusive Items",
                  desc: "Subscribers get access to limited-edition products not available elsewhere.",
                },
                {
                  icon: (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                    />
                  ),
                  title: "Free Shipping",
                  desc: "All subscription boxes ship free, no matter the price or destination.",
                },
                {
                  icon: (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  ),
                  title: "Cancel Anytime",
                  desc: "No commitment. Pause or cancel your subscription whenever you want.",
                },
              ].map((benefit, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-4 p-6 bg-surface rounded-2xl border border-border"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-6 h-6 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      {benefit.icon}
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary mb-1">
                      {benefit.title}
                    </h3>
                    <p className="text-text-secondary text-sm">
                      {benefit.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========== OCCASIONS SECTION ========== */}
        <section className="py-16 md:py-24 bg-background-secondary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-4">
                Perfect for Every Occasion
              </h2>
              <p className="text-text-secondary text-lg max-w-2xl mx-auto">
                Find the ideal gift box for birthdays, anniversaries,
                thank-yous, and more.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                {
                  name: "Birthday",
                  emoji: "🎂",
                  color: "bg-pink-100",
                  href: "/occasions/birthday",
                },
                {
                  name: "Thank You",
                  emoji: "💝",
                  color: "bg-red-100",
                  href: "/occasions/thank-you",
                },
                {
                  name: "Anniversary",
                  emoji: "💍",
                  color: "bg-purple-100",
                  href: "/occasions/anniversary",
                },
                {
                  name: "Get Well",
                  emoji: "🌷",
                  color: "bg-green-100",
                  href: "/occasions/get-well",
                },
                {
                  name: "New Baby",
                  emoji: "👶",
                  color: "bg-blue-100",
                  href: "/occasions/baby",
                },
                {
                  name: "Just Because",
                  emoji: "✨",
                  color: "bg-yellow-100",
                  href: "/occasions/just-because",
                },
              ].map((occasion) => (
                <Link
                  key={occasion.name}
                  href={occasion.href}
                  className={`
                    ${occasion.color} rounded-2xl p-6 text-center 
                    hover:-translate-y-2 hover:shadow-lg transition-all duration-300 cursor-pointer
                  `}
                >
                  <span className="text-4xl block mb-3">{occasion.emoji}</span>
                  <span className="font-semibold text-text-primary">
                    {occasion.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ========== TESTIMONIALS SECTION ========== */}
        <section className="py-16 md:py-24 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-4">
                Loved by Thousands
              </h2>
              <p className="text-text-secondary text-lg">
                See what our customers are saying about their gift experiences.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  name: "Sarah M.",
                  rating: 5,
                  text: "The Cozy Night In box was absolutely perfect! Such incredible value for the quality of items. My mom cried happy tears. 💕",
                  product: "Cozy Night In Gift Box",
                },
                {
                  name: "Michael R.",
                  rating: 5,
                  text: "Subscribed to the quarterly plan and it's been amazing. The savings are real and each box feels so thoughtfully curated.",
                  product: "3-Month Subscription",
                },
                {
                  name: "Emily T.",
                  rating: 5,
                  text: "The bundle deal saved me so much money! Got two premium boxes for the price of one and a half. Will definitely order again.",
                  product: "Ultimate Relaxation Bundle",
                },
              ].map((review, idx) => (
                <div
                  key={idx}
                  className="bg-surface rounded-2xl p-6 border border-border hover-lift"
                >
                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <svg
                        key={i}
                        className="w-5 h-5 text-accent"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-text-secondary mb-4 leading-relaxed">
                    &ldquo;{review.text}&rdquo;
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-text-primary">
                      {review.name}
                    </span>
                    <span className="text-xs text-text-muted bg-background-secondary px-2 py-1 rounded">
                      {review.product}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========== CTA SECTION ========== */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-primary to-primary-hover">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Create Memories?
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Browse our curated collection and find the perfect gift box for
              someone special. Free gift wrapping and handwritten notes on every
              order.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/boxes">
                <Button
                  size="lg"
                  className="bg-white text-primary hover:bg-white/90"
                >
                  Shop Gift Boxes
                </Button>
              </Link>
              <Link href="/subscriptions">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10"
                >
                  Subscribe & Save
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
