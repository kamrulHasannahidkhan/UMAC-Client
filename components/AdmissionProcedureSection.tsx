import Image from "next/image";

export default function AdmissionProcedureSection() {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start mb-12">
        <div>
          <h2 className="text-3xl font-serif font-bold text-[#008d44] mb-1">Admission Procedure</h2>
          <h2 className="text-3xl font-serif font-bold text-[#2d3748] mb-4">& Fees</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Uttara Adhunik Medical College (UAMC) is the teaching and training hospital of the college. It is a
            500-bedded, multidisciplinary tertiary care facility located in Uttara, Dhaka. The hospital serves
            patients from all over the country, with a special focus on Uttara, Turag, Gazipur, and Savar.
          </p>
        </div>
        <div className="relative w-full h-56 rounded-none overflow-hidden bg-gray-100">
          <Image
            src="/Image.png"
            alt="Admission Procedure"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute bottom-4 left-4 bg-[#ffbd13] text-[#222222] font-bold text-lg px-6 py-2">
            Admission
          </div>
        </div>
      </div>

      {/* For BD/National Students */}
      <div className="mb-10">
        <h3 className="text-xl font-bold text-[#222222] mb-4 border-l-4 border-[#008d44] pl-3">
          For BD/National Student
        </h3>

        <p className="text-sm font-semibold text-gray-800 mb-1">Eligibility</p>
        <p className="text-sm text-gray-600 mb-4">
          Applicants must meet the criteria set by the Directorate General of Medical Education (DGME) under the
          Ministry of Health and Family Welfare, Government of Bangladesh.
        </p>

        <p className="text-sm font-semibold text-gray-800 mb-1">Selection & Admission</p>
        <ul className="text-sm text-gray-600 list-disc pl-5 mb-4 space-y-1">
          <li>Admission is based on the results of the DGHS national medical admission test.</li>
          <li>Selection follows candidate preference and merit list as per DGHS guidelines.</li>
          <li>Final selection is done by the admission committee formed by DGHS.</li>
        </ul>

        <p className="text-sm font-semibold text-gray-800 mb-1">Student Quota</p>
        <ul className="text-sm text-gray-600 list-disc pl-5 mb-4 space-y-1">
          <li>Total Seats: 80 for the Year MBBS (since 2013-2014).</li>
          <li>Peer Quota: 5% seats (few candidates) based on merit & financial need.</li>
          <li>Freedom Fighter Quota: Available under DGHS rules.</li>
        </ul>

        <div className="border-l-2 border-[#008d44] pl-3 text-xs text-gray-500 mb-6">
          Selected students must complete admission within the declared deadline. Failure to do so will result in
          cancellation, and seats will be filled from the waiting list.
        </div>

        <p className="text-sm font-semibold text-gray-800 mb-2">Fee Structure (Session 2024-2025)</p>
        <table className="w-full text-sm mb-2 border-t border-gray-200">
          <tbody>
            <tr className="border-b border-gray-100">
              <td className="py-2 text-gray-500 w-10">01</td>
              <td className="py-2 text-gray-700">Admission Fee</td>
              <td className="py-2 text-right text-gray-700">16,44,000/-</td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="py-2 text-gray-500">02</td>
              <td className="py-2 text-gray-700">Internship Fee</td>
              <td className="py-2 text-right text-gray-700">1,00,000/-</td>
            </tr>
            <tr>
              <td className="py-2" />
              <td className="py-2 font-semibold text-gray-800">Total Payable</td>
              <td className="py-2 text-right font-semibold text-gray-800">17,44,000/-</td>
            </tr>
          </tbody>
        </table>
        <p className="text-xs text-gray-500">
          Monthly Tuition Fee: 10,000 BDT / month. VAT applicable as per government rules.
        </p>
      </div>

      <hr className="border-gray-200 my-10" />

      {/* For Foreign Students */}
      <div>
        <h3 className="text-xl font-bold text-[#222222] mb-4 border-l-4 border-[#008d44] pl-3">
          For Foreign Students
        </h3>

        <p className="text-sm font-semibold text-gray-800 mb-1">Eligibility</p>
        <ul className="text-sm text-gray-600 list-disc pl-5 mb-4 space-y-1">
          <li>Must hold a non-Bangladeshi passport.</li>
          <li>Must follow foreign student admission policy set by the Government of Bangladesh.</li>
        </ul>

        <p className="text-sm font-semibold text-gray-800 mb-1">Required Documents</p>
        <ul className="text-sm text-gray-600 list-disc pl-5 mb-4 space-y-1">
          <li>Attested copies of O & A level (or equivalent) certificates by the respective embassy.</li>
          <li>Application form (as per the Bangladesh Embassy of the respective country).</li>
          <li>Photocopies of passport & academic documents.</li>
          <li>Documents must be sent to DGME via the Foreign Ministry of Bangladesh.</li>
        </ul>

        <p className="text-sm font-semibold text-gray-800 mb-2">Fee Structure (Session 2024-2025)</p>
        <table className="w-full text-sm mb-2 border-t border-gray-200">
          <tbody>
            <tr className="border-b border-gray-100">
              <td className="py-2 text-gray-500 w-10">01</td>
              <td className="py-2 text-gray-700">Admission & Tuition (5 Years)</td>
              <td className="py-2 text-right text-gray-700">$45,000</td>
            </tr>
            <tr>
              <td className="py-2" />
              <td className="py-2 font-semibold text-gray-800">Total Payable</td>
              <td className="py-2 text-right font-semibold text-gray-800">$48,800</td>
            </tr>
          </tbody>
        </table>
        <p className="text-xs text-gray-500 mb-8">VAT & university fees are applicable as per government and university regulations.</p>

        <h4 className="text-lg font-bold text-[#222222] mb-2">Contact for Admission</h4>
        <p className="text-sm text-gray-600">Uttara Adhunik Medical College</p>
        <p className="text-sm text-gray-600">House # 34, Road # 4, Sector # 9, Sonargaon Janapath, Uttara Model Town</p>
        <p className="text-sm text-gray-600">Dhaka-1230, Bangladesh</p>
      </div>
    </div>
  );
}
