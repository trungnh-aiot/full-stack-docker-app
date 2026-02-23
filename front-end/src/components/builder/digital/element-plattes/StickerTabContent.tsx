import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { Sparkles, Search, ChevronRight } from 'lucide-react';
import { useMemoryStore } from '@/store/useMemoryStore';

// Structured data for easy API migration
// This interface matches common CMS/Backend responses
interface StickerItem {
    id: string;
    content: string; // Could be emoji or URL
    type: 'emoji' | 'image';
    tags: string[];
}

interface StickerCategory {
    id: string;
    title: string;
    stickers: StickerItem[];
}

const MOCK_STICKER_API_RESPONSE: StickerCategory[] = [
    {
        id: 'cat_popular',
        title: '💎 Phổ biến nhất',
        stickers: [
            { id: 's1', content: '❤️', type: 'emoji', tags: ['love', 'heart'] },
            { id: 's2', content: '✨', type: 'emoji', tags: ['magic', 'sparkle'] },
            { id: 's3', content: '🔥', type: 'emoji', tags: ['hot', 'trend'] },
            { id: 's4', content: '🎉', type: 'emoji', tags: ['party', 'celebrate'] },
            { id: 's5', content: '🎁', type: 'emoji', tags: ['gift', 'birthday'] },
            { id: 's6', content: '�', type: 'emoji', tags: ['rainbow', 'color'] },
            { id: 's7', content: '⭐', type: 'emoji', tags: ['star', 'favorite'] },
            { id: 's8', content: '🎈', type: 'emoji', tags: ['balloon', 'party'] },
        ]
    },
    {
        id: 'cat_love',
        title: '💖 Tình yêu & Cảm xúc',
        stickers: [
            { id: 's9', content: '�', type: 'emoji', tags: ['love', 'letter'] },
            { id: 's10', content: '🥰', type: 'emoji', tags: ['love', 'face'] },
            { id: 's11', content: '�', type: 'emoji', tags: ['hearts'] },
            { id: 's12', content: '�', type: 'emoji', tags: ['ring', 'wedding'] },
            { id: 's13', content: '🌹', type: 'emoji', tags: ['rose', 'flower'] },
            { id: 's14', content: '�', type: 'emoji', tags: ['teddy', 'gift'] },
            { id: 's15', content: '🕊️', type: 'emoji', tags: ['peace', 'bird'] },
            { id: 's16', content: '💏', type: 'emoji', tags: ['kiss', 'couple'] },
        ]
    },
    {
        id: 'cat_food',
        title: '🍰 Đồ ăn & Thức uống',
        stickers: [
            { id: 's17', content: '🎂', type: 'emoji', tags: ['cake', 'birthday'] },
            { id: 's18', content: '🧁', type: 'emoji', tags: ['cupcake'] },
            { id: 's19', content: '�', type: 'emoji', tags: ['icecream'] },
            { id: 's20', content: '🥂', type: 'emoji', tags: ['cheers', 'drink'] },
            { id: 's21', content: '🍩', type: 'emoji', tags: ['donut'] },
            { id: 's22', content: '🍹', type: 'emoji', tags: ['cocktail'] },
            { id: 's23', content: '🍭', type: 'emoji', tags: ['candy'] },
            { id: 's24', content: '🍔', type: 'emoji', tags: ['burger'] },
        ]
    },
    {
        id: 'cat_decor',
        title: '🎨 Trang trí & Nhãn',
        stickers: [
            { id: 's25', content: '🎀', type: 'emoji', tags: ['ribbon'] },
            { id: 's26', content: '�', type: 'emoji', tags: ['ferris'] },
            { id: 's27', content: '�', type: 'emoji', tags: ['art'] },
            { id: 's28', content: '👒', type: 'emoji', tags: ['hat'] },
            { id: 's29', content: '🎗️', type: 'emoji', tags: ['ribbon'] },
            { id: 's30', content: '👟', type: 'emoji', tags: ['shoe'] },
            { id: 's31', content: '�', type: 'emoji', tags: ['camera'] },
            { id: 's32', content: '🌟', type: 'emoji', tags: ['sparkle'] },
        ]
    }
];

export function StickerTabContent() {
    const addElement = useMemoryStore((state) => state.addElement);

    const handleQuickAdd = (sticker: StickerItem) => {
        const newElement = {
            id: `element-${Date.now()}-${sticker.id}`,
            type: 'sticker',
            content: sticker.content,
            position: { x: 100 + Math.random() * 50, y: 150 + Math.random() * 50 },
            size: { width: 100, height: 100 },
        };
        // @ts-ignore
        addElement(newElement);
    };

    return (
        <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-left-4 duration-500">
            {/* Search Header */}
            <div className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-rose-500 transition-colors" size={16} />
                <input
                    type="text"
                    placeholder="Tìm sticker bạn yêu thích..."
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-xs focus:outline-none focus:ring-4 focus:ring-rose-500/10 focus:border-rose-300 transition-all font-medium"
                />
            </div>

            {/* Quick Categories list - For horizontal scrolling if needed, or just status */}
            <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">
                <span className="text-rose-500 border-b-2 border-rose-500 pb-1">Tất cả nhãn dán</span>
                <span className="hover:text-slate-600 cursor-pointer transition-colors pb-1">Bộ sưu tập</span>
                <span className="hover:text-slate-600 cursor-pointer transition-colors pb-1">Đã dùng</span>
            </div>

            {/* All Items Display */}
            <div className="flex flex-col gap-10">
                {MOCK_STICKER_API_RESPONSE.map((category) => (
                    <div key={category.id} className="flex flex-col gap-4">
                        <div className="flex items-center justify-between group cursor-pointer">
                            <h4 className="text-[11px] font-black text-slate-800 uppercase tracking-wider flex items-center gap-2">
                                {category.title}
                            </h4>
                            <ChevronRight size={14} className="text-slate-300 group-hover:text-rose-500 transition-all group-hover:translate-x-0.5" />
                        </div>

                        <div className="grid grid-cols-4 gap-3.5">
                            {category.stickers.map((sticker) => (
                                <DraggableStickerItem
                                    key={sticker.id}
                                    sticker={sticker}
                                    onClick={() => handleQuickAdd(sticker)}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Premium Upsell / Info */}
            <div className="mt-4 p-5 rounded-3xl bg-gradient-to-br from-rose-500 to-orange-400 text-white shadow-lg shadow-rose-200/50 relative overflow-hidden group border border-rose-400">
                <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                <div className="relative z-10 flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <Sparkles size={16} />
                        <span className="text-[10px] font-black uppercase tracking-widest">Sticker Pack Pro</span>
                    </div>
                    <p className="text-xs font-bold leading-snug">Mở khóa 1000+ nhãn dán độc quyền và hiệu ứng động.</p>
                    <button className="mt-2 w-fit px-4 py-1.5 bg-white text-rose-500 rounded-full text-[10px] font-black uppercase tracking-wider hover:bg-rose-50 transition-colors shadow-sm">
                        Nâng cấp ngay
                    </button>
                </div>
            </div>

            <div className="h-10 shrink-0" /> {/* Spacer */}
        </div>
    );
}

function DraggableStickerItem({ sticker, onClick }: { sticker: StickerItem, onClick: () => void }) {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: `drag-sticker-${sticker.id}`,
        data: {
            type: 'sticker',
            content: sticker.content,
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
            onClick={(e) => {
                if (!isDragging) onClick();
            }}
            className={`aspect-square flex items-center justify-center text-4xl bg-white border border-slate-100/80 rounded-[22px] hover:border-rose-400 hover:shadow-xl hover:shadow-rose-500/10 cursor-grab active:cursor-grabbing transition-all active:scale-95 group relative
                ${isDragging ? 'opacity-0 scale-50' : 'shadow-sm hover:-translate-y-1'}`}
        >
            <span className="group-hover:scale-125 transition-transform duration-300 drop-shadow-sm">
                {sticker.content}
            </span>

            {/* Subtle hover effect background */}
            <div className="absolute inset-0 bg-rose-500/0 group-hover:bg-rose-500/[0.03] rounded-[inherit] transition-colors" />
        </div>
    );
}
