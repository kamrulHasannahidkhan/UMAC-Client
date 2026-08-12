"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { LogOut, GraduationCap } from "lucide-react";

type Profile = { _id: string; name: string; title: string; designation: string; email: string; image: string };
const API_URL = process.env.NEXT_PUBLIC_ADMIN_API_URL;

export default function AlumniDashboard() {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [token, setToken] = useState<string | null>(null);

  const [form, setForm] = useState({ name: "", title: "", designation: "" });
  const [file, setFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    const t = localStorage.getItem("alumni_token");
    if (!t) {
      router.push("/alumni-portal");
      return;
    }
    setToken(t);

    fetch(`${API_URL}/api/alumni/mine`, { headers: { Authorization: `Bearer ${t}` } })
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          setProfile(json.data);
          setForm({ name: json.data.name, title: json.data.title, designation: json.data.designation });
        } else {
          localStorage.removeItem("alumni_token");
          router.push("/alumni-portal");
        }
      })
      .finally(() => setCheckingAuth(false));
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("alumni_token");
    localStorage.removeItem("alumni_name");
    router.push("/alumni-portal");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setErrorMsg(null);
    setSuccessMsg(null);
    setSaving(true);

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("title", form.title);
    formData.append("designation", form.designation);
    if (file) formData.append("image", file);

    try {
      const res = await fetch(`${API_URL}/api/alumni/mine`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const json = await res.json();
      if (json.success) {
        setProfile(json.data);
        setFile(null);
        setSuccessMsg("Profile updated.");
      } else {
        setErrorMsg(json.error || "Failed to save");
      }
    } catch {
      setErrorMsg("Request failed — please try again");
    }
    setSaving(false);
  };

  if (checkingAuth || !profile) {
    return <main className="max-w-2xl mx-auto px-6 py-20 text-center text-gray-500">Checking session...</main>;
  }

  return (
    <main className="bg-gray-50 min-h-[calc(100vh-64px)]">
      <div className="bg-[#0f2418] text-white border-b border-black/20">
        <div className="max-w-2xl mx-auto px-6 py-9 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-white/10 border border-white/10 flex items-center justify-center">
              <GraduationCap size={22} />
            </div>
            <div>
              <h1 className="text-xl font-serif font-bold">{profile.name}</h1>
              <p className="text-sm text-gray-300">Alumni Portal — Edit Your Profile</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm bg-white/10 hover:bg-white/20 border border-white/10 rounded-md px-4 py-2 transition-colors"
          >
            <LogOut size={16} /> Log Out
          </button>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-8">
        {errorMsg && <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-md px-4 py-3 mb-5">{errorMsg}</div>}
        {successMsg && <div className="bg-green-50 border border-green-200 text-green-700 text-sm rounded-md px-4 py-3 mb-5">{successMsg}</div>}

        <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
          <div className="relative w-32 h-32 rounded-lg overflow-hidden bg-gray-100 mb-2">
            <Image src={profile.image} alt={profile.name} fill className="object-cover" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-black">Name</label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-black"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-black">Title (e.g. Class of 2015)</label>
            <input
              type="text"
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-black"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-black">Designation</label>
            <input
              type="text"
              value={form.designation}
              onChange={(e) => setForm({ ...form, designation: e.target.value })}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-black"
              placeholder="e.g. Consultant Physician"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-black">Photo (leave empty to keep current)</label>
            <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} className="w-full text-sm" />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="bg-[#0f2418] text-white px-6 py-3 rounded-md text-sm font-medium hover:bg-[#173428] disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </main>
  );
}
