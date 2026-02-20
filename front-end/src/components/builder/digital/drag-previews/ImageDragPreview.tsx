
import React from 'react';

interface ImageDragPreviewProps {
    content?: string;
}

export const ImageDragPreview: React.FC<ImageDragPreviewProps> = ({ content }) => {
    // If no content or not a URL, return nothing (invisible drag as requested by user previously)
    // BUT since user says "kéo thả image không được", they likely want to see the image.
    // We will show the image cleanly without border/background.

    if (!content || !content.startsWith('http')) return null;

    return (
        <div className="w-24 h-24 rounded-xl shadow-2xl opacity-90 overflow-hidden bg-white">
            <img src={content} alt="Preview" className="w-full h-full object-cover" />
        </div>
    );
};
