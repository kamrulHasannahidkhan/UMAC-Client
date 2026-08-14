"use client";

import { useEffect, useState } from "react";
import { Briefcase, Calendar, ArrowRight } from "lucide-react";

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
    <main className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-serif font-bold text-center mb-2">Careers at UAMC</h1>
      <p className="text-center text-gray-500 mb-12">Join our team — current openings are listed below.</p>

      {loading ? (
        <div className="h-64 bg-gray-50 animate-pulse rounded" />
      ) : (
        <div className="space-y-4">
          {posts.map((p) => {
            const isOpen = expandedId === p._id;
            return (
              <div key={p._id} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setExpandedId(isOpen ? null : p._id)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
                >
                  <div>
                    <p className="font-semibold text-black">{p.title}</p>
                    <p className="text-sm text-gray-500 flex items-center gap-3 mt-1">
                      <span className="flex items-center gap-1"><Briefcase size={13} /> {p.department} · {p.type}</span>
                      <span className="flex items-center gap-1"><Calendar size={13} /> Deadline: {p.deadline}</span>
                    </p>
                  </div>
                  <ArrowRight size={18} className={`text-gray-400 shrink-0 transition-transform ${isOpen ? "rotate-90" : ""}`} />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 border-t border-gray-100 pt-4">
                    <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line mb-4">{p.description}</p>
                    {p.applyLink && (
                      <a
                        href={p.applyLink}
                        className="inline-flex items-center gap-2 bg-[#0f2418] text-white text-sm font-medium px-5 py-2.5 rounded-md hover:bg-[#173428] transition-colors"
                      >
                        Apply Now <ArrowRight size={14} />
                      </a>
                    )}
                  </div>
                )}
              </div>
            );
          })}
          {posts.length === 0 && (
            <div className="bg-white border border-gray-200 rounded-lg p-10 text-center text-sm text-gray-500">
              No open positions at the moment — please check back soon.
            </div>
          )}
        </div>
      )}
    </main>
  );
}
