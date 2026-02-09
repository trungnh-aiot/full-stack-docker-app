
export interface MemoryElement {
    id: string;
    type: 'text' | 'image' | 'sticker';
    content: string; // text content or image URL
    position: { x: number; y: number };
    size?: { width: number; height: number };
    style?: Record<string, string | number>;
    rotation?: number;
}

export interface MemoryTemplateDesign {
    id: string;
    name: string;
    background: string; // color or image url
    elements: MemoryElement[];
    thumbnail: string;
}
