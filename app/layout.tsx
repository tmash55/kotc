import { ReactNode } from "react";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Viewport } from "next";
import { getSEOTags } from "@/libs/seo";
import ClientLayout from "@/components/LayoutClient";

import config from "@/config";
import "./globals.css";
import { Navbar } from "@/components/kotc/NavBar";

const font = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const viewport: Viewport = {
  // Will use the primary color of your theme to show a nice theme color in the URL bar of supported browsers
  themeColor: config.colors.main,
  width: "device-width",
  initialScale: 1,
};

// This adds default SEO tags to all pages in our app.
// You can override them in each page passing params to getSOTags() function.
export const metadata = getSEOTags();

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-theme={config.colors.theme} className={font.className}>
      <body>
        <div className="min-h-screen bg-gradient-to-b from-background to-secondary/10">
          <main className="container mx-auto px-4 py-8">
            {/* ClientLayout contains all the client wrappers (Crisp chat support, toast messages, tooltips, etc.) */}
            <ClientLayout>{children}</ClientLayout>
          </main>
        </div>
      </body>
    </html>
  );
}
