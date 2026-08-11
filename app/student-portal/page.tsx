"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { GraduationCap, Mail, Lock, User, IdCard, ArrowRight } from "lucide-react";

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
    <main className="min-h-[calc(100vh-64px)] bg-gray-100 flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Left panel */}
        <div className="hidden md:flex flex-col justify-between bg-[#0f2418] text-white p-10">
          <div>
            <div className="w-14 h-14 rounded-lg bg-white/10 border border-white/10 flex items-center justify-center mb-6">
              <GraduationCap size={26} />
            </div>
            <h2 className="text-2xl font-serif font-bold mb-3">Student Portal</h2>
            <p className="text-gray-300 text-sm leading-relaxed">
              Access your academic results, college news, publications, and notices — all in one place, built exclusively for UAMC students.
            </p>
          </div>

          <div className="space-y-3 text-sm text-gray-300 border-t border-white/10 pt-6">
            <p className="flex items-center gap-2"><Mail size={14} /> Sign up with your @umac.edu.bd email</p>
            <p className="flex items-center gap-2"><Lock size={14} /> Your data stays private to your account</p>
          </div>
        </div>

        {/* Right panel — form */}
        <div className="p-8 md:p-10">
          <div className="flex mb-8 rounded-md overflow-hidden border border-gray-300">
            <button
              onClick={() => { setMode("login"); setErrorMsg(null); }}
              className={`flex-1 py-3 text-sm font-semibold transition-colors ${
                mode === "login" ? "bg-[#0f2418] text-white" : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              Log In
            </button>
            <button
              onClick={() => { setMode("signup"); setErrorMsg(null); }}
              className={`flex-1 py-3 text-sm font-semibold transition-colors ${
                mode === "signup" ? "bg-[#0f2418] text-white" : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              Sign Up
            </button>
          </div>

          <h1 className="text-2xl font-serif font-bold text-black mb-1">
            {mode === "login" ? "Welcome back" : "Create your account"}
          </h1>
          <p className="text-sm text-gray-600 mb-6">
            {mode === "login" ? "Log in to view your results and updates." : "Sign up with your official UAMC student email."}
          </p>

          {errorMsg && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-md px-4 py-3 mb-5">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "signup" && (
              <>
                <div className="relative">
                  <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full border border-gray-300 rounded-md pl-10 pr-4 py-3 text-sm text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-gray-500"
                  />
                </div>
                <div className="relative">
                  <IdCard size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    type="text"
                    required
                    placeholder="Student ID"
                    value={form.studentId}
                    onChange={(e) => setForm({ ...form, studentId: e.target.value })}
                    className="w-full border border-gray-300 rounded-md pl-10 pr-4 py-3 text-sm text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-gray-500"
                  />
                </div>
              </>
            )}

            <div className="relative">
              <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="email"
                required
                placeholder="you@umac.edu.bd"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full border border-gray-300 rounded-md pl-10 pr-4 py-3 text-sm text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-gray-500"
              />
            </div>

            <div className="relative">
              <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="password"
                required
                placeholder="Password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full border border-gray-300 rounded-md pl-10 pr-4 py-3 text-sm text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-gray-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#0f2418] text-white font-medium py-3.5 rounded-md hover:bg-[#173428] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? "Please wait..." : mode === "login" ? "Log In" : "Create Account"}
              {!loading && <ArrowRight size={16} />}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
