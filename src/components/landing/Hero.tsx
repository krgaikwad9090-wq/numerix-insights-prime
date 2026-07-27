import { motion } from "motion/react";
import { ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LeadForm } from "./LeadForm";
import { Counter } from "./Counter";
import heroImage from "@/assets/hero-numbers.jpg";

const stats = [
  { value: 12400, suffix: "+", label: "Reports delivered" },
  { value: 4.9, suffix: "/5", label: "Average rating", decimals: 1 },
  { value: 60, suffix: "s", label: "To get started" },
];

export function Hero() {
  return (
    <section id="hero" className="mesh-bg relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24">
      <div
        aria-hidden="true"
        className="animate-float pointer-events-none absolute -top-24 -left-32 h-72 w-72 rounded-full bg-primary/25 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="animate-float pointer-events-none absolute right-[-6rem] bottom-0 h-80 w-80 rounded-full bg-accent/20 blur-[130px]"
      />

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1.5 text-xs font-medium text-accent backdrop-blur-md">
            <Star className="h-3.5 w-3.5 fill-accent" aria-hidden="true" />
            Trusted by 12,000+ seekers worldwide
          </span>

          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-[3.5rem] lg:leading-[1.05]">
            Discover What Your <span className="text-gradient">Numbers Reveal</span> About Your Life
          </h1>

          <p className="text-body mt-5 max-w-xl text-base leading-relaxed sm:text-lg">
            Receive a FREE Personalized Numerology Report that helps you understand your strengths,
            career tendencies, personality, relationships, and opportunities for growth.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="hero" size="xl">
              <a href="#lead-form">
                Claim My FREE Report
                <ArrowRight aria-hidden="true" />
              </a>
            </Button>
            <Button asChild variant="glass" size="xl">
              <a href="#benefits">Learn More</a>
            </Button>
          </div>

          <dl className="mt-10 grid max-w-lg grid-cols-3 gap-4 border-t border-border pt-7">
            {stats.map((stat) => (
              <div key={stat.label} className="min-w-0">
                <dt className="sr-only">{stat.label}</dt>
                <dd className="text-2xl font-semibold tracking-tight sm:text-3xl">
                  <Counter to={stat.value} suffix={stat.suffix} decimals={stat.decimals ?? 0} />
                </dd>
                <p className="mt-1 text-xs text-muted-foreground sm:text-sm">{stat.label}</p>
              </div>
            ))}
          </dl>
        </motion.div>

        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <img
            src={heroImage}
            alt="Abstract glowing sphere of numerals representing a personalized numerology chart"
            width={1200}
            height={1200}
            fetchPriority="high"
            decoding="async"
            className="pointer-events-none absolute -top-24 left-1/2 hidden w-[34rem] -translate-x-1/2 opacity-40 mix-blend-screen lg:block"
          />
          <div className="relative">
            <LeadForm />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
