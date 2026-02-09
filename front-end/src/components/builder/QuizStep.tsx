import React from "react";
import { useForm } from "react-hook-form";
import { QuizConfig } from "@/types";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";

interface QuizStepProps {
    initialData?: QuizConfig;
    onNext: (data: QuizConfig) => void;
    onBack?: () => void;
}

export function QuizStep({ initialData, onNext, onBack }: QuizStepProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<QuizConfig>({
        defaultValues: {
            question: initialData?.question || "",
            answer: initialData?.answer || "",
        },
    });

    const onSubmit = (data: QuizConfig) => {
        onNext(data);
    };

    return (
        <div className="flex-1 flex overflow-hidden">
            {/* Left Sidebar: Locked Widgets */}
            <aside className="w-80 border-r border-[#f4f0f2] dark:border-[#3d2a33] bg-white dark:bg-[#2d1a24] p-6 hidden lg:flex flex-col gap-6 overflow-y-auto">
                <div>
                    <h3 className="text-lg font-bold mb-2">Thư viện Widget</h3>
                    <div className="bg-primary/5 p-3 rounded-lg border border-primary/20 mb-4">
                        <p className="text-primary text-xs font-semibold leading-relaxed flex items-center gap-2">
                            <span className="material-symbols-outlined text-sm">lock</span>
                            Hoàn thành Quiz để mở khóa
                        </p>
                    </div>
                </div>
                <div className="flex flex-col gap-3">
                    {[
                        { icon: 'image', label: 'Hình ảnh', desc: 'Thêm khoảnh khắc đáng nhớ' },
                        { icon: 'videocam', label: 'Video', desc: 'Gửi lời nhắn chuyển động' },
                        { icon: 'map', label: 'Bản đồ', desc: 'Vị trí kỷ niệm của đôi mình' },
                        { icon: 'music_note', label: 'Âm nhạc', desc: 'Giai điệu cảm xúc' },
                        { icon: 'favorite', label: 'Lời chúc', desc: 'Viết những điều chân thành' },
                    ].map((item, idx) => (
                        <div key={idx} className="widget-locked group relative p-4 rounded-xl border border-dashed border-[#e6dbe0] dark:border-[#3d2a33] bg-background-light dark:bg-background-dark opacity-60 grayscale cursor-not-allowed">
                            <div className="flex items-center gap-4 mb-2">
                                <span className="material-symbols-outlined p-2 bg-white dark:bg-[#3d2a33] rounded-lg">{item.icon}</span>
                                <span className="font-semibold text-sm">{item.label}</span>
                            </div>
                            <p className="text-xs text-[#896172]">{item.desc}</p>
                        </div>
                    ))}
                </div>
                <div className="mt-auto pt-6">
                    <button className="w-full py-3 bg-[#e6dbe0] dark:bg-[#3d2a33] text-[#896172] font-bold rounded-full flex items-center justify-center gap-2 cursor-not-allowed" disabled>
                        <span className="material-symbols-outlined">lock</span>
                        Khóa thiết kế
                    </button>
                </div>
            </aside>

            {/* Center Content: Quiz Setup */}
            <div className="flex-1 p-8 lg:p-12 overflow-y-auto flex flex-col items-center">
                <div className="max-w-[800px] w-full">
                    <div className="mb-10 text-center">
                        <div className="inline-flex items-center gap-3 px-4 py-2 bg-primary/10 rounded-full mb-4">
                            <span className="material-symbols-outlined text-primary text-sm">verified_user</span>
                            <span className="text-primary text-xs font-bold uppercase tracking-widest">Bảo mật trước - Trang trí sau</span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-extrabold mb-4 tracking-tight text-gray-900">BƯỚC 1: TẠO THỬ THÁCH QUIZ</h1>
                        <p className="text-[#896172] dark:text-gray-400 max-w-[500px] mx-auto text-lg leading-relaxed">
                            Người nhận phải trả lời đúng câu hỏi của bạn mới có thể khám phá món quà bí mật bên trong.
                        </p>
                    </div>

                    <div className="bg-white dark:bg-[#2d1a24] rounded-2xl shadow-xl shadow-primary/5 p-8 border border-[#f4f0f2] dark:border-[#3d2a33]">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                            <div className="relative bg-background-light dark:bg-background-dark p-6 rounded-xl border-l-4 border-primary">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <span className="flex items-center justify-center size-8 bg-primary text-white rounded-full font-bold text-sm">01</span>
                                        <h4 className="font-bold text-[#181114] dark:text-white uppercase tracking-wide text-sm">Câu hỏi bảo mật</h4>
                                    </div>
                                    <span className="text-xs text-primary font-bold bg-primary/10 px-2 py-1 rounded">BẮT BUỘC</span>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="question" className="text-sm font-semibold text-[#896172] ml-1">Nhập câu hỏi</label>
                                        <input
                                            type="text"
                                            id="question"
                                            {...register("question", { required: "Vui lòng nhập câu hỏi bảo mật." })}
                                            className={`w-full h-12 px-4 rounded-full border ${errors.question ? "border-red-500" : "border-[#e6dbe0]"} dark:border-[#3d2a33] dark:bg-[#221018] focus:ring-primary focus:border-primary`}
                                            placeholder="Ví dụ: Ngày đầu tiên mình gặp nhau là ở đâu?"
                                        />
                                        {errors.question && (
                                            <p className="mt-1 text-sm text-red-500 ml-1">{errors.question.message}</p>
                                        )}
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="answer" className="text-sm font-semibold text-[#896172] ml-1">Nhập đáp án đúng</label>
                                        <input
                                            type="text"
                                            id="answer"
                                            {...register("answer", { required: "Vui lòng nhập câu trả lời." })}
                                            className={`w-full h-12 px-4 rounded-full border ${errors.answer ? "border-red-500" : "border-[#e6dbe0]"} dark:border-[#3d2a33] dark:bg-[#221018] focus:ring-primary focus:border-primary`}
                                            placeholder="Ví dụ: Hồ Tây"
                                        />
                                        {errors.answer && (
                                            <p className="mt-1 text-sm text-red-500 ml-1">{errors.answer.message}</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-12 flex flex-col sm:flex-row items-center gap-4">
                                <button type="submit" className="w-full sm:flex-1 py-4 bg-primary text-white font-bold rounded-full hover:bg-primary/90 transition-all shadow-lg shadow-primary/30 flex items-center justify-center gap-3">
                                    <span className="material-symbols-outlined">verified</span>
                                    Xác nhận & Mở khóa trang trí
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="mt-8 flex items-center justify-center gap-3 text-sm text-[#896172]">
                        <span className="material-symbols-outlined text-sm">info</span>
                        <p>Thông tin này được mã hóa bảo mật 256-bit.</p>
                    </div>
                </div>
            </div>

            {/* Right Sidebar: Instructions */}
            <aside className="w-80 border-l border-[#f4f0f2] dark:border-[#3d2a33] bg-white dark:bg-[#2d1a24] p-6 hidden xl:flex flex-col gap-6">
                <div>
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">lightbulb</span>
                        Hướng dẫn
                    </h3>
                </div>
                <div className="space-y-6">
                    {[
                        { icon: 'psychology', title: 'Chọn câu hỏi cá nhân', desc: 'Hãy chọn những câu hỏi mà chỉ bạn và người nhận mới biết câu trả lời để tăng tính bí mật.' },
                        { icon: 'spellcheck', title: 'Lưu ý về đáp án', desc: 'Đáp án không phân biệt hoa thường, nhưng nên chọn từ ngữ ngắn gọn, rõ ràng.' },
                        { icon: 'shield_lock', title: 'Tính năng bắt buộc', desc: 'Đây là bước quan trọng để bảo vệ món quà kỹ thuật số của bạn khỏi sự tò mò của người lạ.' },
                    ].map((item, idx) => (
                        <div key={idx} className="flex gap-4">
                            <div className="size-8 min-w-8 flex items-center justify-center bg-primary/10 rounded-lg text-primary">
                                <span className="material-symbols-outlined text-xl">{item.icon}</span>
                            </div>
                            <div className="flex-1">
                                <h4 className="font-bold text-sm mb-1">{item.title}</h4>
                                <p className="text-xs text-[#896172] leading-relaxed">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-auto bg-background-light dark:bg-[#3d2a33] p-4 rounded-2xl text-center">
                    <div className="mb-3 flex justify-center">
                        <div className="size-16 flex items-center justify-center bg-white dark:bg-[#221018] rounded-full shadow-sm">
                            <span className="material-symbols-outlined text-3xl text-primary">redeem</span>
                        </div>
                    </div>
                    <p className="text-sm font-bold mb-1">Quà tặng sắp sẵn sàng!</p>
                    <p className="text-xs text-[#896172]">Hoàn thành bước này để bắt đầu chèn ảnh, video và nhạc vào món quà.</p>
                </div>
            </aside>
        </div>
    );
}
