import {
  Compass,
  HeartHandshake,
  Briefcase,
  Sprout,
  Target,
  ShieldQuestion,
} from "lucide-react";
import { Reveal, SectionHeading } from "./Reveal";

const problems = [
  {
    icon: Compass,
    title: "Career Confusion",
    text: "You keep switching directions and still can't tell which path actually fits you.",
  },
  {
    icon: HeartHandshake,
    title: "Relationship Problems",
    text: "The same patterns repeat and you're unsure why certain connections drain you.",
  },
  {
    icon: Briefcase,
    title: "Business Decisions",
    text: "Timing feels uncertain, and every big call comes with second-guessing.",
  },
  {
    icon: Sprout,
    title: "Personal Growth",
    text: "You're doing the work, yet progress feels slower than it should be.",
  },
  {
    icon: Target,
    title: "Life Purpose",
    text: "You sense there's something bigger for you but can't name it clearly.",
  },
  {
    icon: ShieldQuestion,
    title: "Confidence",
    text: "You doubt your own instincts even when you already know the answer.",
  },
];

export function Problems() {
  return (
    <section id="problems" className="section-py scroll-mt-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="The starting point"
          title="Looking for Answers?"
          description="Most people don't need more advice — they need clarity about who they already are. Here's where numerology brings that clarity."
        />

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {problems.map((item, index) => (
            <Reveal
              as="li"
              key={item.title}
              delay={index * 0.06}
              className="glass-card hover-lift p-6"
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl border border-border bg-primary/12 text-accent">
                <item.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-lg font-semibold tracking-tight">{item.title}</h3>
              <p className="text-body mt-2 text-sm leading-relaxed">{item.text}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
