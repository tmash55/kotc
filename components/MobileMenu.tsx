"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import logo from "@/app/icon.png";
import config from "@/config";
import ContactCreatorButton from "@/components/contact-creator";
import { ThemeSwitcher } from "@/components/theme-switcher";

interface MobileMenuProps {
  links: { href: string; label: string }[];
}

export default function MobileMenu({ links }: MobileMenuProps) {
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [searchParams]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <button
        className="md:hidden ml-auto"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        <Menu className="h-6 w-6" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" />

          <div className="fixed inset-0 bg-background px-4 py-6">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between">
                <Link
                  href="/"
                  className="flex items-center space-x-2"
                  onClick={() => setIsOpen(false)}
                >
                  <Image
                    src={logo}
                    alt={config.appName}
                    width={32}
                    height={32}
                    className="h-8 w-8"
                  />
                  <span className="font-bold text-xl">{config.appName}</span>
                </Link>
                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                >
                  <X className="h-6 w-6" />
                  <span className="sr-only">Close</span>
                </button>
              </div>

              {/* Navigation */}
              <nav className="flex flex-col space-y-4 mt-8">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-lg font-semibold transition-colors hover:text-primary px-2 py-1 rounded-md hover:bg-accent"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              {/* Actions */}
              <div className="mt-auto space-y-4 pb-6">
                <ContactCreatorButton
                  className="w-full justify-center text-base"
                  onClick={() => setIsOpen(false)}
                />
                <div className="flex items-center justify-between px-2 py-2 rounded-md bg-accent/50">
                  <span className="text-sm font-medium">Theme</span>
                  <ThemeSwitcher />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
