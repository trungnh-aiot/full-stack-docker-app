"use client";

import React, { useMemo, useState } from "react";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Badge } from "@/components/ui/Badge";
import { ProductCard } from "@/components/ui/Card";
import type {
  FilterGroup,
  PriceRange,
  SortOption,
} from "@/components/ui/FilterSidebar";
import { FilterSidebar, SortDropdown } from "@/components/ui/FilterSidebar";
import { categories, occasions, products, recipients } from "@/data/products";

const sortOptions: SortOption[] = [
  { id: "bestseller", label: "Best Sellers" },
  { id: "price-asc", label: "Price: Low to High" },
  { id: "price-desc", label: "Price: High to Low" },
  { id: "newest", label: "Newest First" },
  { id: "rating", label: "Top Rated" },
];

const filterGroups: FilterGroup[] = [
  {
    id: "occasion",
    label: "Occasion",
    type: "checkbox",
    options: occasions.map((o) => ({
      id: o,
      label: o
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" "),
      count: products.filter((p) => p.occasion.includes(o)).length,
    })),
  },
  {
    id: "recipient",
    label: "Recipient",
    type: "checkbox",
    options: recipients.map((r) => ({
      id: r,
      label: r
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" "),
      count: products.filter((p) => p.recipient.includes(r)).length,
    })),
  },
  {
    id: "category",
    label: "Category",
    type: "checkbox",
    options: categories.map((c) => ({
      id: c,
      label: c
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" "),
      count: products.filter((p) => p.category === c).length,
    })),
  },
];

export default function BoxesPage() {
  const [priceRange, setPriceRange] = useState<PriceRange>({
    min: 0,
    max: 200,
  });
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string[]>
  >({
    occasion: [],
    recipient: [],
    category: [],
  });
  const [sortBy, setSortBy] = useState("bestseller");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const handleFilterChange = (
    groupId: string,
    optionId: string,
    checked: boolean,
  ) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [groupId]: checked
        ? [...prev[groupId], optionId]
        : prev[groupId].filter((id) => id !== optionId),
    }));
  };

  const handleClearAll = () => {
    setSelectedFilters({ occasion: [], recipient: [], category: [] });
    setPriceRange({ min: 0, max: 200 });
  };

  const filteredProducts = useMemo(() => {
    const result = products.filter((p) => {
      // Price filter
      if (p.salePrice < priceRange.min || p.salePrice > priceRange.max) {
        return false;
      }
      // Occasion filter
      if (
        selectedFilters.occasion.length > 0 &&
        !selectedFilters.occasion.some((o) => p.occasion.includes(o))
      ) {
        return false;
      }
      // Recipient filter
      if (
        selectedFilters.recipient.length > 0 &&
        !selectedFilters.recipient.some((r) => p.recipient.includes(r))
      ) {
        return false;
      }
      // Category filter
      if (
        selectedFilters.category.length > 0 &&
        !selectedFilters.category.includes(p.category)
      ) {
        return false;
      }
      return true;
    });

    // Sort
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.salePrice - b.salePrice);
        break;
      case "price-desc":
        result.sort((a, b) => b.salePrice - a.salePrice);
        break;
      case "newest":
        result.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "bestseller":
      default:
        result.sort(
          (a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0),
        );
        break;
    }

    return result;
  }, [priceRange, selectedFilters, sortBy]);

  const activeFilterCount =
    Object.values(selectedFilters).flat().length +
    (priceRange.min > 0 || priceRange.max < 200 ? 1 : 0);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="pt-24">
        {/* Page Header */}
        <div className="bg-gradient-to-br from-primary-light via-background to-accent-light py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <nav className="flex items-center gap-2 text-sm text-text-muted mb-4">
              <a href="/" className="hover:text-primary">
                Home
              </a>
              <span>/</span>
              <span className="text-text-primary">Gift Boxes</span>
            </nav>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-4">
              All Gift Boxes
            </h1>
            <p className="text-text-secondary text-lg max-w-2xl">
              Browse our curated collection of thoughtfully designed gift boxes.
              Filter by occasion, recipient, or budget to find the perfect gift.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex gap-8">
            {/* Sidebar - Desktop */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <FilterSidebar
                priceRange={priceRange}
                onPriceChange={setPriceRange}
                filterGroups={filterGroups}
                selectedFilters={selectedFilters}
                onFilterChange={handleFilterChange}
                onClearAll={handleClearAll}
              />
            </aside>

            {/* Product Grid */}
            <div className="flex-1">
              {/* Toolbar */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  {/* Mobile filter button */}
                  <button
                    onClick={() => setShowMobileFilters(true)}
                    className="lg:hidden flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-background-secondary transition-colors cursor-pointer"
                  >
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
                        d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                      />
                    </svg>
                    Filters
                    {activeFilterCount > 0 && (
                      <Badge variant="sale">{activeFilterCount}</Badge>
                    )}
                  </button>

                  <span className="text-text-secondary text-sm">
                    {filteredProducts.length} products
                  </span>
                </div>

                <SortDropdown
                  options={sortOptions}
                  selected={sortBy}
                  onChange={setSortBy}
                />
              </div>

              {/* Products */}
              {filteredProducts.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-20 h-20 bg-background-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-10 h-10 text-text-muted"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="font-display text-xl font-semibold text-text-primary mb-2">
                    No products found
                  </h3>
                  <p className="text-text-secondary mb-4">
                    Try adjusting your filters to find what you&apos;re looking
                    for.
                  </p>
                  <button
                    onClick={handleClearAll}
                    className="text-primary font-medium hover:underline cursor-pointer"
                  >
                    Clear all filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
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
                      onAddToCart={() =>
                        console.log("Add to cart:", product.id)
                      }
                      onQuickView={() => {
                        window.location.href = `/boxes/${product.slug}`;
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Filter Modal */}
        {showMobileFilters && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => setShowMobileFilters(false)}
            />
            <div className="absolute right-0 top-0 bottom-0 w-80 bg-surface shadow-xl p-6 overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-xl font-semibold">Filters</h2>
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="p-2 hover:bg-background-secondary rounded-lg cursor-pointer"
                >
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <FilterSidebar
                priceRange={priceRange}
                onPriceChange={setPriceRange}
                filterGroups={filterGroups}
                selectedFilters={selectedFilters}
                onFilterChange={handleFilterChange}
                onClearAll={handleClearAll}
              />
              <button
                onClick={() => setShowMobileFilters(false)}
                className="w-full mt-6 bg-primary text-white py-3 rounded-xl font-semibold cursor-pointer"
              >
                Apply Filters ({filteredProducts.length} products)
              </button>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
