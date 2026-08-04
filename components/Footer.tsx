import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, ArrowUpRight, Calendar } from "lucide-react";

const campusLinks = ["Academic", "Athletics", "Campus life", "Research", "Academic Area"];
const pageLinks = ["About", "Tution Fee", "Alumni", "Faculty Staff", "Event"];

const recentPosts = [
  { date: "August 6, 2024", title: "Those Inequalities Are Inequalities That", img: "/post1.jpg" },
  { date: "July 4, 2024", title: "After Decades Of Improvement, Cardiovascular", img: "/post2.jpg" },
];

export default function Footer() {
  return (
    <footer className="bg-black text-gray-400 font-sans">
      {/* Newsletter Section */}
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6 border-b border-gray-900">
        <h3 className="text-3xl md:text-4xl font-normal text-white tracking-wide">
          Subscribe To Newsletter
        </h3>
        <div className="flex w-full md:w-auto items-center">
          <input
            type="email"
            placeholder="Enter Your mail"
            className="bg-transparent border border-emerald-600 text-white placeholder-gray-400 px-5 py-3.5 text-sm w-full md:w-80 focus:outline-none h-[48px]"
          />
          <button className="bg-white hover:bg-gray-100 text-black px-6 text-sm font-medium flex items-center gap-2 shrink-0 h-[48px] transition-colors">
            Submit Button <ArrowUpRight size={16} />
          </button>
        </div>
      </div>

      {/* Main Grid Section */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Logo & Info */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="UAMC Logo" width={48} height={48} className="shrink-0" />
            <div>
              <p className="font-semibold text-white text-lg leading-tight">Uttara Adhunik</p>
              <p className="text-xs text-gray-300">Medical College (UAMC)</p>
            </div>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed pr-4">
            We are passionate education dedicated to providing high-quality resources learners all backgrounds.
          </p>
          <div className="space-y-3 pt-2 text-sm text-gray-400">
            <p className="flex items-center gap-3">
              <MapPin size={16} className="text-emerald-500 shrink-0" />
              <span>Park, Melbourne, Australia</span>
            </p>
            <p className="flex items-center gap-3">
              <Phone size={16} className="text-emerald-500 shrink-0" />
              <span>485-826-710</span>
            </p>
          </div>
        </div>

        {/* Our Campus */}
        <div>
          <h4 className="text-white text-lg font-medium underline underline-offset-[12px] decoration-1 mb-7">
            Our Campus
          </h4>
          <ul className="space-y-4 text-sm text-gray-400">
            {campusLinks.map((l) => (
              <li key={l}>
                <Link href="#" className="hover:text-white transition-colors">
                  {l}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Our Pages */}
        <div>
          <h4 className="text-white text-lg font-medium underline underline-offset-[12px] decoration-1 mb-7">
            Our Pages
          </h4>
          <ul className="space-y-4 text-sm text-gray-400">
            {pageLinks.map((l) => (
              <li key={l}>
                <Link href="#" className="hover:text-white transition-colors">
                  {l}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Recent Posts */}
        <div>
          <h4 className="text-white text-lg font-medium underline underline-offset-[12px] decoration-1 mb-7">
            Recent Posts
          </h4>
          <div className="space-y-6">
            {recentPosts.map((post) => (
              <div key={post.title} className="flex gap-4 items-start">
                <Image
                  src={post.img}
                  alt={post.title}
                  width={72}
                  height={72}
                  className="rounded object-cover shrink-0 w-[72px] h-[72px]"
                />
                <div className="space-y-1.5">
                  <p className="flex items-center gap-1.5 text-xs text-gray-400">
                    <Calendar size={13} className="text-gray-400" />
                    <span>{post.date}</span>
                  </p>
                  <Link
                    href="#"
                    className="text-sm font-medium text-white hover:text-emerald-500 transition-colors line-clamp-2 leading-snug"
                  >
                    {post.title}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Copyright Footer */}
      <div className="border-t border-gray-900 py-6 text-center text-sm text-gray-400">
        Copyright @ 2024. All Rights Reserved by{" "}
        <span className="text-white font-medium">Unipix</span>
      </div>
    </footer>
  );
}