import Link from "next/link";
import React from "react";

import { Badge } from "@/components/ui/Badge";
import { Card, CardContent } from "@/components/ui/Card";
import { bundles } from "@/data/bundles";
import { products } from "@/data/products";
import { subscriptionPlans } from "@/data/subscriptions";

// Mock stats data
const stats = [
  {
    label: "Today's Revenue",
    value: "$2,847",
    change: "+12.5%",
    trend: "up",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    ),
    color: "text-success",
    bg: "bg-success/10",
  },
  {
    label: "Active Subscriptions",
    value: "1,284",
    change: "+8.2%",
    trend: "up",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
      />
    ),
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    label: "Pending Orders",
    value: "47",
    change: "-3.1%",
    trend: "down",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
      />
    ),
    color: "text-accent",
    bg: "bg-accent/10",
  },
  {
    label: "Total Customers",
    value: "8,492",
    change: "+15.3%",
    trend: "up",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
      />
    ),
    color: "text-secondary",
    bg: "bg-secondary/10",
  },
];

// Mock recent orders
const recentOrders = [
  {
    id: "ORD-2024-001",
    customer: "Sarah Johnson",
    product: "Cozy Night In Gift Box",
    total: 89.99,
    status: "processing",
    date: "2 hours ago",
  },
  {
    id: "ORD-2024-002",
    customer: "Michael Chen",
    product: "Gourmet Foodie Delight",
    total: 119.99,
    status: "shipped",
    date: "5 hours ago",
  },
  {
    id: "ORD-2024-003",
    customer: "Emily Davis",
    product: "Self-Care Sanctuary",
    total: 79.99,
    status: "pending",
    date: "1 day ago",
  },
  {
    id: "ORD-2024-004",
    customer: "James Wilson",
    product: "Coffee Connoisseur Collection",
    total: 74.99,
    status: "delivered",
    date: "2 days ago",
  },
  {
    id: "ORD-2024-005",
    customer: "Amanda Lee",
    product: "Book Lover's Paradise",
    total: 64.99,
    status: "processing",
    date: "2 days ago",
  },
];

const statusColors: Record<string, string> = {
  pending: "bg-warning/20 text-warning",
  processing: "bg-primary/20 text-primary",
  shipped: "bg-accent/20 text-accent",
  delivered: "bg-success/20 text-success",
  cancelled: "bg-error/20 text-error",
};

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-text-primary">
            Dashboard
          </h1>
          <p className="text-text-secondary">
            Welcome back! Here&apos;s what&apos;s happening with your store
            today.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 border border-border rounded-lg hover:bg-background-secondary transition-colors cursor-pointer">
            Export Report
          </button>
          <Link
            href="/admin/products/new"
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors"
          >
            + Add Product
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.label} padding="md" hover>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-text-secondary mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-text-primary">
                  {stat.value}
                </p>
                <div
                  className={`text-sm mt-1 ${stat.trend === "up" ? "text-success" : "text-error"}`}
                >
                  {stat.change} from last week
                </div>
              </div>
              <div
                className={`w-12 h-12 ${stat.bg} rounded-xl flex items-center justify-center`}
              >
                <svg
                  className={`w-6 h-6 ${stat.color}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {stat.icon}
                </svg>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2">
          <Card>
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold text-text-primary">
                Recent Orders
              </h2>
              <Link
                href="/admin/orders"
                className="text-sm text-primary hover:underline"
              >
                View all
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-background-secondary">
                    <th className="text-left px-6 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider">
                      Order
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider hidden md:table-cell">
                      Product
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider">
                      Total
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {recentOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="hover:bg-background-secondary/50"
                    >
                      <td className="px-6 py-4">
                        <span className="font-medium text-text-primary">
                          {order.id}
                        </span>
                        <br />
                        <span className="text-xs text-text-muted">
                          {order.date}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-text-secondary">
                        {order.customer}
                      </td>
                      <td className="px-6 py-4 text-text-secondary hidden md:table-cell">
                        {order.product}
                      </td>
                      <td className="px-6 py-4 font-semibold text-text-primary">
                        ${order.total.toFixed(2)}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${statusColors[order.status]}`}
                        >
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Quick Stats & Actions */}
        <div className="space-y-6">
          {/* Top Products */}
          <Card>
            <div className="p-6 border-b border-border">
              <h2 className="font-display text-lg font-semibold text-text-primary">
                Top Products
              </h2>
            </div>
            <div className="p-6 space-y-4">
              {products.slice(0, 4).map((product, idx) => (
                <div key={product.id} className="flex items-center gap-3">
                  <span className="w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center text-sm font-bold">
                    {idx + 1}
                  </span>
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-10 h-10 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-text-primary truncate">
                      {product.name}
                    </p>
                    <p className="text-sm text-text-muted">
                      {product.reviewCount} orders
                    </p>
                  </div>
                  <span className="font-semibold text-success">
                    ${product.salePrice}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          {/* Quick Actions */}
          <Card padding="md">
            <h2 className="font-display text-lg font-semibold text-text-primary mb-4">
              Quick Actions
            </h2>
            <div className="grid grid-cols-2 gap-3">
              <Link
                href="/admin/products/new"
                className="p-4 bg-background-secondary rounded-xl text-center hover:bg-primary/10 hover:text-primary transition-colors"
              >
                <svg
                  className="w-6 h-6 mx-auto mb-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                <span className="text-sm font-medium">Add Product</span>
              </Link>
              <Link
                href="/admin/bundles/new"
                className="p-4 bg-background-secondary rounded-xl text-center hover:bg-primary/10 hover:text-primary transition-colors"
              >
                <svg
                  className="w-6 h-6 mx-auto mb-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
                <span className="text-sm font-medium">Create Bundle</span>
              </Link>
              <Link
                href="/admin/orders"
                className="p-4 bg-background-secondary rounded-xl text-center hover:bg-primary/10 hover:text-primary transition-colors"
              >
                <svg
                  className="w-6 h-6 mx-auto mb-2"
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
                <span className="text-sm font-medium">View Orders</span>
              </Link>
              <Link
                href="/admin/analytics"
                className="p-4 bg-background-secondary rounded-xl text-center hover:bg-primary/10 hover:text-primary transition-colors"
              >
                <svg
                  className="w-6 h-6 mx-auto mb-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
                <span className="text-sm font-medium">Analytics</span>
              </Link>
            </div>
          </Card>

          {/* Inventory Alert */}
          <Card padding="md" className="border-warning/50 bg-warning/5">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-warning/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-5 h-5 text-warning"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-text-primary">
                  Low Stock Alert
                </h3>
                <p className="text-sm text-text-secondary mt-1">
                  3 products are running low on inventory. Review and restock
                  soon.
                </p>
                <Link
                  href="/admin/products?stock=low"
                  className="text-sm text-primary font-medium hover:underline mt-2 inline-block"
                >
                  View Products →
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
