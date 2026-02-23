import { useDraggable } from '@dnd-kit/core';

export function DraggableAsset({ src, type, onClick }: { src: string, type: string, onClick?: () => void }) {
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
            onClick={() => {
                if (!isDragging) onClick?.();
            }}
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