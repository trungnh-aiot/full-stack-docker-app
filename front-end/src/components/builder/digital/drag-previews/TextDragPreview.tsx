
import React from 'react';

interface TextDragPreviewProps {
    content?: string;
}

export const TextDragPreview: React.FC<TextDragPreviewProps> = ({ content }) => {
    return (
        <div className="px-4 py-2 border border-blue-500 border-dashed rounded bg-white/50 min-w-[200px] text-center shadow-sm">
            <span className="text-xl font-bold text-slate-800 pointer-events-none select-none">
                {content || "Văn bản"}
            </span>
        </div>
    );
};
