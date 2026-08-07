"use client";

import { useEffect, useState } from "react";
import { Clock, ArrowUpRight } from "lucide-react";

type NoticeItem = {
  _id: string;
  board: "notice" | "publication";
  category: string;
  day: string;
  month: string;
  title: string;
  time: string;
  order: number;
};

const API_URL = process.env.NEXT_PUBLIC_ADMIN_API_URL;

const NOTICE_TABS = ["General Notice", "Admission Notice", "Reports", "Job Circular"];
const PUBLICATION_TABS = ["Journal", "Tenders"];

function BoardColumn({
  title,
  tabs,
  items,
  viewAllLink,
}: {
  title: string;
  tabs: string[];
  items: NoticeItem[];
  viewAllLink: string;
}) {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const filtered = items.filter((item) => item.category === activeTab);

  return (
    <div className="flex flex-col w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#008844]">
          {title}
        </h2>
        <a
          href={viewAllLink}
          className="text-xs font-semibold tracking-wide text-[#008844] underline flex items-center gap-1 hover:opacity-80 transition-opacity"
        >
          View All <ArrowUpRight size={14} />
        </a>
      </div>

      {/* Main Container Card (Fixed height for equal board sizing) */}
      <div className="bg-[#e8ebf0] p-3 md:p-4 rounded-sm flex flex-col h-[520px]">
        
        {/* Navigation Tabs */}
        <div className="flex bg-[#dc021d]/0 bg-[#dbe0e6] rounded-sm overflow-hidden mb-3 shrink-0">
          {tabs.map((tab, i) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-3 px-2 text-xs md:text-sm font-semibold transition-all relative ${
                  isActive
                    ? "bg-white text-[#00a651] border-t-2 border-[#00a651] shadow-xs z-10"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-200/60"
                } ${
                  i < tabs.length - 1 && !isActive && activeTab !== tabs[i + 1]
                    ? "border-r border-gray-300/60"
                    : ""
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Scrollable Notice Item List (Equal height scroll container) */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-0.5 scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none]">
          {filtered.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-sm p-4 flex items-center gap-4 shadow-xs hover:shadow-sm transition-shadow"
            >
              {/* Date Box */}
              <div className="flex flex-col items-center justify-center shrink-0 w-16">
                <p className="text-2xl font-bold text-[#2d3748] leading-none mb-1">
                  {item.day}
                </p>
                <span className="bg-[#00a651] text-white text-[10px] font-bold tracking-wide uppercase px-2.5 py-0.5 rounded-xs">
                  {item.month}
                </span>
              </div>

              {/* Notice Title & Metadata */}
              <div className="flex-1 min-w-0">
                <p className="text-[#2d3748] text-sm font-medium leading-snug line-clamp-2 mb-1">
                  "{item.title}"
                </p>
                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                  <Clock size={12} className="text-gray-400 shrink-0" />
                  <span>{item.time}</span>
                </div>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="bg-white rounded-sm h-full flex items-center justify-center text-sm text-gray-400 font-medium">
              No items in this category yet.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default function NoticeBoardSection() {
  const [items, setItems] = useState<NoticeItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/api/notice-items`)
      .then((res) => res.json())
      .then((json) => {
        if (json.success) setItems(json.data);
      })
      .catch((err) => console.error("Failed to load notice items:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <section className="w-full h-[580px] bg-gray-50 animate-pulse" />;
  }

  const noticeItems = items.filter((i) => i.board === "notice");
  const publicationItems = items.filter((i) => i.board === "publication");

  return (
    <section className="max-w-7xl mx-auto px-6 py-16 sm:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-start">
        <BoardColumn
          title="Notice Board"
          tabs={NOTICE_TABS}
          items={noticeItems}
          viewAllLink="/notice"
        />
        <BoardColumn
          title="Publication"
          tabs={PUBLICATION_TABS}
          items={publicationItems}
          viewAllLink="/publication"
        />
      </div>
    </section>
  );
}