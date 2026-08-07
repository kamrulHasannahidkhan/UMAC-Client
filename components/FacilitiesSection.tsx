"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowRight, GraduationCap } from "lucide-react";

type Facility = {
  _id: string;
  name: string;
  title: string;
  description: string;
  image: string;
  order: number;
};

const API_URL = process.env.NEXT_PUBLIC_ADMIN_API_URL;

export default function FacilitiesSection() {
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/api/facilities`)
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          setFacilities(json.data);
          if (json.data.length > 0) setActiveId(json.data[0]._id);
        }
      })
      .catch((err) => console.error("Failed to load facilities:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <section className="w-full h-[700px] bg-gray-50 animate-pulse" />;
  }

  if (facilities.length === 0) {
    return (
      <section className="w-full py-20 text-center text-gray-400">
        No facilities available.
      </section>
    );
  }

  const active = facilities.find((f) => f._id === activeId) || facilities[0];

  return (
    <section className="w-full bg-[#f8f6f2] py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="flex flex-col items-center justify-center mb-12 sm:mb-16 text-center">
          <p className="flex items-center gap-2 text-[#00a651] font-medium text-sm mb-2">
            <GraduationCap size={18} className="text-[#00a651]" />
            knowledge meets innovation
          </p>
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-[#111111]">
            Our Facilities
          </h2>
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Sidebar Navigation Tabs (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col gap-3.5">
            {facilities.map((f) => {
              const isActive = f._id === active._id;
              return (
                <button
                  key={f._id}
                  onClick={() => setActiveId(f._id)}
                  className={`w-full flex items-center justify-between px-6 py-5 transition-all duration-200 text-left rounded-sm ${
                    isActive
                      ? "bg-white shadow-sm"
                      : "bg-white/90 hover:bg-white text-gray-800"
                  }`}
                >
                  <span
                    className={`font-serif font-bold text-base sm:text-lg ${
                      isActive ? "text-[#00a651]" : "text-[#111111]"
                    }`}
                  >
                    {f.name}
                  </span>

                  {!isActive && (
                    <span className="w-8 h-8 rounded-sm bg-[#eaf4ec] text-[#a0cbab] flex items-center justify-center shrink-0">
                      <ArrowRight size={14} />
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* RIGHT COLUMN: Active Facility Card (Increased Height: 600px) */}
          <div className="lg:col-span-8 bg-white shadow-sm flex flex-col md:flex-row min-h-[600px]">
            
            {/* Facility Image Container */}
            <div className="relative w-full md:w-1/2 h-[400px] md:h-auto shrink-0">
              <Image
                src={active.image}
                alt={active.title}
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 40vw"
                priority
              />
            </div>

            {/* Facility Description & CTA (Increased Padding) */}
            <div className="p-10 sm:p-14 flex flex-col justify-between w-full md:w-1/2">
              <div>
                <h3 className="text-3xl sm:text-4xl font-serif font-bold text-[#00a651] mb-6 leading-tight">
                  {active.title}
                </h3>
                <p className="text-gray-600 text-base leading-relaxed mb-6 whitespace-pre-line font-sans break-words">
                  {active.description}
                </p>
                <a
                  href="#"
                  className="text-xs text-[#00a6f1] font-medium underline inline-flex items-center gap-1 hover:text-[#0083be] transition-colors mb-8"
                >
                  View Details <ArrowRight size={12} />
                </a>
              </div>

              <div>
                <button className="bg-[#00a651] hover:bg-[#008c44] text-white text-xs font-semibold px-7 py-4 rounded-none inline-flex items-center gap-2 transition-colors cursor-pointer">
                  View Our Program <ArrowRight size={14} />
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}