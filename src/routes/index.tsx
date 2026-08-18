import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Problems } from "@/components/landing/Problems";
import { Benefits } from "@/components/landing/Benefits";
import { ReportIncludes } from "@/components/landing/ReportIncludes";
import { WhyChooseUs } from "@/components/landing/WhyChooseUs";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Testimonials } from "@/components/landing/Testimonials";
import { Faq, faqs } from "@/components/landing/Faq";
import { FinalCta } from "@/components/landing/FinalCta";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { StickyMobileCta } from "@/components/landing/StickyMobileCta";
import { ProductSelector } from "@/components/landing/ProductSelector";

// Product selector display
const product = "vedic-astrology"; // or "numerology"

const title = "Vedic Astrology Birth Chart | Numerix Insights";
const description =
  "Get a FREE personalized Vedic astrology birth chart reading — Janma Kundli, planetary positions, Nakshatra, Dasha, and predictions. Delivered in minutes.";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Numerology Insights",
          url: "/",
          description:
            "Modern, ethical numerology guidance for career, relationships and personal growth.",
          sameAs: ["https://instagram.com", "https://youtube.com"],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: { "@type": "Answer", text: faq.answer },
          })),
        }),
      },
    ],
  }),
});

function Index() {
  return (
    <div className="min-h-dvh">
      <Navbar />
      <main>
        <ProductSelector />
        <Hero />
        <Problems />
        <Benefits />
        <ReportIncludes />
        <WhyChooseUs />
        <HowItWorks />
        <Testimonials />
        <Faq />
        <FinalCta />
      </main>
      <SiteFooter />
      <StickyMobileCta />
      <Toaster position="top-center" />
      <div className="h-16 lg:hidden" aria-hidden="true" />
    </div>
  );
}
