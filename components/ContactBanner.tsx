"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

type ContactBannerContent = {
  headingPlain: string;
  headingHighlight: string;
  bgImage: string;
  logoImage?: string;
};

const API_URL = process.env.NEXT_PUBLIC_ADMIN_API_URL;

export default function ContactBanner() {
  const [content, setContent] = useState<ContactBannerContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/api/contact-banner`)
      .then((res) => res.json())
      .then((json) => {
        if (json.success) setContent(json.data);
      })
      .catch((err) => console.error("Failed to load contact banner:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <section className="w-full h-[500px] bg-gray-100 animate-pulse" />;
  }

  if (!content) {
    return (
      <section className="w-full py-20 text-center text-gray-400">
        No Contact banner yet — add it from the admin panel.
      </section>
    );
  }

  return (
    // Height doubled to 500px
    <section className="relative w-full h-[500px] flex items-center justify-center overflow-hidden bg-[#eaf4eb]">
      {/* 1. Background Medical Illustration Image */}
      <Image
        src={content.bgImage}
        alt="Banner Background"
        fill
        className="object-cover object-center"
        sizes="100vw"
        priority
      />

      {/* 2. Green Card Overlay Box (Height doubled to 360px) */}
      <div className="relative z-10 w-[94%] max-w-7xl mx-auto h-[360px] bg-[#a8d5b5]/90 backdrop-blur-sm px-10 md:px-16 flex items-center justify-between shadow-sm">
        
        {/* Left Side: Breadcrumb & Title */}
        <div className="flex flex-col justify-center">
          {/* Breadcrumbs */}
          <div className="text-sm md:text-base font-bold tracking-wide mb-3 flex items-center gap-2 uppercase">
            <Link href="/" className="text-gray-800 hover:text-[#008d44] transition-colors">
              HOME
            </Link>
            <span className="text-gray-700 font-semibold">&gt;</span>
            <span className="text-[#008d44] font-bold">Contact Us</span>
          </div>

          {/* Title Text */}
          <h1 className="text-5xl md:text-6xl font-serif text-[#2d3748] tracking-tight">
            {content.headingPlain}{" "}
            <span className="font-bold text-[#008d44]">
              {content.headingHighlight}
            </span>
          </h1>
        </div>

        {/* Right Side: College Seal Logo */}
        <div className="relative w-48 h-48 md:w-56 md:h-56 flex-shrink-0">
          <Image
            src={content.logoImage || "/logo.png"}
            alt="UAMC Logo"
            fill
            className="object-contain"
            sizes="(max-width: 768px) 192px, 224px"
          />
        </div>

      </div>
    </section>
  );
}