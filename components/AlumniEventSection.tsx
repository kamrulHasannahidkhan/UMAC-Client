"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Calendar, Clock, MapPin, ArrowUpRight } from "lucide-react";

type AlumniEvent = {
  _id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  order: number;
};

type AlumniEventContent = {
  heading: string;
  viewAllLink: string;
  image: string;
};

const API_URL = process.env.NEXT_PUBLIC_ADMIN_API_URL;

export default function AlumniEventSection() {
  const [content, setContent] = useState<AlumniEventContent | null>(null);
  const [events, setEvents] = useState<AlumniEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch(`${API_URL}/api/alumni-events`).then((res) => res.json()),
      fetch(`${API_URL}/api/alumni-events-list`).then((res) => res.json()),
    ])
      .then(([contentJson, eventsJson]) => {
        if (contentJson.success) setContent(contentJson.data);
        if (eventsJson.success) setEvents(eventsJson.data);
      })
      .catch((err) => console.error("Failed to load alumni events section:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <section className="w-full h-[550px] bg-[#e9f3ec] animate-pulse" />;
  }

  if (!content) {
    return (
      <section className="w-full bg-[#e9f3ec] py-20 text-center text-gray-400">
        No Alumni Event content available.
      </section>
    );
  }

  return (
    <section className="w-full bg-[#e9f3ec] py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-[#008d44]">
            {content.heading}
          </h2>
          <a
            href={content.viewAllLink || "#"}
            className="text-sm font-semibold text-[#008d44] underline inline-flex items-center gap-1 hover:text-[#007036] transition-colors"
          >
            View All <ArrowUpRight size={16} />
          </a>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Events Cards Stack (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col gap-4 justify-between">
            {events.map((event, i) => (
              <div
                key={event._id}
                className="bg-[#f7faf8] p-6 sm:p-8 flex items-center gap-6 sm:gap-8 rounded-none transition-shadow hover:shadow-sm"
              >
                {/* Outlined Large Number Badge */}
                <span className="text-5xl sm:text-6xl font-serif font-light text-transparent [-webkit-text-stroke:1.5px_#008d44] shrink-0 select-none">
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Event Details */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-base sm:text-lg font-serif font-bold text-[#008d44] mb-3 truncate">
                    {event.title}
                  </h3>
                  
                  {/* Event Meta Bar */}
                  <div className="flex items-center flex-wrap gap-4 text-xs sm:text-sm text-gray-600">
                    <span className="flex items-center gap-1.5 shrink-0">
                      <Calendar size={14} className="text-gray-500" />
                      {event.date}
                    </span>
                    <span className="flex items-center gap-1.5 shrink-0">
                      <Clock size={14} className="text-gray-500" />
                      {event.time}
                    </span>
                    <span className="flex items-center gap-1.5 shrink-0">
                      <MapPin size={14} className="text-gray-500" />
                      <a href="#" className="underline hover:text-[#008d44]">
                        {event.location}
                      </a>
                    </span>
                  </div>
                </div>
              </div>
            ))}

            {events.length === 0 && (
              <div className="bg-[#f7faf8] p-8 text-center text-gray-400 font-sans text-sm">
                No events currently scheduled.
              </div>
            )}
          </div>

          {/* Right Column: Hero Event Image (5 Cols) */}
          <div className="lg:col-span-5 relative min-h-[380px] sm:min-h-[460px] w-full rounded-none overflow-hidden">
            <Image
              src={content.image}
              alt={content.heading}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 45vw"
              priority
            />
          </div>

        </div>

      </div>
    </section>
  );
}