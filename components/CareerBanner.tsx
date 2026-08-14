"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

type BannerContent = { headingPlain: string; headingHighlight: string; bgImage: string };
const API_URL = process.env.NEXT_PUBLIC_ADMIN_API_URL;

export default function CareerBanner() {
  const [content, setContent] = useState<BannerContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/api/career-banner`)
      .then((res) => res.json())
      .then((json) => {
        if (json.success) setContent(json.data);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <section className="w-full h-[280px] bg-gray-100 animate-pulse" />;
  if (!content) {
    return <section className="w-full py-16 text-center text-gray-400">No Career banner yet — add it from the admin panel.</section>;
  }

  return (
    <section className="relative w-full h-[280px] overflow-hidden bg-green-200">
      <Image src={content.bgImage} alt="" fill className="object-cover object-top opacity-90" sizes="100vw" />
      <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex flex-col justify-end pb-10">
        <p className="text-sm font-medium text-gray-700 mb-3">
          <Link href="/" className="hover:text-green-700">HOME</Link>
          {" > "}
          <span className="text-green-700 font-semibold">Career</span>
        </p>
        <h1 className="text-5xl font-serif">
          {content.headingPlain} <span className="font-bold text-green-700">{content.headingHighlight}</span>
        </h1>
      </div>
    </section>
  );
}
