
"use client";

import { useEffect, useState } from "react";

import Image from "next/image";

type Stat = {

  number: string;

  label: string;

};

type StatsContent = {

  _id: string;

  bgImage: string;

  stats: Stat[];

};

const API_URL = process.env.NEXT_PUBLIC_ADMIN_API_URL;

export default function StatsSection() {

  const [content, setContent] = useState<StatsContent | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    fetch(`${API_URL}/api/stats`)

      .then((res) => res.json())

      .then((json) => {

        if (json.success) setContent(json.data);

      })

      .catch((err) => console.error("Failed to load stats section:", err))

      .finally(() => setLoading(false));

  }, []);

  if (loading) {

    return <section className="w-full h-[300px] bg-gray-100 animate-pulse" />;

  }

  if (!content) {

    return (

      <section className="w-full py-16 text-center text-gray-400">

        No stats section yet — add it from the admin panel.

      </section>

    );

  }

  return (

    <section className="relative w-full h-[300px]">

      <Image src={content.bgImage} alt="Stats background" fill className="object-cover" />

      <div className="absolute inset-0 bg-black/30" />

      <div className="relative z-10 max-w-6xl mx-auto h-full flex items-center px-6">

        <div className="w-full bg-green-700/70 rounded-lg py-10 px-8 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/30 text-center text-white">

          {content.stats.map((stat, i) => (

            <div key={i} className="px-6 py-4 md:py-0">

              <p className="text-5xl font-serif mb-3">{stat.number}</p>

              <p className="text-yellow-400 font-semibold leading-snug">{stat.label}</p>

            </div>

          ))}

        </div>

      </div>

    </section>

  );

}

