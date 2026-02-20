import React, { useState } from "react";
import { MemoryConfig, MemoryElement } from "@/types";
import { Button } from "../ui/Button";
import { DigitalMemoryBuilder } from "./digital/DigitalMemoryBuilder";

interface MemoryStepProps {
    initialData?: MemoryConfig;
    onNext: (data: MemoryConfig) => void;
    onBack?: () => void;
}

type DesignMode = "blank" | "template" | null;

export function MemoryStep({ initialData, onNext, onBack }: MemoryStepProps) {
    const [mode, setMode] = useState<DesignMode>(
        initialData?.elements && initialData.elements.length > 0 ? "blank" : null
    );
    const [elements, setElements] = useState<MemoryElement[]>(
        initialData?.elements || []
    );

    // Mock Template Data (Same as before)
    const templateElements: MemoryElement[] = [
        { id: 't1', type: 'text', content: 'Chúc Mừng Kỷ Niệm', position: { x: 50, y: 50 }, size: { width: 300, height: 60 } },
        { id: 't2', type: 'sticker', content: '❤️', position: { x: 150, y: 150 }, size: { width: 100, height: 100 } },
        { id: 't3', type: 'text', content: 'Yêu Bạn Nhiều!', position: { x: 50, y: 300 }, size: { width: 200, height: 50 } }
    ];

    const handleModeSelect = (selectedMode: DesignMode) => {
        setMode(selectedMode);
        if (selectedMode === "template") setElements(templateElements);
        else setElements([]);
    };

    if (!mode) {
        return (
            <div className="max-w-4xl mx-auto py-12">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Tạo Kỷ Niệm Số
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        Thiết kế một trải nghiệm số độc đáo, an toàn cho người thương.
                        Họ sẽ cần trả lời câu hỏi bí mật của bạn để mở khóa kỷ niệm.
                    </p>
                </div>
                <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
                    {/* Option 1: Blank Canvas */}
                    <div onClick={() => handleModeSelect("blank")} className="group relative bg-white p-8 rounded-2xl shadow-sm border-2 border-dashed border-gray-300 hover:border-rose-500 hover:shadow-lg transition-all cursor-pointer text-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-rose-100 transition-colors">
                            <svg className="w-8 h-8 text-gray-500 group-hover:text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Tự Thiết Kế (Trống)</h3>
                        <p className="text-gray-500 text-sm">Bắt đầu với một trang trắng và thỏa sức sáng tạo từ đầu.</p>
                    </div>
                    {/* Option 2: Template */}
                    <div onClick={() => handleModeSelect("template")} className="group relative bg-white p-8 rounded-2xl shadow-sm border border-gray-200 hover:border-rose-500 hover:shadow-lg transition-all cursor-pointer text-center">
                        <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-rose-100 transition-colors">
                            <svg className="w-8 h-8 text-rose-500 group-hover:text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Mẫu Có Sẵn</h3>
                        <p className="text-gray-500 text-sm">Chọn một thiết kế đẹp mắt đã được dựng sẵn để tiết kiệm thời gian.</p>
                    </div>
                </div>
                <div className="mt-12 text-center">
                    <Button variant="outline" onClick={onBack}>Quay Lại</Button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col min-h-0 bg-white h-full">
            <DigitalMemoryBuilder
                initialElements={elements}
                onChange={setElements}
                onSave={(els) => onNext({
                    images: [],
                    message: "Design",
                    theme: "simple",
                    elements: els
                })}
            />
        </div>
    );
}
