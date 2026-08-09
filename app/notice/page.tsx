import PageBanner from "@/components/PageBanner";
import NewsSection from "@/components/NewsSection";
import NoticeBoardSection from "@/components/NoticeBoardSection";
import AlumniEventSection from "@/components/AlumniEventSection";
import GalleryEventSection from "@/components/GalleryEventSection";

export default function NoticeMediaPage() {
  return (
    <main>
      <PageBanner />
      <NewsSection />
      <NoticeBoardSection />
      <AlumniEventSection />
      <GalleryEventSection />
    </main>
  );
}
