"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, GraduationCap, Briefcase, Calendar } from "lucide-react";

type Alumni = {
  _id: string;
  name: string;
  batch: string;
  designation: string;
  image: string;
};

type AlumniSectionContent = {
  heading: string;
  subheading: string;
  viewAllLink: string;
};

const API_URL = process.env.NEXT_PUBLIC_ADMIN_API_URL;

export default function AlumniSection() {
  const [content, setContent] = useState<AlumniSectionContent | null>(null);
  const [alumniList, setAlumniList] = useState<Alumni[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch(`${API_URL}/api/alumni-section`).then((res) => res.json()),
      fetch(`${API_URL}/api/alumni-list`).then((res) => res.json()),
    ])
      .then(([contentJson, alumniJson]) => {
        if (contentJson.success) setContent(contentJson.data);
        if (alumniJson.success) setAlumniList(alumniJson.data);
      })
      .catch((err) => console.error("Failed to load alumni section:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="w-full py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 space-y-8">
          <div className="h-10 w-64 bg-slate-200 rounded animate-pulse mx-auto" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-80 bg-white rounded-2xl border border-slate-200 animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full bg-slate-50/80 py-16 sm:py-24 border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 sm:mb-16 gap-4 border-b border-slate-200/80 pb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-semibold mb-3">
              <GraduationCap size={14} /> Alumni Network
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-slate-900 tracking-tight">
              {content?.heading || "Our Alumni"}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              {content?.subheading || "Proud graduates of Uttara Adhunika Medical College"}
            </p>
          </div>

          {content?.viewAllLink && (
            <a
              href={content.viewAllLink}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0a5c30] hover:text-[#073d20] group shrink-0"
            >
              <span>View All Alumni</span>
              <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          )}
        </div>

        {/* Alumni Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
          {alumniList.map((person) => (
            <div
              key={person._id}
              className="group bg-white border border-slate-200/80 rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              {/* Photo Container */}
              <div className="relative w-full h-64 sm:h-72 bg-slate-100 overflow-hidden">
                <Image
                  src={person.image || "/placeholder-avatar.png"}
                  alt={person.name}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-80" />

                {/* Batch Badge (Floating Over Image) */}
                {person.batch && (
                  <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full border border-white/40 shadow-xs flex items-center gap-1.5 text-xs font-semibold text-slate-800">
                    <Calendar size={12} className="text-emerald-700" />
                    <span>{person.batch}</span>
                  </div>
                )}
              </div>

              {/* Information */}
              <div className="p-5 flex-1 flex flex-col justify-between bg-white">
                <div>
                  <h3 className="font-bold text-slate-900 text-lg group-hover:text-[#0a5c30] transition-colors line-clamp-1">
                    {person.name}
                  </h3>

                  {person.designation && (
                    <p className="text-xs font-medium text-slate-600 mt-1.5 flex items-center gap-1.5 line-clamp-2">
                      <Briefcase size={13} className="text-emerald-700 shrink-0" />
                      <span>{person.designation}</span>
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Empty State */}
          {alumniList.length === 0 && (
            <div className="col-span-full bg-white border border-slate-200/80 rounded-2xl p-12 text-center shadow-2xs">
              <GraduationCap size={32} className="mx-auto text-slate-400 mb-3" />
              <h3 className="font-semibold text-slate-800 text-base">No Alumni Listed</h3>
              <p className="text-sm text-slate-500 mt-1">Alumni profiles will appear here once added from the admin dashboard.</p>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}