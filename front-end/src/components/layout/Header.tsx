"use client";

import Link from "next/link";
import React, { useState } from "react";

interface HeaderProps {
  cartItemCount?: number;
  isLoggedIn?: boolean;
  userName?: string;
  isAdmin?: boolean;
}

export function Header({
  cartItemCount = 0,
  isLoggedIn = false,
  userName,
  isAdmin = false,
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="floating-nav">
      <nav className="bg-surface/90 backdrop-blur-lg border border-border rounded-2xl shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
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
              <span className="font-display text-xl font-bold text-text-primary hidden sm:block">
                GiftBox Pro
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden xl:flex items-center gap-6">
              <Link
                href="/box-builder"
                className="text-primary hover:text-primary-dark transition-colors font-semibold"
              >
                Tự Thiết Kế
              </Link>
              <Link
                href="/memory-builder"
                className="text-text-secondary hover:text-primary transition-colors font-medium"
              >
                Kỷ Niệm Số
              </Link>
              <Link
                href="/boxes"
                className="text-text-secondary hover:text-primary transition-colors font-medium"
              >
                Hộp Quà
              </Link>
              <Link
                href="/bundles"
                className="text-text-secondary hover:text-primary transition-colors font-medium"
              >
                Combo
              </Link>
              <Link
                href="/subscriptions"
                className="text-text-secondary hover:text-primary transition-colors font-medium"
              >
                Định Kỳ
              </Link>
              <Link
                href="/occasions"
                className="text-text-secondary hover:text-primary transition-colors font-medium"
              >
                Theo Dịp
              </Link>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              {/* Search */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 text-text-secondary hover:text-primary hover:bg-background-secondary rounded-lg transition-colors cursor-pointer"
                aria-label="Tìm kiếm"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>

              {/* User Account */}
              {isLoggedIn ? (
                <div className="relative group">
                  <button className="flex items-center gap-2 p-2 text-text-secondary hover:text-primary hover:bg-background-secondary rounded-lg transition-colors cursor-pointer">
                    <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                      <span className="text-primary font-semibold text-sm">
                        {userName?.charAt(0).toUpperCase() || "U"}
                      </span>
                    </div>
                    <span className="hidden lg:block text-sm font-medium">
                      {userName}
                    </span>
                  </button>
                  {/* Dropdown menu */}
                  <div className="absolute right-0 top-full mt-2 w-48 bg-surface border border-border rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <Link
                      href="/account"
                      className="block px-4 py-2 text-sm text-text-secondary hover:text-primary hover:bg-background-secondary rounded-t-xl"
                    >
                      Tài Khoản
                    </Link>
                    <Link
                      href="/orders"
                      className="block px-4 py-2 text-sm text-text-secondary hover:text-primary hover:bg-background-secondary"
                    >
                      Đơn Hàng
                    </Link>
                    {isAdmin && (
                      <Link
                        href="/admin"
                        className="block px-4 py-2 text-sm text-primary font-medium hover:bg-primary/10"
                      >
                        Quản Trị
                      </Link>
                    )}
                    <hr className="border-border" />
                    <button className="w-full text-left px-4 py-2 text-sm text-error hover:bg-error/10 rounded-b-xl cursor-pointer">
                      Đăng Xuất
                    </button>
                  </div>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="hidden sm:flex items-center gap-2 px-4 py-2 text-text-secondary hover:text-primary hover:bg-background-secondary rounded-lg transition-colors font-medium"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  Đăng Nhập
                </Link>
              )}

              {/* Cart */}
              <Link
                href="/cart"
                className="relative p-2 text-text-secondary hover:text-primary hover:bg-background-secondary rounded-lg transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {cartItemCount > 9 ? "9+" : cartItemCount}
                  </span>
                )}
              </Link>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="xl:hidden p-2 text-text-secondary hover:text-primary hover:bg-background-secondary rounded-lg transition-colors cursor-pointer"
                aria-label="Menu"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Search Bar (expandable) */}
          {isSearchOpen && (
            <div className="pb-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Tìm kiếm hộp quà, combo, dịp..."
                  className="w-full px-4 py-3 pl-12 border border-border rounded-xl bg-background-secondary focus:outline-none focus:ring-2 focus:ring-primary"
                  autoFocus
                />
                <svg
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          )}

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="xl:hidden pb-4">
              <div className="flex flex-col gap-2">
                <Link
                  href="/box-builder"
                  className="px-4 py-2 text-primary hover:bg-background-secondary rounded-lg transition-colors font-semibold"
                >
                  Tự Thiết Kế
                </Link>
                <Link
                  href="/memory-builder"
                  className="px-4 py-2 text-text-secondary hover:text-primary hover:bg-background-secondary rounded-lg transition-colors font-medium"
                >
                  Kỷ Niệm Số
                </Link>
                <Link
                  href="/boxes"
                  className="px-4 py-2 text-text-secondary hover:text-primary hover:bg-background-secondary rounded-lg transition-colors"
                >
                  Hộp Quà
                </Link>
                <Link
                  href="/bundles"
                  className="px-4 py-2 text-text-secondary hover:text-primary hover:bg-background-secondary rounded-lg transition-colors"
                >
                  Combo
                </Link>
                <Link
                  href="/subscriptions"
                  className="px-4 py-2 text-text-secondary hover:text-primary hover:bg-background-secondary rounded-lg transition-colors"
                >
                  Định Kỳ
                </Link>
                <Link
                  href="/occasions"
                  className="px-4 py-2 text-text-secondary hover:text-primary hover:bg-background-secondary rounded-lg transition-colors"
                >
                  Theo Dịp
                </Link>
                {!isLoggedIn && (
                  <Link
                    href="/login"
                    className="px-4 py-2 bg-primary text-white rounded-lg text-center font-medium"
                  >
                    Đăng Nhập
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
