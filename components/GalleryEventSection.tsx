"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type GalleryImage = {
  _id: string;
  image: string;
  caption: string;
  order: number;
};

const API_URL = process.env.NEXT_PUBLIC_ADMIN_API_URL;

export default function GalleryEventSection() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/api/gallery`)
      .then((res) => res.json())
      .then((json) => {
        if (json.success) setImages(json.data);
      })
      .catch((err) => console.error("Failed to load gallery:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <section className="w-full h-[500px] bg-white animate-pulse" />;
  }

  return (
    <section className="w-full bg-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl sm:text-5xl font-serif font-bold text-[#008d44] mb-2">
          Event Gallery of UAMC
        </h2>
        <p className="text-sm sm:text-base text-gray-500 font-sans mb-10">
          You&apos;ll find something to spark your curiosity and interest.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((img) => (
            <div key={img._id} className="relative w-full h-40 sm:h-44 overflow-hidden group rounded-none">
              <Image
                src={img.image}
                alt={img.caption}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-[#008d44]/90 text-white text-xs font-medium px-3 py-2 line-clamp-1">
                {img.caption}
              </div>
            </div>
          ))}

          {images.length === 0 && (
            <p className="text-sm text-gray-400 col-span-full text-center py-8">
              No gallery images yet — add some from the admin panel.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
