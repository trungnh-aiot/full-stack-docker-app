export interface MemoryTemplate {
    id: string;
    name: string;
    category: "Đám Cưới" | "Sinh Nhật" | "Kỷ Niệm" | "Ngẫu Hứng" | "Valentine";
    image: string;
    isPopular?: boolean;
    isNew?: boolean;
}

export interface CustomerMemory {
    id: string;
    user: string;
    avatar?: string;
    title: string;
    image: string;
    description: string;
}

export const memoryTemplates: MemoryTemplate[] = [
    {
        id: "t1",
        name: "Thiệp Cưới",
        category: "Đám Cưới",
        image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=800",
        isPopular: true,
    },
    {
        id: "t2",
        name: "Buổi Hẹn Đầu Tiên",
        category: "Kỷ Niệm",
        image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=800",
        isPopular: true,
    },
    {
        id: "t3",
        name: "Chúc Mừng Sinh Nhật",
        category: "Sinh Nhật",
        image: "https://images.unsplash.com/photo-1530103862676-de3c9a59af57?q=80&w=800",
    },
    {
        id: "t4",
        name: "Thông Điệp Bí Mật",
        category: "Ngẫu Hứng",
        image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=800",
        isNew: true,
    },
];

export const customerMemories: CustomerMemory[] = [
    {
        id: "m1",
        user: "Sarah & John",
        title: "Hành Trình Cưới",
        image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800",
        description: "Một dòng thời gian tuyệt đẹp về ngày đặc biệt chia sẻ với khách mời.",
    },
    {
        id: "m2",
        user: "Minh Tuấn",
        title: "Bất Ngờ Cầu Hôn",
        image: "https://images.unsplash.com/photo-1522673607200-1645062e7d78?q=80&w=800",
        description: "Ẩn trong mã QR bên trong hộp quà của cô ấy.",
    },
    {
        id: "m3",
        user: "Hương Giang",
        title: "Lời Chúc Sinh Nhật",
        image: "https://images.unsplash.com/photo-1464349153735-7db50ed83c84?q=80&w=800",
        description: "Tổng hợp lời chúc video từ tất cả bạn bè thân thiết.",
    },
    {
        id: "m4",
        user: "Đức Long",
        title: "Thư Kỷ Niệm",
        image: "https://images.unsplash.com/photo-1529636721158-44a357af138d?q=80&w=800",
        description: "Bức thư tình kỹ thuật số được khóa bằng ngày kỷ niệm.",
    },
];

export const faqs = [
    {
        question: "Kỷ Niệm Số là gì?",
        answer: "Kỷ Niệm Số là một trang web cá nhân hóa chứa hình ảnh, video, văn bản và âm nhạc mà bạn có thể tạo và chia sẻ. Nó có thể được bảo mật bằng một câu hỏi đố vui để chỉ người nhận mới có thể mở khóa.",
    },
    {
        question: "Kỷ niệm được lưu trữ bao lâu?",
        answer: "Kỷ niệm bạn tạo ra được lưu trữ vĩnh viễn trên máy chủ đám mây an toàn của chúng tôi, vì vậy người thân của bạn có thể xem lại bất cứ lúc nào.",
    },
    {
        question: "Tôi có thể tùy chỉnh thiết kế không?",
        answer: "Có! Chúng tôi cung cấp nhiều mẫu và chủ đề khác nhau. Bạn có thể thay đổi màu sắc, phông chữ và thêm nhạc nền để phù hợp với tâm trạng.",
    },
    {
        question: "Nó có hiển thị tốt trên điện thoại không?",
        answer: "Chắc chắn rồi. Tất cả các mẫu của chúng tôi đều tương thích hoàn toàn và hiển thị đẹp mắt trên điện thoại, máy tính bảng và máy tính để bàn.",
    },
    {
        question: "Làm thế nào để chia sẻ?",
        answer: "Bạn sẽ nhận được một liên kết duy nhất (và mã QR tùy chọn) để chia sẻ qua tin nhắn, email hoặc in lên thiệp chúc mừng.",
    },
];
