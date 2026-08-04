"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { User, Calendar, ArrowUpRight } from "lucide-react";

type NewsPost = {
  _id: string;
  category: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  image: string;
  order: number;
};

type NewsContent = {
  heading: string;
  subheading: string;
  viewAllLink: string;
};

const API_URL = process.env.NEXT_PUBLIC_ADMIN_API_URL;

export default function NewsSection() {
  const [content, setContent] = useState<NewsContent | null>(null);
  const [posts, setPosts] = useState<NewsPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch(`${API_URL}/api/news`).then((res) => res.json()),
      fetch(`${API_URL}/api/news-posts`).then((res) => res.json()),
    ])
      .then(([contentJson, postsJson]) => {
        if (contentJson.success) setContent(contentJson.data);
        if (postsJson.success) setPosts(postsJson.data);
      })
      .catch((err) => console.error("Failed to load news section:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <section className="w-full h-[500px] bg-white animate-pulse" />;
  }

  if (!content) {
    return (
      <section className="w-full bg-white py-20 text-center text-gray-400">
        No News section content yet — add it from the admin panel.
      </section>
    );
  }

  return (
    <section className="w-full bg-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex items-start justify-between mb-12">
          <div>
            <h2 className="text-4xl sm:text-5xl font-serif font-bold text-[#008d44] mb-2">
              {content.heading}
            </h2>
            <p className="text-sm sm:text-base text-gray-500 font-sans">
              {content.subheading}
            </p>
          </div>

          <a
            href={content.viewAllLink || "#"}
            className="text-sm font-semibold text-[#008d44] underline inline-flex items-center gap-1 shrink-0 mt-2 hover:text-[#007337] transition-colors"
          >
            <span>View All</span>
            <ArrowUpRight size={16} />
          </a>
        </div>

        {/* 2-Column Grid for Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {posts.map((post) => (
            <div
              key={post._id}
              className="border-[1.5px] border-dashed border-[#88c5a2] bg-[#fafdfa] p-5 sm:p-6 rounded-none flex flex-col sm:flex-row gap-5 sm:gap-6 items-stretch"
            >
              {/* Image Box */}
              <div className="relative w-full sm:w-48 h-48 sm:h-auto shrink-0 rounded-none overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 200px"
                />
              </div>

              {/* Content Box */}
              <div className="flex flex-col justify-between flex-1 py-1">
                <div>
                  {/* Category Tag */}
                  <span className="inline-block bg-[#ffbd13] text-[#222222] text-[11px] font-bold px-2.5 py-0.5 rounded-none mb-3">
                    {post.category}
                  </span>

                  {/* Title */}
                  <h3 className="font-serif text-base sm:text-lg font-bold text-[#222222] mb-2 leading-snug line-clamp-2">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-xs sm:text-sm text-gray-500 mb-4 line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                {/* Author & Date Footer */}
                <div className="flex items-center gap-4 text-xs text-gray-500 font-sans">
                  <span className="flex items-center gap-1.5 text-[#008d44]">
                    <User size={13} className="text-[#008d44]" />
                    <span className="text-gray-500">{post.author}</span>
                  </span>
                  <span className="flex items-center gap-1.5 text-[#008d44]">
                    <Calendar size={13} className="text-[#008d44]" />
                    <span className="text-gray-500">{post.date}</span>
                  </span>
                </div>
              </div>
            </div>
          ))}

          {posts.length === 0 && (
            <p className="text-sm text-gray-400 col-span-2 text-center py-8">
              No posts available yet.
            </p>
          )}
        </div>

      </div>
    </section>
  );
}