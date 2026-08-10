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
    <main className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-green-800 via-green-700 to-green-900 flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Left panel */}
        <div className="hidden md:flex flex-col justify-between bg-gradient-to-b from-green-700 to-green-900 text-white p-10 relative overflow-hidden">
          <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-white/5" />
          <div className="absolute -left-10 bottom-0 w-40 h-40 rounded-full bg-white/5" />

          <div className="relative z-10">
            <div className="w-14 h-14 rounded-xl bg-white/15 flex items-center justify-center mb-6">
              <GraduationCap size={28} />
            </div>
            <h2 className="text-3xl font-serif font-bold mb-3">Student Portal</h2>
            <p className="text-green-100 text-sm leading-relaxed">
              Access your results, college news, publications, and notices — all in one place, built exclusively for UAMC students.
            </p>
          </div>

          <div className="relative z-10 space-y-3 text-sm text-green-100">
            <p className="flex items-center gap-2"><Mail size={14} /> Sign up with your @umac.edu.bd email</p>
            <p className="flex items-center gap-2"><Lock size={14} /> Your data stays private to your account</p>
          </div>
        </div>

        {/* Right panel — form */}
        <div className="p-8 md:p-10">
          <div className="flex mb-8 rounded-lg overflow-hidden border border-gray-200">
            <button
              onClick={() => { setMode("login"); setErrorMsg(null); }}
              className={`flex-1 py-3 text-sm font-semibold transition-colors ${mode === "login" ? "bg-green-700 text-white" : "bg-gray-50 text-gray-500 hover:bg-gray-100"}`}
            >
              Log In
            </button>
            <button
              onClick={() => { setMode("signup"); setErrorMsg(null); }}
              className={`flex-1 py-3 text-sm font-semibold transition-colors ${mode === "signup" ? "bg-green-700 text-white" : "bg-gray-50 text-gray-500 hover:bg-gray-100"}`}
            >
              Sign Up
            </button>
          </div>

          <h1 className="text-2xl font-serif font-bold mb-1">
            {mode === "login" ? "Welcome back" : "Create your account"}
          </h1>
          <p className="text-sm text-gray-500 mb-6">
            {mode === "login" ? "Log in to view your results and updates." : "Sign up with your official UAMC student email."}
          </p>

          {errorMsg && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3 mb-5">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "signup" && (
              <>
                <div className="relative">
                  <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500"
                  />
                </div>
                <div className="relative">
                  <IdCard size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    required
                    placeholder="Student ID"
                    value={form.studentId}
                    onChange={(e) => setForm({ ...form, studentId: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500"
                  />
                </div>
              </>
            )}

            <div className="relative">
              <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                required
                placeholder="you@umac.edu.bd"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500"
              />
            </div>

            <div className="relative">
              <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                required
                placeholder="Password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-700 text-white font-medium py-3.5 rounded-lg hover:bg-green-800 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
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
