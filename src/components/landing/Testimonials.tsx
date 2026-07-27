import { Star } from "lucide-react";
import { Reveal, SectionHeading } from "./Reveal";

const testimonials = [
  {
    name: "Ananya Mehta",
    role: "Product Manager, Bengaluru",
    initials: "AM",
    quote:
      "I'd been stuck choosing between two job offers for weeks. The career section of my report described my working style so precisely that the decision became obvious.",
  },
  {
    name: "Rohan Kapoor",
    role: "Founder, Dubai",
    initials: "RK",
    quote:
      "No dramatic predictions, no pressure to buy anything. Just a clear breakdown of my numbers and what to focus on this year. That alone was worth it.",
  },
  {
    name: "Priya Nair",
    role: "Designer, Mumbai",
    initials: "PN",
    quote:
      "The relationship insights explained a pattern I've repeated for years. I read it twice and shared it with my partner — it started a really honest conversation.",
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="mesh-bg section-py scroll-mt-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Real feedback"
          title="What People Say After Their Report"
          description="Thousands of readers use their numbers to make calmer, clearer decisions."
        />

        <ul className="mt-12 grid gap-5 lg:grid-cols-3">
          {testimonials.map((item, index) => (
            <Reveal
              as="li"
              key={item.name}
              delay={index * 0.08}
              className="glass-card hover-lift flex flex-col p-6"
            >
              <div className="flex items-center gap-1" aria-label="Rated 5 out of 5">
                {Array.from({ length: 5 }).map((_, starIndex) => (
                  <Star
                    key={starIndex}
                    className="h-4 w-4 fill-accent text-accent"
                    aria-hidden="true"
                  />
                ))}
              </div>
              <blockquote className="text-body mt-4 flex-1 text-sm leading-relaxed">
                “{item.quote}”
              </blockquote>
              <div className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full [background-image:var(--gradient-cta)] text-sm font-semibold text-primary-foreground">
                  {item.initials}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{item.name}</p>
                  <p className="truncate text-xs text-muted-foreground">{item.role}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
