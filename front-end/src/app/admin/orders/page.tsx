"use client";

import React, { useState } from "react";

import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

// Mock orders data
const mockOrders = [
  {
    id: "ORD-2024-001",
    customer: { name: "Sarah Johnson", email: "sarah@email.com" },
    items: [{ name: "Cozy Night In Gift Box", quantity: 1, price: 89.99 }],
    total: 89.99,
    status: "processing",
    isGift: true,
    giftMessage: "Happy Birthday Mom! Love you so much 💕",
    hidePrice: true,
    giftWrap: true,
    shippingAddress: "123 Main St, New York, NY 10001",
    createdAt: "2024-01-17T10:30:00Z",
  },
  {
    id: "ORD-2024-002",
    customer: { name: "Michael Chen", email: "michael@email.com" },
    items: [
      { name: "Gourmet Foodie Delight", quantity: 1, price: 119.99 },
      { name: "Coffee Connoisseur Collection", quantity: 1, price: 74.99 },
    ],
    total: 194.98,
    status: "shipped",
    isGift: false,
    shippingAddress: "456 Oak Ave, Los Angeles, CA 90001",
    trackingNumber: "1Z999AA10123456784",
    createdAt: "2024-01-16T14:22:00Z",
  },
  {
    id: "ORD-2024-003",
    customer: { name: "Emily Davis", email: "emily@email.com" },
    items: [{ name: "Self-Care Sanctuary", quantity: 2, price: 79.99 }],
    total: 159.98,
    status: "pending",
    isGift: true,
    giftMessage: "Thinking of you! Take care of yourself.",
    hidePrice: true,
    giftWrap: false,
    shippingAddress: "789 Pine Rd, Chicago, IL 60601",
    createdAt: "2024-01-16T09:15:00Z",
  },
  {
    id: "ORD-2024-004",
    customer: { name: "James Wilson", email: "james@email.com" },
    items: [{ name: "Adventure Awaits Box", quantity: 1, price: 69.99 }],
    total: 69.99,
    status: "delivered",
    isGift: false,
    shippingAddress: "321 Elm Blvd, Seattle, WA 98101",
    deliveredAt: "2024-01-15T16:45:00Z",
    createdAt: "2024-01-12T11:00:00Z",
  },
  {
    id: "ORD-2024-005",
    customer: { name: "Amanda Lee", email: "amanda@email.com" },
    items: [{ name: "Book Lover's Paradise", quantity: 1, price: 64.99 }],
    total: 64.99,
    status: "cancelled",
    isGift: false,
    shippingAddress: "654 Maple Dr, Austin, TX 78701",
    cancelledAt: "2024-01-14T08:30:00Z",
    createdAt: "2024-01-13T15:20:00Z",
  },
];

const statusColors: Record<string, string> = {
  pending: "bg-warning/20 text-warning",
  processing: "bg-primary/20 text-primary",
  shipped: "bg-accent/20 text-accent",
  delivered: "bg-success/20 text-success",
  cancelled: "bg-error/20 text-error",
};

type OrderStatus =
  | "all"
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export default function AdminOrdersPage() {
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus>("all");
  const [selectedOrder, setSelectedOrder] = useState<
    (typeof mockOrders)[0] | null
  >(null);

  const filteredOrders =
    selectedStatus === "all"
      ? mockOrders
      : mockOrders.filter((o) => o.status === selectedStatus);

  const statusCounts = {
    all: mockOrders.length,
    pending: mockOrders.filter((o) => o.status === "pending").length,
    processing: mockOrders.filter((o) => o.status === "processing").length,
    shipped: mockOrders.filter((o) => o.status === "shipped").length,
    delivered: mockOrders.filter((o) => o.status === "delivered").length,
    cancelled: mockOrders.filter((o) => o.status === "cancelled").length,
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="font-display text-2xl font-bold text-text-primary">
          Orders
        </h1>
        <p className="text-text-secondary">
          Manage and track all customer orders
        </p>
      </div>

      {/* Status Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {(Object.keys(statusCounts) as OrderStatus[]).map((status) => (
          <button
            key={status}
            onClick={() => setSelectedStatus(status)}
            className={`
              px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-colors cursor-pointer
              ${selectedStatus === status ? "bg-primary text-white" : "bg-surface border border-border hover:bg-background-secondary"}
            `}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
            <span className="ml-2 px-1.5 py-0.5 bg-white/20 rounded text-xs">
              {statusCounts[status]}
            </span>
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Orders List */}
        <div className="lg:col-span-2">
          <Card>
            <div className="divide-y divide-border">
              {filteredOrders.map((order) => (
                <div
                  key={order.id}
                  onClick={() => setSelectedOrder(order)}
                  className={`
                    p-4 cursor-pointer hover:bg-background-secondary/50 transition-colors
                    ${selectedOrder?.id === order.id ? "bg-primary/5" : ""}
                  `}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-text-primary">
                          {order.id}
                        </span>
                        {order.isGift && (
                          <span className="text-primary">
                            <svg
                              className="w-4 h-4"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M10 3.5a1.5 1.5 0 013 0V4a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-.5a1.5 1.5 0 000 3h.5a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-.5a1.5 1.5 0 00-3 0v.5a1 1 0 01-1 1H6a1 1 0 01-1-1v-3a1 1 0 00-1-1h-.5a1.5 1.5 0 010-3H4a1 1 0 001-1V6a1 1 0 011-1h3a1 1 0 001-1v-.5z" />
                            </svg>
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-text-secondary">
                        {order.customer.name}
                      </p>
                    </div>
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${statusColors[order.status]}`}
                    >
                      {order.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-text-muted">
                      {order.items.length} item
                      {order.items.length > 1 ? "s" : ""}
                    </span>
                    <span className="font-semibold text-text-primary">
                      ${order.total.toFixed(2)}
                    </span>
                  </div>
                  <p className="text-xs text-text-muted mt-2">
                    {new Date(order.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Order Details */}
        <div>
          {selectedOrder ? (
            <Card padding="md" className="sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display text-lg font-semibold">
                  {selectedOrder.id}
                </h2>
                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${statusColors[selectedOrder.status]}`}
                >
                  {selectedOrder.status}
                </span>
              </div>

              {/* Customer */}
              <div className="mb-4 pb-4 border-b border-border">
                <h3 className="text-sm font-semibold text-text-secondary mb-2">
                  Customer
                </h3>
                <p className="font-medium text-text-primary">
                  {selectedOrder.customer.name}
                </p>
                <p className="text-sm text-text-muted">
                  {selectedOrder.customer.email}
                </p>
              </div>

              {/* Items */}
              <div className="mb-4 pb-4 border-b border-border">
                <h3 className="text-sm font-semibold text-text-secondary mb-2">
                  Items
                </h3>
                {selectedOrder.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-sm py-1">
                    <span>
                      {item.name} x{item.quantity}
                    </span>
                    <span className="font-medium">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
                <div className="flex justify-between font-semibold mt-2 pt-2 border-t border-border">
                  <span>Total</span>
                  <span>${selectedOrder.total.toFixed(2)}</span>
                </div>
              </div>

              {/* Gift Options */}
              {selectedOrder.isGift && (
                <div className="mb-4 pb-4 border-b border-border">
                  <h3 className="text-sm font-semibold text-text-secondary mb-2">
                    Gift Options
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <svg
                        className="w-4 h-4 text-success"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>Gift Order</span>
                    </div>
                    {selectedOrder.giftWrap && (
                      <div className="flex items-center gap-2">
                        <svg
                          className="w-4 h-4 text-success"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>Gift Wrapped</span>
                      </div>
                    )}
                    {selectedOrder.hidePrice && (
                      <div className="flex items-center gap-2">
                        <svg
                          className="w-4 h-4 text-success"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>Price Hidden</span>
                      </div>
                    )}
                    {selectedOrder.giftMessage && (
                      <div className="mt-2 p-3 bg-background-secondary rounded-lg">
                        <p className="text-xs text-text-muted mb-1">
                          Gift Message:
                        </p>
                        <p className="text-sm italic">
                          &ldquo;{selectedOrder.giftMessage}&rdquo;
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Shipping */}
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-text-secondary mb-2">
                  Shipping Address
                </h3>
                <p className="text-sm text-text-primary">
                  {selectedOrder.shippingAddress}
                </p>
                {selectedOrder.trackingNumber && (
                  <p className="text-sm text-primary mt-2">
                    Tracking: {selectedOrder.trackingNumber}
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                {selectedOrder.status === "pending" && (
                  <button className="flex-1 bg-primary text-white py-2 rounded-lg font-medium hover:bg-primary-hover cursor-pointer">
                    Process Order
                  </button>
                )}
                {selectedOrder.status === "processing" && (
                  <button className="flex-1 bg-primary text-white py-2 rounded-lg font-medium hover:bg-primary-hover cursor-pointer">
                    Mark Shipped
                  </button>
                )}
                {selectedOrder.status === "shipped" && (
                  <button className="flex-1 bg-success text-white py-2 rounded-lg font-medium hover:bg-success/90 cursor-pointer">
                    Mark Delivered
                  </button>
                )}
                <button className="px-4 py-2 border border-border rounded-lg hover:bg-background-secondary cursor-pointer">
                  Print
                </button>
              </div>
            </Card>
          ) : (
            <Card padding="md" className="text-center py-12">
              <svg
                className="w-12 h-12 text-text-muted mx-auto mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              <p className="text-text-secondary">
                Select an order to view details
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
