"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

type AdmissionLink = { _id: string; title: string; order: number };

type AdmissionAidContent = { 
  heading: string; 
  description?: string;
  image: string; 
  image2?: string;
  image3?: string;
};

const API_URL = process.env.NEXT_PUBLIC_ADMIN_API_URL;

export default function AdmissionAidSection() {
  const [content, setContent] = useState<AdmissionAidContent | null>(null);
  const [links, setLinks] = useState<AdmissionLink[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch(`${API_URL}/api/admission-aid`).then((r) => r.json()),
      fetch(`${API_URL}/api/admission-aid-links`).then((r) => r.json()),
    ])
      .then(([contentJson, linksJson]) => {
        if (contentJson.success) setContent(contentJson.data);
        if (linksJson.success) setLinks(linksJson.data);
      })
      .catch((err) => console.error("Failed to load admission & aid section:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <section className="w-full h-[300px] bg-gray-50 animate-pulse" />;

  if (!content) {
    return (
      <section className="w-full py-16 text-center text-gray-400">
        No Admission &amp; Aid content yet — add it from the admin panel.
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-6 py-16 bg-white text-gray-900">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Side: 3-Image Collage Layout */}
        <div className="grid grid-cols-2 gap-3 h-[420px]">
          {/* Main Tall Image (Left Column) */}
          <div className="relative w-full h-full rounded overflow-hidden">
            <Image
              src={content.image}
              alt={content.heading}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 50vw, 25vw"
            />
          </div>

          {/* Stacked Images (Right Column) */}
          <div className="grid grid-rows-2 gap-3 h-full">
            <div className="relative w-full h-full rounded overflow-hidden">
              <Image
                src={content.image2 || content.image}
                alt={`${content.heading} photo 2`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
            </div>
            <div className="relative w-full h-full rounded overflow-hidden">
              <Image
                src={content.image3 || content.image}
                alt={`${content.heading} photo 3`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
            </div>
          </div>
        </div>

        {/* Right Side: Heading, Paragraph, and Yellow-bordered Links */}
        <div>
          <h2 className="text-4xl font-serif font-bold text-[#008d44] mb-4">
            {content.heading}
          </h2>

          <p className="text-gray-600 leading-relaxed mb-8 max-w-lg text-base">
            {content.description ||
              "At UAMC, we prepare you to launch your career by providing a supportive, creative, and professional environment from which to learn practical skills."}
          </p>

          <div className="space-y-2">
            {links.map((link) => (
              <div
                key={link._id}
                className="flex items-center justify-between border-b-2 border-[#f4c430] py-4 cursor-pointer group"
              >
                <p className="font-semibold text-[#008d44] group-hover:opacity-80 transition-opacity">
                  {link.title}
                </p>
                <ArrowRight size={18} className="text-[#008d44] group-hover:translate-x-1 transition-transform" />
              </div>
            ))}

            {links.length === 0 && (
              <p className="text-sm text-gray-400">No links available.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}