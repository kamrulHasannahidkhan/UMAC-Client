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
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#008844]">
          {title}
        </h2>
        <a
          href={viewAllLink}
          className="text-xs font-semibold uppercase tracking-wider text-[#008844] underline flex items-center gap-1 hover:opacity-80 transition-opacity"
        >
          View All <ArrowUpRight size={14} />
        </a>
      </div>

      {/* Main Box */}
      <div className="bg-[#eef0f4] rounded-sm p-4 md:p-5">
        {/* Navigation Tabs */}
        <div className="flex bg-[#e2e6ea] rounded-sm overflow-hidden mb-4 border-b border-gray-300/50">
          {tabs.map((tab, i) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-3 px-2 text-xs md:text-sm font-semibold transition-all relative ${
                  isActive
                    ? "bg-white text-[#008844] border-t-2 border-t-[#00a651] shadow-sm"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-200/50"
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

        {/* Notice List Container */}
        <div className="max-h-[460px] overflow-y-auto space-y-3 pr-1 custom-scrollbar">
          {filtered.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-sm p-4 flex items-center gap-5 shadow-xs hover:shadow-md transition-shadow"
            >
              {/* Date Box */}
              <div className="flex flex-col items-center justify-center shrink-0 w-16">
                <p className="text-2xl font-bold text-[#2b3e4c] leading-none mb-1">
                  {item.day}
                </p>
                <span className="bg-[#00a651] text-white text-[10px] font-semibold tracking-wider uppercase px-2.5 py-0.5 rounded-sm">
                  {item.month}
                </span>
              </div>

              {/* Notice Details */}
              <div className="flex-1 min-w-0">
                <p className="text-gray-800 text-sm font-medium leading-snug line-clamp-2 mb-1">
                  "{item.title}"
                </p>
                <div className="flex items-center gap-1.5 text-xs text-gray-500 font-normal">
                  <Clock size={12} className="text-gray-400 shrink-0" />
                  <span>{item.time}</span>
                </div>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="bg-white rounded-sm py-12 text-center text-sm text-gray-400 font-medium">
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
    return <section className="w-full h-[520px] bg-gray-50 animate-pulse" />;
  }

  const noticeItems = items.filter((i) => i.board === "notice");
  const publicationItems = items.filter((i) => i.board === "publication");

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
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