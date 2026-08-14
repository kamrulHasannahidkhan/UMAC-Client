"use client";

import { useEffect, useState } from "react";
import { Briefcase, Calendar, ChevronDown, Sparkles, Building2, ExternalLink, ArrowUpRight } from "lucide-react";
import CareerBanner from "@/components/CareerBanner";

type Post = { 
  _id: string; 
  title: string; 
  department: string; 
  type: string; 
  deadline: string; 
  description: string; 
  applyLink: string 
};

const API_URL = process.env.NEXT_PUBLIC_ADMIN_API_URL;

export default function CareerPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${API_URL}/api/career-posts`)
      .then((res) => res.json())
      .then((json) => {
        if (json.success) setPosts(json.data);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="min-h-screen bg-slate-50 pb-24">
      {/* Top Banner */}
      <CareerBanner />

      {/* Main Content Area */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-semibold mb-4 shadow-2xs">
            <Sparkles size={14} className="text-emerald-600" /> 
            <span>Open Opportunities</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-slate-900 tracking-tight mb-4">
            Careers at <span className="text-[#0a5c30]">UAMC</span>
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
            Join our dedicated academic & administrative team. Explore current openings and take the next step in your career.
          </p>
        </div>

        {/* Job Listings Section */}
        {loading ? (
          <div className="space-y-4 max-w-5xl mx-auto">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-28 bg-white rounded-2xl border border-slate-200/80 animate-pulse shadow-2xs" />
            ))}
          </div>
        ) : (
          <div className="space-y-4 max-w-5xl mx-auto">
            {posts.map((p) => {
              const isOpen = expandedId === p._id;
              return (
                <div
                  key={p._id}
                  className={`bg-white border rounded-2xl transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? "border-emerald-600/50 shadow-md ring-1 ring-emerald-600/20"
                      : "border-slate-200 hover:border-slate-300 shadow-2xs"
                  }`}
                >
                  {/* Header / Click Area */}
                  <button
                    onClick={() => setExpandedId(isOpen ? null : p._id)}
                    aria-expanded={isOpen}
                    className="w-full text-left p-6 sm:p-7 flex items-center justify-between gap-6 group focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 rounded-2xl"
                  >
                    <div className="flex-1 min-w-0">
                      <h2 className="font-bold text-slate-900 text-lg sm:text-xl group-hover:text-emerald-800 transition-colors mb-3">
                        {p.title}
                      </h2>
                      
                      {/* Meta Tags */}
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-medium">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 border border-slate-200/70">
                          <Building2 size={14} className="text-slate-500" /> {p.department}
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200/60">
                          <Briefcase size={14} className="text-emerald-600" /> {p.type}
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 text-amber-800 border border-amber-200/60">
                          <Calendar size={14} className="text-amber-600" /> Deadline: {p.deadline}
                        </span>
                      </div>
                    </div>

                    {/* Chevron Icon Container */}
                    <div className={`p-2.5 rounded-xl bg-slate-100 text-slate-500 group-hover:bg-emerald-100 group-hover:text-emerald-900 transition-all shrink-0 ${isOpen ? "bg-emerald-100 text-emerald-900 rotate-180" : ""}`}>
                      <ChevronDown size={20} className="transition-transform duration-300" />
                    </div>
                  </button>

                  {/* Expanded Accordion Body */}
                  <div 
                    className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-6 sm:px-8 pb-7 pt-5 border-t border-slate-100 bg-slate-50/70">
                        
                        {/* Description Box */}
                        <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 mb-6 shadow-2xs">
                          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                            Job Description & Requirements
                          </h3>
                          <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                            {p.description}
                          </div>
                        </div>

                        {/* Apply Action CTA */}
                        <div className="flex items-center justify-between flex-wrap gap-4">
                          <p className="text-xs text-slate-500">
                            Interested candidates are requested to apply before the deadline.
                          </p>
                          <a
                            href={p.applyLink || "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-[#0a522c] hover:bg-[#073d20] active:scale-[0.98] text-white text-sm font-semibold px-6 py-3 rounded-xl transition-all shadow-md shadow-emerald-900/15 group"
                          >
                            <span>Apply Now</span>
                            <ArrowUpRight size={17} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                          </a>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Empty State */}
            {posts.length === 0 && (
              <div className="bg-white border border-slate-200/80 rounded-2xl p-12 text-center shadow-sm">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 border border-slate-200 text-slate-400 flex items-center justify-center mx-auto mb-4">
                  <Briefcase size={22} />
                </div>
                <h3 className="font-semibold text-slate-900 text-base mb-1">No Open Positions</h3>
                <p className="text-sm text-slate-500 max-w-sm mx-auto">
                  There are currently no job openings available. Please check back later.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}