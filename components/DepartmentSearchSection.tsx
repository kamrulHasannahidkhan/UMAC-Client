"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Search, ArrowRight, GraduationCap } from "lucide-react";

type PopularProgram = {
  title: string;
  image: string;
};

type DepartmentSearchContent = {
  _id: string;
  heading: string;
  description: string;
  searchPlaceholder: string;
  popularSearches: string[];
  popularProgram: PopularProgram | null;
  sideImage1: string;
  sideImage2: string;
  badgeNumber: string;
  badgeText: string;
};

const API_URL = process.env.NEXT_PUBLIC_ADMIN_API_URL;

export default function DepartmentSearchSection() {
  const [content, setContent] = useState<DepartmentSearchContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/api/department-search`)
      .then((res) => res.json())
      .then((json) => {
        if (json.success) setContent(json.data);
      })
      .catch((err) => console.error("Failed to load department search section:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <section className="w-full h-[600px] bg-gray-50 animate-pulse" />;
  }

  if (!content) {
    return (
      <section className="w-full py-20 text-center text-gray-400">
        No department search content available.
      </section>
    );
  }

  return (
    <section className="w-full bg-white py-16 lg:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* LEFT COLUMN: Text Content & Search Bar */}
        <div className="lg:col-span-6 flex flex-col justify-center min-w-0">
          
          {/* Main Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-serif font-bold text-[#008d44] mb-4 leading-tight break-words">
            {content.heading}
          </h2>

          {/* Description */}
          <p className="text-gray-600 text-sm sm:text-[15px] leading-relaxed mb-6 break-words [overflow-wrap:anywhere]">
            {content.description}
          </p>

          {/* Search Bar */}
          <div className="flex items-center gap-3 bg-[#eef0f8] px-5 py-3.5 mb-4 rounded-none">
            <Search size={20} className="text-[#008d44] shrink-0" />
            <input
              type="text"
              placeholder={content.searchPlaceholder}
              className="bg-transparent w-full text-sm text-gray-700 focus:outline-none placeholder:text-gray-400 font-sans"
            />
          </div>

          {/* Popular Search Keywords */}
          <p className="text-xs sm:text-sm text-[#008d44] font-bold mb-8 break-words [overflow-wrap:anywhere]">
            <span className="text-[#008d44]">Popular Search:</span>{" "}
            {content.popularSearches.map((term, i) => (
              <span key={term} className="font-normal text-gray-500">
                <a href="#" className="underline hover:text-[#008d44] transition-colors">
                  {term}
                </a>
                {i < content.popularSearches.length - 1 && " "}
              </span>
            ))}
          </p>

          {/* Popular Program Card */}
          {content.popularProgram && (
            <div className="border border-dashed border-[#008d44] bg-[#eef8f2] p-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-4 min-w-0">
                
                {/* Program Image */}
                <div className="relative w-24 h-16 shrink-0 overflow-hidden">
                  <Image
                    src={content.popularProgram.image}
                    alt={content.popularProgram.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Program Info */}
                <div className="min-w-0">
                  <span className="inline-block bg-[#ffc107] text-[#1a1a1a] text-[11px] font-bold px-2 py-0.5 mb-1">
                    Popular Program
                  </span>
                  <p className="font-serif text-base sm:text-lg font-bold text-[#008d44] truncate">
                    {content.popularProgram.title}
                  </p>
                </div>
              </div>

              {/* Action Arrow Button */}
              <button className="bg-[#008d44] text-white w-10 h-10 shrink-0 flex items-center justify-center hover:bg-[#007337] transition-colors">
                <ArrowRight size={18} />
              </button>
            </div>
          )}

        </div>

        {/* RIGHT COLUMN: Overlapping Photo Grid & Semi-Transparent Stats Card */}
        <div className="lg:col-span-6 flex justify-center w-full">
          <div className="relative w-full max-w-[500px] h-[460px] sm:h-[500px]">
            
            {/* Top Left Image */}
            <div className="absolute left-0 top-0 w-[47%] h-[56%] overflow-hidden">
              <Image
                src={content.sideImage1}
                alt="Department training"
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover object-center"
              />
            </div>

            {/* Tall Right Image (Spans full height of collage container) */}
            <div className="absolute right-0 top-0 bottom-0 w-[49%] h-full overflow-hidden">
              <Image
                src={content.sideImage2}
                alt="Department students"
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover object-center"
              />
            </div>

            {/* Green Stats Badge Card (80% Transparent & Overlapping) */}
            <div className="absolute left-0 bottom-[10%] w-[64%] bg-[#70c08b]/80 backdrop-blur-sm p-4 sm:p-5 flex items-center gap-3.5 text-white z-20 shadow-md">
              
              {/* Badge Emblem Graphic */}
              <div className="w-12 h-12 rounded-full bg-[#1e1e1e] border-2 border-yellow-400 flex items-center justify-center shrink-0 shadow">
                <GraduationCap size={22} className="text-yellow-400" />
              </div>

              {/* Stats Numbers & Description */}
              <div className="min-w-0">
                <p className="text-2xl sm:text-3xl font-extrabold leading-none mb-1 text-white">
                  {content.badgeNumber}
                </p>
                <p className="text-xs sm:text-sm font-normal leading-snug text-white/95 break-words [overflow-wrap:anywhere]">
                  {content.badgeText}
                </p>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}