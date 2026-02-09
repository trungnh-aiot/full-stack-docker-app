
import React from 'react';
import { useDraggable } from '@dnd-kit/core';

export function ElementPalette() {
    const draggables = [
        { id: 'new-text', type: 'text', label: 'Thêm Chữ', icon: 'Aa' },
        { id: 'new-image', type: 'image', label: 'Tải Ảnh', icon: '🖼️' },
        { id: 'new-sticker', type: 'sticker', label: 'Sticker', icon: '⭐' },
    ];

    return (
        <div className="w-64 bg-white border-r border-gray-200 p-4 flex flex-col gap-4">
            <h3 className="font-bold text-gray-700">Công Cụ</h3>
            <div className="grid grid-cols-2 gap-3">
                {draggables.map((item) => (
                    <DraggableItem key={item.id} item={item} />
                ))}
            </div>

            <div className="mt-8">
                <h3 className="font-bold text-gray-700 mb-2">Stickers</h3>
                <div className="grid grid-cols-3 gap-2">
                    {/* Placeholder stickers */}
                    {['❤️', '🎂', '🎈', '🎉', '🎁', '🌹'].map((emoji, idx) => (
                        <DraggableSticker key={idx} emoji={emoji} />
                    ))}
                </div>
            </div>
        </div>
    );
}

function DraggableItem({ item }: { item: any }) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: item.id,
        data: {
            type: item.type,
            isNew: true
        }
    });

    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    } : undefined;

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
            className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-rose-500 hover:bg-rose-50 cursor-grab active:cursor-grabbing transition-colors"
        >
            <span className="text-2xl mb-1">{item.icon}</span>
            <span className="text-xs font-medium text-gray-600">{item.label}</span>
        </div>
    );
}

function DraggableSticker({ emoji }: { emoji: string }) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: `sticker-${emoji}`,
        data: {
            type: 'sticker',
            content: emoji,
            isNew: true
        }
    });

    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    } : undefined;

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
            className="flex items-center justify-center aspect-square text-2xl hover:bg-gray-100 rounded-lg cursor-grab active:cursor-grabbing"
        >
            {emoji}
        </div>
    );
}
