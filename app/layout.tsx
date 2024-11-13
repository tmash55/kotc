import { ReactNode } from "react";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Viewport } from "next";
import { getSEOTags } from "@/libs/seo";

import { ThemeSwitcher } from "@/components/theme-switcher";

import config from "@/config";
import "./globals.css";

import { Toaster } from "@/components/ui/toaster";
import ContactCreatorButton from "@/components/contact-creator";
import { ThemeProvider } from "@/components/theme-proivder";

const font = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata = getSEOTags();

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={font.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen bg-background text-foreground">
            <div className="container mx-auto px-4 py-8">
              <header className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold">KOTC Tracker</h1>
                <div className="flex items-center space-x-2 sm:space-x-4">
                  <ContactCreatorButton />
                  <ThemeSwitcher />
                </div>
              </header>
              <main>{children}</main>
            </div>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
