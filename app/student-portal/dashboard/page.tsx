"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  LogOut,
  Newspaper,
  FileText,
  Bell,
  GraduationCap,
  TrendingUp,
  Award,
  BookOpen,
  Sparkles,
  Calendar,
  Layers,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
} from "recharts";

type Result = { _id: string; year: number; subject: string; marks: string; grade: string; remarks: string };
type Post = { _id: string; type: "news" | "publication" | "notice"; title: string; description: string; date: string };

const API_URL = process.env.NEXT_PUBLIC_ADMIN_API_URL;
const TABS = ["Results", "College News", "Publications", "Notices"];

const GRADE_COLORS: Record<string, string> = {
  "A+": "#0f2418",
  A: "#1f4a35",
  "A-": "#2f6b4d",
  B: "#6b7280",
  C: "#9ca3af",
  D: "#b45309",
  F: "#991b1b",
};
const FALLBACK_COLORS = ["#0f2418", "#1f4a35", "#2f6b4d", "#6b7280", "#9ca3af", "#b45309", "#991b1b", "#374151"];

export default function StudentDashboard() {
  const router = useRouter();
  const [studentName, setStudentName] = useState("");
  const [checkingAuth, setCheckingAuth] = useState(true);

  const [activeTab, setActiveTab] = useState("Results");
  const [results, setResults] = useState<Result[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("student_token");
    if (!token) {
      router.push("/student-portal");
      return;
    }

    fetch(`${API_URL}/api/student-auth/me`, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          setStudentName(json.data.name);
        } else {
          localStorage.removeItem("student_token");
          router.push("/student-portal");
        }
      })
      .finally(() => setCheckingAuth(false));
  }, [router]);

  useEffect(() => {
    if (checkingAuth) return;
    const token = localStorage.getItem("student_token");

    Promise.all([
      fetch(`${API_URL}/api/student-results/mine`, { headers: { Authorization: `Bearer ${token}` } }).then((r) => r.json()),
      fetch(`${API_URL}/api/student-portal-posts`).then((r) => r.json()),
    ])
      .then(([resultsJson, postsJson]) => {
        if (resultsJson.success) setResults(resultsJson.data);
        if (postsJson.success) setPosts(postsJson.data);
      })
      .finally(() => setLoading(false));
  }, [checkingAuth]);

  const handleLogout = () => {
    localStorage.removeItem("student_token");
    localStorage.removeItem("student_name");
    router.push("/student-portal");
  };

  const barData = useMemo(
    () =>
      results.map((r) => ({
        subject: r.subject.length > 12 ? r.subject.slice(0, 12) + "…" : r.subject,
        marks: Number(r.marks) || 0,
      })),
    [results]
  );

  const pieData = useMemo(() => {
    const counts: Record<string, number> = {};
    results.forEach((r) => {
      counts[r.grade] = (counts[r.grade] || 0) + 1;
    });
    return Object.entries(counts).map(([grade, count]) => ({ name: grade, value: count }));
  }, [results]);

  // Year-wise grouping (Year 1–4), ascending order regardless of entry order
  const yearsPresent = useMemo(() => {
    const set = new Set(results.map((r) => r.year));
    return Array.from(set).sort((a, b) => a - b);
  }, [results]);

  const yearData = useMemo(() => {
    return yearsPresent.map((year) => {
      const subset = results.filter((r) => r.year === year);
      const nums = subset.map((r) => Number(r.marks)).filter((n) => !isNaN(n));
      const avg = nums.length ? Math.round((nums.reduce((a, b) => a + b, 0) / nums.length) * 10) / 10 : 0;
      return { year: `Year ${year}`, avgMarks: avg, subjectCount: subset.length };
    });
  }, [yearsPresent, results]);

  const resultsByYear = useMemo(() => {
    return yearsPresent.map((year) => ({
      year,
      items: results.filter((r) => r.year === year),
    }));
  }, [yearsPresent, results]);

  const avgMarks = useMemo(() => {
    const nums = results.map((r) => Number(r.marks)).filter((n) => !isNaN(n));
    if (nums.length === 0) return 0;
    return Math.round((nums.reduce((a, b) => a + b, 0) / nums.length) * 10) / 10;
  }, [results]);

  const topGrade = useMemo(() => {
    if (results.length === 0) return "—";
    const order = ["A+", "A", "A-", "B", "C", "D", "F"];
    const grades = results.map((r) => r.grade);
    return order.find((g) => grades.includes(g)) || grades[0];
  }, [results]);

  if (checkingAuth) {
    return (
      <main className="min-h-[calc(100vh-64px)] bg-slate-50 flex items-center justify-center">
        <div className="flex items-center gap-3 text-slate-500 text-sm font-medium">
          <div className="w-5 h-5 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin" />
          Checking session...
        </div>
      </main>
    );
  }

  const filteredPosts = posts.filter((p) => {
    if (activeTab === "College News") return p.type === "news";
    if (activeTab === "Publications") return p.type === "publication";
    if (activeTab === "Notices") return p.type === "notice";
    return false;
  });

  return (
    <main className="bg-slate-50/80 min-h-[calc(100vh-64px)] pb-16">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#0a1810] via-[#0f2418] to-[#173a27] text-white border-b border-emerald-950/40 relative overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-400/5 border border-emerald-500/30 flex items-center justify-center shadow-inner shrink-0">
              <GraduationCap size={28} className="text-emerald-400" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-semibold mb-1">
                <Sparkles size={11} /> Student Portal
              </div>
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
                Welcome, {studentName}
              </h1>
              <p className="text-xs sm:text-sm text-emerald-100/70 font-normal">
                UAMC Academic Dashboard
              </p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-xs sm:text-sm font-semibold bg-white/10 hover:bg-white/20 active:scale-95 text-white border border-white/15 rounded-xl px-4 py-2.5 transition-all shadow-sm"
          >
            <LogOut size={16} /> Log Out
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 mb-8">
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-100 flex items-center justify-center shrink-0">
              <BookOpen size={22} />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900 tracking-tight">{results.length}</p>
              <p className="text-xs font-medium text-slate-500">Subjects Recorded</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-800 border border-blue-100 flex items-center justify-center shrink-0">
              <TrendingUp size={22} />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900 tracking-tight">{avgMarks || "—"}</p>
              <p className="text-xs font-medium text-slate-500">Average Marks</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-800 border border-amber-100 flex items-center justify-center shrink-0">
              <Award size={22} />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900 tracking-tight">{topGrade}</p>
              <p className="text-xs font-medium text-slate-500">Best Grade</p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="p-1 bg-slate-200/60 rounded-xl mb-8 flex flex-wrap sm:flex-nowrap items-center gap-1 border border-slate-200">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2.5 px-4 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-200 ${
                activeTab === tab
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="h-64 bg-white rounded-2xl animate-pulse border border-slate-200/80 shadow-sm" />
        ) : activeTab === "Results" ? (
          <>
            {results.length > 0 && (
              <>
                {/* Year-wise progress chart */}
                {yearData.length > 1 && (
                  <div className="bg-white rounded-2xl border border-slate-200/80 p-6 mb-6 shadow-sm">
                    <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
                      <TrendingUp size={18} className="text-emerald-700" />
                      Average Marks by Year
                    </h3>
                    <ResponsiveContainer width="100%" height={260}>
                      <LineChart data={yearData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="year" tick={{ fontSize: 12, fill: "#475569" }} axisLine={{ stroke: "#e2e8f0" }} />
                        <YAxis tick={{ fontSize: 11, fill: "#475569" }} axisLine={{ stroke: "#e2e8f0" }} />
                        <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid #e2e8f0", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)", fontSize: "13px" }} />
                        <Line type="monotone" dataKey="avgMarks" stroke="#0f2418" strokeWidth={2.5} dot={{ r: 5, fill: "#0f2418" }} activeDot={{ r: 7 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                  {/* Bar Chart */}
                  <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
                    <h3 className="text-base font-bold text-slate-900 mb-4">Marks by Subject</h3>
                    <ResponsiveContainer width="100%" height={260}>
                      <BarChart data={barData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="subject" tick={{ fontSize: 11, fill: "#475569" }} interval={0} angle={-20} textAnchor="end" height={50} />
                        <YAxis tick={{ fontSize: 11, fill: "#475569" }} />
                        <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid #e2e8f0", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)", fontSize: "13px" }} />
                        <Bar dataKey="marks" fill="#0f2418" radius={[6, 6, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Pie Chart */}
                  <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
                    <h3 className="text-base font-bold text-slate-900 mb-4">Grade Distribution</h3>
                    <ResponsiveContainer width="100%" height={260}>
                      <PieChart>
                        <Pie
                          data={pieData}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius={85}
                          label={{ fill: "#334155", fontSize: 12, fontWeight: 500 }}
                        >
                          {pieData.map((entry, i) => (
                            <Cell key={entry.name} fill={GRADE_COLORS[entry.name] || FALLBACK_COLORS[i % FALLBACK_COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid #e2e8f0", fontSize: "13px" }} />
                        <Legend wrapperStyle={{ fontSize: 12, color: "#475569" }} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </>
            )}

            {/* Results Grouped by Year */}
            {resultsByYear.map(({ year, items }) => (
              <div key={`year-group-${year}`} className="mb-8">
                <div className="flex items-center justify-between mb-3 px-1">
                  <div className="flex items-center gap-2">
                    <Layers size={16} className="text-emerald-800" />
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider">Year {year}</h3>
                  </div>
                  <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200">
                    {items.length} subject{items.length !== 1 && "s"} · avg {yearData.find((y) => y.year === `Year ${year}`)?.avgMarks ?? "—"}
                  </span>
                </div>

                <div className="space-y-3">
                  {items.map((r) => (
                    <div key={r._id} className="bg-white border border-slate-200/80 hover:border-slate-300 rounded-2xl p-4 sm:p-5 flex items-center gap-4 sm:gap-6 shadow-sm transition-all">
                      <div
                        className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shrink-0 font-bold text-white text-sm sm:text-base shadow-sm"
                        style={{ backgroundColor: GRADE_COLORS[r.grade] || "#374151" }}
                      >
                        {r.grade}
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-slate-900 text-sm sm:text-base truncate">{r.subject}</p>
                        {r.remarks && <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{r.remarks}</p>}
                      </div>

                      <div className="text-right shrink-0">
                        <p className="font-bold text-slate-900 text-base sm:text-lg">{r.marks}</p>
                        <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">marks</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {results.length === 0 && (
              <div className="bg-white border border-slate-200/80 rounded-2xl p-12 text-center text-sm font-medium text-slate-500 shadow-sm">
                No results published for you yet.
              </div>
            )}
          </>
        ) : (
          /* Posts Section (News, Publications, Notices) */
          <div className="space-y-4">
            {filteredPosts.map((p) => (
              <div key={p._id} className="bg-white border border-slate-200/80 rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 mb-2">
                  <span className="p-1.5 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center">
                    {activeTab === "College News" && <Newspaper size={14} />}
                    {activeTab === "Publications" && <FileText size={14} />}
                    {activeTab === "Notices" && <Bell size={14} />}
                  </span>
                  <span className="flex items-center gap-1 text-slate-500 font-medium">
                    <Calendar size={13} /> {p.date}
                  </span>
                </div>
                <h4 className="font-bold text-slate-900 text-base mb-1.5">{p.title}</h4>
                <p className="text-sm text-slate-600 leading-relaxed font-normal">{p.description}</p>
              </div>
            ))}

            {filteredPosts.length === 0 && (
              <div className="bg-white border border-slate-200/80 rounded-2xl p-12 text-center text-sm font-medium text-slate-500 shadow-sm">
                Nothing here yet.
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}