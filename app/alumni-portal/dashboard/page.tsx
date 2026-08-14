"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { LogOut, GraduationCap, Upload, CheckCircle2, AlertCircle, Calendar, Briefcase, User } from "lucide-react";

type Profile = {
  _id: string;
  name: string;
  batch?: string;
  title?: string;
  designation: string;
  email: string;
  image: string;
};

const API_URL = process.env.NEXT_PUBLIC_ADMIN_API_URL;

export default function AlumniDashboard() {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [token, setToken] = useState<string | null>(null);

  const [form, setForm] = useState({ name: "", batch: "", designation: "" });
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
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

    fetch(`${API_URL}/api/alumni/mine`, {
      headers: { Authorization: `Bearer ${t}` },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          setProfile(json.data);
          setForm({
            name: json.data.name || "",
            // Fallback to title if backend stored batch inside title field previously
            batch: json.data.batch || json.data.title || "",
            designation: json.data.designation || "",
          });
        } else {
          localStorage.removeItem("alumni_token");
          router.push("/alumni-portal");
        }
      })
      .catch(() => {
        localStorage.removeItem("alumni_token");
        router.push("/alumni-portal");
      })
      .finally(() => setCheckingAuth(false));
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("alumni_token");
    localStorage.removeItem("alumni_name");
    router.push("/alumni-portal");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    if (selectedFile) {
      setPreviewUrl(URL.createObjectURL(selectedFile));
    } else {
      setPreviewUrl(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setErrorMsg(null);
    setSuccessMsg(null);
    setSaving(true);

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("batch", form.batch);
    formData.append("title", form.batch); // Added for fallback backend compatibility
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
        setPreviewUrl(null);
        setSuccessMsg("Profile updated successfully!");
      } else {
        setErrorMsg(json.error || "Failed to update profile.");
      }
    } catch {
      setErrorMsg("Request failed — please check network connection.");
    } finally {
      setSaving(false);
    }
  };

  if (checkingAuth || !profile) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center p-6 text-slate-500">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 border-2 border-emerald-700 border-t-transparent rounded-full animate-spin" />
          <span className="text-sm font-medium">Loading Alumni Dashboard...</span>
        </div>
      </main>
    );
  }

  return (
    <main 
      className="bg-slate-50 min-h-[calc(100vh-64px)] text-slate-900 pb-16"
      style={{ backgroundColor: "#f8fafc", color: "#0f172a" }}
    >
      {/* Top Header */}
      <div className="bg-[#0f2418] text-white border-b border-black/20 shadow-xs">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-white shrink-0">
              <GraduationCap size={24} />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-serif font-bold text-white leading-tight">{profile.name}</h1>
              <p className="text-xs sm:text-sm text-emerald-100/80">Alumni Member • Settings & Directory Profile</p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-2 text-xs sm:text-sm bg-white/10 hover:bg-white/20 border border-white/15 text-white rounded-lg px-4 py-2 transition-all shrink-0"
          >
            <LogOut size={15} /> Log Out
          </button>
        </div>
      </div>

      {/* Main Form Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 mt-8">
        {errorMsg && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl p-4 mb-6 flex items-center gap-2.5">
            <AlertCircle size={18} className="shrink-0 text-red-600" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm rounded-xl p-4 mb-6 flex items-center gap-2.5">
            <CheckCircle2 size={18} className="shrink-0 text-emerald-600" />
            <span>{successMsg}</span>
          </div>
        )}

        <form 
          onSubmit={handleSubmit} 
          className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6"
          style={{ backgroundColor: "#ffffff" }}
        >
          {/* Avatar / Photo Section */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-3">Profile Photo</label>
            <div className="flex items-center gap-5">
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                <Image
                  src={previewUrl || profile.image || "/placeholder-avatar.png"}
                  alt={profile.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="space-y-2">
                <label className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 text-xs font-semibold px-4 py-2.5 rounded-xl cursor-pointer transition-colors">
                  <Upload size={14} /> Upload New Photo
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
                <p className="text-[11px] text-slate-500">
                  PNG, JPG or WEBP (Max 5MB). Leave unchanged to keep current photo.
                </p>
              </div>
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2 border-t border-slate-100">
            <div className="space-y-1.5 sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700">Full Name</label>
              <div className="relative">
                <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0f2418]/20 focus:border-[#0f2418]"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700">Batch / Graduation Year</label>
              <div className="relative">
                <Calendar size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Batch 2015"
                  value={form.batch}
                  onChange={(e) => setForm({ ...form, batch: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0f2418]/20 focus:border-[#0f2418]"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700">Current Designation</label>
              <div className="relative">
                <Briefcase size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="e.g. Consultant Physician"
                  value={form.designation}
                  onChange={(e) => setForm({ ...form, designation: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0f2418]/20 focus:border-[#0f2418]"
                />
              </div>
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="bg-[#0f2418] text-white font-semibold px-6 py-3 rounded-xl text-sm hover:bg-[#173428] transition-all shadow-md active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? "Saving Changes..." : "Save Profile"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}