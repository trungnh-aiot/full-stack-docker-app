
import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { MemoryElement } from '@/types';
import { useDraggable } from '@dnd-kit/core';

interface CanvasProps {
    elements: MemoryElement[];
}

export function Canvas({ elements }: CanvasProps) {
    const { setNodeRef, isOver } = useDroppable({
        id: 'canvas-drop-zone',
    });

    return (
        <div
            ref={setNodeRef}
            className={`relative w-full h-[600px] bg-white rounded-xl shadow-sm border-2 transition-colors overflow-hidden ${isOver ? 'border-rose-400 bg-rose-50' : 'border-dashed border-gray-300'
                }`}
        >
            {elements.length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center text-gray-400 pointer-events-none">
                    <p>Kéo và thả các yếu tố vào đây</p>
                </div>
            )}

            {elements.map((element) => (
                <DraggableElement key={element.id} element={element} />
            ))}
        </div>
    );
}

function DraggableElement({ element }: { element: MemoryElement }) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: element.id,
        data: {
            type: element.type,
            isNew: false
        }
    });

    const style = {
        transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
        left: element.position.x,
        top: element.position.y,
        position: 'absolute' as const,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
            className="cursor-move group"
        >
            {/* Element Content */}
            <div className="relative border border-transparent group-hover:border-blue-400 group-hover:bg-blue-50/10 p-1 rounded transition-colors">
                {element.type === 'text' && (
                    <p className="text-xl font-medium text-gray-800 pointer-events-none select-none">
                        {element.content}
                    </p>
                )}

                {element.type === 'sticker' && (
                    <div className="text-4xl pointer-events-none select-none">
                        {element.content}
                    </div>
                )}

                {element.type === 'image' && (
                    <div className="w-32 h-32 bg-gray-200 flex items-center justify-center text-gray-400 rounded overflow-hidden pointer-events-none select-none">
                        {element.content ? (
                            <img src={element.content} alt="Element" className="w-full h-full object-cover" />
                        ) : (
                            <span>No Image</span>
                        )}
                    </div>
                )}

                {/* Resize Handles (Placeholder) */}
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 cursor-nwse-resize" />
            </div>
        </div>
    );
}
