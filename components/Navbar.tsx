"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  MapPin,
  Mail,
  Phone,
  Search,
  Menu,
  X,
  ChevronDown,
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
  {
    label: "FACILITIES",
    href: "/facilities",
    dropdown: [
      { label: "Hospital Service", tab: "hospital" },
      { label: "Departments", tab: "departments" },
      { label: "Library", tab: "library" },
      { label: "Medical Education Unit", tab: "meu" },
      { label: "Training", tab: "training" },
      { label: "Publications", tab: "publications" },
      { label: "Seminar", tab: "seminar" },
      { label: "Hostel", tab: "hostel" },
      { label: "Laboratory", tab: "laboratory" },
      { label: "Cafeteria", tab: "cafeteria" },
    ],
  },
  {
    label: "ADMISSION",
    href: "/admission",
    dropdown: [
      { label: "Admission Procedure & Fees", tab: "procedure" },
      { label: "Admission Papers", tab: "papers" },
      { label: "Application Form", tab: "forms" },
      { label: "Admission Results", tab: "results" },
      { label: "Online Registration", tab: "registration" },
    ],
  },
  { label: "NOTICE & MEDIA", href: "/notice" },
  { label: "CAREER", href: "/career" },
];

const socials = [
  {
    name: "Facebook",
    path: "M22 12a10 10 0 1 0-11.6 9.9v-7H8v-2.9h2.4V9.8c0-2.4 1.4-3.7 3.6-3.7 1 0 2.1.2 2.1.2v2.3h-1.2c-1.2 0-1.6.7-1.6 1.5v1.8H16l-.4 2.9h-2.1v7A10 10 0 0 0 22 12Z",
  },
  {
    name: "Youtube",
    path: "M23 12s0-3.5-.4-5.2a3 3 0 0 0-2.1-2.1C18.8 4.2 12 4.2 12 4.2s-6.8 0-8.5.5A3 3 0 0 0 1.4 6.8C1 8.5 1 12 1 12s0 3.5.4 5.2a3 3 0 0 0 2.1 2.1c1.7.5 8.5.5 8.5.5s6.8 0 8.5-.5a3 3 0 0 0 2.1-2.1c.4-1.7.4-5.2.4-5.2ZM9.8 15.5v-7l6 3.5-6 3.5Z",
  },
  {
    name: "Linkedin",
    path: "M20.4 20.4h-3.5v-5.6c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9v5.7H9.4V9h3.4v1.6h.1c.5-.9 1.6-1.9 3.4-1.9 3.6 0 4.3 2.4 4.3 5.5v6.2ZM5.3 7.4a2 2 0 1 1 0-4 2 2 0 0 1 0 4ZM7 20.4H3.5V9H7v11.4Z",
  },
  {
    name: "Instagram",
    path: "M12 2c2.7 0 3.1 0 4.1.1 1.1 0 1.8.2 2.4.5.7.2 1.2.6 1.7 1.1.5.5.8 1 1.1 1.7.2.6.4 1.3.5 2.4 0 1 .1 1.4.1 4.1s0 3.1-.1 4.1c0 1.1-.2 1.8-.5 2.4-.2.7-.6 1.2-1.1 1.7-.5.5-1 .8-1.7 1.1-.6.2-1.3.4-2.4.5-1 0-1.4.1-4.1.1s-3.1 0-4.1-.1c-1.1 0-1.8-.2-2.4-.5-.7-.2-1.2-.6-1.7-1.1-.5-.5-.8-1-1.1-1.7-.2-.6-.4-1.3-.5-2.4C2 15.1 2 14.7 2 12s0-3.1.1-4.1c0-1.1.2-1.8.5-2.4.2-.7.6-1.2 1.1-1.7.5-.5 1-.8 1.7-1.1.6-.2 1.3-.4 2.4-.5C8.9 2 9.3 2 12 2Zm0 1.8c-2.6 0-3 0-4 .1-.9 0-1.4.2-1.7.3-.4.2-.7.3-1 .6-.3.3-.5.6-.6 1-.1.3-.3.8-.3 1.7-.1 1-.1 1.4-.1 4s0 3 .1 4c0 .9.2 1.4.3 1.7.2.4.3.7.6 1 .3.3.6.5 1 .6.3.1.8.3 1.7.3 1 .1 1.4.1 4 .1s3 0 4-.1c.9 0 1.4-.2 1.7-.3.4-.2.7-.3 1-.6.3-.3.5-.6.6-1 .1-.3.3-.8.3-1.7.1-1 .1-1.4.1-4s0-3-.1-4c0-.9-.2-1.4-.3-1.7-.2-.4-.3-.7-.6-1-.3-.3-.6-.5-1-.6-.3-.1-.8-.3-1.7-.3-1-.1-1.4-.1-4-.1Zm0 3.5a4.7 4.7 0 1 1 0 9.4 4.7 4.7 0 0 1 0-9.4Zm0 1.8a2.9 2.9 0 1 0 0 5.8 2.9 2.9 0 0 0 0-5.8Zm4.9-2a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2Z",
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [hoveredSubitem, setHoveredSubitem] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMobileSubmenu, setOpenMobileSubmenu] = useState<string | null>(null);

  const toggleMobileSubmenu = (label: string) => {
    setOpenMobileSubmenu(openMobileSubmenu === label ? null : label);
  };

  return (
    <header className="w-full relative bg-white">
      {/* 1. Top Bar */}
      <div className="bg-[#fcfcfc] border-b border-dotted border-gray-300 text-xs text-gray-600 hidden xl:block">
        <div className="max-w-[1400px] mx-auto px-6 py-2 flex items-center justify-between">
          {/* Left Contacts */}
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <MapPin size={15} className="text-gray-500" />
              House - 34, Road - 4, Sector - 9, Sonargaon Janapath, Uttara Model Town
            </span>
            <span className="flex items-center gap-2">
              <Mail size={15} className="text-gray-500" />
              info@uamc.com
            </span>
            <span className="flex items-center gap-2">
              <Phone size={15} className="text-gray-500" />
              +880 1700-220000
            </span>
          </div>

          {/* Right Quick Links */}
          <div className="flex items-center gap-5 font-medium">
            <Link href="/student-portal" className="hover:text-emerald-600 transition-colors">
              Student Portal
            </Link>
            <Link href="/teachers-portal" className="hover:text-emerald-600 transition-colors">
              Teachers Portal
            </Link>
            <Link href="/alumni" className="hover:text-emerald-600 transition-colors">
              Alumni
            </Link>
            <Link href="/events" className="hover:text-emerald-600 transition-colors">
              Events
            </Link>
            <span className="text-gray-300 font-light">|</span>
            <Link href="/contact" className="hover:text-emerald-600 transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <div className="max-w-[1400px] mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo + Socials Group */}
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="flex items-center gap-3 shrink-0"
              onClick={() => setMobileOpen(false)}
            >
              <Image
                src="/logo.png"
                alt="UAMC Logo"
                width={46}
                height={46}
                className="object-contain"
              />
              <div>
                <h1 className="font-bold text-lg leading-tight text-gray-900 tracking-tight">
                  Uttara Adhunik
                </h1>
                <p className="text-xs text-gray-600 leading-tight">Medical College (UAMC)</p>
              </div>
            </Link>

            {/* Vertical Separator & Social Icons */}
            <div className="hidden xl:flex items-center gap-5">
              <div className="h-6 w-[1px] bg-gray-300" />
              <div className="flex items-center gap-3.5 text-gray-800">
                {socials.map((s) => (
                  <svg
                    key={s.name}
                    viewBox="0 0 24 24"
                    width={15}
                    height={15}
                    fill="currentColor"
                    className="hover:text-emerald-600 transition-colors cursor-pointer"
                  >
                    <path d={s.path} />
                  </svg>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 h-full">
            {navLinks.map((link) => {
              const hasDropdown = Array.isArray(link.dropdown);
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);

              return (
                <div
                  key={link.label}
                  className="relative h-full flex items-center"
                  onMouseEnter={() => hasDropdown && setOpenDropdown(link.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <Link
                    href={link.href}
                    className={`flex items-center gap-1.5 text-xs xl:text-sm font-bold tracking-wider transition-colors h-full border-b-2 ${
                      isActive
                        ? "border-emerald-500 text-emerald-500"
                        : "border-transparent text-gray-900 hover:text-emerald-600"
                    }`}
                  >
                    {link.label}
                    {hasDropdown && (
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-200 stroke-[2.5] ${
                          openDropdown === link.label ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </Link>

                  {/* Frosted Glass + Yellow Accent Dropdown */}
                  {hasDropdown && openDropdown === link.label && (
                    <div className="absolute left-0 top-[100%] w-64 bg-slate-800/80 backdrop-blur-md border border-slate-700/50 rounded-b-md shadow-2xl z-50 overflow-hidden">
                      {link.dropdown?.map((item) => {
                        const isHovered = hoveredSubitem === item.tab;

                        return (
                          <Link
                            key={item.tab}
                            href={`${link.href}?tab=${encodeURIComponent(item.tab)}`}
                            onMouseEnter={() => setHoveredSubitem(item.tab)}
                            onMouseLeave={() => setHoveredSubitem(null)}
                            className={`flex items-center justify-between px-5 py-3 text-sm font-semibold transition-colors duration-150 border-b border-amber-400/30 last:border-b-0 ${
                              isHovered
                                ? "bg-[#ffcc29] text-black font-bold"
                                : "text-white hover:bg-slate-700/50"
                            }`}
                          >
                            <span>{item.label}</span>
                            {isHovered ? (
                              <ArrowUpRight size={18} className="stroke-[2.5] shrink-0 text-black" />
                            ) : (
                              <ArrowRight size={16} className="text-gray-300 shrink-0" />
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

          {/* Right Action Icons & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-4 text-gray-900">
              <div className="h-5 w-[1px] bg-gray-300" />
              <button aria-label="Search" className="p-1 hover:text-emerald-600 transition-colors">
                <Search size={22} className="stroke-[2.2]" />
              </button>
              <button aria-label="Menu" className="p-1 hover:text-emerald-600 transition-colors">
                <Menu size={22} className="stroke-[2.2]" />
              </button>
            </div>

            {/* Mobile Burger Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-gray-800 focus:outline-none"
              aria-label="Toggle Navigation"
            >
              {mobileOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </div>

      {/* 3. Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 shadow-xl absolute top-full left-0 w-full z-50 max-h-[85vh] overflow-y-auto">
          <nav className="flex flex-col divide-y divide-gray-100">
            {navLinks.map((link) => {
              const hasDropdown = Array.isArray(link.dropdown);
              const isOpen = openMobileSubmenu === link.label;
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);

              return (
                <div key={link.label} className="w-full">
                  {hasDropdown ? (
                    <>
                      <button
                        onClick={() => toggleMobileSubmenu(link.label)}
                        className="w-full flex items-center justify-between px-6 py-4 text-xs font-bold tracking-wider text-gray-800"
                      >
                        <span className={isActive ? "text-emerald-500" : ""}>{link.label}</span>
                        <ChevronDown
                          size={16}
                          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
                        />
                      </button>
                      {isOpen && (
                        <div className="bg-slate-800/90 border-t border-slate-700">
                          {link.dropdown?.map((item) => (
                            <Link
                              key={item.tab}
                              href={`${link.href}?tab=${encodeURIComponent(item.tab)}`}
                              onClick={() => setMobileOpen(false)}
                              className="flex items-center justify-between px-8 py-3 text-xs font-semibold text-white hover:bg-[#ffcc29] hover:text-black border-b border-amber-400/30 last:border-b-0 transition-colors"
                            >
                              {item.label}
                              <ArrowRight size={13} className="shrink-0" />
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={`block px-6 py-4 text-xs font-bold tracking-wider ${
                        isActive ? "text-emerald-500" : "text-gray-800"
                      }`}
                    >
                      {link.label}
                    </Link>
                  )}
                </div>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}