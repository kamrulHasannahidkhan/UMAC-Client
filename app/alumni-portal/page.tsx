"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { GraduationCap, Mail, Lock, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_ADMIN_API_URL;

export default function AlumniPortalAuthPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "claim">("login");
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleTabChange = (newMode: "login" | "claim") => {
    setMode(newMode);
    setErrorMsg(null);
    setForm({ email: "", password: "" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    const endpoint = mode === "login" ? "login" : "claim";

    try {
      const res = await fetch(`${API_URL}/api/alumni-auth/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json();

      if (json.success) {
        localStorage.setItem("alumni_token", json.data.token);
        localStorage.setItem("alumni_name", json.data.name || "");
        router.push("/alumni-portal/dashboard");
      } else {
        setErrorMsg(json.error || "Something went wrong. Please check your details.");
      }
    } catch {
      setErrorMsg("Unable to connect to the server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main 
      className="min-h-[calc(100vh-64px)] bg-slate-100 flex items-center justify-center px-4 py-12 sm:px-6 sm:py-16 text-slate-900"
      style={{ backgroundColor: "#f1f5f9", color: "#0f172a" }}
    >
      <div 
        className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200/80 p-6 sm:p-8 md:p-10"
        style={{ backgroundColor: "#ffffff" }}
      >
        {/* Header Icon */}
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-[#0f2418] text-white flex items-center justify-center mb-6 shadow-sm">
          <GraduationCap size={28} />
        </div>

        {/* Tab Switcher */}
        <div className="grid grid-cols-2 p-1 mb-6 rounded-xl bg-slate-100 border border-slate-200">
          <button
            type="button"
            onClick={() => handleTabChange("login")}
            className={`py-2.5 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
              mode === "login"
                ? "bg-[#0f2418] text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
            }`}
          >
            Log In
          </button>
          <button
            type="button"
            onClick={() => handleTabChange("claim")}
            className={`py-2.5 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
              mode === "claim"
                ? "bg-[#0f2418] text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
            }`}
          >
            Claim Profile
          </button>
        </div>

        {/* Dynamic Titles */}
        <h1 className="text-2xl font-serif font-bold text-slate-900 mb-1">
          {mode === "login" ? "Alumni Portal Login" : "Claim Your Alumni Profile"}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mb-6 leading-relaxed">
          {mode === "login"
            ? "Log in to update your batch year, designation, and public profile photo."
            : "If the college administration has listed your profile, enter your registered email below to set up your password."}
        </p>

        {/* Error Notification */}
        {errorMsg && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm rounded-xl p-3.5 mb-5 flex items-start gap-2.5">
            <AlertCircle size={18} className="shrink-0 text-red-600 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-slate-700">Email Address</label>
            <div className="relative">
              <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                required
                placeholder="doctor@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0f2418]/20 focus:border-[#0f2418] transition-all"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-semibold text-slate-700">
              {mode === "claim" ? "Create Password" : "Password"}
            </label>
            <div className="relative">
              <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="password"
                required
                minLength={6}
                placeholder={mode === "claim" ? "At least 6 characters" : "••••••••"}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0f2418]/20 focus:border-[#0f2418] transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0f2418] text-white font-semibold py-3.5 px-4 rounded-xl hover:bg-[#173428] transition-all shadow-md active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
          >
            {loading ? "Verifying..." : mode === "login" ? "Sign In" : "Claim Account"}
            {!loading && <ArrowRight size={16} />}
          </button>
        </form>
      </div>
    </main>
  );
}