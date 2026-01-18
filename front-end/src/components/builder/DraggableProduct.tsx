"use client";

import { useDraggable } from "@dnd-kit/core";
import { Plus } from "lucide-react";
import Image from "next/image";
import React from "react";

import { Product } from "@/types";

import { Card } from "../ui/Card";

interface DraggableProductProps {
  product: Product;
  handleAddProduct: (product: Product) => void;
}

export function DraggableProduct({
  product,
  handleAddProduct,
}: DraggableProductProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `product-${product.id}`,
    data: product,
  });
  console.log(product);
  console.log(handleAddProduct);

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="cursor-move touch-none"
      suppressHydrationWarning
    >
      <Card className="overflow-hidden bg-white hover:shadow-lg transition-shadow border-gray-100 h-full flex flex-col">
        <div className="relative aspect-square w-full">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="p-3 flex flex-col flex-grow">
          <h4 className="font-medium text-sm text-gray-900 line-clamp-1">
            {product.name}
          </h4>
          <p className="text-xs text-gray-500 mt-1 line-clamp-2 flex-grow">
            {product.shortDescription}
          </p>
          <div className="mt-3 flex items-center justify-between">
            <span className="font-semibold text-primary">
              ${product.salePrice}
            </span>
            <button
              onClick={() => handleAddProduct(product)}
              className="p-1.5 rounded-full bg-gray-50 text-gray-600 hover:bg-primary hover:text-white transition-colors"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}
