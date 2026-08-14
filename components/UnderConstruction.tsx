import Link from "next/link";
import { Construction, ArrowLeft } from "lucide-react";

interface UnderConstructionProps {
  title?: string;
}

export default function UnderConstruction({ title }: UnderConstructionProps) {
  const pageTitle = title || "This Page";

  return (
    <main className="min-h-[calc(100vh-64px)] bg-gray-50 flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        {/* Icon Container */}
        <div 
          className="w-16 h-16 rounded-full bg-[#0f2418]/10 text-[#0f2418] flex items-center justify-center mx-auto mb-6"
          aria-hidden="true"
        >
          <Construction size={28} />
        </div>

        {/* Heading */}
        <h1 className="text-2xl font-serif font-bold text-black mb-2">
          {pageTitle} is Under Construction
        </h1>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-8">
          We&apos;re working hard to bring this page to life. Please check back soon!
        </p>

        {/* Action Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-[#0f2418] text-white text-sm font-medium px-5 py-3 rounded-md hover:bg-[#173428] focus:outline-none focus:ring-2 focus:ring-[#0f2418] focus:ring-offset-2 transition-colors"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          <span>Back to Home</span>
        </Link>
      </div>
    </main>
  );
}