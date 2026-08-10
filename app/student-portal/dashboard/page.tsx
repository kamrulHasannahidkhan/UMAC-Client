"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, Newspaper, FileText, Bell, GraduationCap } from "lucide-react";

type Result = { _id: string; semester: string; subject: string; marks: string; grade: string; remarks: string };
type Post = { _id: string; type: "news" | "publication" | "notice"; title: string; description: string; date: string };

const API_URL = process.env.NEXT_PUBLIC_ADMIN_API_URL;
const TABS = ["Results", "College News", "Publications", "Notices"];

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

    fetch(`${API_URL}/api/student-auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
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

  if (checkingAuth) {
    return <main className="max-w-5xl mx-auto px-6 py-20 text-center text-gray-400">Checking session...</main>;
  }

  const filteredPosts = posts.filter((p) => {
    if (activeTab === "College News") return p.type === "news";
    if (activeTab === "Publications") return p.type === "publication";
    if (activeTab === "Notices") return p.type === "notice";
    return false;
  });

  return (
    <main className="max-w-5xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-serif font-bold">Welcome, {studentName}</h1>
          <p className="text-sm text-gray-500">Student Portal</p>
        </div>
        <button onClick={handleLogout} className="flex items-center gap-2 text-sm text-red-600 border border-red-200 rounded px-4 py-2 hover:bg-red-50">
          <LogOut size={16} /> Log Out
        </button>
      </div>

      <div className="flex gap-2 mb-8">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded text-sm font-medium ${
              activeTab === tab ? "bg-green-700 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="h-40 bg-gray-50 animate-pulse rounded" />
      ) : activeTab === "Results" ? (
        <div className="space-y-3">
          {results.map((r) => (
            <div key={r._id} className="bg-white border border-gray-200 rounded-lg p-5 flex items-center gap-6">
              <GraduationCap className="text-green-700 shrink-0" size={24} />
              <div className="flex-1">
                <p className="text-xs text-gray-400 mb-1">{r.semester}</p>
                <p className="font-medium">{r.subject}</p>
                {r.remarks && <p className="text-xs text-gray-500">{r.remarks}</p>}
              </div>
              <div className="text-right">
                <p className="font-bold text-green-700">{r.grade}</p>
                <p className="text-xs text-gray-500">{r.marks}</p>
              </div>
            </div>
          ))}
          {results.length === 0 && <p className="text-sm text-gray-400">No results published for you yet.</p>}
        </div>
      ) : (
        <div className="space-y-3">
          {filteredPosts.map((p) => (
            <div key={p._id} className="bg-white border border-gray-200 rounded-lg p-5">
              <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
                {activeTab === "College News" && <Newspaper size={14} />}
                {activeTab === "Publications" && <FileText size={14} />}
                {activeTab === "Notices" && <Bell size={14} />}
                {p.date}
              </div>
              <p className="font-medium mb-1">{p.title}</p>
              <p className="text-sm text-gray-600">{p.description}</p>
            </div>
          ))}
          {filteredPosts.length === 0 && <p className="text-sm text-gray-400">Nothing here yet.</p>}
        </div>
      )}
    </main>
  );
}
