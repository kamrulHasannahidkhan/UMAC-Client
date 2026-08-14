"use client";

import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, GraduationCap, Briefcase, Calendar, UserCheck, ArrowRight } from "lucide-react";

type AlumniEntry = {
  _id: string;
  name: string;
  title?: string;
  batch?: string;
  designation?: string;
  image: string;
};

const API_URL = process.env.NEXT_PUBLIC_ADMIN_API_URL;

export default function AlumniPage() {
  const [list, setList] = useState<AlumniEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBatch, setSelectedBatch] = useState<string>("ALL");

  useEffect(() => {
    fetch(`${API_URL}/api/alumni`)
      .then((res) => res.json())
      .then((json) => {
        if (json.success) setList(json.data);
      })
      .catch((err) => console.error("Failed to load alumni directory:", err))
      .finally(() => setLoading(false));
  }, []);

  // Extract unique batches for the dropdown filter
  const batchOptions = useMemo(() => {
    const batches = list
      .map((item) => item.batch || item.title)
      .filter((val): val is string => Boolean(val));
    return ["ALL", ...Array.from(new Set(batches))];
  }, [list]);

  // Filter alumni based on search input and batch selection
  const filteredList = useMemo(() => {
    return list.filter((item) => {
      const batchValue = item.batch || item.title || "";
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.designation && item.designation.toLowerCase().includes(searchQuery.toLowerCase())) ||
        batchValue.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesBatch = selectedBatch === "ALL" || batchValue === selectedBatch;

      return matchesSearch && matchesBatch;
    });
  }, [list, searchQuery, selectedBatch]);

  return (
    <main 
      className="min-h-screen bg-slate-50 text-slate-900 pb-24"
      style={{ backgroundColor: "#f8fafc", color: "#0f172a" }}
    >
      {/* 1. Header Hero / Page Banner with Background Image */}
      <section className="relative text-white py-20 sm:py-28 px-4 sm:px-6 overflow-hidden">
        {/* Background Image with Preloading */}
        <Image
          src="/banner.png" // Place your image inside /public/alumni-banner.jpg
          alt="Alumni Banner Background"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />

        {/* Gradient Overlays for Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f2418]/95 via-[#0f2418]/85 to-[#0f2418]/70" />
        <div className="absolute inset-0 bg-black/30" />

        {/* Content Box */}
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-emerald-300 text-xs font-semibold mb-4 backdrop-blur-md">
            <GraduationCap size={15} />
            <span>Official Directory</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight mb-4 drop-shadow-sm">
            Our Distinguished Alumni
          </h1>

          <p className="text-slate-200 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed drop-shadow-xs">
            Celebrating the proud graduates of Uttara Adhunik Medical College making an impact worldwide.
          </p>

          {/* Portal CTA Link */}
          <div className="mt-8">
            <Link
              href="/alumni-portal"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-xl transition-all shadow-lg active:scale-[0.98]"
            >
              <span>Are you an alumnus? Claim your profile</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Main Content Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        
        {/* Search & Filter Bar */}
        <div 
          className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 shadow-sm mb-10 flex flex-col sm:flex-row items-center gap-4"
          style={{ backgroundColor: "#ffffff" }}
        >
          {/* Search Field */}
          <div className="relative flex-1 w-full">
            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name, designation, or batch..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0f2418]/20 focus:border-[#0f2418] transition-all"
            />
          </div>

          {/* Batch Selector */}
          {batchOptions.length > 1 && (
            <div className="w-full sm:w-auto shrink-0 flex items-center gap-2">
              <label htmlFor="batch-filter" className="text-xs font-semibold text-slate-500 whitespace-nowrap">
                Batch:
              </label>
              <select
                id="batch-filter"
                value={selectedBatch}
                onChange={(e) => setSelectedBatch(e.target.value)}
                className="w-full sm:w-auto bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0f2418]/20 focus:border-[#0f2418] cursor-pointer"
              >
                {batchOptions.map((b) => (
                  <option key={b} value={b}>
                    {b === "ALL" ? "All Batches" : b}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* 3. Alumni Directory Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="h-80 bg-white rounded-2xl border border-slate-200 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
            {filteredList.map((person) => {
              const displayBatch = person.batch || person.title;
              return (
                <div
                  key={person._id}
                  className="group bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-2xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
                  style={{ backgroundColor: "#ffffff" }}
                >
                  {/* Photo Container */}
                  <div className="relative w-full h-64 sm:h-72 bg-slate-100 overflow-hidden shrink-0">
                    <Image
                      src={person.image || "/placeholder-avatar.png"}
                      alt={person.name}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-80" />

                    {/* Batch Badge */}
                    {displayBatch && (
                      <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full border border-slate-200 shadow-xs flex items-center gap-1.5 text-xs font-bold text-slate-800">
                        <Calendar size={12} className="text-emerald-700" />
                        <span>{displayBatch}</span>
                      </div>
                    )}
                  </div>

                  {/* Profile Details */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h2 className="font-bold text-slate-900 text-lg group-hover:text-[#0a5c30] transition-colors line-clamp-1">
                        {person.name}
                      </h2>

                      {person.designation ? (
                        <div className="mt-2 pt-2 border-t border-slate-100 flex items-start gap-2 text-xs font-medium text-slate-600">
                          <Briefcase size={14} className="text-emerald-700 shrink-0 mt-0.5" />
                          <span className="line-clamp-2 leading-relaxed">{person.designation}</span>
                        </div>
                      ) : (
                        <p className="text-xs text-slate-400 mt-2 flex items-center gap-1">
                          <UserCheck size={13} className="text-emerald-600" /> Graduate
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Empty State */}
            {filteredList.length === 0 && (
              <div className="col-span-full bg-white border border-slate-200/80 rounded-2xl p-12 text-center shadow-2xs">
                <GraduationCap size={40} className="mx-auto text-slate-300 mb-3" />
                <h3 className="font-semibold text-slate-800 text-base">No Alumni Found</h3>
                <p className="text-sm text-slate-500 mt-1">
                  {searchQuery || selectedBatch !== "ALL"
                    ? "Try adjusting your search query or filter settings."
                    : "There are currently no alumni profiles listed in the directory."}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}