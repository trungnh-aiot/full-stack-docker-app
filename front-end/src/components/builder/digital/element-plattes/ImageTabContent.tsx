import { Cloud } from "lucide-react";
import { DraggableAsset } from "./DraggableAsset";

export function ImageTabContent() {
    const uploadedImages = [
        "https://images.unsplash.com/photo-1519741497674-61108169324a?q=80&w=200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1549416800-474be66e99f9?q=80&w=200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1522673607200-1648832cee33?q=80&w=200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1465495910483-e2892699738d?q=80&w=200&auto=format&fit=crop",
    ];

    return (
        <div className="flex flex-col gap-6">
            {/* Upload Zone */}
            <div className="relative group cursor-pointer">
                <div className="absolute top-3 left-3 px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-bold rounded uppercase z-10 shadow-sm border border-blue-100">
                    Free
                </div>
                <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50 hover:bg-white hover:border-rose-400 transition-all group-hover:shadow-md">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white mb-4 shadow-lg shadow-blue-500/20">
                        <Cloud size={24} />
                    </div>
                    <p className="text-xs text-slate-500 text-center leading-relaxed">
                        Kéo thả hoặc nhấn vào đây để tải lên file. Có thể tải lên tối đa 15 ảnh cùng một lúc.
                    </p>
                    <div className="mt-3 flex gap-2 text-[10px] items-center text-slate-400 font-medium">
                        <span>Đã tải: <b className="text-slate-600">0/10</b></span>
                        <div className="w-1 h-1 bg-slate-300 rounded-full" />
                        <span>Còn lại: <b className="text-rose-500">10</b></span>
                    </div>
                </div>
            </div>

            {/* Replacement Tool */}
            <button className="w-full py-3 bg-blue-50 border border-blue-100 text-blue-600 rounded-xl text-xs font-bold hover:bg-blue-100 transition-colors flex items-center justify-center gap-2">
                Hãy chọn ảnh bạn muốn thay thế
            </button>

            {/* Uploaded Files Section */}
            <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-slate-700">Tệp đã tải lên</h4>
                    <span className="text-[10px] font-bold text-slate-400">0.0000 GB / 5GB</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    {uploadedImages.map((src, idx) => (
                        <DraggableAsset key={idx} src={src} type="image" />
                    ))}
                </div>
            </div>
        </div>
    );
}