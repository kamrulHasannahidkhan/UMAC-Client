"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowRight, GraduationCap } from "lucide-react";

type PrincipalContent = {
  _id: string;
  badge: string;
  headingPlain: string;
  headingHighlight: string;
  signatureImage: string;
  honorificLabel: string;
  name: string;
  positionTitle: string;
  positionSuffix: string;
  subtitle: string;
  description: string;
  buttonText: string;
  photo: string;
};

const API_URL = process.env.NEXT_PUBLIC_ADMIN_API_URL;

export default function PrincipalMessageSection() {
  const [content, setContent] = useState<PrincipalContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/api/principal-message`)
      .then((res) => res.json())
      .then((json) => {
        if (json.success) setContent(json.data);
      })
      .catch((err) => console.error("Failed to load principal message:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <section className="w-full h-[550px] bg-[#e9f3ec] animate-pulse" />;
  }

  if (!content) {
    return (
      <section className="w-full bg-[#e9f3ec] py-20 text-center text-gray-400">
        No principal message available.
      </section>
    );
  }

  return (
    <section className="w-full bg-[#e9f3ec] py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Top Badge & Heading */}
        <div className="flex flex-col items-center justify-center mb-12 sm:mb-16">
          <p className="flex items-center gap-2 text-[#00a651] font-semibold text-sm mb-2">
            <GraduationCap size={20} className="text-[#00a651]" />
            <span>{content.badge}</span>
          </p>
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-[#1a1a1a] text-center">
            {content.headingPlain}{" "}
            <span className="text-[#ffbd13]">{content.headingHighlight}</span>
          </h2>
        </div>

        {/* Content & Photo Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Text Block */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            
            {/* Signature */}
            {content.signatureImage && (
              <div className="relative w-36 h-14 mb-4">
                <Image
                  src={content.signatureImage}
                  alt="Signature"
                  fill
                  className="object-contain object-left"
                />
              </div>
            )}

            {/* Honorific & Name */}
            <p className="font-serif font-bold text-lg text-gray-900 leading-snug">
              {content.honorificLabel}
            </p>
            <p className="font-serif font-bold text-xl sm:text-2xl text-[#008d44] mb-4 leading-tight">
              {content.name}
            </p>

            {/* Title & Suffix */}
            <h3 className="text-4xl sm:text-5xl font-serif font-bold text-[#222222] mb-3 flex items-baseline gap-2 flex-wrap">
              <span>{content.positionTitle}</span>
              {content.positionSuffix && (
                <span className="text-base sm:text-lg font-serif font-normal text-gray-600">
                  {content.positionSuffix}
                </span>
              )}
            </h3>

            {/* Subtitle */}
            <p className="font-sans font-bold text-sm sm:text-base text-[#222222] mb-4">
              {content.subtitle}
            </p>

            {/* Description */}
            <p className="font-sans text-xs sm:text-sm text-gray-600 leading-relaxed mb-8 max-w-xl">
              {content.description}
            </p>

            {/* Button */}
            <div>
              <button className="bg-[#008d44] hover:bg-[#007337] text-white text-xs font-semibold px-6 py-3.5 rounded-none inline-flex items-center gap-2 transition-colors duration-200 cursor-pointer">
                <span>{content.buttonText}</span>
                <ArrowRight size={14} />
              </button>
            </div>

          </div>

          {/* Right Image Block */}
          <div className="lg:col-span-7 relative w-full h-[380px] sm:h-[480px] md:h-[520px] rounded-none overflow-hidden shadow-none">
            <Image
              src={content.photo}
              alt={content.name}
              fill
              className="object-cover object-top"
              sizes="(max-width: 1024px) 100vw, 55vw"
              priority
            />
          </div>

        </div>

      </div>
    </section>
  );
}