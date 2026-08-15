"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, CalendarDays, Clock, MapPin, PartyPopper } from "lucide-react";

type EventContent = {
  heading: string;
  viewAllLink: string;
  image: string;
};

type AlumniEvent = {
  _id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  order?: number;
};

const API_URL = process.env.NEXT_PUBLIC_ADMIN_API_URL;

export default function AlumniEventSection() {
  const [content, setContent] = useState<EventContent | null>(null);
  const [events, setEvents] = useState<AlumniEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch(`${API_URL}/api/alumni-event-content`).then((res) => res.json()),
      fetch(`${API_URL}/api/alumni-event`).then((res) => res.json()),
    ])
      .then(([contentJson, eventsJson]) => {
        if (contentJson?.success) setContent(contentJson.data);
        if (eventsJson?.success) setEvents(eventsJson.data);
      })
      .catch((err) => console.error("Failed to load alumni event section:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="w-full py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 space-y-8">
          <div className="h-64 bg-slate-200 rounded-2xl animate-pulse" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 bg-white rounded-2xl border border-slate-200 animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Nothing configured in admin yet — don't render a broken/empty-looking section
  if (!content && events.length === 0) {
    return null;
  }

  return (
    <section
      className="w-full bg-slate-50 text-slate-900 py-16 sm:py-24 border-t border-slate-200"
      style={{ backgroundColor: "#f8fafc", color: "#0f172a" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Banner (single content doc: heading + image + View All link) */}
        {content && (
          <div className="relative rounded-2xl overflow-hidden mb-12 sm:mb-16 shadow-sm border border-slate-200/80">
            <div className="relative w-full h-56 sm:h-72">
              <Image
                src={content.image}
                alt={content.heading}
                fill
                className="object-cover object-center"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0f2418]/90 via-[#0f2418]/60 to-transparent" />
            </div>

            <div className="absolute inset-0 flex flex-col justify-center px-6 sm:px-10 max-w-xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-emerald-300 text-xs font-semibold mb-3 backdrop-blur-md w-fit">
                <PartyPopper size={14} />
                <span>Alumni Events</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white tracking-tight drop-shadow-sm">
                {content.heading}
              </h2>

              {content.viewAllLink && (
                <a
                  href={content.viewAllLink}
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 w-fit px-4 py-2 rounded-xl transition-all"
                >
                  <span>View All Events</span>
                  <ArrowUpRight size={16} />
                </a>
              )}
            </div>
          </div>
        )}

        {/* Event list */}
        {events.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <div
                key={event._id}
                className="bg-white border border-slate-200/80 rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                style={{ backgroundColor: "#ffffff" }}
              >
                <h3 className="font-bold text-slate-900 text-lg mb-3">{event.title}</h3>

                <div className="space-y-2 text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <CalendarDays size={15} className="text-emerald-700 shrink-0" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={15} className="text-emerald-700 shrink-0" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={15} className="text-emerald-700 shrink-0" />
                    <span>{event.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}