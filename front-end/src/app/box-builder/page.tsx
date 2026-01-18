import React from "react";

import { BoxBuilder } from "@/components/builder/BoxBuilder";
import { Header } from "@/components/layout/Header";

export default function BoxBuilderPage() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Header />
      <main className="container mx-auto px-4 pt-24 pb-12 max-w-7xl">
        <BoxBuilder />
      </main>
    </div>
  );
}
