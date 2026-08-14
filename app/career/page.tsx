"use client";

import { useEffect, useState } from "react";
import { Briefcase, Calendar, ArrowRight, ChevronDown, Sparkles, Building2, ExternalLink } from "lucide-react";
import CareerBanner from "@/components/CareerBanner";

type Post = { _id: string; title: string; department: string; type: string; deadline: string; description: string; applyLink: string };
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
    <main className="min-h-screen bg-slate-50/70 pb-20">
      <CareerBanner />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/60 text-emerald-800 text-xs font-semibold mb-3">
            <Sparkles size={13} /> Open Opportunities
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight mb-3">
            Careers at UAMC
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Join our dedicated academic & administrative team. Explore current openings and take the next step in your career.
          </p>
        </div>

        {/* Job Listings Section */}
        {loading ? (
          <div className="space-y-4 max-w-4xl mx-auto">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 bg-white rounded-2xl border border-slate-200/80 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="space-y-4 max-w-4xl mx-auto">
            {posts.map((p) => {
              const isOpen = expandedId === p._id;
              return (
                <div
                  key={p._id}
                  className={`bg-white border rounded-2xl overflow-hidden transition-all duration-200 ${
                    isOpen
                      ? "border-emerald-700/40 shadow-md ring-1 ring-emerald-700/10"
                      : "border-slate-200/80 hover:border-slate-300 shadow-sm"
                  }`}
                >
                  {/* Header / Click Area */}
                  <button
                    onClick={() => setExpandedId(isOpen ? null : p._id)}
                    className="w-full text-left p-5 sm:p-6 flex items-start sm:items-center justify-between gap-4 group"
                  >
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-slate-900 text-base sm:text-lg group-hover:text-emerald-900 transition-colors mb-2">
                        {p.title}
                      </h3>
                      
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-medium">
                          <Building2 size={13} className="text-slate-500" /> {p.department}
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 font-medium border border-emerald-100">
                          <Briefcase size={13} className="text-emerald-700" /> {p.type}
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800 font-medium border border-amber-100">
                          <Calendar size={13} className="text-amber-700" /> Deadline: {p.deadline}
                        </span>
                      </div>
                    </div>

                    <div className={`p-2 rounded-xl bg-slate-100 text-slate-500 group-hover:bg-emerald-50 group-hover:text-emerald-800 transition-all shrink-0 ${isOpen ? "bg-emerald-100 text-emerald-900 rotate-180" : ""}`}>
                      <ChevronDown size={18} className="transition-transform duration-200" />
                    </div>
                  </button>

                  {/* Expanded Description & Apply CTA */}
                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-4 border-t border-slate-100 bg-slate-50/50">
                      <div className="prose prose-slate max-w-none mb-6">
                        <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line font-normal">
                          {p.description}
                        </p>
                      </div>

                      {p.applyLink && (
                        <div className="pt-2">
                          <a
                            href={p.applyLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-[#0f2418] hover:bg-[#163725] active:scale-95 text-white text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-xl transition-all shadow-sm shadow-emerald-950/20 group"
                          >
                            <span>Apply Now</span>
                            <ExternalLink size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                          </a>
                        </div>
                      )}
                    </div>
                  )}
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
                  There are currently no job openings available. Please check back later or subscribe to college notices.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}