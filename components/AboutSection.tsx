"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { GraduationCap, ArrowRight, HandHeart, Building2 } from "lucide-react";
import ComingSoonButton from "@/components/ComingSoonButton";

type AboutContent = {
  _id: string;
  badge: string;
  headingPlain: string;
  headingHighlight: string;
  paragraph1: string;
  paragraph2: string;
  image1: string;
  image2: string;
};

const API_URL = process.env.NEXT_PUBLIC_ADMIN_API_URL;

export default function AboutSection() {
  const [about, setAbout] = useState<AboutContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/api/about`)
      .then((res) => res.json())
      .then((json) => {
        if (json.success) setAbout(json.data);
      })
      .catch((err) => console.error("Failed to load About section:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <section className="w-full h-[600px] bg-gray-50 animate-pulse" />;
  }

  if (!about) {
    return (
      <section className="w-full py-20 text-center text-gray-400">
        No About content available.
      </section>
    );
  }

  return (
    <section className="w-full bg-white py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* LEFT COLUMN: Image Collage */}
        <div className="lg:col-span-5 flex justify-center w-full">
          <div className="relative w-full max-w-[460px] h-[480px] sm:h-[520px]">
            <div className="absolute left-0 bottom-0 w-[48%] h-[72%] overflow-hidden shadow-sm">
              <Image
                src={about.image1}
                alt="Campus View Left"
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover object-center"
              />
            </div>

            <div className="absolute right-0 top-0 bottom-0 w-[48%] h-full overflow-hidden shadow-sm">
              <Image
                src={about.image2}
                alt="Campus View Right"
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover object-center"
              />
            </div>

            <div className="absolute left-1/2 top-[60%] -translate-x-1/2 -translate-y-1/2 z-20 w-36 sm:w-44 h-36 sm:h-44 drop-shadow-xl pointer-events-none">
              <Image
                src="/logo.png"
                alt="UAMC Seal Logo"
                width={180}
                height={180}
                className="w-full h-full object-contain"
                priority
              />
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Content */}
        <div className="lg:col-span-7 flex flex-col justify-center min-w-0">
          <p className="flex items-center gap-2 text-[#00a651] font-semibold text-sm mb-3">
            <GraduationCap size={18} className="text-[#00a651]" />
            {about.badge}
          </p>

          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-serif text-[#2b2b2b] mb-5 font-normal leading-tight break-words">
            {about.headingPlain} <span className="font-serif font-bold text-[#facc15]">{about.headingHighlight}</span>
          </h2>

          <p className="text-gray-600 text-sm leading-relaxed mb-4 break-words [overflow-wrap:anywhere]">
            {about.paragraph1}
          </p>
          <p className="text-gray-600 text-sm leading-relaxed mb-8 break-words [overflow-wrap:anywhere]">
            {about.paragraph2}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div className="border border-dashed border-[#00a651]/60 p-4 flex items-center gap-3.5 bg-white">
              <HandHeart className="text-[#00a651] shrink-0" size={32} strokeWidth={1.5} />
              <p className="font-serif text-xs sm:text-sm font-semibold text-[#00a651] leading-snug">
                College Mission <br /> Statement
              </p>
            </div>

            <div className="border border-dashed border-[#00a651]/60 p-4 flex items-center gap-3.5 bg-white">
              <Building2 className="text-[#00a651] shrink-0" size={32} strokeWidth={1.5} />
              <p className="font-serif text-xs sm:text-sm font-semibold text-[#00a651] leading-snug">
                College Vision <br /> Achievement
              </p>
            </div>
          </div>

          <div>
            <ComingSoonButton className="bg-[#00a651] text-white font-semibold text-xs tracking-wider uppercase px-6 py-3.5 rounded-none inline-flex items-center gap-2 hover:bg-[#008d44] transition-colors cursor-pointer">
              View Our Program <ArrowRight size={14} />
            </ComingSoonButton>
          </div>
        </div>
      </div>
    </section>
  );
}
