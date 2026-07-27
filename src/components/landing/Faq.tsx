import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal, SectionHeading } from "./Reveal";

export const faqs = [
  {
    question: "Is the numerology report really free?",
    answer:
      "Yes. Your personalized numerology report is completely free. There is no card required and no hidden charge. A detailed one-to-one consultation is available separately if you ever want to go deeper.",
  },
  {
    question: "What details do you need from me?",
    answer:
      "Only your full name, date of birth, email address and mobile number. Your name and birth date are what the calculations are based on; the contact details are used to deliver the report.",
  },
  {
    question: "How soon will I receive my report?",
    answer:
      "Most reports are prepared and delivered within a few minutes of submitting the form. You will receive it by email, and on WhatsApp if you opted in.",
  },
  {
    question: "Will my personal information stay private?",
    answer:
      "Yes. Your information is used only to prepare and deliver your report. We never sell or share your data, and you can request deletion at any time.",
  },
  {
    question: "Do I need to know anything about numerology first?",
    answer:
      "Not at all. The report is written in plain language with practical explanations, so it makes sense whether this is your first reading or your fiftieth.",
  },
  {
    question: "How accurate is a numerology reading?",
    answer:
      "Numerology is a guidance tool, not a guarantee. It highlights tendencies, strengths and timing so you can make better informed decisions — the choices always remain yours.",
  },
  {
    question: "Can numerology help with career and business decisions?",
    answer:
      "It is one of the most common reasons people request a report. Your numbers point to the working environments, roles and timing cycles that suit your natural strengths.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="section-py scroll-mt-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Questions"
          title="Frequently Asked Questions"
          description="Everything you might want to know before requesting your free report."
        />

        <Reveal delay={0.1} className="mt-10">
          <Accordion type="single" collapsible className="grid gap-3">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={faq.question}
                value={`item-${index}`}
                className="glass-card border-b-0 px-5"
              >
                <AccordionTrigger className="text-left text-base font-medium hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-body text-sm leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
