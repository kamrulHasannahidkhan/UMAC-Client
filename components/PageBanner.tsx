"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

type BannerContent = {
  _id: string;
  titlePlain: string;
  titleHighlight: string;
  description: string;
  buttonText: string;
  bgImage: string;
};

const API_URL = process.env.NEXT_PUBLIC_ADMIN_API_URL;

export default function PageBanner() {
  const [content, setContent] = useState<BannerContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/api/page-banner`)
      .then((res) => res.json())
      .then((json) => {
        if (json.success) setContent(json.data);
      })
      .catch((err) => console.error("Failed to load page banner:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <section className="w-full h-[420px] bg-gray-100 animate-pulse" />;
  }

  if (!content) {
    return (
      <section className="w-full py-16 text-center text-gray-400">
        No page banner yet — add it from the admin panel.
      </section>
    );
  }

  return (
    <section className="relative w-full min-h-[420px] sm:min-h-[460px] flex items-center justify-center text-center text-white overflow-hidden py-10 px-4 sm:px-8">
      {/* Background Image */}
      <Image
        src={content.bgImage}
        alt={content.titlePlain || "Banner Background"}
        fill
        className="object-cover object-center"
        priority
        sizes="100vw"
      />

      {/* Global Green Tint Overlay for Background */}
      <div className="absolute inset-0 bg-[#008d44]/30 pointer-events-none" />

      {/* Wide Frosted Dark Overlay Box (Expanded width to max-w-7xl) */}
      <div className="relative z-10 max-w-7xl w-full bg-[#0a381e]/75 backdrop-blur-md px-8 py-12 sm:px-16 sm:py-16 border border-white/10 shadow-2xl flex flex-col items-center">
        
        {/* Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif mb-4 tracking-normal">
          <span className="font-bold text-[#f1b814] mr-2">
            {content.titleHighlight}
          </span>
          <span className="font-normal text-white">{content.titlePlain}</span>
        </h1>

        {/* Description */}
        <p className="text-gray-200 text-xs sm:text-sm md:text-[15px] leading-relaxed max-w-4xl mb-8 font-sans font-normal opacity-95">
          {content.description}
        </p>

        {/* Action Button */}
        <button className="bg-[#008d44] hover:bg-[#007337] text-white text-sm font-medium px-6 py-3 rounded-none inline-flex items-center gap-2 transition-colors duration-200 shadow-md">
          <span>{content.buttonText}</span>
          <ArrowRight size={16} />
        </button>

      </div>
    </section>
  );
}