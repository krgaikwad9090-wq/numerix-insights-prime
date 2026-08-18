import { useEffect, useState } from "react";
import { Menu, X, Sparkles, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

// Landing-page section anchors shown inline in the navbar
const sectionLinks = [
  { label: "Benefits", href: "#benefits" },
  { label: "Free Report", href: "#included" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Reviews", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
];

// Astrology tool pages grouped under a single dropdown
const toolLinks = [
  { label: "Birth Chart", href: "/birth-chart" },
  { label: "Planetary Positions", href: "/planetary-positions" },
  { label: "Nakshatra", href: "/nakshatra" },
  { label: "Yogas", href: "/yogas" },
  { label: "Dasha", href: "/dasha" },
  { label: "Predictions", href: "/predictions" },
  { label: "Remedies", href: "/remedies" },
];

const allLinks = [...sectionLinks, ...toolLinks];

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
        className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6"
      >
        <a href="#hero" className="flex min-w-0 items-center gap-2">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl [background-image:var(--gradient-cta)]">
            <Sparkles className="h-4 w-4 text-primary-foreground" aria-hidden="true" />
          </span>
          <span className="truncate text-sm font-semibold tracking-tight sm:text-base">
            Numerology Insights
          </span>
        </a>

        <ul className="hidden items-center gap-6 lg:flex">
          {sectionLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="whitespace-nowrap text-body text-sm transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 whitespace-nowrap text-body text-sm outline-none transition-colors hover:text-foreground data-[state=open]:text-foreground">
                Astrology Tools
                <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52">
                {toolLinks.map((link) => (
                  <DropdownMenuItem key={link.href} asChild>
                    <a href={link.href}>{link.label}</a>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </li>
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
        <div className="fixed inset-0 top-16 z-40 overflow-y-auto bg-background/95 backdrop-blur-xl">
          <div className="mx-auto flex w-full max-w-md flex-col gap-6 px-6 py-8">
            <ul className="flex flex-col gap-5 text-lg font-medium">
              {allLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="text-body transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <Button asChild variant="hero" className="w-full" onClick={() => setOpen(false)}>
              <a href="#lead-form">Claim My FREE Report</a>
            </Button>
          </div>
        </div>
      ) : null}
    </header>
  );
}
