"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

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
    const body = mode === "login"
      ? { email: form.email, password: form.password }
      : form;

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
    } catch (err) {
      setErrorMsg("Request failed — please try again");
    }

    setLoading(false);
  };

  return (
    <main className="max-w-md mx-auto px-6 py-20">
      <div className="flex mb-8 rounded-lg overflow-hidden border border-gray-200">
        <button
          onClick={() => { setMode("login"); setErrorMsg(null); }}
          className={`flex-1 py-3 text-sm font-semibold ${mode === "login" ? "bg-green-700 text-white" : "bg-gray-50 text-gray-600"}`}
        >
          Log In
        </button>
        <button
          onClick={() => { setMode("signup"); setErrorMsg(null); }}
          className={`flex-1 py-3 text-sm font-semibold ${mode === "signup" ? "bg-green-700 text-white" : "bg-gray-50 text-gray-600"}`}
        >
          Sign Up
        </button>
      </div>

      <h1 className="text-2xl font-serif font-bold mb-6">
        {mode === "login" ? "Student Login" : "Create Student Account"}
      </h1>

      {errorMsg && <div className="bg-red-50 border border-red-300 text-red-700 text-sm rounded-lg p-4 mb-5">{errorMsg}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {mode === "signup" && (
          <>
            <input
              type="text"
              required
              placeholder="Full Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full border border-gray-300 rounded px-4 py-3 text-sm"
            />
            <input
              type="text"
              required
              placeholder="Student ID"
              value={form.studentId}
              onChange={(e) => setForm({ ...form, studentId: e.target.value })}
              className="w-full border border-gray-300 rounded px-4 py-3 text-sm"
            />
          </>
        )}

        <input
          type="email"
          required
          placeholder="Email (must end in @umac.edu.bd)"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full border border-gray-300 rounded px-4 py-3 text-sm"
        />
        <input
          type="password"
          required
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full border border-gray-300 rounded px-4 py-3 text-sm"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-700 text-white font-medium py-3 rounded hover:bg-green-800 disabled:opacity-50"
        >
          {loading ? "Please wait..." : mode === "login" ? "Log In" : "Create Account"}
        </button>
      </form>
    </main>
  );
}
