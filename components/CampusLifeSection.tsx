"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

type CampusCard = {
  _id: string;
  label: string;
  image: string;
  order: number;
};

type CampusLifeContent = {
  headingPlain: string;
  headingHighlight: string;
  description: string;
};

const API_URL = process.env.NEXT_PUBLIC_ADMIN_API_URL;

export default function CampusLifeSection() {
  const [content, setContent] = useState<CampusLifeContent | null>(null);
  const [cards, setCards] = useState<CampusCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch(`${API_URL}/api/campus-life`).then((res) => res.json()),
      fetch(`${API_URL}/api/campus-life-cards`).then((res) => res.json()),
    ])
      .then(([contentJson, cardsJson]) => {
        if (contentJson.success) setContent(contentJson.data);
        if (cardsJson.success) setCards(cardsJson.data);
      })
      .catch((err) => console.error("Failed to load campus life section:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <section className="w-full h-[600px] bg-[#008a3c] animate-pulse" />;
  }

  if (!content) {
    return (
      <section className="w-full bg-[#008a3c] py-20 text-center text-white/70">
        No Campus Life content available.
      </section>
    );
  }

  return (
    <section className="relative w-full bg-[#008a3c] py-20 overflow-hidden">
      
      {/* Decorative Doodles (Faint Background Icons) */}
      <div className="absolute top-8 left-[22%] opacity-20 pointer-events-none text-white hidden sm:block">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </svg>
      </div>

      <div className="absolute top-16 right-[15%] opacity-20 pointer-events-none text-white hidden sm:block">
        <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M2 12h20" />
          <path d="M12 2a10 10 0 0 1 10 10H2A10 10 0 0 1 12 2z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header Layout: Text Left, Stacked Title Right */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end mb-16">
          
          {/* Left Description Paragraph */}
          <div className="md:col-span-5 md:col-start-3">
            <p className="text-white/90 text-sm sm:text-base leading-relaxed font-sans max-w-sm">
              {content.description}
            </p>
          </div>

          {/* Right Stacked Title with Sparkle Rays */}
          <div className="md:col-span-5 text-left md:text-left">
            <h2 className="text-5xl sm:text-6xl font-serif font-semibold text-white leading-tight">
              <span className="relative inline-block">
                {content.headingPlain}
                {/* Yellow Accent Rays */}
                <span className="absolute -top-3 -right-8 flex gap-1 text-[#ffbd13]">
                  <span className="w-1 h-3 bg-[#ffbd13] rotate-[25deg] rounded-full inline-block"></span>
                  <span className="w-1 h-3.5 bg-[#ffbd13] -rotate-[10deg] rounded-full inline-block"></span>
                  <span className="w-1 h-3 bg-[#ffbd13] -rotate-[45deg] rounded-full inline-block"></span>
                </span>
              </span>
              <br />
              <span className="text-white">{content.headingHighlight}</span>
            </h2>
          </div>

        </div>

        {/* 3 Cards Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card) => (
            <div key={card._id} className="group cursor-pointer">
              
              {/* Image Box */}
              <div className="relative w-full h-[320px] sm:h-[360px] overflow-hidden rounded-sm mb-4">
                <Image
                  src={card.image}
                  alt={card.label}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>

              {/* Card Title & Arrow */}
              <p className="flex items-center gap-2 text-white font-serif text-lg sm:text-xl font-medium tracking-wide">
                <span>{card.label}</span>
                <ArrowUpRight size={20} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </p>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}