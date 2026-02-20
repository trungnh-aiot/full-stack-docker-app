
import React from 'react';
import { TextDragPreview } from './TextDragPreview';
import { ImageDragPreview } from './ImageDragPreview';
import { DefaultDragPreview } from './DefaultDragPreview';

interface DragPreviewFactoryProps {
    item: {
        type: string;
        content?: string;
        [key: string]: any;
    } | null;
}

export const DragPreviewFactory: React.FC<DragPreviewFactoryProps> = ({ item }) => {
    if (!item) return null;

    return (
        <div className="pointer-events-none transition-transform">
            {(() => {
                switch (item.type) {
                    case 'text':
                        return <TextDragPreview content={item.content} />;
                    case 'image':
                        return <ImageDragPreview content={item.content} />;
                    default:
                        return <DefaultDragPreview />;
                }
            })()}
        </div>
    );
};
