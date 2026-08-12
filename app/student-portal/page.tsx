"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  GraduationCap,
  Mail,
  Lock,
  User,
  IdCard,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Loader2,
  AlertCircle,
} from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_ADMIN_API_URL;

export default function StudentPortalAuthPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [form, setForm] = useState({ name: "", studentId: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    const endpoint = mode === "login" ? "login" : "signup";
    const body = mode === "login" ? { email: form.email, password: form.password } : form;

    try {
      const res = await fetch(`${API_URL}/api/student-auth/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const json = await res.json();

      if (json.success) {
        localStorage.setItem("student_token", json.data.token);
        localStorage.setItem("student_name", json.data.name);
        router.push("/student-portal/dashboard");
      } else {
        setErrorMsg(json.error || "Something went wrong");
      }
    } catch {
      setErrorMsg("Request failed — please try again");
    }

    setLoading(false);
  };

  return (
    <main className="min-h-[calc(100vh-64px)] bg-slate-50/80 flex items-center justify-center px-4 sm:px-6 py-12 md:py-20">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200/70 overflow-hidden grid grid-cols-1 md:grid-cols-12 transition-all duration-300">
        
        {/* Left Panel - Brand / Hero (5 columns) */}
        <div className="hidden md:flex md:col-span-5 flex-col justify-between bg-gradient-to-br from-[#0a1810] via-[#0f2418] to-[#173a27] text-white p-10 relative overflow-hidden">
          {/* Subtle Ambient Glow */}
          <div className="absolute -top-24 -left-24 w-60 h-60 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-60 h-60 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-400/5 border border-emerald-500/30 flex items-center justify-center mb-8 shadow-inner">
              <GraduationCap size={28} className="text-emerald-400" />
            </div>
            
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-semibold mb-4 backdrop-blur-sm">
              <Sparkles size={12} /> Official Portal
            </div>

            <h2 className="text-2xl lg:text-3xl font-serif font-bold tracking-tight mb-4 text-white">
              Student Portal
            </h2>
            <p className="text-emerald-100/80 text-sm leading-relaxed font-normal">
              Access your academic results, college news, publications, and notices — all in one unified platform built exclusively for UAMC students.
            </p>
          </div>

          <div className="relative z-10 space-y-3.5 text-xs text-emerald-100/90 border-t border-white/10 pt-8">
            <p className="flex items-center gap-2.5 font-medium">
              <Mail size={15} className="text-emerald-400 shrink-0" />
              <span>Use your official <strong className="text-white">@uamc.edu.bd</strong> email</span>
            </p>
            <p className="flex items-center gap-2.5 font-medium">
              <ShieldCheck size={15} className="text-emerald-400 shrink-0" />
              <span>Secure & encrypted account access</span>
            </p>
          </div>
        </div>

        {/* Right Panel - Form (7 columns) */}
        <div className="md:col-span-7 p-8 sm:p-10 lg:p-12 flex flex-col justify-center">
          {/* Segmented Mode Switcher */}
          <div className="p-1 bg-slate-100/90 rounded-2xl mb-8 flex items-center border border-slate-200/80">
            <button
              type="button"
              onClick={() => { setMode("login"); setErrorMsg(null); }}
              className={`flex-1 py-2.5 text-xs sm:text-sm font-semibold rounded-xl transition-all duration-200 ${
                mode === "login"
                  ? "bg-[#0f2418] text-white shadow-md shadow-emerald-950/10"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
              }`}
            >
              Log In
            </button>
            <button
              type="button"
              onClick={() => { setMode("signup"); setErrorMsg(null); }}
              className={`flex-1 py-2.5 text-xs sm:text-sm font-semibold rounded-xl transition-all duration-200 ${
                mode === "signup"
                  ? "bg-[#0f2418] text-white shadow-md shadow-emerald-950/10"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
              }`}
            >
              Sign Up
            </button>
          </div>

          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 tracking-tight mb-2">
              {mode === "login" ? "Welcome back" : "Create your account"}
            </h1>
            <p className="text-sm text-slate-500 font-normal">
              {mode === "login"
                ? "Log in to view your academic results and updates."
                : "Sign up with your official UAMC student credentials."}
            </p>
          </div>

          {/* Error Message Box */}
          {errorMsg && (
            <div className="bg-rose-50 border border-rose-200/80 text-rose-700 text-xs sm:text-sm font-medium rounded-xl px-4 py-3 mb-6 flex items-center gap-2.5 animate-in fade-in slide-in-from-top-1 duration-200">
              <AlertCircle size={16} className="text-rose-500 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "signup" && (
              <>
                <div className="relative">
                  <User size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-slate-50/50 border border-slate-200 focus:bg-white rounded-xl pl-11 pr-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 transition-all duration-200"
                  />
                </div>

                <div className="relative">
                  <IdCard size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  <input
                    type="text"
                    required
                    placeholder="Student ID"
                    value={form.studentId}
                    onChange={(e) => setForm({ ...form, studentId: e.target.value })}
                    className="w-full bg-slate-50/50 border border-slate-200 focus:bg-white rounded-xl pl-11 pr-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 transition-all duration-200"
                  />
                </div>
              </>
            )}

            <div className="relative">
              <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              <input
                type="email"
                required
                placeholder="you@uamc.edu.bd"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full bg-slate-50/50 border border-slate-200 focus:bg-white rounded-xl pl-11 pr-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 transition-all duration-200"
              />
            </div>

            <div className="relative">
              <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              <input
                type="password"
                required
                placeholder="Password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full bg-slate-50/50 border border-slate-200 focus:bg-white rounded-xl pl-11 pr-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 transition-all duration-200"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#0f2418] hover:bg-[#153423] active:scale-[0.99] text-white font-semibold py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-60 flex items-center justify-center gap-2 mt-2 group"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin text-emerald-400" />
                  <span>Please wait...</span>
                </>
              ) : (
                <>
                  <span>{mode === "login" ? "Log In" : "Create Account"}</span>
                  <ArrowRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
                </>
              )}
            </button>
          </form>
        </div>

      </div>
    </main>
  );
}