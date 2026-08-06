"use client";

import { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import { Phone, Mail, ArrowRight, Check } from "lucide-react";

type ContactInfo = {
  phone: string;
  email: string;
  location: string;
  hoursWeekday: string;
  hoursWeekend: string;
};

const API_URL = process.env.NEXT_PUBLIC_ADMIN_API_URL;
const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;

const socials = [
  { name: "Facebook", path: "M22 12a10 10 0 1 0-11.6 9.9v-7H8v-2.9h2.4V9.8c0-2.4 1.4-3.7 3.6-3.7 1 0 2.1.2 2.1.2v2.3h-1.2c-1.2 0-1.6.7-1.6 1.5v1.8H16l-.4 2.9h-2.1v7A10 10 0 0 0 22 12Z" },
  { name: "Youtube", path: "M23 12s0-3.5-.4-5.2a3 3 0 0 0-2.1-2.1C18.8 4.2 12 4.2 12 4.2s-6.8 0-8.5.5A3 3 0 0 0 1.4 6.8C1 8.5 1 12 1 12s0 3.5.4 5.2a3 3 0 0 0 2.1 2.1c1.7.5 8.5.5 8.5.5s6.8 0 8.5-.5a3 3 0 0 0 2.1-2.1c.4-1.7.4-5.2.4-5.2ZM9.8 15.5v-7l6 3.5-6 3.5Z" },
  { name: "Linkedin", path: "M20.4 20.4h-3.5v-5.6c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9v5.7H9.4V9h3.4v1.6h.1c.5-.9 1.6-1.9 3.4-1.9 3.6 0 4.3 2.4 4.3 5.5v6.2ZM5.3 7.4a2 2 0 1 1 0-4 2 2 0 0 1 0 4ZM7 20.4H3.5V9H7v11.4Z" },
  { name: "Instagram", path: "M12 2c2.7 0 3.1 0 4.1.1 1.1 0 1.8.2 2.4.5.7.2 1.2.6 1.7 1.1.5.5.8 1 1.1 1.7.2.6.4 1.3.5 2.4 0 1 .1 1.4.1 4.1s0 3.1-.1 4.1c0 1.1-.2 1.8-.5 2.4-.2.7-.6 1.2-1.1 1.7-.5.5-1 .8-1.7 1.1-.6.2-1.3.4-2.4.5-1 0-1.4.1-4.1.1s-3.1 0-4.1-.1c-1.1 0-1.8-.2-2.4-.5-.7-.2-1.2-.6-1.7-1.1-.5-.5-.8-1-1.1-1.7-.2-.6-.4-1.3-.5-2.4C2 15.1 2 14.7 2 12s0-3.1.1-4.1c0-1.1.2-1.8.5-2.4.2-.7.6-1.2 1.1-1.7.5-.5 1-.8 1.7-1.1.6-.2 1.3-.4 2.4-.5C8.9 2 9.3 2 12 2Zm0 1.8c-2.6 0-3 0-4 .1-.9 0-1.4.2-1.7.3-.4.2-.7.3-1 .6-.3.3-.5.6-.6 1-.1.3-.3.8-.3 1.7-.1 1-.1 1.4-.1 4s0 3 .1 4c0 .9.2 1.4.3 1.7.2.4.3.7.6 1 .3.3.6.5 1 .6.3.1.8.3 1.7.3 1 .1 1.4.1 4 .1s3 0 4-.1c.9 0 1.4-.2 1.7-.3.4-.2.7-.3 1-.6.3-.3.5-.6.6-1 .1-.3.3-.8.3-1.7.1-1 .1-1.4.1-4s0-3-.1-4c0-.9-.2-1.4-.3-1.7-.2-.4-.3-.7-.6-1-.3-.3-.6-.5-1-.6-.3-.1-.8-.3-1.7-.3-1-.1-1.4-.1-4-.1Zm0 3.5a4.7 4.7 0 1 1 0 9.4 4.7 4.7 0 0 1 0-9.4Zm0 1.8a2.9 2.9 0 1 0 0 5.8 2.9 2.9 0 0 0 0-5.8Zm4.9-2a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2Z" },
];

export default function ContactFormSection() {
  const [info, setInfo] = useState<ContactInfo | null>(null);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "", message: "" });
  const [agreed, setAgreed] = useState(false);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  useEffect(() => {
    fetch(`${API_URL}/api/contact-info`)
      .then((res) => res.json())
      .then((json) => {
        if (json.success) setInfo(json.data);
      })
      .catch((err) => console.error("Failed to load contact info:", err))
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
      alert("Please agree to the privacy notice before submitting.");
      return;
    }

    setSending(true);
    setStatus("idle");

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          first_name: form.firstName,
          last_name: form.lastName,
          email: form.email,
          phone: form.phone,
          message: form.message,
        },
        { publicKey: PUBLIC_KEY }
      );
      setStatus("success");
      setForm({ firstName: "", lastName: "", email: "", phone: "", message: "" });
      setAgreed(false);
    } catch (err) {
      console.error("EmailJS send failed:", err);
      setStatus("error");
    } finally {
      setSending(false);
    }
  };

  return (
  
    <div className="w-full bg-white text-gray-900 font-sans">
      <section className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-12">
        
        {/* Left Sidebar Info Box */}
        <div className="bg-[#e8f2ea] p-8 h-fit">
          <h3 className="text-xl font-serif font-bold text-[#008d44] mb-3">
            Contact Information
          </h3>
          <div className="h-[1px] bg-white mb-6" />

          {loading || !info ? (
            <div className="space-y-6 text-sm text-[#2a2a2a]">
              <div>
                <p className="font-bold text-base mb-1">Phone No:</p>
                <p className="text-gray-700">0255080711</p>
              </div>
              <div>
                <p className="font-bold text-base mb-1">Email:</p>
                <p className="text-gray-700">uamcoffice08@ yahoo.com</p>
              </div>
              <div>
                <p className="font-bold text-base mb-1">Location:</p>
                <p className="text-gray-700">
                  H # 34, R # 4, Sector # 9, Sonargaon Janapath, Uttara Model Town
                </p>
              </div>
              <div>
                <p className="font-bold text-base mb-1">Open Hours:</p>
                <p className="text-gray-700">Monday - Friday: 8:00 am - 5:00 pm</p>
                <p className="text-gray-700">Saturday - Sunday: 8:00 am - 5:00 pm</p>
              </div>
              <div>
                <p className="font-bold text-base mb-3">Social Media:</p>
                <div className="flex gap-4 text-black">
                  {socials.map((s) => (
                    <svg
                      key={s.name}
                      viewBox="0 0 24 24"
                      width={18}
                      height={18}
                      fill="currentColor"
                      className="hover:text-[#008d44] cursor-pointer transition-colors"
                    >
                      <path d={s.path} />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6 text-sm text-[#2a2a2a]">
              <div>
                <p className="font-bold text-base mb-1">Phone No:</p>
                <p className="text-gray-700">{info.phone}</p>
              </div>
              <div>
                <p className="font-bold text-base mb-1">Email:</p>
                <p className="text-gray-700">{info.email}</p>
              </div>
              <div>
                <p className="font-bold text-base mb-1">Location:</p>
                <p className="text-gray-700">{info.location}</p>
              </div>
              <div>
                <p className="font-bold text-base mb-1">Open Hours:</p>
                <p className="text-gray-700">{info.hoursWeekday}</p>
                <p className="text-gray-700">{info.hoursWeekend}</p>
              </div>
              <div>
                <p className="font-bold text-base mb-3">Social Media:</p>
                <div className="flex gap-4 text-black">
                  {socials.map((s) => (
                    <svg
                      key={s.name}
                      viewBox="0 0 24 24"
                      width={18}
                      height={18}
                      fill="currentColor"
                      className="hover:text-[#008d44] cursor-pointer transition-colors"
                    >
                      <path d={s.path} />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Main Contact Form */}
        <div>
          <h2 className="text-3xl lg:text-4xl font-serif font-bold text-[#2a2a2a] border-l-4 border-[#008d44] pl-5 mb-8 leading-tight">
            Keep In Touch, We Want To Hear From You - <br className="hidden sm:block" /> Send Us Message
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* First Name & Last Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-[#2a2a2a] mb-2">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={form.firstName}
                  onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                  placeholder="Enter Your First Name"
                  className="w-full bg-[#e8f2ea] border-0 px-4 py-3.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#008d44]"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#2a2a2a] mb-2">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={form.lastName}
                  onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                  placeholder="Enter Your Last Name"
                  className="w-full bg-[#e8f2ea] border-0 px-4 py-3.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#008d44]"
                />
              </div>
            </div>

            {/* Email & Phone Number */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-[#2a2a2a] mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center bg-[#e8f2ea] overflow-hidden">
                  <div className="px-4 py-3.5 border-r border-gray-300/60">
                    <Mail size={18} className="text-gray-700" />
                  </div>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="Enter Your Valid Email Address"
                    className="w-full bg-transparent border-0 px-4 py-3.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#2a2a2a] mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center bg-[#e8f2ea] overflow-hidden">
                  <div className="px-4 py-3.5 border-r border-gray-300/60">
                    <Phone size={18} className="text-gray-700" />
                  </div>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="Enter Your Valid Contact Number"
                    className="w-full bg-transparent border-0 px-4 py-3.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Message Area */}
            <div>
              <label className="block text-sm font-semibold text-[#2a2a2a] mb-2">
                Write your Message Here
              </label>
              <textarea
                rows={6}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Write your message here..."
                className="w-full bg-[#e8f2ea] border-0 p-4 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#008d44]"
              />
            </div>

            {/* Custom Checkbox */}
            <label className="flex items-center gap-3 text-sm text-gray-700 cursor-pointer pt-2">
              <div
                onClick={() => setAgreed(!agreed)}
                className={`w-5 h-5 border border-gray-400 rounded-sm flex items-center justify-center transition-colors ${
                  agreed ? "bg-[#008d44] border-[#008d44]" : "bg-transparent"
                }`}
              >
                {agreed && <Check size={14} className="text-white stroke-[3]" />}
              </div>
              <span>By submitting this form, you agree to the UAMC privacy notice.</span>
            </label>

            {/* Alert Status */}
            {status === "success" && (
              <p className="text-sm text-green-800 bg-green-100 p-3 rounded">
                Message sent — we'll get back to you soon.
              </p>
            )}
            {status === "error" && (
              <p className="text-sm text-red-800 bg-red-100 p-3 rounded">
                Something went wrong sending your message. Please try again.
              </p>
            )}

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={sending}
                className="bg-[#008d44] hover:bg-[#007337] text-white font-medium px-7 py-3.5 flex items-center gap-2.5 transition-colors text-sm disabled:opacity-50"
              >
                <span>{sending ? "Sending..." : "Send you message"}</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </form>
        </div>

      </section>
    </div>
  );
}