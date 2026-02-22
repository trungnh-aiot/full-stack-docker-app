
import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { Image as ImageIcon, Type, Search, Layout, Sparkles } from 'lucide-react';
import { ImageTabContent } from './ImageTabContent';

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
                {activeTab === 'text' && <></>}
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



