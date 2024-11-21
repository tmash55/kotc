import Link from "next/link";
import { Twitter } from "lucide-react";
import ContactCreatorButton from "./contact-creator";

const Footer = () => {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">KOTC Tracker</h3>
            <p className="text-sm text-muted-foreground">
              Tracking King of the Court for DraftKings Promo
            </p>
          </div>
          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/schedule"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Schedule
                </Link>
              </li>
              <li>
                <Link
                  href="/odds"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Odds
                </Link>
              </li>
              <li>
                <ContactCreatorButton />
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/tos"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
            <div className="mt-4">
              <h4 className="text-sm font-semibold mb-2">Follow Us</h4>
              <a
                href="https://x.com/trackkotc"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground inline-flex items-center space-x-2"
              >
                <Twitter className="h-5 w-5" />
                <span className="text-sm">@trackkotc</span>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <p className="text-xs sm:text-sm text-muted-foreground text-center sm:text-left">
            © {new Date().getFullYear()} KOTC Tracker. All rights reserved.
          </p>
          <p className="text-xs sm:text-sm text-muted-foreground text-center sm:text-right">
            Designed and built by Tyler Maschoff
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
