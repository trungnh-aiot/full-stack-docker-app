"use client";

import React, { useState } from "react";

import { AdminSidebar, AdminTopBar } from "@/components/layout/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <AdminTopBar sidebarCollapsed={sidebarCollapsed} />
      <main
        className={`
          pt-16 min-h-screen transition-all
          ${sidebarCollapsed ? "pl-20" : "pl-64"}
        `}
      >
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
