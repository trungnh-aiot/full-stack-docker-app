"use client";

import React, { useState } from "react";
import { QuizConfig, MemoryConfig, DigitalGift, MemoryBuilderType } from "@/types";
import { QuizStep } from "./QuizStep";
import { MemoryStep } from "./MemoryStep";

export function MemoryBuilder() {
    const [step, setStep] = useState<MemoryBuilderType>(MemoryBuilderType.QUIZZ);
    const [quizData, setQuizData] = useState<QuizConfig | null>(null);
    const [memoryData, setMemoryData] = useState<MemoryConfig | null>(null);

    const handleQuizNext = (data: QuizConfig) => {
        setQuizData(data);
        setStep(MemoryBuilderType.MEMORY);
    };

    const handleMemoryNext = (data: MemoryConfig) => {
        setMemoryData(data);
        setStep(MemoryBuilderType.FINISH);
        // Here you would typically save the data to the backend
        console.log("Final Digital Gift Data:", {
            quiz: quizData,
            memory: data,
            createdAt: new Date().toISOString(),
        });
    };

    const handleBack = () => {
        if (step === MemoryBuilderType.MEMORY) setStep(MemoryBuilderType.QUIZZ);
        if (step === MemoryBuilderType.FINISH) setStep(MemoryBuilderType.MEMORY);
    };
    const step2Active = [
        MemoryBuilderType.MEMORY,
        MemoryBuilderType.FINISH,
    ].includes(step);

    if (step === MemoryBuilderType.FINISH) {
        const theme = memoryData?.theme || "romantic";
        const bgClass =
            theme === "romantic"
                ? "bg-rose-50"
                : theme === "fun"
                    ? "bg-yellow-50"
                    : "bg-gray-50";

        return (
            <div className={`max-w-3xl mx-auto text-center py-12 ${bgClass} rounded-2xl p-8`}>
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg
                        className="w-10 h-10 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                        />
                    </svg>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Kỷ Niệm Đã Được Tạo!
                </h2>
                <p className="text-gray-600 mb-8">
                    Kỷ niệm của bạn đã được đóng gói an toàn.
                </p>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-left max-w-lg mx-auto">
                    <h3 className="font-semibold text-gray-900 mb-2">Tóm Tắt</h3>
                    <div className="space-y-3 text-sm">
                        <div>
                            <span className="text-gray-500 block">Câu Hỏi Bảo Mật:</span>
                            <span className="font-medium">{quizData?.question}</span>
                        </div>
                        <div>
                            <span className="text-gray-500 block">Câu Trả Lời:</span>
                            <span className="font-medium">{quizData?.answer}</span>
                        </div>
                        <div className="pt-2 border-t border-gray-100 mt-2">
                            <span className="text-gray-500 block">Lời Nhắn:</span>
                            <p className="italic text-gray-700">"{memoryData?.message}"</p>
                        </div>
                    </div>
                </div>

                <div className="mt-8">
                    <button
                        onClick={() => window.location.reload()}
                        className="text-rose-600 hover:text-rose-700 font-medium"
                    >
                        Tạo Kỷ Niệm Khác
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full">
            {/* Stepper */}
            <div className="flex justify-center mb-12">
                <div className="flex items-center space-x-4">
                    <div
                        className={`flex items-center justify-center w-10 h-10 rounded-full font-bold ${step === MemoryBuilderType.QUIZZ
                            ? "bg-rose-600 text-white"
                            : "bg-rose-100 text-rose-600"
                            }`}
                    >
                        1
                    </div>
                    <div className="w-16 h-1 bg-gray-200">
                        <div
                            className={`h-full bg-rose-600 transition-all ${step === MemoryBuilderType.QUIZZ ? "w-0" : "w-full"
                                }`}
                        />
                    </div>
                    <div
                        className={`flex items-center justify-center w-10 h-10 rounded-full font-bold ${step2Active
                            ? "bg-rose-600 text-white"
                            : "bg-gray-200 text-gray-500"
                            }`}
                    >
                        2
                    </div>
                </div>
            </div>

            {step === MemoryBuilderType.QUIZZ && (
                <QuizStep initialData={quizData || undefined} onNext={handleQuizNext} />
            )}

            {step === MemoryBuilderType.MEMORY && (
                <MemoryStep
                    initialData={memoryData || undefined}
                    onNext={handleMemoryNext}
                    onBack={handleBack}
                />
            )}
        </div>
    );
}
