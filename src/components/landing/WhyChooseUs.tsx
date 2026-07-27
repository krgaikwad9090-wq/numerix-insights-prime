import { UserRoundCheck, Scale, LockKeyhole, BookOpenCheck, Award, Cpu } from "lucide-react";
import { Reveal, SectionHeading } from "./Reveal";

const reasons = [
  { icon: UserRoundCheck, title: "Personalized Reports", text: "Every report is calculated from your own details — never a template." },
  { icon: Scale, title: "Ethical Guidance", text: "No fear-based predictions, no pressure, no upsell tactics." },
  { icon: LockKeyhole, title: "Private & Secure", text: "Your data stays confidential and is never sold or shared." },
  { icon: BookOpenCheck, title: "Easy To Understand", text: "Clear language with practical next steps you can actually use." },
  { icon: Award, title: "Professional Experience", text: "Over a decade of consultations across career, business and relationships." },
  { icon: Cpu, title: "Modern Approach", text: "Traditional numerology paired with a clean, modern delivery experience." },
];

export function WhyChooseUs() {
  return (
    <section id="why-us" className="mesh-bg section-py scroll-mt-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Why Numerology Insights"
          title="Guidance You Can Actually Trust"
          description="We built this for people who want depth without drama — grounded readings delivered with the care of a modern product."
        />

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((item, index) => (
            <Reveal
              as="li"
              key={item.title}
              delay={(index % 3) * 0.06}
              className="glass-card hover-lift flex gap-4 p-6"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl [background-image:var(--gradient-cta)]">
                <item.icon className="h-5 w-5 text-primary-foreground" aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <h3 className="text-base font-semibold tracking-tight">{item.title}</h3>
                <p className="text-body mt-2 text-sm leading-relaxed">{item.text}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
