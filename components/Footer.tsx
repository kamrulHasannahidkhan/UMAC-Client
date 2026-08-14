"use client";

import { useState } from "react";
import Image from "next/image";
import ComingSoonButton from "@/components/ComingSoonButton";
import { MapPin, Phone, ArrowUpRight, Calendar } from "lucide-react";

const campusLinks = ["Academic", "Athletics", "Campus life", "Research", "Academic Area"];
const pageLinks = ["About", "Tution Fee", "Alumni", "Faculty Staff", "Event"];

const recentPosts = [
  { date: "August 6, 2024", title: "Those Inequalities Are Inequalities That", img: "/post1.png" },
  { date: "July 4, 2024", title: "After Decades Of Improvement, Cardiovascular", img: "/post2.png" },
];

const API_URL = process.env.NEXT_PUBLIC_ADMIN_API_URL;

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch(`${API_URL}/api/newsletter`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const json = await res.json();

      if (json.success) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
        setErrorMsg(json.error || "Something went wrong");
      }
    } catch (err) {
      setStatus("error");
      setErrorMsg("Failed to submit — please try again");
    }
  };

  return (
    <footer className="bg-black text-gray-400 font-sans">
      {/* Top Newsletter Section */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-12 border-b border-gray-900">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-normal text-white tracking-tight">
            Subscribe To Newsletter
          </h3>

          <form onSubmit={handleSubscribe} className="w-full lg:w-auto">
            <div className="flex flex-col sm:flex-row w-full lg:w-auto items-stretch">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Your mail"
                className="bg-transparent border border-[#008d44] text-white text-xs sm:text-sm px-5 py-3.5 w-full sm:w-80 focus:outline-none placeholder-gray-500"
              />
              <button
                type="submit"
                disabled={status === "sending"}
                className="bg-white hover:bg-gray-100 text-black text-xs sm:text-sm font-semibold px-6 py-3.5 flex items-center justify-center gap-2 shrink-0 transition-colors disabled:opacity-60 mt-2 sm:mt-0"
              >
                {status === "sending" ? "Submitting..." : "Submit Button"}{" "}
                <ArrowUpRight size={16} />
              </button>
            </div>
            {status === "success" && <p className="text-xs text-green-400 mt-2">Subscribed — thank you!</p>}
            {status === "error" && <p className="text-xs text-red-400 mt-2">{errorMsg}</p>}
          </form>
        </div>
      </div>

      {/* Main Footer Content Grid */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Column 1: College Info */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <Image src="/logo.png" alt="UAMC Logo" width={42} height={42} className="object-contain" />
              <div>
                <p className="font-bold text-white text-base leading-tight">Uttara Adhunik</p>
                <p className="text-xs text-gray-400 leading-tight">Medical College (UAMC)</p>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed max-w-sm mt-1">
              We are passionate about medical education dedicated to providing high-quality resources for learners of all backgrounds.
            </p>
            <div className="space-y-2 mt-2 text-xs sm:text-sm">
              <p className="flex items-center gap-2 text-gray-400">
                <MapPin size={15} className="text-gray-400 shrink-0" />
                Sector-9, Sonargaon Janapath, Uttara, Dhaka
              </p>
              <p className="flex items-center gap-2 text-gray-400">
                <Phone size={15} className="text-gray-400 shrink-0" />
                +880 1700-220000
              </p>
            </div>
          </div>

          {/* Column 2: Our Campus */}
          <div>
            <h4 className="text-white font-semibold text-base sm:text-lg underline decoration-1 underline-offset-8 mb-6">
              Our Campus
            </h4>
            <ul className="space-y-3.5 text-xs sm:text-sm">
              {campusLinks.map((link) => (
                <li key={link}>
                  <ComingSoonButton className="text-gray-400 hover:text-white transition-colors">
                    {link}
                  </ComingSoonButton>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Our Pages */}
          <div>
            <h4 className="text-white font-semibold text-base sm:text-lg underline decoration-1 underline-offset-8 mb-6">
              Our Pages
            </h4>
            <ul className="space-y-3.5 text-xs sm:text-sm">
              {pageLinks.map((link) => (
                <li key={link}>
                  <ComingSoonButton className="text-gray-400 hover:text-white transition-colors">
                    {link}
                  </ComingSoonButton>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Recent Posts */}
          <div>
            <h4 className="text-white font-semibold text-base sm:text-lg underline decoration-1 underline-offset-8 mb-6">
              Recent Posts
            </h4>
            <div className="space-y-5">
              {recentPosts.map((post) => (
                <div key={post.title} className="flex gap-3.5 items-start">
                  <div className="relative w-14 h-14 sm:w-16 sm:h-16 shrink-0 bg-gray-800 rounded-none overflow-hidden">
                    <Image src={post.img} alt={post.title} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="flex items-center gap-1.5 text-[11px] text-gray-400 mb-1">
                      <Calendar size={12} className="text-gray-400 shrink-0" />
                      {post.date}
                    </p>
                    <p className="text-xs sm:text-sm font-semibold text-white leading-snug line-clamp-2 hover:text-emerald-400 cursor-pointer transition-colors">
                      {post.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="border-t border-gray-900 py-6 text-center text-xs text-gray-500">
        Copyright @ 2024. All Rights Reserved by <span className="text-white font-medium">Unipix</span>
      </div>
    </footer>
  );
}
