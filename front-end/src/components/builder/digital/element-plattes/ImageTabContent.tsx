import { useState, useRef } from "react";
import { Cloud, Trash2, X } from "lucide-react";
import { DraggableAsset } from "./DraggableAsset";
import { useMemoryStore } from "@/store/useMemoryStore";

export function ImageTabContent() {
    const replacementElementId = useMemoryStore((state) => state.replacementElementId);
    const setReplacementElementId = useMemoryStore((state) => state.setReplacementElementId);
    const updateElement = useMemoryStore((state) => state.updateElement);
    const addElement = useMemoryStore((state) => state.addElement);

    const [uploadedImages, setUploadedImages] = useState([
        "https://images.unsplash.com/photo-1519741497674-61108169324a?q=80&w=200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1549416800-474be66e99f9?q=80&w=200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1522673607200-1648832cee33?q=80&w=200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1465495910483-e2892699738d?q=80&w=200&auto=format&fit=crop",
    ]);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        // In a real app, we would upload these to a server
        // Here we'll just create object URLs for the preview
        const newImages = Array.from(files).map(file => URL.createObjectURL(file));
        setUploadedImages(prev => [...newImages, ...prev]);

        // Reset input
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const removeImage = (index: number) => {
        setUploadedImages(prev => prev.filter((_, i) => i !== index));
    };

    const handleAssetClick = (src: string) => {
        if (replacementElementId) {
            updateElement(replacementElementId, { content: src });
            setReplacementElementId(null);
        } else {
            // Add new element to center of canvas
            const newElement = {
                id: `element-${Date.now()}`,
                type: 'image',
                content: src,
                position: { x: 125, y: 150 }, // Default center-ish position
                size: { width: 200, height: 150 },
            };
            // @ts-ignore - simplified add
            addElement(newElement);
        }
    };

    return (
        <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-left-4 duration-300">
            {/* Upload Zone */}
            <div
                className="relative group cursor-pointer"
                onClick={handleUploadClick}
            >
                <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    multiple
                    onChange={handleFileChange}
                />
                <div className="absolute top-3 left-3 px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-bold rounded uppercase z-10 shadow-sm border border-blue-100">
                    Free
                </div>
                <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50 hover:bg-white hover:border-rose-400 transition-all group-hover:shadow-md">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white mb-4 shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
                        <Cloud size={24} />
                    </div>
                    <p className="text-xs text-slate-500 text-center leading-relaxed font-medium">
                        Kéo thả hoặc nhấn vào đây để tải lên file. <br />
                        <span className="text-[10px] text-slate-400 font-normal">Tối đa 15 ảnh cùng một lúc</span>
                    </p>
                    <div className="mt-3 flex gap-2 text-[10px] items-center text-slate-400 font-medium">
                        <span>Đã tải: <b className="text-slate-600">{uploadedImages.length}/20</b></span>
                        <div className="w-1 h-1 bg-slate-300 rounded-full" />
                        <span>Còn lại: <b className="text-rose-500">{20 - uploadedImages.length}</b></span>
                    </div>
                </div>
            </div>

            {/* Replacement Tool / Status */}
            {replacementElementId ? (
                <div className="w-full p-4 bg-rose-50 border-2 border-rose-200 rounded-xl flex flex-col gap-2 animate-pulse">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-rose-600 uppercase tracking-tight">Đang trong chế độ thay thế</span>
                        <button
                            onClick={() => setReplacementElementId(null)}
                            className="p-1 hover:bg-rose-100 rounded-lg text-rose-500"
                        >
                            <X size={14} />
                        </button>
                    </div>
                    <p className="text-[10px] text-rose-500 font-medium">Chọn một ảnh bên dưới để thay thế cho ảnh đang chọn trên trang.</p>
                </div>
            ) : (
                <button className="w-full py-3 bg-blue-50 border border-blue-100 text-blue-600 rounded-xl text-xs font-bold hover:bg-blue-100 transition-colors flex items-center justify-center gap-2 group">
                    Hãy chọn ảnh bạn muốn thay thế
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
                </button>
            )}

            {/* Uploaded Files Section */}
            <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-slate-700">Tệp đã tải lên</h4>
                    <span className="text-[10px] font-bold text-slate-400">
                        {(uploadedImages.length * 0.12).toFixed(2)} MB / 5GB
                    </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    {uploadedImages.map((src, idx) => (
                        <div key={idx} className="relative group/item">
                            <DraggableAsset
                                src={src}
                                type="image"
                                onClick={() => handleAssetClick(src)}
                            />
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    removeImage(idx);
                                }}
                                className="absolute top-1.5 right-1.5 w-6 h-6 bg-white/90 shadow-md rounded-lg flex items-center justify-center text-slate-400 hover:text-rose-500 opacity-0 group-hover/item:opacity-100 transition-all z-20 scale-90 group-hover/item:scale-100"
                            >
                                <Trash2 size={12} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
