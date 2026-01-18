"use client";

import { useDroppable } from "@dnd-kit/core";
import { Package, Trash2 } from "lucide-react";
import Image from "next/image";
import React from "react";

import { Product } from "@/types";

import { Button } from "../ui/Button";

interface DroppableBoxProps {
  selectedProducts: Product[];
  onRemove: (productId: string) => void;
  maxCapacity?: number;
}

export function DroppableBox({
  selectedProducts,
  onRemove,
  maxCapacity = 4, // Assuming a standard box size holds 4 items for now
}: DroppableBoxProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: "box-drop-zone",
  });

  const totalPrice = selectedProducts.reduce((sum, p) => sum + p.salePrice, 0);

  const capacityPercentage = (selectedProducts.length / maxCapacity) * 100;

  return (
    <div className="h-full flex flex-col">
      <div
        ref={setNodeRef}
        className={`flex-grow border-2 border-dashed rounded-xl transition-all duration-200 flex flex-col p-4 ${
          isOver
            ? "border-primary bg-primary/5 scale-[1.01]"
            : "border-gray-200 bg-gray-50/50 hover:border-gray-300"
        }`}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-white rounded-lg shadow-sm">
              <Package className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Your Box</h3>
              <p className="text-xs text-gray-500">
                {selectedProducts.length} / {maxCapacity} items
              </p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-sm text-gray-500">Total Value</span>
            <div className="text-lg font-bold text-gray-900">
              ${totalPrice.toFixed(2)}
            </div>
          </div>
        </div>

        {/* Capacity Bar */}
        <div className="w-full h-1.5 bg-gray-200 rounded-full mb-6 overflow-hidden">
          <div
            className={`h-full transition-all duration-300 ${
              selectedProducts.length >= maxCapacity
                ? "bg-red-500"
                : "bg-primary"
            }`}
            style={{ width: `${Math.min(capacityPercentage, 100)}%` }}
          />
        </div>

        <div className="flex-grow space-y-3 overflow-y-auto pr-2 custom-scrollbar">
          {selectedProducts.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-8 text-gray-400">
              <Package className="w-12 h-12 mb-3 opacity-20" />
              <p className="font-medium mb-1">Your box is empty</p>
              <p className="text-sm">
                Drag products here to start building your gift
              </p>
            </div>
          ) : (
            selectedProducts.map((product, index) => (
              <div
                key={`${product.id}-${index}`}
                className="group flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-all animate-in fade-in slide-in-from-bottom-2"
              >
                <div className="relative w-12 h-12 rounded-md overflow-hidden bg-gray-50 flex-shrink-0">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-grow min-w-0">
                  <h5 className="font-medium text-sm text-gray-900 truncate">
                    {product.name}
                  </h5>
                  <p className="text-xs text-gray-500">${product.salePrice}</p>
                </div>
                <button
                  onClick={() => onRemove(product.id)}
                  className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors opacity-0 group-hover:opacity-100"
                  title="Remove item"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))
          )}
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100">
          <Button
            className="w-full"
            disabled={selectedProducts.length === 0}
            variant={selectedProducts.length === 0 ? "outline" : "primary"}
          >
            {selectedProducts.length === 0
              ? "Add Items to Continue"
              : `Add to Cart - $${totalPrice.toFixed(2)}`}
          </Button>
        </div>
      </div>
    </div>
  );
}
