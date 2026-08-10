"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import FacilityBanner from "@/components/FacilityBanner";
import FacilityContentSection from "@/components/FacilityContentSection";
import FacilityDepartmentsSection from "@/components/FacilityDepartmentsSection";
import FacilityPublicationsSection from "@/components/FacilityPublicationsSection";
import FacilityAccordionSection from "@/components/FacilityAccordionSection";

const TABS = [
  { label: "Hospital Service", value: "hospital" },
  { label: "Departments", value: "departments" },
  { label: "Library", value: "library" },
  { label: "Medical Education Unit", value: "meu" },
  { label: "Training", value: "training" },
  { label: "Publications", value: "publications" },
  { label: "Seminar", value: "seminar" },
  { label: "Hostel", value: "hostel" },
  { label: "Laboratory", value: "laboratory" },
  { label: "Cafeteria", value: "cafeteria" },
] as const;

type TabValue = (typeof TABS)[number]["value"];

function FacilitiesPageContent() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<TabValue>("hospital");

  useEffect(() => {
    const tabParam = searchParams.get("tab") as TabValue | null;
    if (tabParam && TABS.some((t) => t.value === tabParam)) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  const activeLabel = TABS.find((t) => t.value === activeTab)?.label ?? "Hospital Service";

  return (
    <main>
      <FacilityBanner activeTab={activeLabel} />

      <section className="w-full bg-white py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-wrap gap-2 mb-10">
            {TABS.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`px-4 py-2 text-xs sm:text-sm font-semibold transition-colors ${
                  activeTab === tab.value ? "bg-[#00a651] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === "hospital" && (
            <FacilityContentSection section="hospital" items1Label="Facilities & Services" items2Label="Medical Services" />
          )}
          {activeTab === "departments" && <FacilityDepartmentsSection />}
          {activeTab === "library" && (
            <FacilityContentSection section="library" items1Label="Facilities & Resources" items2Label="Academic Databases" />
          )}
          {activeTab === "meu" && (
            <FacilityContentSection section="meu" items1Label="Facilities & Resources" items2Label="Academic Databases" />
          )}
          {activeTab === "training" && (
            <FacilityContentSection section="training" items1Label="Programs Covered" items2Label="Additional Notes" />
          )}
          {activeTab === "publications" && <FacilityPublicationsSection />}
          {activeTab === "seminar" && <FacilityAccordionSection section="seminar" />}
          {activeTab === "hostel" && <FacilityAccordionSection section="hostel" />}
          {activeTab === "laboratory" && <FacilityAccordionSection section="laboratory" />}
          {activeTab === "cafeteria" && <FacilityAccordionSection section="cafeteria" />}
        </div>
      </section>
    </main>
  );
}

export default function FacilitiesPage() {
  return (
    <Suspense fallback={null}>
      <FacilitiesPageContent />
    </Suspense>
  );
}
