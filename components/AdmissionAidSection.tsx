
"use client";

import { useEffect, useState } from "react";

import Image from "next/image";

import { ArrowRight } from "lucide-react";

type AdmissionLink = { _id: string; title: string; order: number };

type AdmissionAidContent = { heading: string; image: string };

const API_URL = process.env.NEXT_PUBLIC_ADMIN_API_URL;

export default function AdmissionAidSection() {

  const [content, setContent] = useState<AdmissionAidContent | null>(null);

  const [links, setLinks] = useState<AdmissionLink[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    Promise.all([

      fetch(`${API_URL}/api/admission-aid`).then((r) => r.json()),

      fetch(`${API_URL}/api/admission-aid-links`).then((r) => r.json()),

    ])

      .then(([contentJson, linksJson]) => {

        if (contentJson.success) setContent(contentJson.data);

        if (linksJson.success) setLinks(linksJson.data);

      })

      .catch((err) => console.error("Failed to load admission & aid section:", err))

      .finally(() => setLoading(false));

  }, []);

  if (loading) return <section className="w-full h-[300px] bg-gray-50 animate-pulse" />;

  if (!content) {

    return <section className="w-full py-16 text-center text-gray-400">No Admission &amp; Aid content yet — add it from the admin panel.</section>;

  }

  return (

    <section className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-start">

      <div className="relative w-full h-56 rounded overflow-hidden">

        <Image src={content.image} alt={content.heading} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />

      </div>

      <div>

        <h2 className="text-3xl font-serif font-bold text-green-700 mb-5">{content.heading}</h2>

        <div className="space-y-4">

          {links.map((link) => (

            <div key={link._id} className="flex items-center justify-between border-b border-gray-200 pb-3">

              <p className="font-medium text-gray-800">{link.title}</p>

              <ArrowRight size={16} className="text-green-700" />

            </div>

          ))}

          {links.length === 0 && <p className="text-sm text-gray-400">No links yet.</p>}

        </div>

      </div>

    </section>

  );

}

