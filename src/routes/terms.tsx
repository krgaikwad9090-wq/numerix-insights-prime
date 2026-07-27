import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/legal/LegalPage";

const title = "Terms of Service | Numerology Insights";
const description =
  "The terms that apply when you use the Numerology Insights website, request a free numerology report, or book a paid consultation.";

export const Route = createFileRoute("/terms")({
  component: Terms,
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/terms" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
});

function Terms() {
  return (
    <LegalPage
      title="Terms of Service"
      updated="27 July 2026"
      intro="By using the Numerology Insights website or requesting a report, you agree to the terms below. Please read them before submitting your details."
      sections={[
        {
          heading: "Use of the service",
          body: [
            "You agree to provide accurate details when requesting a report. Reports are calculated from the name and date of birth you submit, so inaccurate information will produce an inaccurate reading.",
            "You must be at least 18 years old to submit the form and use our services.",
          ],
        },
        {
          heading: "Free reports and paid consultations",
          body: [
            "The personalized numerology report is provided free of charge. Detailed one-to-one consultations are an optional paid service, with scope, duration and fees agreed before booking.",
          ],
        },
        {
          heading: "Intellectual property",
          body: [
            "All content on this site, including report formats, written interpretations and design elements, belongs to Numerology Insights and may not be reproduced or resold without written permission.",
          ],
        },
        {
          heading: "Limitation of liability",
          body: [
            "Our guidance is informational. We are not liable for decisions you make based on a report or consultation, or for any resulting loss.",
          ],
        },
        {
          heading: "Changes to these terms",
          body: [
            "We may update these terms as our services evolve. Continued use of the site after an update means you accept the revised terms.",
          ],
        },
      ]}
    />
  );
}
