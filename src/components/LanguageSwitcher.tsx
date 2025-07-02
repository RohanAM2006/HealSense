'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function LanguageSwitcher() {
  const pathname = usePathname();
  return (
    <div className="flex gap-2">
      <Link href={pathname} locale="en">🇬🇧 EN</Link>
      <Link href={pathname} locale="hi">🇮🇳 हिंदी</Link>
    </div>
  );
}