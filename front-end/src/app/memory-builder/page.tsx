import React from "react";
import { MemoryBuilder } from "@/components/builder/MemoryBuilder";
import { Header } from "@/components/layout/Header";

export default function MemoryBuilderPage() {
    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <Header />
            <main className="container mx-auto px-4 pt-24 pb-12 max-w-7xl">
                <div className="max-w-4xl mx-auto mb-10 text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Tạo Kỷ Niệm Số
                    </h1>
                    <p className="text-lg text-gray-600">
                        Thiết kế một trải nghiệm số độc đáo, an toàn cho người thương.
                        Họ sẽ cần trả lời câu hỏi bí mật của bạn để mở khóa kỷ niệm.
                    </p>
                </div>

                <MemoryBuilder />
            </main>
        </div>
    );
}
