"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Mail,
  Phone,
  Search,
  Menu,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";

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
  { label: "FACILITIES", href: "/facilities", dropdown: true },
  { label: "ADMISSION", href: "/admission", dropdown: true },
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
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <header className="w-full relative font-sans">
      
      {/* Top Info Bar */}
      <div className="bg-[#f9fbf9] border-b border-dashed border-gray-200 hidden lg:block">
        <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between text-xs text-gray-600">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <MapPin size={15} className="text-gray-500" />
              <span>House - 34, Road - 4, Sector - 9, Sonargaon Janapath, Uttara Model Town</span>
            </span>
            <span className="flex items-center gap-2">
              <Mail size={15} className="text-gray-500" />
              <span>info@uamc.com</span>
            </span>
            <span className="flex items-center gap-2">
              <Phone size={15} className="text-gray-500" />
              <span>+880 1700-220000</span>
            </span>
          </div>

          <div className="flex items-center gap-5 text-gray-700 font-medium">
            <Link href="/student-portal" className="hover:text-[#008d44] transition-colors">
              Student Portal
            </Link>
            <Link href="/teachers-portal" className="hover:text-[#008d44] transition-colors">
              Teachers Portal
            </Link>
            <Link href="/alumni" className="hover:text-[#008d44] transition-colors">
              Alumni
            </Link>
            <Link href="/events" className="hover:text-[#008d44] transition-colors">
              Events
            </Link>
            <span className="text-gray-300 font-light">|</span>
            <Link href="/contact" className="hover:text-[#008d44] transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="bg-white border-b border-gray-100 relative z-30 py-3">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          
          {/* Logo & Social Links */}
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-3 shrink-0">
              <Image
                src="/logo.png"
                alt="UAMC Logo"
                width={48}
                height={48}
                className="object-contain"
              />
              <div>
                <p className="font-serif font-bold text-lg text-[#1a1a1a] leading-tight">
                  Uttara Adhunik
                </p>
                <p className="text-xs text-gray-500 leading-tight">
                  Medical College (UAMC)
                </p>
              </div>
            </Link>

            <div className="hidden lg:block w-[1px] h-8 bg-gray-300 mx-1" />

            <div className="hidden lg:flex items-center gap-3 text-gray-800">
              {socials.map((s) => (
                <svg
                  key={s.name}
                  viewBox="0 0 24 24"
                  width={14}
                  height={14}
                  fill="currentColor"
                  className="hover:text-[#008d44] cursor-pointer transition-colors"
                >
                  <path d={s.path} />
                </svg>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-xs font-bold tracking-wider text-[#1a1a1a]">
            {navLinks.map((link) => {
              const isOpen = openDropdown === link.label;

              return (
                <div
                  key={link.label}
                  className="relative py-3"
                  onMouseEnter={() => link.dropdown && setOpenDropdown(link.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <Link
                    href={link.href}
                    className={`flex items-center gap-1.5 pb-1 transition-colors ${
                      isOpen
                        ? "text-[#008d44] border-b-2 border-[#008d44]"
                        : "hover:text-[#008d44]"
                    }`}
                  >
                    <span>{link.label}</span>
                    {link.dropdown &&
                      (isOpen ? (
                        <ChevronUp size={16} className="text-[#008d44]" />
                      ) : (
                        <ChevronDown size={16} />
                      ))}
                  </Link>

                  {/* Dropdown Box matching Screenshot */}
                  {Array.isArray(link.dropdown) && isOpen && (
                    <div className="absolute left-0 top-full w-72 bg-[#7b8e83]/30 backdrop-blur-md shadow-2xl z-50 overflow-hidden">
                      {link.dropdown.map((item) => {
                        const isHovered = hoveredItem === item.tab;

                        return (
                          <Link
                            key={item.tab}
                            href={`${link.href}?tab=${encodeURIComponent(item.tab)}`}
                            onMouseEnter={() => setHoveredItem(item.tab)}
                            onMouseLeave={() => setHoveredItem(null)}
                            className={`flex items-center justify-between px-6 py-3.5 text-sm font-medium transition-colors border-b border-[#fcd34d]/60 last:border-b-0 ${
                              isHovered
                                ? "bg-[#ffc82e] text-[#1a1a1a] font-semibold"
                                : "text-white hover:bg-[#ffc82e] hover:text-[#1a1a1a]"
                            }`}
                          >
                            <span>{item.label}</span>
                            {isHovered ? (
                              <ArrowUpRight size={18} className="text-[#1a1a1a] stroke-[2.5]" />
                            ) : (
                              <ArrowRight size={18} className="text-white/90" />
                            )}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Search & Menu Icons */}
          <div className="hidden lg:flex items-center gap-4">
            <div className="w-[1px] h-6 bg-gray-300" />
            <button className="p-1 text-[#1a1a1a] hover:text-[#008d44] transition-colors">
              <Search size={20} strokeWidth={2} />
            </button>
            <button className="p-1 text-[#1a1a1a] hover:text-[#008d44] transition-colors">
              <Menu size={22} strokeWidth={2} />
            </button>
          </div>

          <button className="lg:hidden p-1 text-gray-800">
            <Menu size={24} />
          </button>

        </div>
      </div>

    </header>
  );
}