import {
  Route,
  Gem,
  Sparkles,
  BriefcaseBusiness,
  Users,
  Dices,
  TrendingUp,
  CalendarRange,
} from "lucide-react";
import { Reveal, SectionHeading } from "./Reveal";

const benefits = [
  { icon: Route, title: "Life Path Number", text: "The core number that shapes how you move through life." },
  { icon: Gem, title: "Strengths", text: "The traits you can rely on when decisions get difficult." },
  { icon: Sparkles, title: "Hidden Talents", text: "Abilities you under-use because they feel effortless." },
  { icon: BriefcaseBusiness, title: "Career Guidance", text: "Work environments and roles where you naturally perform." },
  { icon: Users, title: "Relationship Insights", text: "How you connect, and the dynamics that keep repeating." },
  { icon: Dices, title: "Lucky Numbers", text: "Numbers that align with your chart for key choices." },
  { icon: TrendingUp, title: "Growth Opportunities", text: "The specific edges worth developing this cycle." },
  { icon: CalendarRange, title: "Personal Year", text: "What this year is asking of you, and what to prioritise." },
];

export function Benefits() {
  return (
    <section id="benefits" className="mesh-bg section-py scroll-mt-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Your free report"
          title="What You'll Discover"
          description="Eight clear, practical readings drawn from your birth details — written in plain language, not mystical jargon."
        />

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((item, index) => (
            <Reveal
              as="li"
              key={item.title}
              delay={(index % 4) * 0.06}
              className="glass-card hover-lift p-6"
            >
              <item.icon className="h-6 w-6 text-accent" aria-hidden="true" />
              <h3 className="mt-4 text-base font-semibold tracking-tight">{item.title}</h3>
              <p className="text-body mt-2 text-sm leading-relaxed">{item.text}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
