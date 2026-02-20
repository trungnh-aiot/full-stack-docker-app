import React from "react";
import { MemoryBuilder } from "@/components/builder/MemoryBuilder";
import { Header } from "@/components/layout/Header";

export default function MemoryBuilderPage() {
    return (
        <div className="h-screen w-screen bg-white font-sans overflow-hidden">
            <main className="h-full w-full">
                <MemoryBuilder />
            </main>
        </div>
    );
}
