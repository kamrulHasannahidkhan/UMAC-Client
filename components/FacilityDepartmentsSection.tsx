"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type Department = {
  _id: string;
  name: string;
  image: string;
  establishedDate: string;
  learnMoreLink: string;
  order: number;
};

const API_URL = process.env.NEXT_PUBLIC_ADMIN_API_URL;

export default function FacilityDepartmentsSection() {
  const [depts, setDepts] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/api/facility-departments`)
      .then((res) => res.json())
      .then((json) => {
        if (json.success) setDepts(json.data);
      })
      .catch((err) => console.error("Failed to load departments:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="w-full h-96 bg-gray-50 animate-pulse" />;
  }

  return (
    <div className="w-full">
      <h2 className="text-3xl font-bold text-[#222222] text-center mb-1">Departments</h2>
      <p className="text-sm text-gray-500 text-center mb-10">List of academic and clinical departments with their establishment dates.</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
        {depts.map((dept) => (
          <div key={dept._id} className="bg-white border border-gray-100 rounded-none overflow-hidden">
            <div className="relative w-full h-24 bg-gray-100">
              <Image src={dept.image} alt={dept.name} fill className="object-cover" sizes="(max-width: 640px) 50vw, 25vw" />
            </div>
            <div className="p-3">
              <p className="text-xs font-semibold text-gray-800 line-clamp-2 mb-1">{dept.name}</p>
              <p className="text-[11px] text-gray-400 mb-2">Established: {dept.establishedDate}</p>
              <a
                href={dept.learnMoreLink}
                className="inline-block text-[11px] font-semibold bg-[#008d44] text-white px-3 py-1 hover:bg-[#007337] transition-colors"
                
              >
                Learn More
              </a>
            </div>
          </div>
        ))}

        {depts.length === 0 && (
          <p className="text-sm text-gray-400 col-span-full text-center py-10">No departments added yet.</p>
        )}
      </div>
    </div>
  );
}
