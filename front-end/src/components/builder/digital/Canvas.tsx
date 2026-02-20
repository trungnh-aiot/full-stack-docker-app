
import React, { useState, useEffect, useRef } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { MemoryElement } from '@/types';
import { useDraggable } from '@dnd-kit/core';
import { Trash2, Move, Copy, Plus, GripHorizontal } from 'lucide-react';
import { useMemoryStore } from '@/store/useMemoryStore';

interface CanvasProps {
    elements: MemoryElement[];
}

export function Canvas({ elements }: CanvasProps) {
    const { setNodeRef, isOver } = useDroppable({
        id: 'canvas-drop-zone',
    });

    const [canvasHeight, setCanvasHeight] = useState(800);
    const [isResizing, setIsResizing] = useState(false);
    const lastY = useRef(0);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!isResizing) return;
            const deltaY = e.clientY - lastY.current;
            setCanvasHeight((prev) => Math.max(400, prev + deltaY));
            lastY.current = e.clientY;
        };

        const handleMouseUp = () => {
            setIsResizing(false);
            document.body.style.cursor = 'default';
        };

        if (isResizing) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
            document.body.style.cursor = 'ns-resize';
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isResizing]);

    return (
        <div
            ref={setNodeRef}
            style={{ minHeight: `${canvasHeight}px` }}
            className={`relative w-full bg-white transition-all duration-300 shadow-sm ${isOver ? 'ring-4 ring-rose-500/20' : ''
                }`}
        >
            {/* Background Grid (Canvas Style) */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
                style={{
                    backgroundImage: 'radial-gradient(#000 1px, transparent 1px)',
                    backgroundSize: '20px 20px',
                    height: '100%'
                }}
            />

            {elements.length === 0 && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-300 pointer-events-none gap-4">
                    <div className="w-20 h-20 border-4 border-dashed border-slate-200 rounded-3xl flex items-center justify-center">
                        <Plus size={32} />
                    </div>
                    <p className="font-medium">Kéo và thả các yếu tố vào đây để bắt đầu</p>
                </div>
            )}

            {elements.map((element) => (
                <DraggableElement key={element.id} element={element} />
            ))}

            {/* Manual Height Resize Handle */}
            <div
                className="absolute left-0 right-0 -bottom-10 h-18 cursor-ns-resize group z-40 flex flex-col items-center justify-center"
                onMouseDown={(e) => {
                    e.preventDefault();
                    lastY.current = e.clientY;
                    setIsResizing(true);
                }}
            >
                <div className="w-24 h-1.5 bg-slate-200 rounded-full group-hover:bg-rose-400 group-active:bg-rose-500 transition-all shadow-sm flex items-center justify-center relative">
                    <div className="absolute -top-6 bg-slate-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap font-bold">
                        KÉO ĐỂ THAY ĐỔI CHIỀU DÀI TRANG
                    </div>
                    <GripHorizontal size={16} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="mt-2 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-opacity">
                    Resize Canvas
                </div>
            </div>
        </div>
    );
}

function DraggableElement({ element }: { element: MemoryElement }) {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: element.id,
        data: {
            type: element.type,
            isNew: false
        }
    });

    const removeElement = useMemoryStore((state) => state.removeElement);
    const addElement = useMemoryStore((state) => state.addElement);
    const activeElementId = useMemoryStore((state) => state.activeElementId);
    const setActiveElement = useMemoryStore((state) => state.setActiveElement);

    const isActive = activeElementId === element.id;

    const handleCopy = (e: React.MouseEvent) => {
        e.stopPropagation();
        const newElement: MemoryElement = {
            ...element,
            id: `element-${Date.now()}`,
            position: {
                x: Math.round(element.position.x + 20),
                y: Math.round(element.position.y + 20)
            }
        };
        addElement(newElement);
        setActiveElement(newElement.id);
    };

    const style: React.CSSProperties = {
        transform: transform ? `translate3d(${Math.round(transform.x)}px, ${Math.round(transform.y)}px, 0)` : undefined,
        left: Math.round(element.position.x),
        top: Math.round(element.position.y),
        position: 'absolute',
        zIndex: isActive ? 100 : 10,
        opacity: isDragging ? 0.4 : 1,
        pointerEvents: isDragging ? 'none' : undefined,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            onClick={(e) => {
                e.stopPropagation();
                setActiveElement(element.id);
            }}
            className={`group cursor-move transition-shadow ${isActive ? 'z-50' : 'hover:z-20'}`}
        >
            <div
                {...listeners}
                {...attributes}
                className={`relative rounded-sm transition-all duration-200 ${isActive
                    ? 'ring-2 ring-rose-500 shadow-xl ring-offset-2 ring-offset-white'
                    : 'hover:ring-1 hover:ring-rose-300'
                    }`}
            >
                {/* Content Renderers */}
                <div className="overflow-hidden rounded-[inherit]">
                    {element.type === 'text' && (
                        <div className="p-2 min-w-[50px] whitespace-pre-wrap">
                            <p className="text-slate-800 leading-tight outline-none focus:ring-0" contentEditable suppressContentEditableWarning>
                                {element.content}
                            </p>
                        </div>
                    )}

                    {element.type === 'image' && (
                        <div className="w-[200px] h-[150px] bg-slate-100 flex items-center justify-center text-slate-300 rounded shadow-inner overflow-hidden">
                            {element.content ? (
                                <img
                                    src={element.content}
                                    alt="Content"
                                    draggable={false}
                                    className="w-full h-full object-cover pointer-events-none select-none"
                                    style={{ imageRendering: 'pixelated' as any }} // or 'auto'
                                />
                            ) : (
                                <ImageIcon size={32} />
                            )}
                        </div>
                    )}
                </div>

                {/* Toolbar for active element */}
                {isActive && (
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex items-center bg-slate-900 text-white rounded-lg shadow-xl px-1.5 py-1 gap-1 animate-in fade-in slide-in-from-bottom-2 duration-200">
                        <button className="p-1.5 hover:bg-white/20 rounded transition-colors" title="Move"><Move size={14} /></button>
                        <button
                            className="p-1.5 hover:bg-white/20 rounded transition-colors"
                            title="Copy"
                            onClick={handleCopy}
                        >
                            <Copy size={14} />
                        </button>
                        <div className="w-px h-4 bg-white/20 mx-0.5" />
                        <button
                            className="p-1.5 hover:bg-rose-500 rounded transition-colors text-rose-300 hover:text-white"
                            title="Delete"
                            onClick={() => removeElement(element.id)}
                        >
                            <Trash2 size={14} />
                        </button>
                    </div>
                )}

                {/* Resize Handles */}
                {isActive && (
                    <>
                        <div className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-white border-2 border-rose-500 rounded-full cursor-nw-resize" />
                        <div className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-white border-2 border-rose-500 rounded-full cursor-ne-resize" />
                        <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-white border-2 border-rose-500 rounded-full cursor-sw-resize" />
                        <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-white border-2 border-rose-500 rounded-full cursor-se-resize shadow-md" />
                    </>
                )}
            </div>
        </div>
    );
}

function ImageIcon({ size }: { size: number }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
            <circle cx="9" cy="9" r="2" />
            <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
        </svg>
    );
}
