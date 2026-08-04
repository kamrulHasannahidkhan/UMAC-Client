import Image from "next/image";
import Link from "next/link";
import { MapPin, Mail, Phone, Search, Menu, ChevronDown } from "lucide-react";

const navLinks = [
  { label: "HOME", href: "/", active: true },
  { label: "ABOUT UAMC", href: "/about", dropdown: true },
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
  return (
    <header className="w-full font-sans bg-white">
      {/* Top info bar */}
      <div className="bg-[#fcfcfc] border-b border-gray-200/70 hidden lg:block">
        <div className="max-w-[1400px] mx-auto px-8 py-2.5 flex items-center justify-between text-[13px] text-gray-600">
          <div className="flex items-center gap-8">
            <span className="flex items-center gap-2">
              <MapPin size={18} className="text-gray-500 stroke-[1.5]" />
              House - 34, Road - 4, Sector - 9, Sonargaon Janapath, Uttara Model Town
            </span>
            <span className="flex items-center gap-2">
              <Mail size={18} className="text-gray-500 stroke-[1.5]" />
              info@uamc.com
            </span>
            <span className="flex items-center gap-2">
              <Phone size={18} className="text-gray-500 stroke-[1.5]" />
              +880 1700-220000
            </span>
          </div>

          <div className="flex items-center gap-6 font-medium text-gray-700">
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

      {/* Main navigation bar */}
      <div className="border-b border-gray-200/80">
        <div className="max-w-[1400px] mx-auto px-8 py-4 flex items-center justify-between">
          
          {/* Logo + Socials Section */}
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/logo.png" alt="UAMC Logo" width={44} height={44} className="shrink-0" />
              <div>
                <p className="font-extrabold text-black text-lg leading-none tracking-tight">Uttara Adhunik</p>
                <p className="text-[13px] text-gray-600 font-medium leading-tight mt-0.5">Medical College (UAMC)</p>
              </div>
            </Link>

            <span className="hidden lg:block h-8 w-[1px] bg-gray-300 ml-2"></span>

            <div className="hidden lg:flex items-center gap-4 text-black">
              {socials.map((s) => (
                <svg
                  key={s.name}
                  viewBox="0 0 24 24"
                  width={15}
                  height={15}
                  fill="currentColor"
                  className="hover:text-emerald-600 cursor-pointer transition-colors"
                >
                  <path d={s.path} />
                </svg>
              ))}
            </div>
          </div>

          {/* Nav Links */}
          <nav className="hidden lg:flex items-center gap-8 text-[13px] font-bold tracking-wider text-gray-800">
            {navLinks.map((link) => (
              <div key={link.label} className="relative py-2">
                <Link
                  href={link.href}
                  className={`flex items-center gap-1.5 transition-colors ${
                    link.active ? "text-emerald-600" : "hover:text-emerald-600"
                  }`}
                >
                  {link.label}
                  {link.dropdown && <ChevronDown size={16} className="stroke-[2.5]" />}
                </Link>
                {link.active && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-emerald-600"></span>
                )}
              </div>
            ))}
          </nav>

          {/* Right Action Icons */}
          <div className="hidden lg:flex items-center gap-5">
            <span className="h-6 w-[1px] bg-gray-300"></span>
            <Search size={22} className="cursor-pointer text-black hover:text-emerald-600 transition-colors" />
            <Menu size={24} className="cursor-pointer text-black hover:text-emerald-600 transition-colors stroke-[2]" />
          </div>

          {/* Mobile Menu Toggle */}
          <Menu size={24} className="lg:hidden cursor-pointer text-black" />
        </div>
      </div>
    </header>
  );
}