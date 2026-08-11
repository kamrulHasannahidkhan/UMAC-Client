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
} from "recharts";

type Result = { _id: string; semester: string; subject: string; marks: string; grade: string; remarks: string };
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
    return <main className="max-w-5xl mx-auto px-6 py-20 text-center text-gray-500">Checking session...</main>;
  }

  const filteredPosts = posts.filter((p) => {
    if (activeTab === "College News") return p.type === "news";
    if (activeTab === "Publications") return p.type === "publication";
    if (activeTab === "Notices") return p.type === "notice";
    return false;
  });

  return (
    <main className="bg-gray-50 min-h-[calc(100vh-64px)]">
      {/* Header banner */}
      <div className="bg-[#0f2418] text-white border-b border-black/20">
        <div className="max-w-6xl mx-auto px-6 py-9 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-white/10 border border-white/10 flex items-center justify-center">
              <GraduationCap size={22} />
            </div>
            <div>
              <h1 className="text-xl font-serif font-bold">Welcome, {studentName}</h1>
              <p className="text-sm text-gray-300">UAMC Student Portal</p>
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

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
          <div className="bg-white rounded-lg border border-gray-200 p-5 flex items-center gap-4">
            <div className="w-11 h-11 rounded-md bg-gray-100 text-black flex items-center justify-center shrink-0">
              <BookOpen size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold text-black">{results.length}</p>
              <p className="text-xs text-gray-600">Subjects Recorded</p>
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-5 flex items-center gap-4">
            <div className="w-11 h-11 rounded-md bg-gray-100 text-black flex items-center justify-center shrink-0">
              <TrendingUp size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold text-black">{avgMarks || "—"}</p>
              <p className="text-xs text-gray-600">Average Marks</p>
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-5 flex items-center gap-4">
            <div className="w-11 h-11 rounded-md bg-gray-100 text-black flex items-center justify-center shrink-0">
              <Award size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold text-black">{topGrade}</p>
              <p className="text-xs text-gray-600">Best Grade</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-gray-200">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors ${
                activeTab === tab
                  ? "border-black text-black"
                  : "border-transparent text-gray-500 hover:text-black"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="h-64 bg-white rounded-lg animate-pulse border border-gray-200" />
        ) : activeTab === "Results" ? (
          <>
            {results.length > 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h3 className="font-semibold text-black mb-4">Marks by Subject</h3>
                  <ResponsiveContainer width="100%" height={260}>
                    <BarChart data={barData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                      <XAxis dataKey="subject" tick={{ fontSize: 11, fill: "#000" }} interval={0} angle={-20} textAnchor="end" height={50} />
                      <YAxis tick={{ fontSize: 11, fill: "#000" }} />
                      <Tooltip contentStyle={{ fontSize: 13, color: "#000" }} />
                      <Bar dataKey="marks" fill="#0f2418" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h3 className="font-semibold text-black mb-4">Grade Distribution</h3>
                  <ResponsiveContainer width="100%" height={260}>
                    <PieChart>
                      <Pie
                        data={pieData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={90}
                        label={{ fill: "#000", fontSize: 12 }}
                      >
                        {pieData.map((entry, i) => (
                          <Cell key={entry.name} fill={GRADE_COLORS[entry.name] || FALLBACK_COLORS[i % FALLBACK_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ fontSize: 13, color: "#000" }} />
                      <Legend wrapperStyle={{ fontSize: 12, color: "#000" }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            <div className="space-y-3">
              {results.map((r) => (
                <div key={r._id} className="bg-white border border-gray-200 rounded-lg p-5 flex items-center gap-6">
                  <div
                    className="w-11 h-11 rounded-md flex items-center justify-center shrink-0 font-bold text-white text-sm"
                    style={{ backgroundColor: GRADE_COLORS[r.grade] || "#374151" }}
                  >
                    {r.grade}
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 mb-1">{r.semester}</p>
                    <p className="font-medium text-black">{r.subject}</p>
                    {r.remarks && <p className="text-xs text-gray-600 mt-0.5">{r.remarks}</p>}
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-black">{r.marks}</p>
                    <p className="text-xs text-gray-500">marks</p>
                  </div>
                </div>
              ))}
              {results.length === 0 && (
                <div className="bg-white border border-gray-200 rounded-lg p-10 text-center text-sm text-gray-500">
                  No results published for you yet.
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="space-y-3">
            {filteredPosts.map((p) => (
              <div key={p._id} className="bg-white border border-gray-200 rounded-lg p-5">
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                  {activeTab === "College News" && <Newspaper size={14} />}
                  {activeTab === "Publications" && <FileText size={14} />}
                  {activeTab === "Notices" && <Bell size={14} />}
                  {p.date}
                </div>
                <p className="font-medium text-black mb-1">{p.title}</p>
                <p className="text-sm text-gray-700 leading-relaxed">{p.description}</p>
              </div>
            ))}
            {filteredPosts.length === 0 && (
              <div className="bg-white border border-gray-200 rounded-lg p-10 text-center text-sm text-gray-500">
                Nothing here yet.
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
