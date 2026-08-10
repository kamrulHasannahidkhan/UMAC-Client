"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import AdmissionBanner from "@/components/AdmissionBanner";
import AdmissionProcedureSection from "@/components/AdmissionProcedureSection";
import AdmissionDocumentsTable from "@/components/AdmissionDocumentsTable";
import AdmissionOnlineRegistration from "@/components/AdmissionOnlineRegistration";

const TABS = [
  { label: "Admission Procedure & Fees", value: "procedure" },
  { label: "Admission Papers", value: "papers" },
  { label: "Application Form", value: "forms" },
  { label: "Admission Results", value: "results" },
  { label: "Online Registration", value: "registration" },
] as const;

type TabValue = (typeof TABS)[number]["value"];

function AdmissionPageContent() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<TabValue>("procedure");

  useEffect(() => {
    const tabParam = searchParams.get("tab") as TabValue | null;
    if (tabParam && TABS.some((t) => t.value === tabParam)) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  const activeLabel = TABS.find((t) => t.value === activeTab)?.label ?? "Admission Procedure & Fees";

  return (
    <main>
      <AdmissionBanner activeTab={activeLabel} />

      <section className="w-full bg-white py-16 sm:py-20">
        <div className="max-w-5xl mx-auto px-6">
          {/* Tab Switcher */}
          <div className="flex flex-wrap gap-2 mb-10">
            {TABS.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`px-4 py-2 text-xs sm:text-sm font-semibold transition-colors ${
                  activeTab === tab.value
                    ? "bg-[#00a651] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === "procedure" && <AdmissionProcedureSection />}
          {activeTab === "papers" && (
            <AdmissionDocumentsTable category="papers" heading="Admission Papers & Notices" />
          )}
          {activeTab === "forms" && <AdmissionDocumentsTable category="forms" heading="Admission Forms" />}
          {activeTab === "results" && <AdmissionDocumentsTable category="results" heading="Admission Results" />}
          {activeTab === "registration" && <AdmissionOnlineRegistration />}
        </div>
      </section>
    </main>
  );
}

export default function AdmissionPage() {
  return (
    <Suspense fallback={null}>
      <AdmissionPageContent />
    </Suspense>
  );
}
