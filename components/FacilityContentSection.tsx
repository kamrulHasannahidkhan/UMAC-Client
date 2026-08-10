"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

type Item = { title: string; description: string; order: number };

type FacilityContentData = {
  heading: string;
  description: string;
  image: string;
  stat1Label?: string;
  stat1Value?: string;
  stat2Label?: string;
  stat2Value?: string;
  items: Item[];
  items2: Item[];
};

const API_URL = process.env.NEXT_PUBLIC_ADMIN_API_URL;

export default function FacilityContentSection({
  section,
  items1Label,
  items2Label,
}: {
  section: "hospital" | "library" | "meu" | "training";
  items1Label: string;
  items2Label: string;
}) {
  const [content, setContent] = useState<FacilityContentData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/api/facility-content?section=${section}`)
      .then((res) => res.json())
      .then((json) => {
        if (json.success) setContent(json.data);
      })
      .catch((err) => console.error("Failed to load facility content:", err))
      .finally(() => setLoading(false));
  }, [section]);

  if (loading) {
    return <div className="w-full h-96 bg-gray-50 animate-pulse" />;
  }

  if (!content) {
    return <p className="text-sm text-gray-400 text-center py-16">No content yet — add it from the admin panel.</p>;
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mb-10">
        <div className="flex items-start gap-3">
          <div>
            <h2 className="text-lg text-gray-500">About the</h2>
            <h2 className="text-2xl font-bold text-[#008d44]">{content.heading}</h2>
          </div>
        </div>
        <div />
      </div>

      <div className="relative w-full h-64 rounded-none overflow-hidden bg-gray-100 mb-6">
        <Image src={content.image} alt={content.heading} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 800px" />
      </div>

      <p className="text-sm text-gray-600 leading-relaxed mb-6">{content.description}</p>

      {(content.stat1Value || content.stat2Value) && (
        <div className="flex gap-10 mb-10 pb-6 border-b border-gray-200">
          {content.stat1Value && (
            <div>
              <p className="text-2xl font-bold text-[#008d44]">{content.stat1Value}</p>
              <p className="text-xs text-gray-500">{content.stat1Label}</p>
            </div>
          )}
          {content.stat2Value && (
            <div>
              <p className="text-2xl font-bold text-[#008d44]">{content.stat2Value}</p>
              <p className="text-xs text-gray-500">{content.stat2Label}</p>
            </div>
          )}
        </div>
      )}

      {content.items.length > 0 && (
        <div className="mb-10">
          <h3 className="text-xl font-bold text-[#222222] mb-4">{items1Label}</h3>
          <div className="space-y-2">
            {content.items
              .sort((a, b) => a.order - b.order)
              .map((item, i) => (
                <div key={i} className="flex items-start justify-between border-b border-gray-100 py-3">
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{item.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{item.description}</p>
                  </div>
                  <ChevronRight size={16} className="text-gray-400 shrink-0 mt-1" />
                </div>
              ))}
          </div>
        </div>
      )}

      {content.items2.length > 0 && (
        <div>
          <h3 className="text-xl font-bold text-[#222222] mb-4">{items2Label}</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {content.items2
              .sort((a, b) => a.order - b.order)
              .map((item, i) => (
                <div key={i} className="bg-[#eaf7ee] border border-[#c7e8d1] rounded-none p-4 text-center">
                  <p className="text-sm font-semibold text-[#008d44]">{item.title}</p>
                  {item.description && <p className="text-xs text-gray-500 mt-1">{item.description}</p>}
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
