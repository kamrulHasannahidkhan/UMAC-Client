"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

type AccordionItem = {
  group?: string;
  title: string;
  description: string;
  image?: string;
  order: number;
};

type FacilityAccordionData = {
  heading: string;
  description?: string;
  items: AccordionItem[];
};

const API_URL = process.env.NEXT_PUBLIC_ADMIN_API_URL;

export default function FacilityAccordionSection({
  section,
}: {
  section: "seminar" | "hostel" | "laboratory" | "cafeteria";
}) {
  const [content, setContent] = useState<FacilityAccordionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useEffect(() => {
    fetch(`${API_URL}/api/facility-accordion?section=${section}`)
      .then((res) => res.json())
      .then((json) => {
        if (json.success) setContent(json.data);
      })
      .catch((err) => console.error("Failed to load facility accordion:", err))
      .finally(() => setLoading(false));
  }, [section]);

  if (loading) {
    return <div className="w-full h-64 bg-gray-50 animate-pulse" />;
  }

  if (!content) {
    return <p className="text-sm text-gray-400 text-center py-16">No content yet — add it from the admin panel.</p>;
  }

  const groups: { group: string | null; items: AccordionItem[] }[] = [];
  content.items
    .slice()
    .sort((a, b) => a.order - b.order)
    .forEach((item) => {
      const key = item.group?.trim() || null;
      const existing = groups.find((g) => g.group === key);
      if (existing) existing.items.push(item);
      else groups.push({ group: key, items: [item] });
    });

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-[#222222] mb-2">{content.heading}</h2>
      {content.description && <p className="text-sm text-gray-600 mb-8">{content.description}</p>}

      {groups.map((g, gi) => (
        <div key={gi} className="mb-8">
          {g.group && <h3 className="text-lg font-bold text-[#008d44] mb-3">{g.group}</h3>}
          <div className="border-t border-gray-200">
            {g.items.map((item, ii) => {
              const flatIndex = gi * 1000 + ii;
              const isOpen = openIndex === flatIndex;
              return (
                <div key={ii} className="border-b border-gray-200">
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : flatIndex)}
                    className="w-full flex items-center justify-between py-4 text-left"
                  >
                    <span className="text-sm font-semibold text-gray-800">{item.title}</span>
                    <ChevronDown size={16} className={`text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  {isOpen && (
                    <div className="pb-4 flex flex-col sm:flex-row gap-4">
                      {item.image && (
                        <div className="relative w-full sm:w-48 h-32 shrink-0 bg-gray-100 overflow-hidden">
                          <Image src={item.image} alt={item.title} fill className="object-cover" sizes="192px" />
                        </div>
                      )}
                      <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {groups.length === 0 && <p className="text-sm text-gray-400 text-center py-10">No items added yet.</p>}
    </div>
  );
}
