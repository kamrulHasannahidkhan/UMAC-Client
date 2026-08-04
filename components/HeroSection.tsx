"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowRight, GraduationCap } from "lucide-react";

type Slide = {
  _id: string;
  badge: string;
  titleLine1: string;
  highlight: string;
  titleLine2: string;
  bgImage: string;
};

const degrees = [
  {
    title: "Bachelor of Medicine",
    desc: "A degree focusing on the study of human biology, anatomy, and pathology to build a strong medical foundation.",
  },
  {
    title: "Bachelor of Surgery",
    desc: "A degree emphasizing clinical and surgical skills for diagnosing and treating patients effectively.",
  },
];

const SLIDE_INTERVAL_MS = 2000;
const API_URL = process.env.NEXT_PUBLIC_ADMIN_API_URL;

export default function HeroSection() {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [active, setActive] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/api/hero-slides`)
      .then((res) => res.json())
      .then((json) => {
        if (json.success) setSlides(json.data);
      })
      .catch((err) => console.error("Failed to load hero slides:", err))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, SLIDE_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [slides.length]);

  if (loading) {
    return <section className="w-full h-[95vh] min-h-[750px] max-h-[980px] bg-gray-900 animate-pulse" />;
  }

  if (slides.length === 0) {
    return (
      <section className="w-full h-[95vh] min-h-[750px] max-h-[980px] bg-gray-900 flex items-center justify-center text-white">
        No hero slides yet — add one from the admin panel.
      </section>
    );
  }

  const slide = slides[active];
  const goPrev = () => setActive((prev) => (prev - 1 + slides.length) % slides.length);
  const goNext = () => setActive((prev) => (prev + 1) % slides.length);

  return (
    <section className="relative w-full h-[95vh] min-h-[750px] max-h-[980px] overflow-hidden text-white font-sans bg-white">
      {/* Background Slides with Forced Full Bleed */}
      {slides.map((s, i) => (
        <div
          key={s._id}
          className={`absolute inset-0 w-full h-full transition-opacity duration-700 ${
            i === active ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={s.bgImage}
            alt={s.titleLine1}
            fill
            priority={i === 0}
            sizes="100vw"
            className="object-cover object-center w-full h-full"
          />
        </div>
      ))}

      {/* Light Overlay to preserve image colors */}
      <div className="absolute inset-0 bg-black/10" />

      {/* Top Header Pagination Bar */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-8 pt-10 flex items-center justify-between text-xs tracking-widest font-semibold uppercase">
        <button
          onClick={goPrev}
          className="text-gray-200 hover:text-white transition-colors cursor-pointer"
        >
          PREV
        </button>

        <div className="flex-1 max-w-md mx-8 flex items-center justify-center gap-4 border-t border-white/30 pt-1">
          {slides.map((s, i) => (
            <div key={s._id} className="flex items-center gap-4">
              <button
                onClick={() => setActive(i)}
                className={`transition-colors cursor-pointer ${
                  i === active
                    ? "text-[#facc15] font-bold text-sm"
                    : "text-white/80 hover:text-white text-xs"
                }`}
              >
                {String(i + 1).padStart(2, "0")}
              </button>
              {i < slides.length - 1 && (
                <span className="text-white/30 text-xs">|</span>
              )}
            </div>
          ))}
        </div>

        <button
          onClick={goNext}
          className="text-gray-200 hover:text-white transition-colors cursor-pointer"
        >
          NEXT
        </button>
      </div>

      {/* Frosted Green Overlay */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 h-[calc(100%-100px)] flex items-end pb-16">
        <div className="w-full bg-[#0a3d24]/35 backdrop-blur-[3px] border border-white/20 rounded-sm p-8 md:p-12 lg:p-14 shadow-xl">
          <div className="flex flex-col lg:flex-row w-full items-end justify-between gap-10">
            
            {/* Left Content */}
            <div className="max-w-2xl">
              <p className="flex items-center gap-2 text-xs md:text-sm mb-4 text-gray-100 font-normal tracking-wide">
                <GraduationCap size={18} className="text-white shrink-0" />
                {slide.badge}
              </p>

              <h1 className="text-4xl md:text-5xl lg:text-[58px] leading-[1.15] mb-8 font-serif text-white tracking-tight">
                <span className="font-bold">{slide.titleLine1}</span>{" "}
                <span className="font-serif italic text-white">in Medical</span>
                <br />
                <span className="font-serif italic text-[#facc15] font-semibold">
                  {slide.highlight}
                </span>
                <span className="font-serif">, {slide.titleLine2}</span>
              </h1>

              <button className="bg-white text-[#0a3d24] font-semibold text-xs tracking-wider uppercase px-7 py-4 rounded-sm flex items-center gap-2 hover:bg-gray-100 transition-all shadow-md">
                View Our Program <ArrowRight size={14} />
              </button>
            </div>

            {/* Right Side: MBBS Degrees */}
            <div className="hidden lg:block w-80 shrink-0">
              <h3 className="text-[#facc15] text-2xl font-serif font-bold mb-6">
                MBBS Degrees
              </h3>
              <div className="space-y-6">
                {degrees.map((d) => (
                  <div key={d.title} className="border-t border-white/25 pt-4">
                    <div className="flex items-center justify-between mb-1.5 cursor-pointer group">
                      <p className="font-serif text-base text-white font-medium group-hover:text-[#facc15] transition-colors">
                        {d.title}
                      </p>
                      <ArrowRight size={15} className="text-white shrink-0 group-hover:translate-x-1 transition-transform" />
                    </div>
                    <p className="text-xs text-gray-100 leading-relaxed font-light">
                      {d.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}