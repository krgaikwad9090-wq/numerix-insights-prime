import { ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "./Reveal";

export function FinalCta() {
  return (
    <section id="get-started" className="section-py scroll-mt-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="glass-panel mesh-bg relative overflow-hidden px-6 py-14 text-center sm:px-12 md:py-20">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-primary/25 blur-[120px]"
          />
          <h2 className="mx-auto max-w-2xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl md:text-5xl md:leading-[1.1]">
            Start Your Journey With Your Numbers
          </h2>
          <p className="text-body mx-auto mt-4 max-w-xl text-base leading-relaxed sm:text-lg">
            Your personalized numerology report is free, private and ready in minutes. Understand
            your strengths and make your next decision with clarity.
          </p>
          <div className="mt-8 flex justify-center">
            <Button asChild variant="hero" size="xl">
              <a href="#lead-form">
                Claim My FREE Report
                <ArrowRight aria-hidden="true" />
              </a>
            </Button>
          </div>
          <p className="mt-5 flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <ShieldCheck className="h-4 w-4 text-success" aria-hidden="true" />
            100% free · No spam · Your details stay private
          </p>
        </Reveal>
      </div>
    </section>
  );
}
