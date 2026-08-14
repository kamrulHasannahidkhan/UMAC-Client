import Link from "next/link";

export default function ComingSoonButton({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link href="/coming-soon" className={className}>
      {children}
    </Link>
  );
}
