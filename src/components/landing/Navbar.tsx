import { useEffect, useState } from "react";
import { Menu, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { label: "Benefits", href: "#benefits" },
  { label: "Free Report", href: "#included" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Reviews", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
  { label: "Birth Chart", href: "/birth-chart" },
  { label: "Planetary Positions", href: "/planetary-positions" },
  { label: "Nakshatra", href: "/nakshatra" },
  { label: "Yogas", href: "/yogas" },
  { label: "Dasha", href: "/dasha" },
  { label: "Predictions", href: "/predictions" },
  { label: "Remedies", href: "/remedies" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "border-b border-border bg-background/80 backdrop-blur-xl" : "",
      )}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6"
      >
        <a href="#hero" className="flex min-w-0 items-center gap-2">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl [background-image:var(--gradient-cta)]">
            <Sparkles className="h-4 w-4 text-primary-foreground" aria-hidden="true" />
          </span>
          <span className="truncate text-sm font-semibold tracking-tight sm:text-base">
            Numerology Insights
          </span>
        </a>

        <ul className="hidden items-center gap-7 lg:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-body text-sm transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Button asChild variant="hero" className="hidden sm:inline-flex">
            <a href="#lead-form">Claim My FREE Report</a>
          </Button>
          <Button
            variant="glass"
            size="icon"
            className="lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X /> : <Menu />}
          </Button>
        </div>
      </nav>

      {open ? (
        <div
          className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm flex items-center justify-center pt-16"
        >
          <ul className="flex flex-col gap-6 text-lg font-medium text-white w-full max-w-md">
            {links.map((link) => (
              <li key={link.href} className="pb-4">
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <Button
            asChild
            variant="hero"
            className="w-full"
            onClick={() => setOpen(false)}
          >
            <a href="#lead-form">Close Menu</a>
          </Button>
        </div>
      ) : null}
    </header>
  );
}