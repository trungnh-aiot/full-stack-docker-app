import React from 'react';
import { Image as ImageIcon, Type, Search, Layout, Sparkles } from 'lucide-react';
import { ImageTabContent } from './ImageTabContent';
import { BackgroundTabContent } from './BackgroundTabContent';
import { TextTabContent } from './TextTabContent';
import { StickerTabContent } from './StickerTabContent';

interface ElementPaletteProps {
    activeTab: string;
}

export function ElementPalette({ activeTab }: ElementPaletteProps) {
    return (
        <div className="flex flex-col h-full bg-white">
            <div className="p-5 shrink-0">
                <h3 className="font-bold text-slate-800 flex items-center gap-2 capitalize">
                    {activeTab === 'image' && <ImageIcon size={18} className="text-rose-500" />}
                    {activeTab === 'text' && <Type size={18} className="text-rose-500" />}
                    {activeTab === 'background' && <Layout size={18} className="text-rose-500" />}
                    {activeTab === 'effects' && <Sparkles size={18} className="text-rose-500" />}
                    {activeTab === 'effects' ? 'Nhãn dán' : activeTab === 'text' ? 'Văn bản' : activeTab === 'image' ? 'Hình ảnh' : activeTab === 'background' ? 'Phông nền' : activeTab}
                </h3>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar p-5">
                {activeTab === 'image' && <ImageTabContent />}
                {activeTab === 'text' && <TextTabContent />}
                {activeTab === 'effects' && <StickerTabContent />}
                {activeTab === 'background' && <BackgroundTabContent />}
                {(!['image', 'text', 'background', 'effects'].includes(activeTab)) && (
                    <div className="text-center py-10 text-slate-400 text-sm">Đang phát triển nội dung cho {activeTab}...</div>
                )}
            </div>
        </div>
    );
}



