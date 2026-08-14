"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Calendar, Clock, MapPin } from "lucide-react";

type Event = { _id: string; title: string; date: string; time: string; location: string; description: string; image: string };
const API_URL = process.env.NEXT_PUBLIC_ADMIN_API_URL;

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/api/event-posts`)
      .then((res) => res.json())
      .then((json) => {
        if (json.success) setEvents(json.data);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-serif font-bold text-center mb-2">Upcoming Events</h1>
      <p className="text-center text-gray-500 mb-12">Stay up to date with what's happening at UAMC</p>

      {loading ? (
        <div className="h-64 bg-gray-50 animate-pulse rounded" />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {events.map((ev) => (
            <div key={ev._id} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div className="relative w-full h-48">
                <Image src={ev.image} alt={ev.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
              </div>
              <div className="p-5">
                <p className="font-semibold text-black mb-3">{ev.title}</p>
                <div className="space-y-1.5 text-sm text-gray-600 mb-3">
                  <p className="flex items-center gap-2"><Calendar size={14} /> {ev.date}</p>
                  <p className="flex items-center gap-2"><Clock size={14} /> {ev.time}</p>
                  <p className="flex items-center gap-2"><MapPin size={14} /> {ev.location}</p>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">{ev.description}</p>
              </div>
            </div>
          ))}
          {events.length === 0 && (
            <div className="col-span-2 bg-white border border-gray-200 rounded-lg p-10 text-center text-sm text-gray-500">
              No upcoming events at the moment — please check back soon.
            </div>
          )}
        </div>
      )}
    </main>
  );
}
