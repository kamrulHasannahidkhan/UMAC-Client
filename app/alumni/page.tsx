"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type AlumniEntry = { _id: string; name: string; title: string; designation: string; image: string };
const API_URL = process.env.NEXT_PUBLIC_ADMIN_API_URL;

export default function AlumniPage() {
  const [list, setList] = useState<AlumniEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/api/alumni`)
      .then((res) => res.json())
      .then((json) => {
        if (json.success) setList(json.data);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-serif font-bold text-center mb-2">Our Alumni</h1>
      <p className="text-center text-gray-500 mb-12">Proud graduates of Uttara Adhunik Medical College</p>

      {loading ? (
        <div className="h-64 bg-gray-50 animate-pulse rounded" />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {list.map((a) => (
            <div key={a._id} className="text-center">
              <div className="relative w-full h-40 rounded-lg overflow-hidden mb-3 bg-gray-100">
                <Image src={a.image} alt={a.name} fill className="object-cover" sizes="200px" />
              </div>
              <p className="font-semibold text-black">{a.name}</p>
              <p className="text-sm text-gray-600">{a.title}</p>
              {a.designation && <p className="text-xs text-gray-400">{a.designation}</p>}
            </div>
          ))}
          {list.length === 0 && <p className="text-sm text-gray-400 col-span-4 text-center">No alumni added yet.</p>}
        </div>
      )}
    </main>
  );
}
