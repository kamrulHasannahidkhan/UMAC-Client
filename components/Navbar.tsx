"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Mail, Phone, Search, Menu, X, ChevronDown, ArrowRight } from "lucide-react";

const navLinks = [
  { label: "HOME", href: "/" },
  {
    label: "ABOUT UAMC",
    href: "/about",
    dropdown: [
      { label: "Overview", tab: "Overview" },
      { label: "History of UAMC", tab: "History of UAMC" },
      { label: "Vision & Mission", tab: "Vision & Mission" },
      { label: "Aim & Objective", tab: "Aim & Objective" },
      { label: "Organizational Structure", tab: "Organizational Structure" },
      { label: "Founder Members", tab: "Founder Members" },
      { label: "EC Members", tab: "EC Members" },
      { label: "GB Members", tab: "GB Members" },
    ],
  },
  { label: "FACILITIES", href: "/facilities" },
  { label: "ADMISSION", href: "/admission" },
  { label: "NOTICE & MEDIA", href: "/notice" },
  { label: "CAREER", href: "/career" },
];

const socials = [
  { name: "Facebook", path: "M22 12a10 10 0 1 0-11.6 9.9v-7H8v-2.9h2.4V9.8c0-2.4 1.4-3.7 3.6-3.7 1 0 2.1.2 2.1.2v2.3h-1.2c-1.2 0-1.6.7-1.6 1.5v1.8H16l-.4 2.9h-2.1v7A10 10 0 0 0 22 12Z" },
  { name: "Youtube", path: "M23 12s0-3.5-.4-5.2a3 3 0 0 0-2.1-2.1C18.8 4.2 12 4.2 12 4.2s-6.8 0-8.5.5A3 3 0 0 0 1.4 6.8C1 8.5 1 12 1 12s0 3.5.4 5.2a3 3 0 0 0 2.1 2.1c1.7.5 8.5.5 8.5.5s6.8 0 8.5-.5a3 3 0 0 0 2.1-2.1c.4-1.7.4-5.2.4-5.2ZM9.8 15.5v-7l6 3.5-6 3.5Z" },
  { name: "Linkedin", path: "M20.4 20.4h-3.5v-5.6c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9v5.7H9.4V9h3.4v1.6h.1c.5-.9 1.6-1.9 3.4-1.9 3.6 0 4.3 2.4 4.3 5.5v6.2ZM5.3 7.4a2 2 0 1 1 0-4 2 2 0 0 1 0 4ZM7 20.4H3.5V9H7v11.4Z" },
  { name: "Instagram", path: "M12 2c2.7 0 3.1 0 4.1.1 1.1 0 1.8.2 2.4.5.7.2 1.2.6 1.7 1.1.5.5.8 1 1.1 1.7.2.6.4 1.3.5 2.4 0 1 .1 1.4.1 4.1s0 3.1-.1 4.1c0 1.1-.2 1.8-.5 2.4-.2.7-.6 1.2-1.1 1.7-.5.5-1 .8-1.7 1.1-.6.2-1.3.4-2.4.5-1 0-1.4.1-4.1.1s-3.1 0-4.1-.1c-1.1 0-1.8-.2-2.4-.5-.7-.2-1.2-.6-1.7-1.1-.5-.5-.8-1-1.1-1.7-.2-.6-.4-1.3-.5-2.4C2 15.1 2 14.7 2 12s0-3.1.1-4.1c0-1.1.2-1.8.5-2.4.2-.7.6-1.2 1.1-1.7.5-.5 1-.8 1.7-1.1.6-.2 1.3-.4 2.4-.5C8.9 2 9.3 2 12 2Zm0 1.8c-2.6 0-3 0-4 .1-.9 0-1.4.2-1.7.3-.4.2-.7.3-1 .6-.3.3-.5.6-.6 1-.1.3-.3.8-.3 1.7-.1 1-.1 1.4-.1 4s0 3 .1 4c0 .9.2 1.4.3 1.7.2.4.3.7.6 1 .3.3.6.5 1 .6.3.1.8.3 1.7.3 1 .1 1.4.1 4 .1s3 0 4-.1c.9 0 1.4-.2 1.7-.3.4-.2.7-.3 1-.6.3-.3.5-.6.6-1 .1-.3.3-.8.3-1.7.1-1 .1-1.4.1-4s0-3-.1-4c0-.9-.2-1.4-.3-1.7-.2-.4-.3-.7-.6-1-.3-.3-.6-.5-1-.6-.3-.1-.8-.3-1.7-.3-1-.1-1.4-.1-4-.1Zm0 3.5a4.7 4.7 0 1 1 0 9.4 4.7 4.7 0 0 1 0-9.4Zm0 1.8a2.9 2.9 0 1 0 0 5.8 2.9 2.9 0 0 0 0-5.8Zm4.9-2a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2Z" },
];

export default function Navbar() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);

  return (
    <header className="w-full relative">
      {/* Top info bar */}
      <div className="bg-gray-50 border-b border-gray-200 hidden lg:block">
        <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <MapPin size={16} className="text-green-600" />
              House - 34, Road - 4, Sector - 9, Sonargaon Janapath, Uttara Model Town
            </span>
            <span className="flex items-center gap-2">
              <Mail size={16} className="text-green-600" />
              info@uamc.com
            </span>
            <span className="flex items-center gap-2">
              <Phone size={16} className="text-green-600" />
              +880 1700-220000
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/student-portal" className="hover:text-green-600">Student Portal</Link>
            <Link href="/teachers-portal" className="hover:text-green-600">Teachers Portal</Link>
            <Link href="/alumni" className="hover:text-green-600">Alumni</Link>
            <Link href="/events" className="hover:text-green-600">Events</Link>
            <span className="text-gray-300">|</span>
            <Link href="/contact" className="hover:text-green-600">Contact Us</Link>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="bg-white border-b border-gray-200 relative z-30">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3" onClick={() => setMobileOpen(false)}>
            <Image src="/logo.png" alt="UAMC Logo" width={44} height={44} />
            <div>
              <p className="font-bold text-base md:text-lg leading-tight">Uttara Adhunik</p>
              <p className="text-xs md:text-sm text-gray-500 leading-tight">Medical College (UAMC)</p>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-3 text-gray-400">
            {socials.map((s) => (
              <svg key={s.name} viewBox="0 0 24 24" width={16} height={16} fill="currentColor" className="hover:text-green-600 cursor-pointer">
                <path d={s.path} />
              </svg>
            ))}
          </div>

          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-gray-700">
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => link.dropdown && setOpenDropdown(link.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link href={link.href} className="flex items-center gap-1 hover:text-green-600">
                  {link.label}
                  {link.dropdown && (
                    <ChevronDown size={14} className={`transition-transform ${openDropdown === link.label ? "rotate-180" : ""}`} />
                  )}
                </Link>

                {Array.isArray(link.dropdown) && openDropdown === link.label && (
                  <div className="absolute left-0 top-full w-64 bg-gray-800/95 rounded-b shadow-xl overflow-hidden">
                    {link.dropdown.map((item) => (
                      <Link
                        key={item.tab}
                        href={`${link.href}?tab=${encodeURIComponent(item.tab)}`}
                        className="flex items-center justify-between px-5 py-3 text-sm text-white hover:bg-green-700/80 transition-colors border-b border-white/10 last:border-b-0"
                      >
                        {item.label}
                        <ArrowRight size={14} />
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <Search size={18} className="cursor-pointer" />
            <Menu size={18} className="cursor-pointer" />
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-1"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      {mobileOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white border-b border-gray-200 shadow-lg z-40 max-h-[80vh] overflow-y-auto">
          <nav className="flex flex-col py-2">
            {navLinks.map((link) => (
              <div key={link.label} className="border-b border-gray-100 last:border-b-0">
                {link.dropdown ? (
                  <>
                    <button
                      onClick={() => setMobileAboutOpen(!mobileAboutOpen)}
                      className="w-full flex items-center justify-between px-6 py-4 text-sm font-medium text-gray-700"
                    >
                      {link.label}
                      <ChevronDown size={16} className={`transition-transform ${mobileAboutOpen ? "rotate-180" : ""}`} />
                    </button>
                    {mobileAboutOpen && (
                      <div className="bg-gray-50">
                        {link.dropdown.map((item) => (
                          <Link
                            key={item.tab}
                            href={`${link.href}?tab=${encodeURIComponent(item.tab)}`}
                            onClick={() => setMobileOpen(false)}
                            className="flex items-center justify-between px-8 py-3 text-sm text-gray-600 border-t border-gray-100"
                          >
                            {item.label}
                            <ArrowRight size={13} />
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block px-6 py-4 text-sm font-medium text-gray-700"
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-4 px-6 py-4 border-t border-gray-100 text-gray-400">
            {socials.map((s) => (
              <svg key={s.name} viewBox="0 0 24 24" width={18} height={18} fill="currentColor">
                <path d={s.path} />
              </svg>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
