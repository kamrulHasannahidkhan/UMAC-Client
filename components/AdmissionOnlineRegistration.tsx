import { ArrowRight } from "lucide-react";

export default function AdmissionOnlineRegistration() {
  return (
    <div className="w-full text-center py-16">
      <h2 className="text-2xl font-bold text-[#222222] mb-3">Online Registration</h2>
      <p className="text-sm text-gray-600 max-w-xl mx-auto mb-8">
        Complete your MBBS admission registration online. Have your DGME roll number and required documents ready
        before you begin.
      </p>
      <a
        href="#"
        className="inline-flex items-center gap-2 bg-[#008d44] hover:bg-[#007337] text-white text-sm font-medium px-6 py-3 transition-colors"
      >
        Start Registration <ArrowRight size={16} />
      </a>
      <p className="text-xs text-gray-400 mt-4">
        Update the link above once your registration portal URL is ready.
      </p>
    </div>
  );
}