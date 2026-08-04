"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Star } from "lucide-react";

type Testimonial = {
  _id: string;
  rating: number;
  quote: string;
  name: string;
  role: string;
  avatar: string;
  order: number;
};

type TestimonialsContent = {
  heading: string;
  subheading: string;
};

const API_URL = process.env.NEXT_PUBLIC_ADMIN_API_URL;
const PER_PAGE = 3;

export default function TestimonialsSection() {
  const [content, setContent] = useState<TestimonialsContent | null>(null);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch(`${API_URL}/api/testimonials`).then((res) => res.json()),
      fetch(`${API_URL}/api/testimonials-list`).then((res) => res.json()),
    ])
      .then(([contentJson, listJson]) => {
        if (contentJson.success) setContent(contentJson.data);
        if (listJson.success) setTestimonials(listJson.data);
      })
      .catch((err) => console.error("Failed to load testimonials:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <section className="w-full h-[500px] bg-[#f4f6f4] animate-pulse" />;
  }

  if (!content) {
    return (
      <section className="w-full bg-[#f4f6f4] py-20 text-center text-gray-400">
        No testimonials section yet — add it from the admin panel.
      </section>
    );
  }

  const totalPages = Math.max(1, Math.ceil(testimonials.length / PER_PAGE));
  const visible = testimonials.slice(
    page * PER_PAGE,
    page * PER_PAGE + PER_PAGE
  );

  return (
    <section className="w-full bg-[#f4f6f4] py-20 sm:py-24">
      <div className="max-w-7xl mx-auto px-6 text-center">
        
        {/* Section Heading & Subheading */}
        <h2 className="text-4xl sm:text-5xl font-serif font-bold text-[#008d44] mb-3">
          {content.heading}
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 mb-14 font-sans">
          {content.subheading}
        </p>

        {/* 3-Card Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 text-left mb-12">
          {visible.map((t) => (
            <div
              key={t._id}
              className="bg-white p-8 sm:p-9 shadow-sm rounded-none flex flex-col justify-between"
            >
              <div>
                {/* Rating Stars */}
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={15}
                      className={
                        i < t.rating
                          ? "fill-[#ffbd13] text-[#ffbd13]"
                          : "text-gray-200"
                      }
                    />
                  ))}
                </div>

                {/* Quote Content */}
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-8 font-sans">
                  {t.quote}
                </p>
              </div>

              {/* Author Footer & Outlined Quote Icon */}
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-3">
                  {/* User Avatar */}
                  <div className="relative w-11 h-11 rounded-full overflow-hidden shrink-0">
                    <Image
                      src={t.avatar}
                      alt={t.name}
                      fill
                      className="object-cover"
                      sizes="44px"
                    />
                  </div>

                  {/* Name & Role */}
                  <div>
                    <p className="font-serif font-bold text-[#008d44] text-sm sm:text-base leading-snug">
                      {t.name}
                    </p>
                    <p className="text-xs text-gray-500 font-sans">
                      {t.role}
                    </p>
                  </div>
                </div>

                {/* Outlined Green Double Quote SVG */}
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#008d44"
                  strokeWidth="1.2"
                  className="shrink-0 opacity-80"
                >
                  <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.75-2-2-2H4c-1.25 0-2 .75-2 2v6c0 1.25.75 2 2 2h3c0 4-2 6-4 6v2z" />
                  <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.75-2-2-2h-4c-1.25 0-2 .75-2 2v6c0 1.25.75 2 2 2h3c0 4-2 6-4 6v2z" />
                </svg>
              </div>
            </div>
          ))}

          {visible.length === 0 && (
            <p className="text-sm text-gray-400 col-span-3 text-center py-10">
              No testimonials available yet.
            </p>
          )}
        </div>

        {/* Pagination Dots */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  i === page ? "bg-[#ffbd13] w-2.5" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}