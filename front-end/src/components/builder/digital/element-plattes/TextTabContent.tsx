import React from 'react';
import { Type, Heading1, Heading2, Heading3, AlignLeft, Sparkles } from 'lucide-react';
import { useDraggable } from '@dnd-kit/core';
import { useMemoryStore } from '@/store/useMemoryStore';

interface DraggableTextProps {
    label: string;
    type: string;
    fontSize: string;
    fontWeight: string;
    content: string;
    previewStyle?: React.CSSProperties;
    onClick?: () => void;
}

function DraggableTextItem({ label, type, fontSize, fontWeight, content, previewStyle, onClick }: DraggableTextProps) {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: `text-template-${label.toLowerCase().replace(/\s+/g, '-')}`,
        data: {
            type: 'text',
            content: content,
            isNew: true,
            style: {
                fontSize,
                fontWeight,
            }
        }
    });

    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        zIndex: 1000,
        opacity: isDragging ? 0 : 1,
        pointerEvents: 'none' as const,
    } : undefined;

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
            onClick={() => {
                if (!isDragging) onClick?.();
            }}
            className={`w-full p-4 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl hover:bg-white hover:border-rose-400 hover:shadow-md transition-all cursor-grab active:cursor-grabbing group
                ${isDragging ? 'opacity-0' : ''}`}
        >
            <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{label}</span>
                <Type size={12} className="text-slate-300 group-hover:text-rose-400 transition-colors" />
            </div>
            <div style={{ fontSize, fontWeight, ...previewStyle }} className="text-slate-800 truncate">
                {content}
            </div>
        </div>
    );
}

export function TextTabContent() {
    const addElement = useMemoryStore((state) => state.addElement);

    const handleTextClick = (preset: any) => {
        const newElement = {
            id: `element-${Date.now()}`,
            type: 'text',
            content: preset.content,
            position: { x: 125, y: 150 },
            size: { width: 200, height: 50 },
            style: {
                fontSize: preset.fontSize,
                fontWeight: preset.fontWeight,
                ...(preset.previewStyle || {})
            }
        };
        // @ts-ignore
        addElement(newElement);
    };

    const textPresets = [
        { label: "Tiêu đề lớn", type: "heading-1", fontSize: "32px", fontWeight: "800", content: "Thêm tiêu đề" },
        { label: "Tiêu đề phụ", type: "heading-2", fontSize: "24px", fontWeight: "700", content: "Thêm tiêu đề phụ" },
        { label: "Văn bản thân", type: "body", fontSize: "16px", fontWeight: "400", content: "Thêm nội dung văn bản" },
    ];

    const styledPresets = [
        {
            label: "Glow Pink",
            content: "Love & Magic",
            fontSize: "28px",
            fontWeight: "900",
            type: "text",
            previewStyle: {
                color: '#ff4d94',
                textShadow: '0 0 10px rgba(255, 77, 148, 0.5)',
                fontFamily: 'serif',
                fontStyle: 'italic'
            }
        },
        {
            label: "Elegant Gold",
            content: "Special Day",
            fontSize: "26px",
            fontWeight: "600",
            type: "text",
            previewStyle: {
                color: '#b8860b',
                fontFamily: 'serif',
                letterSpacing: '1px'
            }
        },
        {
            label: "Modern Bold",
            content: "HAPPINESS",
            fontSize: "24px",
            fontWeight: "900",
            type: "text",
            previewStyle: {
                color: '#1e293b',
                textTransform: 'uppercase' as const,
                letterSpacing: '-1px'
            }
        }
    ];

    return (
        <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-left-4 duration-300">
            {/* Basic Text Sections */}
            <div className="flex flex-col gap-3">
                <h4 className="text-sm font-bold text-slate-700 flex items-center gap-2">
                    <AlignLeft size={16} className="text-blue-500" />
                    Văn bản cơ bản
                </h4>
                <div className="flex flex-col gap-3">
                    {textPresets.map((preset, idx) => (
                        <DraggableTextItem
                            key={idx}
                            {...preset}
                            onClick={() => handleTextClick(preset)}
                        />
                    ))}
                </div>
            </div>

            {/* Special Styles Section */}
            <div className="flex flex-col gap-3">
                <h4 className="text-sm font-bold text-slate-700 flex items-center gap-2">
                    <Sparkles size={16} className="text-rose-500" />
                    Mẫu chữ nghệ thuật
                </h4>
                <div className="grid grid-cols-1 gap-3">
                    {styledPresets.map((preset, idx) => (
                        <DraggableTextItem
                            key={idx}
                            {...preset}
                            onClick={() => handleTextClick(preset)}
                        />
                    ))}
                </div>
            </div>

            {/* User Guide */}
            <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
                <p className="text-[11px] text-blue-700 leading-relaxed">
                    <b>Mẹo:</b> Bạn có thể kéo trực tiếp các ô này vào trang hoặc kích đúp để thêm nhanh vào giữa màn hình.
                </p>
            </div>
        </div>
    );
}
