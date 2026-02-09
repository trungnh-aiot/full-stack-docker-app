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
                    {/* ... Keep the existing mode selection UI ... */}
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Thiết Kế Kỷ Niệm Của Bạn</h2>
                    <p className="text-lg text-gray-600">Bạn muốn bắt đầu như thế nào?</p>
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
        <div className="flex-1 flex overflow-hidden h-[calc(100vh-140px)]">
            {/* 1. Left Sidebar: Widget Library (Replaces ElementPalette) */}
            <div className="w-72 bg-white dark:bg-[#2d1621] border-r border-[#f4f0f2] dark:border-[#3d2430] flex flex-col p-5 overflow-y-auto">
                <div className="mb-6 bg-primary/10 dark:bg-primary/20 p-4 rounded-xl border border-primary/20">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                        <p className="text-primary text-sm font-bold">Quiz hoàn tất!</p>
                    </div>
                    <p className="text-[#896172] dark:text-primary/60 text-xs leading-relaxed">
                        Tất cả các tiện ích đã được mở khóa. Hãy kéo thả để trang trí món quà.
                    </p>
                </div>

                {/* This should be the Draggable Palette Items */}
                <div className="space-y-6">
                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-wider text-[#896172] mb-4">Phương tiện</h3>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="widget-card cursor-grab flex flex-col items-center justify-center p-3 rounded-xl bg-background-light dark:bg-[#3d2430] border border-transparent hover:border-primary transition-all">
                                <span className="material-symbols-outlined text-primary mb-2">image</span>
                                <span className="text-xs font-medium">Hình ảnh</span>
                            </div>
                            <div className="widget-card cursor-grab flex flex-col items-center justify-center p-3 rounded-xl bg-background-light dark:bg-[#3d2430] border border-transparent hover:border-primary transition-all">
                                <span className="material-symbols-outlined text-primary mb-2">videocam</span>
                                <span className="text-xs font-medium">Video</span>
                            </div>
                            {/* ... other items ... */}
                        </div>
                    </div>
                </div>
                {/* Note: The actual Drag logic needs to be connected here similar to ElementPalette */}
            </div>

            {/* 2. Center: Canvas */}
            <section className="flex-1 bg-background-light dark:bg-background-dark overflow-y-auto p-8 flex flex-col items-center relative">
                {/*  Navigation / Header inside builder */}
                <div className="w-full flex justify-between items-center mb-4">
                    <Button variant="ghost" size="sm" onClick={() => setMode(null)}>← Quay Lại</Button>
                    <Button onClick={() => onNext({ images: [], message: "Design", theme: "simple", elements })}>
                        Hoàn tất & Lưu
                    </Button>
                </div>

                <div className="w-full max-w-[480px] space-y-6">
                    {/* Step Progress Bar */}
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold text-sm">1</div>
                            <span className="text-sm font-medium text-gray-900">Quiz</span>
                        </div>
                        <div className="h-[2px] flex-1 bg-gray-200 mx-4 relative">
                            <div className="absolute inset-0 bg-green-500 w-full" />
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">2</div>
                            <span className="text-sm font-bold text-gray-900">Trang trí</span>
                        </div>
                        <div className="h-[2px] flex-1 bg-gray-200 mx-4" />
                        <div className="flex items-center gap-2 opacity-50">
                            <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center font-bold text-sm">3</div>
                            <span className="text-sm font-medium text-gray-500">Hoàn tất</span>
                        </div>
                    </div>

                    {/* Step 1 Preview (Locked/Collapsed) */}
                    <div className="w-full bg-white dark:bg-[#2d1621] rounded-2xl shadow-sm border border-[#e6dbe0] dark:border-[#3d2430] p-6 opacity-80">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-[10px] font-bold bg-green-100 text-green-600 px-2 py-1 rounded-full uppercase">Đã hoàn thành: Quiz</span>
                            <span className="material-symbols-outlined text-gray-400 text-sm">lock</span>
                        </div>
                        <div className="text-center">
                            <h4 className="font-bold text-lg mb-2">Kỷ niệm của chúng mình</h4>
                        </div>
                    </div>

                    {/* Active Canvas Area */}
                    {/* We need to wrap this in DigitalMemoryBuilder or pass props down */}
                    <div className="relative w-full h-[600px] bg-white rounded-3xl shadow-sm border-2 border-dashed border-[#e6dbe0] overflow-hidden">
                        <DigitalMemoryBuilder
                            initialElements={elements}
                            onChange={setElements}
                        />
                    </div>
                </div>
            </section>

            {/* 3. Right Sidebar: Properties Panel */}
            <aside className="w-80 bg-white dark:bg-[#2d1621] border-l border-[#f4f0f2] dark:border-[#3d2430] flex flex-col">
                <div className="p-5 border-b border-[#f4f0f2] dark:border-[#3d2430] flex items-center justify-between">
                    <h2 className="font-bold">Tùy chỉnh Widget</h2>
                    <span className="material-symbols-outlined text-[#896172]">settings</span>
                </div>
                <div className="p-5 text-center text-gray-500 text-sm">
                    Chọn một phần tử để chỉnh sửa
                </div>
                {/* Properties would go here based on activeElementId from store */}
            </aside>
        </div>
    );
}
