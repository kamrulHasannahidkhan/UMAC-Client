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
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[#008d44]">
          {title}
        </h2>
        <a
          href={viewAllLink}
          className="text-xs md:text-sm font-semibold tracking-wide text-[#008d44] underline flex items-center gap-1 hover:opacity-80 transition-opacity"
        >
          View All <ArrowUpRight size={16} />
        </a>
      </div>

      {/* Main Container Card (Height Increased to 620px) */}
      <div className="bg-[#eaedf2] p-4 md:p-6 rounded-none flex flex-col h-[620px] w-full">
        
        {/* Navigation Tabs */}
        <div className="flex bg-[#dce1e8] overflow-hidden mb-4 shrink-0">
          {tabs.map((tab, i) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-3.5 px-3 text-xs md:text-sm font-bold transition-all relative ${
                  isActive
                    ? "bg-white text-[#00a651] border-t-2 border-[#00a651] shadow-xs"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-200/60"
                } ${
                  i < tabs.length - 1 && !isActive && activeTab !== tabs[i + 1]
                    ? "border-r border-gray-300/70"
                    : ""
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Scrollable Notice Item List */}
        <div className="flex-1 overflow-y-auto space-y-3.5 pr-0.5 scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none]">
          {filtered.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-none p-5 flex items-center gap-5 shadow-xs hover:shadow-sm transition-shadow"
            >
              {/* Date Box */}
              <div className="flex flex-col items-center justify-center shrink-0 w-20">
                <p className="text-3xl font-bold text-[#2d3748] leading-none mb-1">
                  {item.day}
                </p>
                <span className="bg-[#00a651] text-white text-xs font-bold tracking-wide uppercase px-3 py-0.5 rounded-none">
                  {item.month}
                </span>
              </div>

              {/* Notice Title & Time */}
              <div className="flex-1 min-w-0">
                <p className="text-[#2d3748] text-base font-semibold leading-snug line-clamp-2 mb-1.5">
                  "{item.title}"
                </p>
                <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
                  <Clock size={14} className="text-gray-400 shrink-0" />
                  <span>{item.time}</span>
                </div>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="bg-white rounded-none h-full flex items-center justify-center text-base text-gray-400 font-medium">
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
    return <section className="w-full h-[700px] bg-gray-50 animate-pulse" />;
  }

  const noticeItems = items.filter((i) => i.board === "notice");
  const publicationItems = items.filter((i) => i.board === "publication");

  return (
    // Outer section background forced to clean white
    <section className="w-full bg-white py-16 sm:py-24">
      {/* Maximum width expanded to 1400px */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
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
      </div>
    </section>
  );
}