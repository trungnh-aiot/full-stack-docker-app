
import React from "react";
import {
    Menu,
    Undo2,
    Redo2,
    ShieldCheck,
    Save,
    Eye,
    Rocket
} from "lucide-react";
import { MemoryElement } from "@/types";

interface BuilderHeaderProps {
    elements: MemoryElement[];
    onSave?: (elements: MemoryElement[]) => void;
}

export function BuilderHeader({ elements, onSave }: BuilderHeaderProps) {
    return (
        <header className="h-16 bg-white flex items-center justify-between px-6 z-20 shrink-0 shadow-sm border-b border-gray-300">
            <div className="flex items-center gap-6">
                <button className="text-slate-500 hover:text-slate-800 transition-colors">
                    <Menu size={24} />
                </button>
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-rose-100 rounded-lg flex items-center justify-center">
                        <span className="text-rose-500 font-bold text-lg">C</span>
                    </div>
                    <div className="font-bold text-2xl text-slate-800 tracking-tight font-serif italic">Cinelove</div>
                </div>
                <div className="h-6 w-px bg-slate-200 mx-2" />
                <div className="flex items-center gap-4">
                    <button className="text-slate-400 hover:text-slate-800 transition-colors" title="Undo">
                        <Undo2 size={20} />
                    </button>
                    <button className="text-slate-200 cursor-not-allowed" title="Redo" disabled>
                        <Redo2 size={20} />
                    </button>
                    <button className="text-slate-400 hover:text-slate-800 transition-colors">
                        <ShieldCheck size={20} />
                    </button>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-emerald-500 text-sm font-medium mr-4">
                    <Save size={16} />
                    <span>Đã lưu thay đổi</span>
                </div>

                <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all">
                    <Eye size={18} /> Xem trước
                </button>

                <button
                    className="flex items-center gap-2 px-5 py-2 bg-blue-500 text-white rounded-lg text-sm font-bold hover:bg-blue-600 transition-all shadow-md shadow-blue-500/20"
                    onClick={() => onSave?.(elements)}
                >
                    <Rocket size={18} /> Xuất bản
                </button>

                <div className="w-9 h-9 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold border-2 border-white shadow-sm ml-2 select-none">
                    T
                </div>
            </div>
        </header>
    );
}
