import NextImage from "next/image";
import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glass?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
  onClick?: () => void;
}

const paddingStyles = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

export function Card({
  children,
  className = "",
  hover = true,
  glass = false,
  padding = "none",
  onClick,
}: CardProps) {
  const baseStyles = `
    rounded-2xl overflow-hidden
    ${glass ? "card-glass" : "bg-surface border border-border"}
    ${hover ? "transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-border-hover" : ""}
    ${paddingStyles[padding]}
    ${onClick ? "cursor-pointer" : ""}
  `;

  return (
    <div className={`${baseStyles} ${className}`} onClick={onClick}>
      {children}
    </div>
  );
}

// Card Header component
interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function CardHeader({ children, className = "" }: CardHeaderProps) {
  return <div className={`px-6 pt-6 pb-4 ${className}`}>{children}</div>;
}

// Card Content component
interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export function CardContent({ children, className = "" }: CardContentProps) {
  return <div className={`px-6 py-4 ${className}`}>{children}</div>;
}

// Card Footer component
interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export function CardFooter({ children, className = "" }: CardFooterProps) {
  return (
    <div className={`px-6 pb-6 pt-4 border-t border-border ${className}`}>
      {children}
    </div>
  );
}

// Product Card specific component
interface ProductCardProps {
  image: string;
  title: string;
  description?: string;
  originalPrice?: number;
  salePrice: number;
  badge?: React.ReactNode;
  onAddToCart?: () => void;
  onQuickView?: () => void;
  className?: string;
}

export function ProductCard({
  image,
  title,
  description,
  originalPrice,
  salePrice,
  badge,
  onAddToCart,
  onQuickView,
  className = "",
}: ProductCardProps) {
  const savings = originalPrice
    ? Math.round(((originalPrice - salePrice) / originalPrice) * 100)
    : 0;

  return (
    <Card className={`group ${className}`}>
      {/* Image container */}
      <div className="relative aspect-square overflow-hidden">
        <NextImage
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {badge && <div className="absolute top-3 left-3">{badge}</div>}
        {savings > 0 && (
          <div className="absolute top-3 right-3 bg-error text-white text-xs font-bold px-2 py-1 rounded-full">
            Save {savings}%
          </div>
        )}

        {/* Quick actions overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          {onQuickView && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onQuickView();
              }}
              className="bg-white text-text-primary px-4 py-2 rounded-lg font-medium hover:bg-background-secondary transition-colors"
            >
              View Contents
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-display text-lg font-semibold text-text-primary mb-2 line-clamp-2">
          {title}
        </h3>
        {description && (
          <p className="text-text-secondary text-sm mb-4 line-clamp-2">
            {description}
          </p>
        )}

        {/* Pricing */}
        <div className="flex items-center gap-2 mb-4">
          {originalPrice && (
            <span className="text-text-muted line-through text-sm">
              ${originalPrice.toFixed(2)}
            </span>
          )}
          <span className="text-primary font-bold text-xl">
            ${salePrice.toFixed(2)}
          </span>
        </div>

        {/* Add to Cart button */}
        {onAddToCart && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart();
            }}
            className="w-full bg-primary text-text-inverse py-2.5 rounded-lg font-medium hover:bg-primary-hover transition-colors cursor-pointer"
          >
            Add to Cart
          </button>
        )}
      </div>
    </Card>
  );
}
