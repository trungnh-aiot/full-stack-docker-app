"use client";

import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import Image from "next/image";
import React, { useState } from "react";

import { products } from "@/data/products";
import { Product } from "@/types";

import { Card } from "../ui/Card";
import { DraggableProduct } from "./DraggableProduct";
import { DroppableBox } from "./DroppableBox";

export function BoxBuilder() {
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    }),
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const product = products.find((p) => `product-${p.id}` === active.id);
    if (product) {
      setActiveId(active.id as string);
      setActiveProduct(product);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { over, active } = event;
    setActiveId(null);
    setActiveProduct(null);

    // If dropped over the box zone
    if (over && over.id === "box-drop-zone") {
      const product = products.find((p) => `product-${p.id}` === active.id);
      if (product) {
        // Add to box if capacity allows (e.g., max 4)
        if (selectedProducts.length < 4) {
          console.log(product);
          // For now, allow duplicates, or check if (!selectedProducts.find(p => p.id === product.id))
          // I'll allow duplicates for now as people might want 2 candles
          setSelectedProducts((prev) => [...prev, product]);
        }
      }
    }
  };
  const handleAddProduct = (product: Product) => {
    console.log(product);
    setSelectedProducts((prev) => [...prev, product]);
  };

  const handleRemoveProduct = (productId: string) => {
    // Remove the first instance of this product found in the array (to handle duplicates correctly)
    const index = selectedProducts.findIndex((p) => p.id === productId);
    if (index > -1) {
      const newProducts = [...selectedProducts];
      newProducts.splice(index, 1);
      setSelectedProducts(newProducts);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[calc(100vh-140px)]">
        {/* Left Side: Product List */}
        <div className="lg:col-span-8 overflow-y-auto pr-2 custom-scrollbar h-full">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Select Products
            </h2>
            <p className="text-gray-500">Drag and drop items into your box.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 pb-20">
            {products.map((product) => (
              <DraggableProduct
                key={product.id}
                product={product}
                handleAddProduct={handleAddProduct}
              />
            ))}
          </div>
        </div>

        {/* Right Side: The Box (Fixed on Desktop) */}
        <div className="lg:col-span-4 h-full relative z-10">
          <div className="sticky top-4 h-[calc(100%-2rem)]">
            <DroppableBox
              selectedProducts={selectedProducts}
              onRemove={handleRemoveProduct}
            />
          </div>
        </div>
      </div>

      <DragOverlay>
        {activeProduct ? (
          <div className="cursor-grabbing rotate-3 scale-105 shadow-xl rounded-xl overflow-hidden bg-white w-[200px] pointer-events-none opacity-90">
            <div className="relative aspect-square w-full">
              <Image
                src={activeProduct.images[0]}
                alt={activeProduct.name}
                fill
                className="object-cover"
              />
            </div>
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
