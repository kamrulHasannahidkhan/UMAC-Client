"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import AboutBanner from "@/components/AboutBanner";
import AboutSection from "@/components/AboutSection";
import StatsSection from "@/components/StatsSection";
import AdmissionAidSection from "@/components/AdmissionAidSection";
import SustainabilitySection from "@/components/SustainabilitySection";
import PrincipalMessageSection from "@/components/PrincipalMessageSection";
import PageBanner from "@/components/PageBanner";
import TestimonialsSection from "@/components/TestimonialsSection";

type HistoryItem = { _id: string; year: string; title: string; description?: string; order?: number };
type Vision = { heading: string; description: string; image: string };
type Objective = { title: string; description: string };
type Aim = { aim: string; objectives: Objective[] };
type Person = { _id: string; group: string; name: string; title: string; photo: string; order: number };

const TABS = [
  "Overview",
  "History of UAMC",
  "Vision & Mission",
  "Aim & Objective",
  "Organizational Structure",
  "Founder Member",
  "EC Members",
  "GB Members",
];

const API_URL = process.env.NEXT_PUBLIC_ADMIN_API_URL;

function PeopleGrid({ people }: { people: Person[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
      {people.map((p) => (
        <div key={p._id} className="text-center">
          <div className="relative w-full h-40 rounded overflow-hidden mb-3">
            <Image src={p.photo} alt={p.name} fill className="object-cover" sizes="200px" />
          </div>
          <p className="font-semibold text-green-700">{p.name}</p>
          <p className="text-sm text-gray-500">{p.title}</p>
        </div>
      ))}
      {people.length === 0 && <p className="text-sm text-gray-400 col-span-full">No entries yet.</p>}
    </div>
  );
}

function AboutPageContent() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState("Overview");

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab && (TABS.includes(tab) || tab === "Founder Members")) {
      setActiveTab(tab === "Founder Members" ? "Founder Member" : tab);
    }
  }, [searchParams]);

  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [vision, setVision] = useState<Vision | null>(null);
  const [aim, setAim] = useState<Aim | null>(null);
  const [people, setPeople] = useState<Person[]>([]);
  const [orgStructureImage, setOrgStructureImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch(`${API_URL}/api/about-history`).then((r) => r.json()),
      fetch(`${API_URL}/api/about-vision`).then((r) => r.json()),
      fetch(`${API_URL}/api/about-aim`).then((r) => r.json()),
      fetch(`${API_URL}/api/about-[#008d44]people`).catch(() => null),
      fetch(`${API_URL}/api/about-org-structure`).then((r) => r.json()),
    ])
      .then(([historyJson, visionJson, aimJson, peopleJson, orgJson]) => {
        if (historyJson?.success) setHistory(historyJson.data);
        if (visionJson?.success) setVision(visionJson.data);
        if (aimJson?.success) setAim(aimJson.data);
        if (peopleJson?.success) setPeople(peopleJson.data);
        if (orgJson?.success && orgJson.data) setOrgStructureImage(orgJson.data.image);
      })
      .catch((err) => console.error("Failed to load About page data:", err))
      .finally(() => setLoading(false));
  }, []);

  // Split history entries into two rows (4 items per row)
  const historyRow1 = history.slice(0, 4);
  const historyRow2 = history.slice(4, 8);

  return (
    <div className="w-full bg-white text-gray-900 font-sans min-h-screen">
      <main className="bg-white text-gray-900">
        <AboutBanner activeTab={activeTab} />

        <div className="max-w-7xl mx-auto px-6 py-12">
          {/* Tab Navigation Section */}
          <div className="flex flex-col items-center gap-3.5 mb-14">
            {/* Row 1: First 5 tabs */}
            <div className="flex flex-wrap justify-center gap-3.5 w-full">
              {TABS.slice(0, 5).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-3 rounded-lg text-sm font-bold transition-all min-w-[170px] text-center ${
                    activeTab === tab
                      ? "bg-[#008d44] text-white shadow-sm"
                      : "bg-[#6e7377] text-white hover:bg-[#5c6165]"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Row 2: Remaining 3 tabs */}
            <div className="flex flex-wrap justify-center gap-3.5 w-full">
              {TABS.slice(5).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-3 rounded-lg text-sm font-bold transition-all min-w-[170px] text-center ${
                    activeTab === tab
                      ? "bg-[#008d44] text-white shadow-sm"
                      : "bg-[#6e7377] text-white hover:bg-[#5c6165]"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="h-64 bg-gray-50 animate-pulse rounded" />
          ) : (
            <>
              {activeTab === "History of UAMC" && (
                <div className="py-6 max-w-6xl mx-auto">
                  {/* Timeline Header */}
                  <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#2d3748] mb-1">
                      Timeline of UAMC’s Evolution
                    </h2>
                    <p className="text-2xl md:text-3xl font-serif font-bold text-[#2d3748] mb-5">
                      Since - 1984
                    </p>
                    <p className="text-xs md:text-sm text-gray-600 max-w-3xl mx-auto leading-relaxed">
                      Founded in 2007, UAMC, under BHSRA, is a leading medical institution affiliated with Dhaka University. With a 500-bed hospital, it excels in medical education, research, and patient care, shaping the future of healthcare in Bangladesh.
                    </p>
                  </div>

                  {/* Redesigned Graphic Timeline */}
                  <div className="space-y-16">
                    {/* Row 1 */}
                    <div className="relative">
                      {/* Line connecting nodes on desktop */}
                      <div className="hidden md:block absolute top-[11px] left-[10%] right-[10%] h-[1.5px] bg-[#8fae9b] z-0" />

                      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4 relative z-10">
                        {historyRow1.map((item) => (
                          <div key={item._id} className="flex flex-col items-center text-center">
                            {/* Circle Node */}
                            <div className="w-6 h-6 rounded-full border-2 border-[#008d44] bg-white flex items-center justify-center mb-4 shrink-0 shadow-xs">
                              <div className="w-2 h-2 rounded-full bg-[#008d44]" />
                            </div>
                            <span className="text-3xl md:text-4xl font-bold text-[#008d44] mb-1.5 leading-none">
                              {item.year}
                            </span>
                            <p className="text-sm font-semibold text-gray-800 leading-tight max-w-[180px]">
                              {item.title}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Row 2 */}
                    {historyRow2.length > 0 && (
                      <div className="relative">
                        {/* Line connecting nodes on desktop */}
                        <div className="hidden md:block absolute top-[11px] left-[10%] right-[10%] h-[1.5px] bg-[#8fae9b] z-0" />

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4 relative z-10">
                          {historyRow2.map((item) => (
                            <div key={item._id} className="flex flex-col items-center text-center">
                              {/* Circle Node */}
                              <div className="w-6 h-6 rounded-full border-2 border-[#008d44] bg-white flex items-center justify-center mb-4 shrink-0 shadow-xs">
                                <div className="w-2 h-2 rounded-full bg-[#008d44]" />
                              </div>
                              <span className="text-3xl md:text-4xl font-bold text-[#008d44] mb-1.5 leading-none">
                                {item.year}
                              </span>
                              <p className="text-sm font-semibold text-gray-800 leading-tight max-w-[180px]">
                                {item.title}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === "Vision & Mission" && vision && (
                <div>
                  <h2 className="text-3xl font-serif font-bold mb-6">{vision.heading}</h2>
                  <div className="relative w-full h-72 rounded overflow-hidden mb-6">
                    <Image src={vision.image} alt={vision.heading} fill className="object-cover" sizes="100vw" />
                  </div>
                  <p className="text-gray-600 leading-relaxed">{vision.description}</p>
                </div>
              )}
              {activeTab === "Vision & Mission" && !vision && <p className="text-sm text-gray-400">No vision content yet.</p>}

              {activeTab === "Aim & Objective" && aim && (
                <div>
                  <h2 className="text-3xl font-serif font-bold mb-4">Aim</h2>
                  <p className="text-gray-600 leading-relaxed mb-10">{aim.aim}</p>
                  <h2 className="text-3xl font-serif font-bold mb-6">Objective</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {aim.objectives.map((obj, i) => (
                      <div key={i} className="bg-gray-50 rounded-lg p-5">
                        <p className="font-semibold text-green-700 mb-1">{obj.title}</p>
                        <p className="text-sm text-gray-600">{obj.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {activeTab === "Aim & Objective" && !aim && <p className="text-sm text-gray-400">No aim/objective content yet.</p>}

              {activeTab === "Organizational Structure" && (
                <div>
                  {orgStructureImage ? (
                    <div className="relative w-full h-[600px] rounded overflow-hidden">
                      <Image src={orgStructureImage} alt="Organizational Structure" fill className="object-contain" sizes="100vw" />
                    </div>
                  ) : (
                    <p className="text-sm text-gray-400">No organizational structure chart yet.</p>
                  )}
                </div>
              )}

              {activeTab === "Founder Member" && <PeopleGrid people={people.filter((p) => p.group === "founder-member")} />}
              {activeTab === "EC Members" && <PeopleGrid people={people.filter((p) => p.group === "ec-member")} />}
              {activeTab === "GB Members" && <PeopleGrid people={people.filter((p) => p.group === "gb-member")} />}
            </>
          )}
        </div>

        {activeTab === "Overview" && (
          <>
            <AboutSection />
            <AdmissionAidSection />
            <StatsSection />
            <SustainabilitySection />
            <PrincipalMessageSection />
            <PageBanner />
            <TestimonialsSection />
          </>
        )}
      </main>
    </div>
  );
}

export default function AboutPage() {
  return (
    <Suspense fallback={<div className="h-96 bg-gray-50 animate-pulse" />}>
      <AboutPageContent />
    </Suspense>
  );
}