"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Home, Sparkles } from "lucide-react";

type BannerContent = { headingPlain: string; headingHighlight: string; bgImage: string };
const API_URL = process.env.NEXT_PUBLIC_ADMIN_API_URL;

export default function CareerBanner() {
  const [content, setContent] = useState<BannerContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/api/career-banner`)
      .then((res) => res.json())
      .then((json) => {
        if (json.success) setContent(json.data);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="w-full h-[260px] sm:h-[300px] bg-gradient-to-r from-[#0a1810] via-[#0f2418] to-[#173a27] animate-pulse" />
    );
  }

  if (!content) {
    return (
      <section className="w-full py-12 text-center text-slate-400 bg-slate-50 border-b border-slate-200 text-sm font-medium">
        No Career banner configured yet.
      </section>
    );
  }

  return (
    <section className="relative w-full h-[260px] sm:h-[300px] overflow-hidden bg-[#0a1810]">
      {/* Background Image */}
      {content.bgImage && (
        <Image
          src={content.bgImage}
          alt="Career Banner"
          fill
          className="object-cover object-top opacity-40 scale-105 transition-transform duration-700"
          priority
          sizes="100vw"
        />
      )}

      {/* Dark Ambient Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a1810] via-[#0a1810]/70 to-transparent z-0" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a1810]/90 via-[#0a1810]/50 to-transparent z-0" />

      {/* Content Container */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 h-full flex flex-col justify-end pb-8 sm:pb-10">
        
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-3">
          <ol className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-medium text-emerald-100">
            <li className="inline-flex items-center">
              <Link href="/" className="hover:text-white transition-colors flex items-center gap-1">
                <Home size={12} />
                <span>Home</span>
              </Link>
            </li>
            <li>
              <ChevronRight size={12} className="text-emerald-400/70" />
            </li>
            <li className="text-emerald-300 font-semibold flex items-center gap-1">
              <span>Career</span>
            </li>
          </ol>
        </nav>

        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
          {content.headingPlain}{" "}
          <span className="text-emerald-400 underline decoration-emerald-500/40 underline-offset-4">
            {content.headingHighlight}
          </span>
        </h1>
      </div>
    </section>
  );
}