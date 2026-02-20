
import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { Upload, Cloud, Image as ImageIcon, Type, Search, Layout, Plus, Trash2, Sparkles } from 'lucide-react';

interface ElementPaletteProps {
    activeTab: string;
}

export function ElementPalette({ activeTab }: ElementPaletteProps) {
    return (
        <div className="flex flex-col h-full bg-white">
            <div className="p-5 shrink-0">
                <h3 className="font-bold text-slate-800 flex items-center gap-2 capitalize">
                    {activeTab === 'image' && <ImageIcon size={18} className="text-rose-500" />}
                    {activeTab === 'text' && <Type size={18} className="text-rose-500" />}
                    {activeTab === 'stock' && <Search size={18} className="text-rose-500" />}
                    {activeTab === 'background' && <Layout size={18} className="text-rose-500" />}
                    {activeTab === 'effects' && <Sparkles size={18} className="text-rose-500" />}
                    {activeTab === 'text' ? 'text' : activeTab}
                </h3>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar p-5">
                {activeTab === 'image' && <ImageTabContent />}
                {activeTab === 'text' && <TextTabContent />}
                {activeTab === 'effects' && <StickersTabContent />}
                {activeTab === 'stock' && <div className="text-center py-10 text-slate-400 text-sm">Chức năng Stock đang phát triển...</div>}
                {activeTab === 'background' && <div className="text-center py-10 text-slate-400 text-sm">Chức năng Nền đang phát triển...</div>}
                {(!['image', 'text', 'stock', 'background', 'effects'].includes(activeTab)) && (
                    <div className="text-center py-10 text-slate-400 text-sm">Đang phát triển nội dung cho {activeTab}...</div>
                )}
            </div>
        </div>
    );
}

function StickersTabContent() {
    const emojis = ['❤️', '🎂', '🎈', '🎉', '🎁', '🌹', '💍', '🕊️', '✨', '🥂', '🍰', '💌'];
    return (
        <div className="grid grid-cols-4 gap-3">
            {emojis.map((emoji, idx) => (
                <DraggableEmoji key={idx} emoji={emoji} />
            ))}
        </div>
    );
}

function DraggableEmoji({ emoji }: { emoji: string }) {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: `emoji-${emoji}`,
        data: {
            type: 'text',
            content: emoji,
            isNew: true
        }
    });

    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        zIndex: 1000,
        pointerEvents: (isDragging ? 'none' : undefined) as React.CSSProperties['pointerEvents'],
        opacity: isDragging ? 0 : 1,
    } : undefined;

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
            className={`aspect-square flex items-center justify-center text-3xl bg-slate-50 border rounded-xl hover:bg-white hover:border-rose-400 hover:shadow-md cursor-grab active:cursor-grabbing transition-all
                ${isDragging ? 'opacity-50' : 'border-slate-100'}`}
        >
            {emoji}
        </div>
    );
}

function ImageTabContent() {
    const uploadedImages = [
        "https://images.unsplash.com/photo-1519741497674-61108169324a?q=80&w=200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1549416800-474be66e99f9?q=80&w=200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1522673607200-1648832cee33?q=80&w=200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1465495910483-e2892699738d?q=80&w=200&auto=format&fit=crop",
    ];

    return (
        <div className="flex flex-col gap-6">
            {/* Upload Zone */}
            <div className="relative group cursor-pointer">
                <div className="absolute top-3 left-3 px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-bold rounded uppercase z-10 shadow-sm border border-blue-100">
                    Free
                </div>
                <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50 hover:bg-white hover:border-rose-400 transition-all group-hover:shadow-md">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white mb-4 shadow-lg shadow-blue-500/20">
                        <Cloud size={24} />
                    </div>
                    <p className="text-xs text-slate-500 text-center leading-relaxed">
                        Kéo thả hoặc nhấn vào đây để tải lên file. Có thể tải lên tối đa 15 ảnh cùng một lúc.
                    </p>
                    <div className="mt-3 flex gap-2 text-[10px] items-center text-slate-400 font-medium">
                        <span>Đã tải: <b className="text-slate-600">0/10</b></span>
                        <div className="w-1 h-1 bg-slate-300 rounded-full" />
                        <span>Còn lại: <b className="text-rose-500">10</b></span>
                    </div>
                </div>
            </div>

            {/* Replacement Tool */}
            <button className="w-full py-3 bg-blue-50 border border-blue-100 text-blue-600 rounded-xl text-xs font-bold hover:bg-blue-100 transition-colors flex items-center justify-center gap-2">
                Hãy chọn ảnh bạn muốn thay thế
            </button>

            {/* Uploaded Files Section */}
            <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-slate-700">Tệp đã tải lên</h4>
                    <span className="text-[10px] font-bold text-slate-400">0.0000 GB / 5GB</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    {uploadedImages.map((src, idx) => (
                        <DraggableAsset key={idx} src={src} type="image" />
                    ))}
                </div>
            </div>
        </div>
    );
}

function TextTabContent() {
    const textPresets = [
        { label: 'Thêm tiêu đề', style: 'text-2xl font-bold', type: 'text', content: 'Tiêu đề mới' },
        { label: 'Thêm tiêu đề phụ', style: 'text-lg font-semibold', type: 'text', content: 'Tiêu đề phụ' },
        { label: 'Thêm nội dung thân văn bản', style: 'text-sm', type: 'text', content: 'Nhập nội dung ở đây...' },
    ];

    const combinations = [
        { title: 'Wedding Day', subtitle: 'SAVE THE DATE', type: 'text', content: 'Wedding Day\nSAVE THE DATE' },
        { title: 'PARTY', type: 'text', content: 'PARTY', style: 'font-sans font-black text-rose-500 text-2xl uppercase italic' }
    ];

    return (
        <div className="flex flex-col gap-4">
            {textPresets.map((preset, idx) => (
                <DraggableTextPreset key={idx} preset={preset} />
            ))}

            <div className="mt-6 border-t pt-6">
                <h4 className="text-sm font-bold text-slate-700 mb-4 uppercase tracking-wider text-[11px]">Sự kết hợp phông chữ</h4>
                <div className="flex flex-col gap-4">
                    {combinations.map((combo, idx) => (
                        <DraggableTextCombination key={idx} combo={combo} />
                    ))}
                </div>
            </div>
        </div>
    );
}

function DraggableAsset({ src, type }: { src: string, type: string }) {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: `asset-${src}`,
        data: {
            type,
            content: src,
            isNew: true
        }
    });

    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        zIndex: 1000,
        pointerEvents: 'none' as const,
        opacity: isDragging ? 0 : 1,
    } : undefined;

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
            className={`group aspect-square rounded-xl overflow-hidden border-2 bg-slate-50 cursor-grab active:cursor-grabbing transition-all hover:shadow-lg touch-none
                ${isDragging ? 'opacity-0' : 'border-slate-100 hover:border-rose-400'}`}
        >
            <img
                src={src}
                alt="Asset"
                draggable={false}
                className="w-full h-full object-cover transition-transform group-hover:scale-110"
            />
        </div>
    );
}

function DraggableTextPreset({ preset }: { preset: any }) {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: `text-preset-${preset.label}`,
        data: {
            type: preset.type,
            content: preset.content,
            isNew: true
        }
    });

    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        zIndex: 1000,
        pointerEvents: 'none' as const,
        opacity: isDragging ? 0 : 1,
    } : undefined;

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
            className={`w-full py-3 px-4 bg-slate-50 border rounded-xl text-left transition-all hover:bg-white hover:border-rose-400 hover:shadow-sm cursor-grab active:cursor-grabbing
                ${isDragging ? 'opacity-0' : 'border-slate-200'}`}
        >
            <span className={`${preset.style} text-slate-800`}>{preset.label}</span>
        </div>
    );
}

function DraggableTextCombination({ combo }: { combo: any }) {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: `text-combo-${combo.title}`,
        data: {
            type: combo.type,
            content: combo.content,
            isNew: true
        }
    });

    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        zIndex: 1000,
        pointerEvents: 'none' as const,
        opacity: isDragging ? 0 : 1,
    } : undefined;

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
            className={`p-4 border rounded-xl hover:border-rose-400 hover:shadow-sm transition-all cursor-grab active:cursor-grabbing bg-slate-50/50
                ${isDragging ? 'opacity-0' : 'border-slate-100'}`}
        >
            {combo.title === 'Wedding Day' ? (
                <>
                    <p className="font-serif text-xl text-slate-800">Wedding Day</p>
                    <p className="text-xs text-slate-400">SAVE THE DATE</p>
                </>
            ) : (
                <p className={combo.style}>{combo.title}</p>
            )}
        </div>
    );
}
