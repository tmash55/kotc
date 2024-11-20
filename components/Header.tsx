import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
import logo from "@/app/icon.png";
import config from "@/config";
import ContactCreatorButton from "@/components/contact-creator";
import { ThemeSwitcher } from "@/components/theme-switcher";
import dynamic from "next/dynamic";

const links = [
  { href: "/schedule", label: "Schedule" },
  { href: "/", label: "Leaderboard" },
  { href: "/odds", label: "Odds" },
];

const MobileMenu = dynamic(() => import("@/components/MobileMenu"), {
  ssr: false,
});

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center">
          {/* Logo section - left */}
          <div className="flex-none">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src={logo}
                alt={config.appName}
                width={32}
                height={32}
                className="h-8 w-8"
              />
              <span className="font-bold text-xl">{config.appName}</span>
            </Link>
          </div>

          {/* Navigation - center */}
          <nav className="hidden md:flex flex-1 justify-center items-center">
            <div className="flex items-center space-x-8">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium transition-colors hover:text-primary"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>

          {/* Actions - right */}
          <div className="hidden md:flex flex-none items-center space-x-4">
            <ContactCreatorButton />
            <ThemeSwitcher />
          </div>

          {/* Mobile menu */}
          <Suspense
            fallback={<div className="md:hidden ml-auto">Loading...</div>}
          >
            <MobileMenu links={links} />
          </Suspense>
        </div>
      </div>
    </header>
  );
}
