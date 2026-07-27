import { Reveal, SectionHeading } from "./Reveal";

const steps = [
  {
    title: "Enter Your Birth Details",
    text: "Share your name and date of birth in the form — it takes less than a minute.",
  },
  {
    title: "Generate Report",
    text: "Your core numbers are calculated and interpreted against your chart.",
  },
  {
    title: "Receive Personalized Insights",
    text: "Your report arrives by email and WhatsApp, ready to read straight away.",
  },
  {
    title: "Book Detailed Consultation",
    text: "Optional. Go deeper on a specific area with a one-to-one session.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="section-py scroll-mt-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Simple process"
          title="How It Works"
          description="Four steps from where you are now to insight you can act on."
        />

        <ol className="relative mt-12 grid gap-5 lg:grid-cols-4">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-[3.25rem] right-8 left-8 hidden h-px bg-gradient-to-r from-transparent via-border to-transparent lg:block"
          />
          {steps.map((step, index) => (
            <Reveal
              as="li"
              key={step.title}
              delay={index * 0.08}
              className="glass-card hover-lift relative p-6"
            >
              <span className="grid h-12 w-12 place-items-center rounded-2xl [background-image:var(--gradient-cta)] text-lg font-semibold text-primary-foreground [box-shadow:var(--glow-cta)]">
                {index + 1}
              </span>
              <h3 className="mt-5 text-base font-semibold tracking-tight">{step.title}</h3>
              <p className="text-body mt-2 text-sm leading-relaxed">{step.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
