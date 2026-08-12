
"use client";



import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { LogOut, Users, Search, GraduationCap, ArrowLeft } from "lucide-react";



type StudentOption = { _id: string; name: string; studentId: string; email: string };

type Result = { _id: string; year: number; subject: string; marks: string; grade: string; remarks: string };



const API_URL = process.env.NEXT_PUBLIC_ADMIN_API_URL;



const GRADE_COLORS: Record<string, string> = {

  "A+": "#0f2418",

  A: "#1f4a35",

  "A-": "#2f6b4d",

  "B+": "#6b7280",

  B: "#6b7280",

  "B-": "#9ca3af",

  "C+": "#9ca3af",

  C: "#b45309",

  D: "#b45309",

  F: "#991b1b",

};



export default function TeacherDashboard() {

  const router = useRouter();

  const [teacherName, setTeacherName] = useState("");

  const [checkingAuth, setCheckingAuth] = useState(true);

  const [token, setToken] = useState<string | null>(null);



  const [query, setQuery] = useState("");

  const [searchResults, setSearchResults] = useState<StudentOption[]>([]);

  const [searching, setSearching] = useState(false);



  const [selectedStudent, setSelectedStudent] = useState<StudentOption | null>(null);

  const [studentResults, setStudentResults] = useState<Result[]>([]);

  const [loadingResults, setLoadingResults] = useState(false);



  useEffect(() => {

    const t = localStorage.getItem("teacher_token");

    if (!t) {

      router.push("/teachers-portal");

      return;

    }

    setToken(t);



    fetch(`${API_URL}/api/teacher-auth/me`, { headers: { Authorization: `Bearer ${t}` } })

      .then((res) => res.json())

      .then((json) => {

        if (json.success) {

          setTeacherName(json.data.name);

        } else {

          localStorage.removeItem("teacher_token");

          router.push("/teachers-portal");

        }

      })

      .finally(() => setCheckingAuth(false));

  }, [router]);



  const handleLogout = () => {

    localStorage.removeItem("teacher_token");

    localStorage.removeItem("teacher_name");

    router.push("/teachers-portal");

  };



  const handleSearch = async (e: React.FormEvent) => {

    e.preventDefault();

    if (!query.trim() || !token) return;

    setSearching(true);

    setSelectedStudent(null);

    try {

      const res = await fetch(`${API_URL}/api/teacher/search-students?q=${encodeURIComponent(query.trim())}`, {

        headers: { Authorization: `Bearer ${token}` },

      });

      const json = await res.json();

      if (json.success) setSearchResults(json.data);

    } catch {

      setSearchResults([]);

    }

    setSearching(false);

  };



  const viewStudent = async (student: StudentOption) => {

    if (!token) return;

    setSelectedStudent(student);

    setLoadingResults(true);

    try {

      const res = await fetch(`${API_URL}/api/teacher/student-results?email=${encodeURIComponent(student.email)}`, {

        headers: { Authorization: `Bearer ${token}` },

      });

      const json = await res.json();

      if (json.success) setStudentResults(json.data);

    } catch {

      setStudentResults([]);

    }

    setLoadingResults(false);

  };



  if (checkingAuth) {

    return <main className="max-w-4xl mx-auto px-6 py-20 text-center text-gray-500">Checking session...</main>;

  }



  return (

    <main className="bg-gray-50 min-h-[calc(100vh-64px)]">

      <div className="bg-[#0f2418] text-white border-b border-black/20">

        <div className="max-w-4xl mx-auto px-6 py-9 flex items-center justify-between">

          <div className="flex items-center gap-4">

            <div className="w-12 h-12 rounded-lg bg-white/10 border border-white/10 flex items-center justify-center">

              <Users size={22} />

            </div>

            <div>

              <h1 className="text-xl font-serif font-bold">Welcome, {teacherName}</h1>

              <p className="text-sm text-gray-300">UAMC Teacher Portal</p>

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



      <div className="max-w-4xl mx-auto px-6 py-8">

        {!selectedStudent ? (

          <>

            <form onSubmit={handleSearch} className="flex gap-3 mb-6">

              <div className="relative flex-1">

                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />

                <input

                  type="text"

                  placeholder="Search by student name, ID, or email"

                  value={query}

                  onChange={(e) => setQuery(e.target.value)}

                  className="w-full border border-gray-300 rounded-md pl-10 pr-4 py-3 text-sm text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-gray-500"

                />

              </div>

              <button

                type="submit"

                disabled={searching}

                className="bg-[#0f2418] text-white px-6 py-3 rounded-md text-sm font-medium hover:bg-[#173428] disabled:opacity-50"

              >

                {searching ? "Searching..." : "Search"}

              </button>

            </form>



            <div className="space-y-2">

              {searchResults.map((s) => (

                <button

                  key={s._id}

                  onClick={() => viewStudent(s)}

                  className="w-full flex items-center justify-between bg-white border border-gray-200 rounded-lg p-4 text-left hover:border-gray-400 transition-colors"

                >

                  <div>

                    <p className="font-medium text-black">{s.name}</p>

                    <p className="text-xs text-gray-500">{s.studentId} · {s.email}</p>

                  </div>

                  <GraduationCap size={18} className="text-gray-400" />

                </button>

              ))}

              {searchResults.length === 0 && query && !searching && (

                <p className="text-sm text-gray-500 text-center py-8">No students found matching "{query}".</p>

              )}

              {searchResults.length === 0 && !query && (

                <p className="text-sm text-gray-400 text-center py-12">Search for a student by name, ID, or email to view their results.</p>

              )}

            </div>

          </>

        ) : (

          <>

            <button

              onClick={() => { setSelectedStudent(null); setStudentResults([]); }}

              className="flex items-center gap-2 text-sm text-gray-600 hover:text-black mb-6"

            >

              <ArrowLeft size={16} /> Back to search

            </button>



            <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">

              <p className="text-lg font-semibold text-black">{selectedStudent.name}</p>

              <p className="text-sm text-gray-500">{selectedStudent.studentId} · {selectedStudent.email}</p>

            </div>



            {loadingResults ? (

              <div className="h-40 bg-white rounded-lg animate-pulse border border-gray-200" />

            ) : (

              <div className="space-y-3">

                {studentResults.map((r) => (

                  <div key={r._id} className="bg-white border border-gray-200 rounded-lg p-5 flex items-center gap-6">

                    <div

                      className="w-11 h-11 rounded-md flex items-center justify-center shrink-0 font-bold text-white text-sm"

                      style={{ backgroundColor: GRADE_COLORS[r.grade] || "#374151" }}

                    >

                      {r.grade}

                    </div>

                    <div className="flex-1">

                      <p className="text-xs text-gray-500 mb-1">Year {r.year}</p>

                      <p className="font-medium text-black">{r.subject}</p>

                      {r.remarks && <p className="text-xs text-gray-600 mt-0.5">{r.remarks}</p>}

                    </div>

                    <div className="text-right">

                      <p className="font-bold text-black">{r.marks}</p>

                      <p className="text-xs text-gray-500">marks</p>

                    </div>

                  </div>

                ))}

                {studentResults.length === 0 && (

                  <div className="bg-white border border-gray-200 rounded-lg p-10 text-center text-sm text-gray-500">

                    No results published for this student yet.

                  </div>

                )}

              </div>

            )}

          </>

        )}

      </div>

    </main>

  );

}

