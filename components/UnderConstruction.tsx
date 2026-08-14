import Link from "next/link";
import { Construction, ArrowLeft, Sparkles, Clock, Hammer } from "lucide-react";

interface UnderConstructionProps {
  title?: string;
}

export default function UnderConstruction({ title }: UnderConstructionProps) {
  const pageTitle = title || "This Page";

  return (
    <main className="min-h-[calc(100vh-64px)] bg-slate-50 flex items-center justify-center px-4 sm:px-6 py-12 relative overflow-hidden">
      {/* Background Decorative Ambient Glows */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-emerald-500/10 via-emerald-400/5 to-transparent rounded-full blur-3xl pointer-events-none" 
        aria-hidden="true" 
      />

      <div className="max-w-lg w-full bg-white/80 backdrop-blur-md rounded-3xl border border-slate-200/80 p-8 sm:p-12 shadow-xl shadow-slate-200/50 text-center relative z-10 transition-all">
        
        {/* Animated Badge & Hero Icon */}
        <div className="relative inline-block mb-6">
          {/* Subtle Outer Pulse Ring */}
          <div 
            className="absolute -inset-2 rounded-2xl bg-emerald-500/10 animate-pulse pointer-events-none" 
            aria-hidden="true" 
          />
          
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#0f2418] to-[#1a3d2a] text-emerald-400 flex items-center justify-center shadow-lg shadow-emerald-950/20 relative z-10 border border-emerald-500/20">
            <Construction size={36} className="animate-bounce" style={{ animationDuration: '3s' }} />
          </div>

          {/* Floating Accent Badges */}
          <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center border-2 border-white shadow-sm z-20">
            <Sparkles size={14} />
          </div>
        </div>

        {/* Status Tag */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/60 text-emerald-800 text-xs font-semibold mb-4">
          <Clock size={12} className="text-emerald-600" /> Work In Progress
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 tracking-tight mb-3">
          <span className="text-emerald-900">{pageTitle}</span> is Under Construction
        </h1>

        {/* Description */}
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-8 max-w-sm mx-auto font-normal">
          We&apos;re currently crafting something great here. Our team is putting on the finishing touches—check back real soon!
        </p>

        {/* Action Button */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#0f2418] hover:bg-[#163725] active:scale-[0.98] text-white text-sm font-semibold px-6 py-3.5 rounded-xl transition-all shadow-md shadow-emerald-950/20 group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" aria-hidden="true" />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Footer Note */}
        <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-center gap-2 text-xs text-slate-400">
          <Hammer size={14} className="text-emerald-600" />
          <span>Building for UAMC Students & Faculty</span>
        </div>

      </div>
    </main>
  );
}