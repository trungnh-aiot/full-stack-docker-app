import React, { useEffect, useState } from "react";
import {
    DndContext,
    DragEndEvent,
    DragOverlay,
    DragStartEvent,
    MouseSensor,
    TouchSensor,
    useDraggable,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import {
    Type,
    Image as ImageIcon,
    Search,
    Layout,
    Music,
    AppWindow,
    LayoutGrid,
    Sparkles,
    HelpCircle,
    Plus,
    Minus,
    ChevronLeft,
    ChevronRight,
    Edit3,
    Bold,
    Italic,
    Underline,
    Strikethrough,
    AlignLeft,
    AlignCenter,
    AlignRight,
    AlignJustify,
    Link as LinkIcon,
    Lock,
    CornerUpLeft,
    CornerUpRight,
    CornerDownLeft,
    CornerDownRight,
    Baseline,
    Palette
} from "lucide-react";
import { MemoryElement } from "@/types";
import { useMemoryStore } from "@/store/useMemoryStore";
import { ElementPalette } from "./ElementPalette";
import { Canvas } from "./Canvas";
import { BuilderHeader } from "./BuilderHeader";
import { DragPreviewFactory } from './drag-previews/DragPreviewFactory';

interface DigitalMemoryBuilderProps {
    initialElements?: MemoryElement[];
    onSave?: (elements: MemoryElement[]) => void;
    onChange?: (elements: MemoryElement[]) => void;
}

const SIDEBAR_ITEMS = [
    { id: 'text', icon: Type, label: 'Văn bản' },
    { id: 'image', icon: ImageIcon, label: 'Hình ảnh' },
    { id: 'stock', icon: Search, label: 'Stock' },
    { id: 'background', icon: Layout, label: 'Nền' },
    { id: 'music', icon: Music, label: 'Âm nhạc' },
    { id: 'utilities', icon: AppWindow, label: 'Tiện ích' },
    { id: 'templates', icon: LayoutGrid, label: 'Mẫu' },
    { id: 'effects', icon: Sparkles, label: 'Hiệu ứng' },
    { id: 'help', icon: HelpCircle, label: 'Hỗ trợ' },
];

function PropertySection({ title, children, isOpen = false }: { title: string, children: React.ReactNode, isOpen?: boolean }) {
    const [open, setOpen] = React.useState(isOpen);
    return (
        <div className="border border-slate-100 rounded-xl overflow-hidden mb-2 shadow-sm transition-all bg-white">
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between p-4 bg-white hover:bg-slate-50 transition-colors"
            >
                <span className="font-bold text-slate-800 text-[13px] tracking-tight">{title}</span>
                <ChevronRight size={14} className={`text-slate-400 transition-transform duration-300 ${open ? 'rotate-90' : ''}`} />
            </button>
            {open && (
                <div className="px-4 pb-4 pt-0">
                    <div className="h-px bg-slate-100 mb-4 w-full" />
                    <div className="animate-in slide-in-from-top-1 duration-200">
                        {children}
                    </div>
                </div>
            )}
        </div>
    );
}

function ProFeatureNotice() {
    return (
        <div className="p-3 bg-blue-50/50 border border-blue-100 rounded-xl mb-4">
            <p className="text-[11px] text-blue-700 leading-relaxed">
                <strong className="flex items-center gap-1 mb-1 text-blue-800">
                    <Lock size={12} /> Tính năng nâng cao
                </strong>
                Chế độ này chỉ dành cho gói Basic trở lên.
                <span className="block mt-1 text-blue-600 font-bold cursor-pointer hover:underline">
                    Nâng cấp ngay →
                </span>
            </p>
        </div>
    );
}

function DraggableSidebarItem({ item, isActive, isAssetPanelOpen, onClick }: { item: any, isActive: boolean, isAssetPanelOpen: boolean, onClick: () => void }) {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: `sidebar-${item.id}`,
        disabled: item.id !== 'text', // Only text is directly draggable from sidebar for now
        data: {
            type: item.id,
            isNew: true,
            content: item.id === 'text' ? 'Văn bản' : undefined
        }
    });

    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        zIndex: 50,
    } : undefined;

    return (
        <button
            ref={setNodeRef}
            // style={style} - Removed to keep sidebar item static
            {...listeners}
            {...attributes}
            onClick={onClick}
            className={`w-14 h-14 flex flex-col items-center justify-center rounded-xl transition-all duration-200 gap-1 relative
                ${isActive && (item.id !== 'text' || isAssetPanelOpen)
                    ? 'bg-rose-50 text-rose-600 shadow-sm'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'} 
                ${isDragging ? 'opacity-50 ring-2 ring-rose-500' : ''}`}
        >
            <item.icon size={22} strokeWidth={isActive ? 2.5 : 2} />
            <span className="text-[10px] font-semibold">{item.label}</span>
            {isDragging && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 rounded-full flex items-center justify-center text-white">
                    <Plus size={10} strokeWidth={3} />
                </div>
            )}
        </button>
    );
}

export function DigitalMemoryBuilder({
    initialElements = [],
    onSave,
    onChange,
}: DigitalMemoryBuilderProps) {
    const [activeTab, setActiveTab] = useState('image');
    const [isAssetPanelOpen, setIsAssetPanelOpen] = useState(true);
    const [zoom, setZoom] = useState(100);
    const [draggedItem, setDraggedItem] = useState<any>(null);

    // Connect to Zustand store
    const elements = useMemoryStore((state) => state.elements);
    const setElements = useMemoryStore((state) => state.setElements);
    const addElement = useMemoryStore((state) => state.addElement);
    const updateElement = useMemoryStore((state) => state.updateElement);
    const setActiveElement = useMemoryStore((state) => state.setActiveElement);
    const activeElementId = useMemoryStore((state) => state.activeElementId);

    // Effect to auto-select text tab or handle panel visibility
    useEffect(() => {
        if (activeTab === 'text') {
            setIsAssetPanelOpen(false); // Hide the middle panel for text tab
        }
    }, [activeTab]);

    useEffect(() => {
        if (initialElements.length > 0) {
            setElements(initialElements);
        }
    }, [initialElements, setElements]);

    useEffect(() => {
        onChange?.(elements);
    }, [elements, onChange]);

    const sensors = useSensors(
        useSensor(MouseSensor, {
            activationConstraint: { distance: 3 },
        }),
        useSensor(TouchSensor, {
            activationConstraint: { delay: 250, tolerance: 5 },
        }),
    );

    const handleDragStart = (event: DragStartEvent) => {
        const { active } = event;
        setDraggedItem(active.data.current);

        if (!active.data.current?.isNew) {
            setActiveElement(active.id as string);
        }
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over, delta } = event;
        setActiveElement(null);
        setDraggedItem(null);

        const scale = zoom / 100;
        const CANVAS_WIDTH = 450; // Fixed builder width

        // For EXISTING elements: always apply delta to reposition, no need for 'over'
        if (!active.data.current?.isNew) {
            const elementId = active.id as string;
            const element = elements.find((el) => el.id === elementId);

            if (element) {
                const w = element.size?.width || (element.type === 'text' ? 200 : 200);
                const h = element.size?.height || (element.type === 'text' ? 50 : 200);

                const rawX = element.position.x + (delta.x / scale);
                const rawY = element.position.y + (delta.y / scale);

                // Clamp to drop area (entire element must be inside)
                const x = Math.round(Math.max(0, Math.min(rawX, CANVAS_WIDTH - w)));
                const y = Math.round(Math.max(0, rawY));

                updateElement(elementId, {
                    position: { x, y },
                });
            }
            return;
        }

        // For NEW elements: require 'over' to know where the canvas is
        if (!over) return;

        const type = active.data.current.type;
        const content = active.data.current.content || (type === 'text' ? "Văn bản" : "");

        const newWidth = type === 'text' ? 200 : 200;
        const newHeight = type === 'text' ? 50 : 200;

        let x = 0;
        let y = 0;

        if (active.rect.current?.translated && over.rect) {
            const draggedRect = active.rect.current.translated;

            const draggedCenterX = draggedRect.left + draggedRect.width / 2;
            const draggedCenterY = draggedRect.top + draggedRect.height / 2;

            const canvasCenterX = (draggedCenterX - over.rect.left) / scale;
            const canvasCenterY = (draggedCenterY - over.rect.top) / scale;

            x = Math.round(canvasCenterX - newWidth / 2);
            y = Math.round(canvasCenterY - newHeight / 2);
        } else {
            x = 100;
            y = 100;
        }

        // Clamp to drop area
        x = Math.round(Math.max(0, Math.min(x, CANVAS_WIDTH - newWidth)));
        y = Math.round(Math.max(0, y));

        const newElement: MemoryElement = {
            id: `element-${Date.now()}`,
            type,
            content,
            position: { x, y },
            size: { width: newWidth, height: newHeight },
        };

        addElement(newElement);
        setTimeout(() => setActiveElement(newElement.id), 0);
    };

    return (
        <DndContext
            sensors={sensors}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
            <div className="flex flex-col h-full overflow-hidden bg-white font-sans text-slate-900">
                <BuilderHeader elements={elements} onSave={onSave} />

                <div className="flex flex-1 overflow-hidden relative">
                    {/* Left Icon Sidebar */}
                    <aside className="w-24 bg-white flex flex-col items-center py-4 gap-2 z-30 shrink-0">
                        {SIDEBAR_ITEMS.map((item) => (
                            <DraggableSidebarItem
                                key={item.id}
                                item={item}
                                isActive={activeTab === item.id}
                                isAssetPanelOpen={isAssetPanelOpen}
                                onClick={() => {
                                    if (activeTab === item.id) {
                                        if (item.id !== 'text') {
                                            setIsAssetPanelOpen(!isAssetPanelOpen);
                                        }
                                    } else {
                                        setActiveTab(item.id);
                                        if (item.id !== 'text') {
                                            setIsAssetPanelOpen(true);
                                        } else {
                                            setIsAssetPanelOpen(false);
                                        }
                                    }
                                }}
                            />
                        ))}
                    </aside>

                    {/* Secondary Asset Panel */}
                    <div
                        className={`bg-white overflow-hidden flex flex-col z-20 transition-all duration-300
                            ${isAssetPanelOpen && activeTab !== 'text' ? 'w-[320px]' : 'w-0'}`}
                    >
                        <div className="w-[320px] h-full flex flex-col border-r border-gray-300">
                            <ElementPalette activeTab={activeTab} />
                        </div>
                        {/* Toggle Panel Button - Hidden for text tab as requested */}
                        {activeTab !== 'text' && (
                            <button
                                onClick={() => setIsAssetPanelOpen(!isAssetPanelOpen)}
                                className="absolute -right-4 top-1/2 -translate-y-1/2 w-4 h-12 bg-white border border-l-0 rounded-r-lg flex items-center justify-center text-slate-400 hover:text-rose-600 transition-colors z-30"
                            >
                                {isAssetPanelOpen ? <ChevronLeft size={12} /> : <ChevronRight size={12} />}
                            </button>
                        )}
                    </div>

                    {/* Main Canvas Workspace */}
                    <main
                        className="flex-1 overflow-auto bg-slate-100 relative custom-scrollbar flex flex-col items-center"
                        onClick={() => setActiveElement(null)}
                    >
                        <div className="sticky top-0 w-full h-10 bg-transparent pointer-events-none z-10" />

                        <div className="flex-1 flex flex-col items-center min-w-fit px-20 pb-20 pt-10">
                            {/* Fixed Width Canvas Container */}
                            <div
                                className="bg-white shadow-2xl relative transition-all duration-300 origin-top"
                                style={{
                                    width: '450px', // Fixed builder width (mobile-ish style like the screenshot)
                                    minHeight: '800px', // Initial height
                                    transform: `scale(${zoom / 100})`,
                                    marginBottom: `${(zoom / 100) * 100}px` // Add margin to avoid getting cut off when scaled
                                }}
                            >
                                <Canvas elements={elements} />
                            </div>
                        </div>

                        {/* Floating Zoom Controls */}
                        <div className="fixed bottom-6 right-[340px] flex items-center bg-white rounded-full shadow-lg border p-1 gap-1 z-20">
                            <button
                                onClick={() => setZoom(Math.max(10, zoom - 10))}
                                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-600 transition-colors"
                            >
                                <Minus size={16} />
                            </button>
                            <span className="text-xs font-bold text-slate-600 w-12 text-center pointer-events-none">{zoom}%</span>
                            <button
                                onClick={() => setZoom(Math.min(200, zoom + 10))}
                                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-600 transition-colors"
                            >
                                <Plus size={16} />
                            </button>
                            <div className="w-px h-4 bg-slate-200 mx-1" />
                            <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-600 transition-colors">
                                <Search size={16} />
                            </button>
                        </div>
                    </main>

                    {/* Right Properties Sidebar */}
                    <aside className="w-[300px] bg-white p-5 flex flex-col gap-6 z-30 overflow-auto border-l border-gray-300 custom-scrollbar">
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2 text-slate-800 font-bold">
                                <Edit3 size={18} className="text-rose-500" />
                                <h2>Tuỳ chỉnh</h2>
                            </div>
                            {activeElementId && elements.find(el => el.id === activeElementId)?.type === 'text' && (
                                <p className="text-[11px] text-slate-400 font-medium italic mt-1">
                                    Kích đúp vào văn bản để chỉnh sửa
                                </p>
                            )}
                        </div>

                        {activeElementId && elements.find(el => el.id === activeElementId)?.type === 'text' ? (
                            <div className="flex flex-col gap-1">
                                <PropertySection title="Kiểu chữ" isOpen={true}>
                                    <div className="flex flex-col gap-4">
                                        {/* Style Buttons Row */}
                                        <div className="flex items-center justify-between bg-slate-50 p-1 rounded-xl border border-slate-100/50">
                                            <button className="flex-1 h-9 flex items-center justify-center font-bold text-base hover:bg-white rounded-lg transition-all">B</button>
                                            <button className="flex-1 h-9 flex items-center justify-center italic text-base hover:bg-white rounded-lg transition-all font-serif">I</button>
                                            <button className="flex-1 h-9 flex items-center justify-center line-through text-base hover:bg-white rounded-lg transition-all">S</button>
                                            <button className="flex-1 h-9 flex items-center justify-center underline text-base hover:bg-white rounded-lg transition-all underline-offset-2">U</button>
                                            <button className="flex-1 h-9 flex items-center justify-center text-sm font-medium hover:bg-white rounded-lg transition-all">Aa</button>
                                            <div className="w-px h-5 bg-slate-200 mx-1 shadow-inner" />
                                            <button className="flex-1 h-9 flex items-center justify-center hover:bg-white rounded-lg transition-all">
                                                <Baseline size={16} className="text-slate-500" />
                                            </button>
                                        </div>

                                        {/* Alignment */}
                                        <div className="flex items-center justify-between">
                                            <span className="text-[13px] font-medium text-slate-600">Căn chỉnh</span>
                                            <div className="flex bg-slate-50 p-1 rounded-xl border border-slate-100/50">
                                                <button className="p-2 rounded-lg hover:bg-white text-slate-400 transition-all"><AlignLeft size={16} /></button>
                                                <button className="p-2 rounded-lg bg-white shadow-sm text-rose-500 transition-all"><AlignCenter size={16} /></button>
                                                <button className="p-2 rounded-lg hover:bg-white text-slate-400 transition-all"><AlignRight size={16} /></button>
                                                <button className="p-2 rounded-lg hover:bg-white text-slate-400 transition-all"><AlignJustify size={16} /></button>
                                            </div>
                                        </div>

                                        {/* Font Size Row */}
                                        <div className="flex items-center justify-between">
                                            <span className="text-[13px] font-medium text-slate-600">Font size</span>
                                            <div className="flex items-center bg-white border border-slate-200 rounded-xl overflow-hidden h-9 shadow-sm">
                                                <button className="w-9 h-full flex items-center justify-center hover:bg-slate-50 active:bg-slate-100 border-r text-slate-500"><Minus size={14} /></button>
                                                <div className="w-12 h-full flex items-center justify-center text-[13px] font-bold text-slate-700">26</div>
                                                <button className="w-9 h-full flex items-center justify-center hover:bg-slate-50 active:bg-slate-100 border-l text-slate-500"><Plus size={14} /></button>
                                            </div>
                                        </div>

                                        {/* Font Family */}
                                        <div className="flex items-center justify-between">
                                            <span className="text-[13px] font-medium text-slate-600">Font</span>
                                            <button className="w-[180px] flex items-center justify-between px-4 py-2 border border-slate-200 rounded-xl text-[13px] font-semibold text-slate-700 hover:border-rose-200 hover:bg-rose-50/10 transition-all group shadow-sm">
                                                <span className="truncate">Arial</span>
                                                <span className="text-slate-300 group-hover:text-rose-400 transition-colors">▼</span>
                                            </button>
                                        </div>

                                        {/* Color Boxes */}
                                        <div className="flex items-center gap-6 pt-2 border-t border-slate-100">
                                            <div className="flex items-center gap-3 flex-1">
                                                <span className="text-[11px] font-medium text-slate-400 uppercase tracking-tighter">Màu chữ</span>
                                                <div className="w-7 h-7 rounded-lg border-2 border-white shadow-md cursor-pointer ring-1 ring-slate-100 bg-black active:scale-90 transition-transform" />
                                            </div>
                                            <div className="w-px h-6 bg-slate-100" />
                                            <div className="flex items-center gap-3 flex-1 justify-end">
                                                <span className="text-[11px] font-medium text-slate-400 uppercase tracking-tighter">Màu nền</span>
                                                <div className="w-7 h-7 rounded-lg border-2 border-white shadow-md cursor-pointer ring-1 ring-slate-100 bg-white active:scale-90 transition-transform" />
                                            </div>
                                        </div>

                                        {/* Opacity Control */}
                                        <div className="flex flex-col gap-3">
                                            <div className="flex items-center justify-between">
                                                <span className="text-[13px] font-medium text-slate-600">Trong suốt</span>
                                                <div className="px-3 py-1 bg-slate-100 border border-slate-200 rounded-lg text-xs font-bold text-slate-600 shadow-inner">1.00</div>
                                            </div>
                                            <div className="px-1">
                                                <div className="h-1.5 w-full bg-slate-100 rounded-full relative shadow-inner">
                                                    <div className="absolute top-0 left-0 h-full w-full bg-rose-400 rounded-full opacity-30 shadow-sm" />
                                                    <div className="absolute top-1/2 left-full -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-rose-500 rounded-full shadow-lg cursor-pointer hover:scale-110 transition-transform z-10" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </PropertySection>

                                <PropertySection title="Khoảng đệm">
                                    <div className="flex flex-col gap-4">
                                        <div className="flex items-center justify-between">
                                            <span className="text-[13px] font-medium text-slate-600">Khoảng đệm (Padding)</span>
                                            <button className="p-1.5 hover:bg-rose-50 hover:text-rose-500 rounded-lg text-slate-400 transition-colors shadow-sm bg-white border border-slate-100"><LinkIcon size={14} /></button>
                                        </div>

                                        <div className="flex justify-center py-2">
                                            <div className="grid grid-cols-3 grid-rows-3 gap-x-4 gap-y-2 items-center justify-items-center">
                                                <div />
                                                <input className="w-14 h-9 text-center text-xs font-bold border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-200 outline-none shadow-sm" value="0" />
                                                <div />

                                                <input className="w-14 h-9 text-center text-xs font-bold border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-200 outline-none shadow-sm" value="0" />
                                                <div className="w-[100px] h-[50px] bg-slate-50 border border-slate-200 border-dashed rounded-xl flex items-center justify-center text-[11px] text-slate-400 font-bold uppercase tracking-widest shadow-inner">Block</div>
                                                <input className="w-14 h-9 text-center text-xs font-bold border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-200 outline-none shadow-sm" value="0" />

                                                <div />
                                                <input className="w-14 h-9 text-center text-xs font-bold border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-200 outline-none shadow-sm" value="0" />
                                                <div />
                                            </div>
                                        </div>
                                    </div>
                                </PropertySection>

                                <PropertySection title="Đường viền">
                                    <div className="flex flex-col gap-6">
                                        {/* Size & Color row */}
                                        <div className="flex items-center justify-between gap-4">
                                            <div className="flex-1 flex flex-col gap-2">
                                                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-tighter">Kích thước</span>
                                                <div className="flex items-center bg-white border border-slate-200 rounded-xl overflow-hidden h-9 shadow-sm">
                                                    <input className="w-full h-full bg-transparent text-center text-xs font-bold outline-none" value="0" />
                                                </div>
                                            </div>
                                            <div className="flex flex-col gap-2 items-end">
                                                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-tighter">Màu sắc</span>
                                                <div className="w-9 h-9 rounded-xl border-2 border-white shadow-md ring-1 ring-slate-100 bg-black cursor-pointer active:scale-90 transition-transform" />
                                            </div>
                                        </div>

                                        {/* Style & Position row */}
                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="flex flex-col gap-2">
                                                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-tighter">Kiểu nét</span>
                                                <button className="flex items-center justify-between px-3 h-9 border border-slate-200 rounded-xl text-xs font-semibold hover:bg-slate-50 transition-all">Nét liền ▼</button>
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-tighter">Vị trí</span>
                                                <button className="flex items-center justify-between px-3 h-9 border border-slate-200 rounded-xl text-xs font-semibold hover:bg-slate-50 transition-all">Toàn bộ ▼</button>
                                            </div>
                                        </div>

                                        {/* Radius grid */}
                                        <div className="flex flex-col gap-3 pt-2 border-t border-slate-100">
                                            <div className="flex items-center justify-between">
                                                <span className="text-[13px] font-medium text-slate-600">Bo góc</span>
                                                <button className="p-1.5 hover:bg-rose-50 hover:text-rose-500 rounded-lg text-slate-400 transition-colors shadow-sm bg-white border border-slate-100"><LinkIcon size={14} /></button>
                                            </div>
                                            <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                                                <div className="flex items-center gap-2 bg-slate-50/50 p-1 rounded-xl border border-slate-100 border-dashed">
                                                    <div className="w-8 h-8 flex items-center justify-center text-slate-400"><CornerUpLeft size={16} /></div>
                                                    <input className="w-full bg-transparent text-xs font-bold text-center outline-none" value="0" />
                                                </div>
                                                <div className="flex items-center gap-2 bg-slate-50/50 p-1 rounded-xl border border-slate-100 border-dashed">
                                                    <div className="w-8 h-8 flex items-center justify-center text-slate-400"><CornerUpRight size={16} /></div>
                                                    <input className="w-full bg-transparent text-xs font-bold text-center outline-none" value="0" />
                                                </div>
                                                <div className="flex items-center gap-2 bg-slate-50/50 p-1 rounded-xl border border-slate-100 border-dashed">
                                                    <div className="w-8 h-8 flex items-center justify-center text-slate-400"><CornerDownLeft size={16} /></div>
                                                    <input className="w-full bg-transparent text-xs font-bold text-center outline-none" value="0" />
                                                </div>
                                                <div className="flex items-center gap-2 bg-slate-50/50 p-1 rounded-xl border border-slate-100 border-dashed">
                                                    <div className="w-8 h-8 flex items-center justify-center text-slate-400"><CornerDownRight size={16} /></div>
                                                    <input className="w-full bg-transparent text-xs font-bold text-center outline-none" value="0" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </PropertySection>

                                <PropertySection title="Đổ bóng">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-bold text-slate-800">Bật đổ bóng</span>
                                        <div className="w-10 h-5 bg-slate-200 rounded-full relative cursor-pointer p-1">
                                            <div className="w-3 h-3 bg-white rounded-full shadow-sm" />
                                        </div>
                                    </div>
                                </PropertySection>

                                <PropertySection title="Liên kết">
                                    <ProFeatureNotice />
                                    <div className="flex items-center gap-2 opacity-40 pointer-events-none">
                                        <LinkIcon size={14} className="text-slate-400" />
                                        <span className="text-xs text-slate-400">https://example.com</span>
                                    </div>
                                </PropertySection>

                                <PropertySection title="Hiệu ứng chuyển động">
                                    <ProFeatureNotice />
                                    <div className="flex items-center justify-between opacity-40 pointer-events-none">
                                        <span className="text-xs font-medium text-slate-400">Bật hiệu ứng</span>
                                        <div className="w-10 h-5 bg-slate-100 rounded-full" />
                                    </div>
                                </PropertySection>

                                <PropertySection title="Chuyển động liên tục">
                                    <ProFeatureNotice />
                                    <div className="flex flex-col gap-2 opacity-40 pointer-events-none">
                                        <span className="text-[10px] font-bold text-slate-300 uppercase">Loại chuyển động</span>
                                        <div className="p-2 border rounded-lg text-xs text-slate-300 flex justify-between">
                                            Không có <span>▼</span>
                                        </div>
                                    </div>
                                </PropertySection>
                            </div>
                        ) : activeElementId && elements.find(el => el.id === activeElementId)?.type === 'image' ? (
                            <div className="flex flex-col gap-1">
                                <PropertySection title="Nguồn ảnh" isOpen={true}>
                                    <div className="flex flex-col gap-3">
                                        <div className="w-full aspect-video bg-slate-100 rounded-lg overflow-hidden border border-slate-200 flex items-center justify-center relative group">
                                            {elements.find(el => el.id === activeElementId)?.content ? (
                                                <img
                                                    src={elements.find(el => el.id === activeElementId)?.content}
                                                    alt="Active"
                                                    className="w-full h-full object-contain"
                                                />
                                            ) : (
                                                <div className="flex flex-col items-center gap-2 text-slate-400">
                                                    <ImageIcon size={24} />
                                                    <span className="text-[10px] font-bold">Chưa có ảnh</span>
                                                </div>
                                            )}

                                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <button className="px-3 py-1.5 bg-white text-slate-800 text-xs font-bold rounded-lg hover:bg-rose-50 hover:text-rose-500 transition-colors">
                                                    Thay đổi
                                                </button>
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-1">
                                            <label className="text-[10px] font-bold text-slate-400 uppercase">URL Hình ảnh</label>
                                            <input
                                                className="w-full px-3 py-2 bg-slate-50 border border-slate-100 rounded-lg text-xs outline-none focus:ring-2 focus:ring-rose-200 transition-all font-medium text-slate-600"
                                                placeholder="https://..."
                                                value={elements.find(el => el.id === activeElementId)?.content || ''}
                                                onChange={(e) => {
                                                    if (activeElementId) updateElement(activeElementId, { content: e.target.value });
                                                }}
                                            />
                                        </div>
                                    </div>
                                </PropertySection>

                                <PropertySection title="Kích thước & Góc">
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="flex flex-col gap-2">
                                            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-tighter">Chiều rộng</span>
                                            <div className="flex items-center bg-white border border-slate-200 rounded-xl overflow-hidden h-9 shadow-sm">
                                                <input className="w-full h-full bg-transparent text-center text-xs font-bold outline-none" value="200px" readOnly />
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-tighter">Chiều cao</span>
                                            <div className="flex items-center bg-white border border-slate-200 rounded-xl overflow-hidden h-9 shadow-sm">
                                                <input className="w-full h-full bg-transparent text-center text-xs font-bold outline-none" value="Auto" readOnly />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-3 pt-3 mt-3 border-t border-slate-100">
                                        <div className="flex items-center justify-between">
                                            <span className="text-[13px] font-medium text-slate-600">Bo góc</span>
                                            <div className="px-3 py-1 bg-slate-100 border border-slate-200 rounded-lg text-xs font-bold text-slate-600 shadow-inner">0px</div>
                                        </div>
                                        <div className="px-1">
                                            <div className="h-1.5 w-full bg-slate-100 rounded-full relative shadow-inner">
                                                <div className="absolute top-0 left-0 h-full w-0 bg-rose-400 rounded-full opacity-30 shadow-sm" />
                                                <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-rose-500 rounded-full shadow-lg cursor-pointer hover:scale-110 transition-transform z-10" />
                                            </div>
                                        </div>
                                    </div>
                                </PropertySection>

                                <PropertySection title="Đường viền">
                                    <div className="flex flex-col gap-6">
                                        <div className="flex items-center justify-between gap-4">
                                            <div className="flex-1 flex flex-col gap-2">
                                                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-tighter">Kích thước</span>
                                                <div className="flex items-center bg-white border border-slate-200 rounded-xl overflow-hidden h-9 shadow-sm">
                                                    <input className="w-full h-full bg-transparent text-center text-xs font-bold outline-none" value="0" />
                                                </div>
                                            </div>
                                            <div className="flex flex-col gap-2 items-end">
                                                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-tighter">Màu sắc</span>
                                                <div className="w-9 h-9 rounded-xl border-2 border-white shadow-md ring-1 ring-slate-100 bg-black cursor-pointer active:scale-90 transition-transform" />
                                            </div>
                                        </div>
                                    </div>
                                </PropertySection>

                                <PropertySection title="Độ trong suốt">
                                    <div className="flex flex-col gap-3">
                                        <div className="flex items-center justify-between">
                                            <span className="text-[13px] font-medium text-slate-600">Opacity</span>
                                            <div className="px-3 py-1 bg-slate-100 border border-slate-200 rounded-lg text-xs font-bold text-slate-600 shadow-inner">1.00</div>
                                        </div>
                                        <div className="px-1">
                                            <div className="h-1.5 w-full bg-slate-100 rounded-full relative shadow-inner">
                                                <div className="absolute top-0 left-0 h-full w-full bg-rose-400 rounded-full opacity-30 shadow-sm" />
                                                <div className="absolute top-1/2 left-full -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-rose-500 rounded-full shadow-lg cursor-pointer hover:scale-110 transition-transform z-10" />
                                            </div>
                                        </div>
                                    </div>
                                </PropertySection>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-5">
                                <div className="flex flex-col gap-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider text-[10px]">Danh mục <span className="text-rose-500">*</span></label>
                                    <select className="w-full px-3 py-2 bg-slate-50 border border-slate-100 rounded-lg text-sm focus:ring-2 focus:ring-rose-200 outline-none transition-all font-medium">
                                        <option>Thiệp cưới</option>
                                        <option>Thiệp sinh nhật</option>
                                    </select>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider text-[10px]">Trạng thái</label>
                                    <select className="w-full px-3 py-2 bg-slate-50 border border-slate-100 rounded-lg text-sm focus:ring-2 focus:ring-rose-200 outline-none transition-all font-medium">
                                        <option>Công khai</option>
                                        <option>Bản nháp</option>
                                    </select>
                                    <p className="text-[11px] text-slate-400 italic leading-relaxed">Chỉ khi ở trạng thái "Công khai", trang mới có thể xem được từ URL của trang.</p>
                                </div>

                                <div className="flex flex-col gap-3 mt-2">
                                    <div className="flex items-center justify-between">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider text-[10px]">Bản xem trước</label>
                                        <button className="text-[10px] font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 uppercase tracking-tighter">
                                            <Edit3 size={10} /> Chỉnh sửa
                                        </button>
                                    </div>
                                    <div className="aspect-video bg-slate-100 rounded-xl overflow-hidden border border-slate-100 shadow-inner group relative">
                                        <img
                                            src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=300&auto=format&fit=crop"
                                            alt="Preview"
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <h3 className="text-sm font-bold text-slate-800 tracking-tight">Chưa có tiêu đề</h3>
                                        <p className="text-[11px] text-slate-400 leading-relaxed font-medium">Đây là cách trang của bạn sẽ hiển thị khi được chia sẻ trên Facebook, Zalo, Messenger hoặc các mạng xã hội khác.</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </aside>
                </div>
            </div >

            <DragOverlay dropAnimation={null}>
                {draggedItem ? (
                    <DragPreviewFactory item={draggedItem} />
                ) : null}
            </DragOverlay>

            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                    height: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #cbd5e1;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #94a3b8;
                }
            `}</style>
        </DndContext >
    );
}
