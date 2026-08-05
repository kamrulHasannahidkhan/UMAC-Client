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

type HistoryItem = { _id: string; year: string; title: string; description: string; order: number };
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
  "Founder Members",
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
    if (tab && TABS.includes(tab)) setActiveTab(tab);
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
      fetch(`${API_URL}/api/about-people`).then((r) => r.json()),
      fetch(`${API_URL}/api/about-org-structure`).then((r) => r.json()),
    ])
      .then(([historyJson, visionJson, aimJson, peopleJson, orgJson]) => {
        if (historyJson.success) setHistory(historyJson.data);
        if (visionJson.success) setVision(visionJson.data);
        if (aimJson.success) setAim(aimJson.data);
        if (peopleJson.success) setPeople(peopleJson.data);
        if (orgJson.success && orgJson.data) setOrgStructureImage(orgJson.data.image);
      })
      .catch((err) => console.error("Failed to load About page data:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main>
      <AboutBanner activeTab={activeTab} />

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-wrap gap-2 mb-12">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                activeTab === tab ? "bg-green-700 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="h-64 bg-gray-50 animate-pulse rounded" />
        ) : (
          <>
            {activeTab === "History of UAMC" && (
              <div>
                <h2 className="text-3xl font-serif font-bold text-center mb-2">Timeline of UAMC's Evolution</h2>
                <p className="text-center text-gray-500 mb-12">Since - 1984</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                  {history.map((item) => (
                    <div key={item._id}>
                      <p className="text-3xl font-serif font-bold text-green-700 mb-2">{item.year}</p>
                      <p className="font-semibold mb-1">{item.title}</p>
                      <p className="text-sm text-gray-500">{item.description}</p>
                    </div>
                  ))}
                  {history.length === 0 && <p className="text-sm text-gray-400 col-span-full">No history entries yet.</p>}
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

            {activeTab === "Founder Members" && <PeopleGrid people={people.filter((p) => p.group === "founder-member")} />}
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
  );
}

export default function AboutPage() {
  return (
    <Suspense fallback={<div className="h-96 bg-gray-50 animate-pulse" />}>
      <AboutPageContent />
    </Suspense>
  );
}
