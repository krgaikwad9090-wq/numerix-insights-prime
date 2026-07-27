import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal, SectionHeading } from "./Reveal";

const included = [
  "Your complete Life Path, Destiny and Soul Urge number breakdown",
  "A personality profile explaining how others experience you",
  "Career directions matched to your numbers, with example roles",
  "Relationship compatibility patterns and communication tips",
  "Your Personal Year forecast with month-by-month focus areas",
  "Lucky numbers, favourable days and supportive colours",
  "Three growth actions tailored to your current cycle",
  "A plain-language summary you can revisit any time",
];

export function ReportIncludes() {
  return (
    <section id="included" className="section-py scroll-mt-20">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">
        <SectionHeading
          align="left"
          eyebrow="Included at no cost"
          title="What's Inside Your Free Numerology Report"
          description="A structured, personalised document — not a generic horoscope. Every line is calculated from your name and date of birth."
        />

        <Reveal delay={0.1} className="glass-panel p-6 sm:p-8">
          <ul className="grid gap-4">
            {included.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-success/15">
                  <Check className="h-3 w-3 text-success" aria-hidden="true" />
                </span>
                <span className="text-body text-sm leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
          <Button asChild variant="hero" size="lg" className="mt-7 w-full">
            <a href="#lead-form">
              Claim My FREE Report
              <ArrowRight aria-hidden="true" />
            </a>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
