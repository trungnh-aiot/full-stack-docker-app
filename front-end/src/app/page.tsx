"use client";

import Link from "next/link";
import React, { useState } from "react";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { memoryTemplates, customerMemories, faqs } from "@/data/memories";

export default function HomePage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-rose-200 selection:text-rose-900">
      <Header />

      <main>
        {/* ========== HERO SECTION ========== */}
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-gradient-to-br from-rose-50 via-white to-orange-50">

          {/* Decorative blobs */}
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[800px] h-[800px] bg-rose-100/50 rounded-full blur-3xl opacity-60" />
          <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-orange-100/50 rounded-full blur-3xl opacity-60" />

          <div className="container mx-auto px-4 relative z-10 text-center">
            <Badge className="bg-white/80 backdrop-blur-sm text-rose-600 border border-rose-100 mb-6 shadow-sm hover:bg-white">
              ✨ Tạo Nên Điều Kỳ Diệu
            </Badge>
            <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 tracking-tight text-gray-900">
              KỶ NIỆM SỐ
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-orange-400">
                Lưu giữ mãi câu chuyện tình yêu
              </span>
            </h1>
            <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              Tạo trải nghiệm kỹ thuật số cá nhân hóa, lưu giữ những khoảnh khắc quý giá phía sau những câu hỏi đố vui đầy ý nghĩa. Món quà tinh thần hoàn hảo.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/memory-builder">
                <Button
                  size="lg"
                  className="bg-rose-500 hover:bg-rose-600 text-white border-none rounded-full px-8 py-6 text-lg shadow-lg shadow-rose-200 transition-all hover:scale-105"
                >
                  Bắt Đầu Tạo Ngay
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* ========== POPULAR TEMPLATES ========== */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-3xl font-bold text-gray-900">Mẫu Thiết Kế Phổ Biến</h2>
              <Link
                href="/memory-builder"
                className="text-rose-500 hover:text-rose-600 flex items-center gap-2 transition-colors font-medium"
              >
                Xem tất cả mẫu
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {memoryTemplates.map((template) => (
                <div
                  key={template.id}
                  className="group relative rounded-2xl overflow-hidden aspect-[9/16] cursor-pointer shadow-md hover:shadow-xl transition-all duration-300"
                >
                  <img
                    src={template.image}
                    alt={template.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform">
                    <span className="text-xs font-bold text-white/90 bg-rose-500/80 backdrop-blur-md px-2 py-1 rounded-full uppercase tracking-wider mb-2 inline-block">
                      {template.category}
                    </span>
                    <h3 className="text-xl font-bold text-white">
                      {template.name}
                    </h3>
                  </div>
                  {template.isPopular && (
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-white/90 backdrop-blur text-rose-600 border-none shadow-sm">
                        Phổ Biến
                      </Badge>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========== FEATURES SECTION ========== */}
        <section className="py-20 bg-rose-50/30 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900">
                Nơi Kỷ Niệm Trở Thành
                <span className="text-rose-500"> Kỷ Vật</span>
              </h2>
              <p className="text-gray-600 text-lg">
                Hơn cả một album ảnh. Đó là một hành trình tương tác tôn vinh sự kết nối độc đáo của bạn.
              </p>
            </div>

            {/* Feature 1 */}
            <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
              <div className="order-2 md:order-1 space-y-6">
                <div className="w-14 h-14 rounded-2xl bg-white shadow-md flex items-center justify-center text-rose-500 mb-4 border border-rose-100">
                  <svg
                    className="w-7 h-7"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Bảo Mật Bằng Câu Hỏi</h3>
                <p className="text-gray-600 leading-relaxed">
                  Chỉ những người biết câu chuyện của bạn mới có thể mở khóa. Tạo câu hỏi tùy chỉnh—như "Nụ hôn đầu của chúng ta ở đâu?"—để hé lộ kỷ niệm ẩn giấu.
                </p>
                <ul className="space-y-3 pt-4">
                  {[
                    "Câu hỏi tùy chỉnh",
                    "Không giới hạn lần thử",
                    "Hệ thống gợi ý",
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-700">
                      <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                        <svg
                          className="w-3.5 h-3.5 text-green-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="order-1 md:order-2 relative">
                <div className="absolute inset-0 bg-rose-200 rounded-3xl blur-2xl transform rotate-3" />
                <img
                  src="https://images.unsplash.com/photo-1516961642265-531546e84af2?q=80&w=800"
                  alt="Feature 1"
                  className="relative rounded-3xl shadow-xl border-4 border-white"
                />
              </div>
            </div>

            {/* Feature 2 */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <div className="absolute inset-0 bg-orange-200 rounded-3xl blur-2xl transform -rotate-3" />
                <img
                  src="https://images.unsplash.com/photo-1496345875659-11f7dd282d1d?w=800"
                  alt="Feature 2"
                  className="relative rounded-3xl shadow-xl border-4 border-white"
                />
              </div>
              <div className="space-y-6">
                <div className="w-14 h-14 rounded-2xl bg-white shadow-md flex items-center justify-center text-orange-500 mb-4 border border-orange-100">
                  <svg
                    className="w-7 h-7"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Thể Hiện Cá Tính</h3>
                <p className="text-gray-600 leading-relaxed">
                  Chọn từ các chủ đề được tuyển chọn hoặc tự thiết kế. Thêm nhạc, hiệu ứng động và thông điệp cá nhân để tạo nên cảm xúc trọn vẹn.
                </p>
                <Button variant="outline" className="border-rose-200 text-rose-600 hover:bg-rose-50 hover:border-rose-300">
                  Khám Phá Chủ Đề
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* ========== CUSTOMER EXAMPLES ========== */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center text-gray-900">
              Câu Chuyện Thật Từ Người Thật
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {customerMemories.map((memory) => (
                <div
                  key={memory.id}
                  className="bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-all border border-gray-100 shadow-sm hover:-translate-y-1 block"
                >
                  <div className="h-48 overflow-hidden relative">
                    <img
                      src={memory.image}
                      alt={memory.title}
                      className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-xs px-2 py-1 rounded-full text-gray-800 font-medium shadow-sm">
                      {memory.user}
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-lg mb-2 text-gray-900">{memory.title}</h3>
                    <p className="text-gray-500 text-sm line-clamp-2">
                      {memory.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========== WHY CHOOSE US ========== */}
        <section className="py-20 bg-gradient-to-b from-rose-50/50 to-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-12 text-gray-900">
              Tại Sao Chọn Kỷ Niệm Số?
            </h2>
            <div className="grid md:grid-cols-4 gap-8">
              {[
                {
                  title: "Miễn Phí Trọn Đời",
                  desc: "Tạo và chia sẻ không giới hạn kỷ niệm hoàn toàn miễn phí.",
                  icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
                  color: "text-green-500 bg-green-50",
                },
                {
                  title: "Chia Sẻ Tức Thì",
                  desc: "Gửi qua liên kết, mã QR hoặc email chỉ trong vài giây.",
                  icon: "M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z",
                  color: "text-blue-500 bg-blue-50",
                },
                {
                  title: "Riêng Tư & Bảo Mật",
                  desc: "Kỷ niệm của bạn được mã hóa và bảo vệ bằng câu hỏi đố vui.",
                  icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
                  color: "text-purple-500 bg-purple-50",
                },
                {
                  title: "Âm Nhạc & Cảm Xúc",
                  desc: "Thêm nhạc nền để tạo nên bầu không khí hoàn hảo.",
                  icon: "M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3",
                  color: "text-rose-500 bg-rose-50",
                },
              ].map((item, i) => (
                <div key={i} className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className={`w-14 h-14 mx-auto mb-4 rounded-2xl flex items-center justify-center ${item.color}`}>
                    <svg
                      className="w-7 h-7"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d={item.icon}
                      />
                    </svg>
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-gray-900">{item.title}</h3>
                  <p className="text-gray-500 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========== FAQ SECTION ========== */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-3xl font-bold mb-12 text-center text-gray-900">
              Câu Hỏi Thường Gặp
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-2xl overflow-hidden bg-gray-50/50 hover:bg-white transition-colors"
                >
                  <button
                    className="w-full flex items-center justify-between p-5 text-left font-medium text-gray-900 hover:text-rose-600 transition-colors"
                    onClick={() => toggleFaq(index)}
                  >
                    <span>{faq.question}</span>
                    <svg
                      className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${activeFaq === index ? "rotate-180 text-rose-500" : ""
                        }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${activeFaq === index ? "max-h-48" : "max-h-0"
                      }`}
                  >
                    <div className="p-5 pt-0 text-gray-600 text-sm leading-relaxed">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16 text-center text-sm text-gray-500">
              Vẫn còn câu hỏi? <a href="#" className="text-rose-500 hover:underline font-medium">Liên hệ đội ngũ hỗ trợ</a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
