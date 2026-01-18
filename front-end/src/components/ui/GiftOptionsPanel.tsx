"use client";

import React, { useState } from "react";

interface GiftOptionsPanelProps {
  onGiftWrapChange?: (enabled: boolean) => void;
  onGiftMessageChange?: (message: string) => void;
  onHidePriceChange?: (hide: boolean) => void;
  giftWrapPrice?: number;
  className?: string;
}

export function GiftOptionsPanel({
  onGiftWrapChange,
  onGiftMessageChange,
  onHidePriceChange,
  giftWrapPrice = 5.99,
  className = "",
}: GiftOptionsPanelProps) {
  const [isGiftWrap, setIsGiftWrap] = useState(false);
  const [giftMessage, setGiftMessage] = useState("");
  const [hidePrice, setHidePrice] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleGiftWrapToggle = (checked: boolean) => {
    setIsGiftWrap(checked);
    onGiftWrapChange?.(checked);
  };

  const handleMessageChange = (value: string) => {
    setGiftMessage(value);
    onGiftMessageChange?.(value);
  };

  const handleHidePriceToggle = (checked: boolean) => {
    setHidePrice(checked);
    onHidePriceChange?.(checked);
  };

  return (
    <div
      className={`bg-surface-elevated border border-border rounded-2xl overflow-hidden ${className}`}
    >
      {/* Header - Collapsible trigger */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-5 py-4 flex items-center justify-between hover:bg-background-secondary transition-colors cursor-pointer"
      >
        <div className="flex items-center gap-3">
          {/* Gift icon */}
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
            <svg
              className="w-5 h-5 text-primary"
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
          <div className="text-left">
            <span className="font-semibold text-text-primary">
              Send as a Gift
            </span>
            <p className="text-sm text-text-muted">
              Add gift wrap & personalized message
            </p>
          </div>
        </div>
        <svg
          className={`w-5 h-5 text-text-muted transition-transform ${isExpanded ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Expandable content */}
      {isExpanded && (
        <div className="px-5 pb-5 space-y-4 border-t border-border pt-4">
          {/* Gift Wrap Option */}
          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={isGiftWrap}
              onChange={(e) => handleGiftWrapToggle(e.target.checked)}
              className="w-5 h-5 mt-0.5 text-primary border-border rounded focus:ring-primary cursor-pointer accent-primary"
            />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="font-medium text-text-primary group-hover:text-primary transition-colors">
                  Premium Gift Wrapping
                </span>
                <span className="text-sm font-semibold text-primary">
                  +${giftWrapPrice.toFixed(2)}
                </span>
              </div>
              <p className="text-sm text-text-muted mt-0.5">
                Elegant wrapping with ribbon and gift tag
              </p>
            </div>
          </label>

          {/* Gift Message */}
          <div className="space-y-2">
            <label className="block">
              <span className="text-sm font-medium text-text-primary">
                Add a Gift Message
              </span>
              <span className="text-text-muted text-sm ml-1">(optional)</span>
            </label>
            <textarea
              value={giftMessage}
              onChange={(e) => handleMessageChange(e.target.value)}
              placeholder="Write a heartfelt message to the recipient..."
              rows={3}
              maxLength={250}
              className="w-full px-4 py-3 border border-border rounded-xl text-sm bg-surface focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            />
            <div className="flex justify-between text-xs text-text-muted">
              <span>Make it personal!</span>
              <span>{giftMessage.length}/250</span>
            </div>
          </div>

          {/* Hide Price Option */}
          <label className="flex items-center gap-3 cursor-pointer group p-3 bg-background-secondary rounded-xl">
            <input
              type="checkbox"
              checked={hidePrice}
              onChange={(e) => handleHidePriceToggle(e.target.checked)}
              className="w-5 h-5 text-primary border-border rounded focus:ring-primary cursor-pointer accent-primary"
            />
            <div>
              <span className="font-medium text-text-primary group-hover:text-primary transition-colors">
                Hide price from recipient
              </span>
              <p className="text-sm text-text-muted">
                Price won&apos;t appear on packing slip or receipt
              </p>
            </div>
          </label>

          {/* Free complimentary note */}
          <div className="flex items-center gap-2 text-sm text-success bg-success-light px-4 py-2 rounded-lg">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span>
              <strong>FREE:</strong> Complimentary handwritten notecard included
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

// Simple toggle for inline use
interface GiftToggleProps {
  label?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
}

export function GiftToggle({
  label = "Send as a Gift",
  checked = false,
  onChange,
  className = "",
}: GiftToggleProps) {
  return (
    <label
      className={`inline-flex items-center gap-2 cursor-pointer ${className}`}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange?.(e.target.checked)}
        className="w-5 h-5 text-primary border-border rounded focus:ring-primary cursor-pointer accent-primary"
      />
      <span className="text-sm font-medium text-text-primary">{label}</span>
      <svg
        className="w-4 h-4 text-primary"
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
    </label>
  );
}
