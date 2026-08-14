"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

type NoticeBannerContent = {
  headingPlain: string;
  headingHighlight: string;
  bgImage: string;
  logoImage?: string;
};

const API_URL = process.env.NEXT_PUBLIC_ADMIN_API_URL;

export default function NoticeBanner() {
  const [content, setContent] = useState<NoticeBannerContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/api/notice-banner`)
      .then((res) => res.json())
      .then((json) => {
        if (json.success) setContent(json.data);
      })
      .catch((err) => console.error("Failed to load notice banner:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <section className="w-full h-[440px] sm:h-[480px] bg-emerald-50/60 animate-pulse" />;
  }

  if (!content) {
    return (
      <section className="w-full py-20 text-center text-gray-400 bg-gray-50 border-b border-gray-100 text-sm">
        No Notice & Media banner configured yet — add it from the admin panel.
      </section>
    );
  }

  return (
    <section className="relative w-full h-[440px] sm:h-[480px] overflow-hidden bg-white flex items-center justify-center px-4 sm:px-8">
      {/* 1. Full-width Background Pattern */}
      {content.bgImage && (
        <Image
          src={content.bgImage}
          alt=""
          fill
          className="object-cover object-center opacity-85"
          priority
          sizes="100vw"
        />
      )}

      {/* 2. Glassmorphism Inner Card Container */}
      <div className="relative z-10 w-full max-w-5xl bg-[#9ecfc0]/80 backdrop-blur-md border border-[#85beaf]/50 rounded-2xl px-6 sm:px-12 py-12 sm:py-16 shadow-sm flex items-center justify-between gap-6">
        
        {/* Left Side: Breadcrumbs & Dynamic Heading */}
        <div className="flex-1 min-w-0">
          {/* Breadcrumb Links */}
          <nav aria-label="Breadcrumb" className="mb-3">
            <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#0f2418]/70 flex items-center flex-wrap gap-1">
              <Link href="/" className="hover:text-[#0f2418] transition-colors">
                HOME
              </Link>
              <span>&gt;</span>
              <span>NOTICE & MEDIA</span>
              <span className="text-[#0a522c]">&gt;&gt;</span>
              <span className="text-[#0a522c] font-bold">ALL NOTICES</span>
            </p>
          </nav>

          {/* Banner Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#1c3a2b] tracking-tight truncate">
            {content.headingPlain}{" "}
            <span className="text-[#0a5c30]">
              {content.headingHighlight}
            </span>
          </h1>
        </div>

        {/* Right Side: College Crest / Logo */}
        <div className="shrink-0 relative w-20 h-20 sm:w-28 sm:h-28 drop-shadow-md">
          <Image
            src={content.logoImage || "/logo.png"}
            alt="Uttara Adhunika Medical College Logo"
            fill
            className="object-contain"
            priority
          />
        </div>

      </div>
    </section>
  );
}