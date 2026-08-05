
"use client";

import { useEffect, useState } from "react";

import Image from "next/image";

type SustainabilityContent = {

  headingPlain: string;

  headingHighlight: string;

  description: string;

  image: string;

};

const API_URL = process.env.NEXT_PUBLIC_ADMIN_API_URL;

export default function SustainabilitySection() {

  const [content, setContent] = useState<SustainabilityContent | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    fetch(`${API_URL}/api/sustainability`)

      .then((res) => res.json())

      .then((json) => {

        if (json.success) setContent(json.data);

      })

      .catch((err) => console.error("Failed to load sustainability section:", err))

      .finally(() => setLoading(false));

  }, []);

  if (loading) return <section className="w-full h-[300px] bg-gray-50 animate-pulse" />;

  if (!content) {

    return <section className="w-full py-16 text-center text-gray-400">No Sustainability content yet — add it from the admin panel.</section>;

  }

  return (

    <section className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

      <div>

        <h2 className="text-3xl font-serif font-bold mb-5">

          {content.headingPlain} <span className="text-green-700">{content.headingHighlight}</span>

        </h2>

        <p className="text-gray-600 leading-relaxed">{content.description}</p>

      </div>

      <div className="relative w-full h-72 rounded overflow-hidden">

        <Image src={content.image} alt={content.headingPlain} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />

      </div>

    </section>

  );

}

