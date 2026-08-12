"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { GraduationCap, Mail, Lock, ArrowRight } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_ADMIN_API_URL;

export default function AlumniPortalAuthPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "claim">("login");
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

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
        localStorage.setItem("alumni_name", json.data.name);
        router.push("/alumni-portal/dashboard");
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
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl border border-gray-200 p-8 md:p-10">
        <div className="w-14 h-14 rounded-lg bg-[#0f2418] text-white flex items-center justify-center mb-6">
          <GraduationCap size={26} />
        </div>

        <div className="flex mb-8 rounded-md overflow-hidden border border-gray-300">
          <button
            onClick={() => { setMode("login"); setErrorMsg(null); }}
            className={`flex-1 py-3 text-sm font-semibold transition-colors ${mode === "login" ? "bg-[#0f2418] text-white" : "bg-white text-gray-700 hover:bg-gray-50"}`}
          >
            Log In
          </button>
          <button
            onClick={() => { setMode("claim"); setErrorMsg(null); }}
            className={`flex-1 py-3 text-sm font-semibold transition-colors ${mode === "claim" ? "bg-[#0f2418] text-white" : "bg-white text-gray-700 hover:bg-gray-50"}`}
          >
            Claim Profile
          </button>
        </div>

        <h1 className="text-2xl font-serif font-bold text-black mb-1">
          {mode === "login" ? "Alumni Login" : "Claim Your Profile"}
        </h1>
        <p className="text-sm text-gray-600 mb-6">
          {mode === "login"
            ? "Log in to edit your alumni profile."
            : "If the college has already added you as an alumnus, claim your profile here using the same email, and set a password."}
        </p>

        {errorMsg && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-md px-4 py-3 mb-5">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="email"
              required
              placeholder="Your email on file"
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
              placeholder={mode === "claim" ? "Create a password" : "Password"}
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
            {loading ? "Please wait..." : mode === "login" ? "Log In" : "Claim Profile"}
            {!loading && <ArrowRight size={16} />}
          </button>
        </form>
      </div>
    </main>
  );
}
