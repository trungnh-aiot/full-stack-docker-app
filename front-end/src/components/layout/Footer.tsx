import Link from "next/link";
import React from "react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-surface-elevated border-t border-border">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                  />
                </svg>
              </div>
              <span className="font-display text-xl font-bold text-text-primary">
                GiftBox Pro
              </span>
            </Link>
            <p className="text-text-secondary text-sm mb-4 leading-relaxed">
              Hộp quà tuyển chọn cho mọi dịp. Nơi những kỷ niệm sống động qua những món quà ý nghĩa.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {["facebook", "instagram", "twitter", "pinterest"].map(
                (social) => (
                  <a
                    key={social}
                    href={`https://${social}.com`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-background-secondary hover:bg-primary hover:text-white rounded-lg flex items-center justify-center text-text-muted transition-colors"
                    aria-label={social}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      {social === "facebook" && (
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      )}
                      {social === "instagram" && (
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      )}
                      {social === "twitter" && (
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      )}
                      {social === "pinterest" && (
                        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z" />
                      )}
                    </svg>
                  </a>
                ),
              )}
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="font-display font-semibold text-text-primary mb-4">
              Cửa Hàng
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Tất Cả Hộp Quà", href: "/boxes" },
                { label: "Combo Khuyến Mãi", href: "/bundles" },
                { label: "Gói Định Kỳ", href: "/subscriptions" },
                { label: "Giá Tiết Kiệm", href: "/boxes?budget=under50" },
                { label: "Mới Về", href: "/boxes?sort=newest" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-text-secondary hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Occasions */}
          <div>
            <h4 className="font-display font-semibold text-text-primary mb-4">
              Theo Dịp
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Sinh Nhật", href: "/occasions/birthday" },
                { label: "Kỷ Niệm", href: "/occasions/anniversary" },
                { label: "Cảm Ơn", href: "/occasions/thank-you" },
                { label: "Chúc Sức Khỏe", href: "/occasions/get-well" },
                { label: "Ngẫu Hứng", href: "/occasions/just-because" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-text-secondary hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support & Trust */}
          <div>
            <h4 className="font-display font-semibold text-text-primary mb-4">
              Hỗ Trợ
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Liên Hệ", href: "/contact" },
                { label: "Câu Hỏi Thường Gặp", href: "/faq" },
                { label: "Thông Tin Vận Chuyển", href: "/shipping" },
                { label: "Đổi Trả", href: "/returns" },
                { label: "Tra Cứu Đơn Hàng", href: "/track" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-text-secondary hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-wrap items-center justify-center gap-6 mb-6">
            {/* Free Shipping */}
            <div className="flex items-center gap-2 text-sm text-text-secondary">
              <svg
                className="w-5 h-5 text-success"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                />
              </svg>
              Miễn Phí Vận Chuyển Toàn Quốc
            </div>
            {/* Secure Checkout */}
            <div className="flex items-center gap-2 text-sm text-text-secondary">
              <svg
                className="w-5 h-5 text-success"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              Thanh Toán An Toàn
            </div>
            {/* Quality Guarantee */}
            <div className="flex items-center gap-2 text-sm text-text-secondary">
              <svg
                className="w-5 h-5 text-success"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
              Đảm Bảo Chất Lượng
            </div>
          </div>

          {/* Payment Methods */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
            {["Visa", "Mastercard", "Amex", "PayPal", "Apple Pay"].map(
              (method) => (
                <div
                  key={method}
                  className="px-3 py-1.5 bg-background-secondary rounded text-xs text-text-muted font-medium"
                >
                  {method}
                </div>
              ),
            )}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-background-secondary py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-text-muted">
          <p>© {currentYear} GiftBox Pro. Bảo lưu mọi quyền.</p>
          <div className="flex gap-4">
            <Link
              href="/privacy"
              className="hover:text-primary transition-colors"
            >
              Chính Sách Bảo Mật
            </Link>
            <Link
              href="/terms"
              className="hover:text-primary transition-colors"
            >
              Điều Khoản Dịch Vụ
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
