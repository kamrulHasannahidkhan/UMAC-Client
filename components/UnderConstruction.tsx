import Link from "next/link";
import { Construction, ArrowLeft } from "lucide-react";

export default function UnderConstruction({ title }: { title?: string }) {
  return (
    <main className="min-h-[calc(100vh-64px)] bg-gray-50 flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 rounded-full bg-[#0f2418]/10 text-[#0f2418] flex items-center justify-center mx-auto mb-6">
          <Construction size={28} />
        </div>
        <h1 className="text-2xl font-serif font-bold text-black mb-2">
          {title || "This Page"} is Under Construction
        </h1>
        <p className="text-sm text-gray-600 mb-8">
          We're working on this page. Please check back soon.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-[#0f2418] text-white text-sm font-medium px-5 py-3 rounded-md hover:bg-[#173428] transition-colors"
        >
          <ArrowLeft size={16} /> Back to Home
        </Link>
      </div>
    </main>
  );
}
