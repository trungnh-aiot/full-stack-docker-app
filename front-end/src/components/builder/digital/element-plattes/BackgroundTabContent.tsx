import React from 'react';
import { Layout, Palette, Image as ImageIcon } from 'lucide-react';

export function BackgroundTabContent() {
    const presetColors = [
        '#FFFFFF', '#F8FAFC', '#F1F5F9', '#E2E8F0', '#CBD5E1',
        '#000000', '#1E293B', '#334155', '#475569', '#64748B',
        '#FEE2E2', '#FFEDD5', '#FEF3C7', '#ECFDF5', '#F0F9FF',
        '#EFF6FF', '#F5F3FF', '#FAE8FF', '#FDF2F8', '#FFF1F1'
    ];

    const gradients = [
        'linear-gradient(to right, #ff7e5f, #feb47b)',
        'linear-gradient(to right, #6a11cb, #2575fc)',
        'linear-gradient(to right, #ff9a9e, #fecfef)',
        'linear-gradient(to right, #a1c4fd, #c2e9fb)',
        'linear-gradient(to right, #f40076, #df98ad)',
    ];

    return (
        <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-left-4 duration-300">
            {/* Color section */}
            <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-slate-700">Màu nền</h4>
                    <button className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400">
                        <Palette size={14} />
                    </button>
                </div>
                <div className="grid grid-cols-5 gap-2">
                    {presetColors.map((color) => (
                        <button
                            key={color}
                            className="aspect-square rounded-lg border border-slate-200 shadow-sm transition-transform hover:scale-110 active:scale-95"
                            style={{ backgroundColor: color }}
                            title={color}
                        />
                    ))}
                    <button className="aspect-square rounded-lg border-2 border-dashed border-slate-200 flex items-center justify-center text-slate-400 hover:border-rose-300 hover:text-rose-500 transition-colors">
                        <span className="text-xs font-bold">+</span>
                    </button>
                </div>
            </div>

            {/* Gradient section */}
            <div className="flex flex-col gap-3">
                <h4 className="text-sm font-bold text-slate-700">Gradients</h4>
                <div className="grid grid-cols-2 gap-3">
                    {gradients.map((grad, idx) => (
                        <button
                            key={idx}
                            className="h-12 rounded-xl shadow-sm border border-slate-100 transition-all hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
                            style={{ background: grad }}
                        />
                    ))}
                </div>
            </div>

            {/* Image section */}
            <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-slate-700">Hình nền</h4>
                    <button className="text-[10px] font-bold text-blue-600 hover:underline">Xem tất cả</button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                    {[
                        'https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=200&auto=format&fit=crop',
                        'https://images.unsplash.com/photo-1557682250-33bd709cbe85?q=80&w=200&auto=format&fit=crop'
                    ].map((src, idx) => (
                        <button key={idx} className="aspect-video rounded-xl overflow-hidden border border-slate-200 group relative">
                            <img src={src} className="w-full h-full object-cover transition-transform group-hover:scale-110" alt="BG" />
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                    ))}
                </div>
            </div>

            {/* Stock patterns */}
            <div className="flex flex-col gap-3">
                <h4 className="text-sm font-bold text-slate-700">Họa tiết</h4>
                <div className="grid grid-cols-3 gap-2">
                    {[1, 2, 3].map((i) => (
                        <button key={i} className="aspect-square rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center overflow-hidden group">
                            <div className="w-full h-full opacity-10 group-hover:opacity-20 transition-opacity"
                                style={{
                                    backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
                                    backgroundSize: `${i * 4}px ${i * 4}px`
                                }}
                            />
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
