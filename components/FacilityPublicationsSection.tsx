"use client";

import { useEffect, useState } from "react";
import { Download, Share2 } from "lucide-react";

type Publication = {
  _id: string;
  title: string;
  date: string;
  fileUrl: string;
  order: number;
};

const API_URL = process.env.NEXT_PUBLIC_ADMIN_API_URL;

export default function FacilityPublicationsSection() {
  const [docs, setDocs] = useState<Publication[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/api/facility-publications`)
      .then((res) => res.json())
      .then((json) => {
        if (json.success) setDocs(json.data);
      })
      .catch((err) => console.error("Failed to load publications:", err))
      .finally(() => setLoading(false));
  }, []);

  const share = async (doc: Publication) => {
    if (navigator.share) {
      try {
        await navigator.share({ title: doc.title, url: doc.fileUrl });
      } catch {
        // user cancelled — no action needed
      }
    } else {
      navigator.clipboard.writeText(doc.fileUrl);
    }
  };

  if (loading) {
    return <div className="w-full h-64 bg-gray-50 animate-pulse" />;
  }

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-[#222222] mb-1">Publication</h2>
      <div className="border-t-2 border-[#008d44] mt-6" />

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 border-b border-gray-200">
              <th className="py-3 pr-4 font-medium w-12">No.</th>
              <th className="py-3 pr-4 font-medium w-40">Date</th>
              <th className="py-3 pr-4 font-medium">Title</th>
              <th className="py-3 pl-4 font-medium w-24 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {docs.map((doc, i) => (
              <tr key={doc._id} className="border-b border-gray-100 hover:bg-gray-50/60">
                <td className="py-3 pr-4 text-gray-500">{String(i + 1).padStart(2, "0")}</td>
                <td className="py-3 pr-4 text-gray-500">{doc.date}</td>
                <td className="py-3 pr-4 text-gray-800 font-medium">{doc.title}</td>
                <td className="py-3 pl-4">
                  <div className="flex items-center justify-end gap-2">
                    <a
                      href={doc.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      download
                      className="p-1.5 rounded bg-green-50 text-green-700 hover:bg-green-100 transition-colors"
                      aria-label={`Download ${doc.title}`}
                    >
                      <Download size={15} />
                    </a>
                    <button
                      onClick={() => share(doc)}
                      className="p-1.5 rounded bg-green-50 text-green-700 hover:bg-green-100 transition-colors"
                      aria-label={`Share ${doc.title}`}
                    >
                      <Share2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {docs.length === 0 && <p className="text-sm text-gray-400 text-center py-10">No publications available yet.</p>}
      </div>
    </div>
  );
}
