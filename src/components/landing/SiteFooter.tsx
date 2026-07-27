import { Link } from "@tanstack/react-router";
import { Instagram, Youtube, MessageCircle, Sparkles } from "lucide-react";

const explore = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#why-us" },
  { label: "Services", href: "#included" },
  { label: "Contact", href: "#lead-form" },
];

const legal = [
  { label: "Privacy Policy", to: "/privacy-policy" },
  { label: "Terms", to: "/terms" },
  { label: "Disclaimer", to: "/disclaimer" },
];

const socials = [
  { label: "Instagram", icon: Instagram, href: "https://instagram.com" },
  { label: "YouTube", icon: Youtube, href: "https://youtube.com" },
  { label: "WhatsApp", icon: MessageCircle, href: "https://wa.me/919876543210" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface/40">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <a href="#hero" className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-xl [background-image:var(--gradient-cta)]">
                <Sparkles className="h-4 w-4 text-primary-foreground" aria-hidden="true" />
              </span>
              <span className="text-base font-semibold tracking-tight">Numerology Insights</span>
            </a>
            <p className="text-body mt-4 max-w-sm text-sm leading-relaxed">
              Modern, ethical numerology guidance for career, relationships and personal growth —
              starting with a free personalized report.
            </p>
            <ul className="mt-6 flex items-center gap-3">
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-card/60 text-muted-foreground transition-colors hover:border-accent/40 hover:text-accent"
                  >
                    <social.icon className="h-4 w-4" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Explore">
            <h2 className="text-sm font-semibold tracking-tight">Explore</h2>
            <ul className="mt-4 grid gap-3">
              {explore.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Legal">
            <h2 className="text-sm font-semibold tracking-tight">Legal</h2>
            <ul className="mt-4 grid gap-3">
              {legal.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Numerology Insights. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Numerology is a guidance tool and not a substitute for professional advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
