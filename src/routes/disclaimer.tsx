import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/legal/LegalPage";

const title = "Disclaimer | Numerology Insights";
const description =
  "Numerology Insights provides guidance for self-reflection. Reports and consultations are not medical, legal, financial or psychological advice.";

export const Route = createFileRoute("/disclaimer")({
  component: Disclaimer,
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/disclaimer" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/disclaimer" }],
  }),
});

function Disclaimer() {
  return (
    <LegalPage
      title="Disclaimer"
      updated="27 July 2026"
      intro="Numerology Insights offers numerology readings as a tool for reflection and self-understanding. Please read the following before acting on any insight you receive."
      sections={[
        {
          heading: "Guidance, not professional advice",
          body: [
            "Reports and consultations are not a substitute for medical, psychological, legal or financial advice. For those matters, please consult a qualified professional.",
          ],
        },
        {
          heading: "No guaranteed outcomes",
          body: [
            "Numerology describes tendencies and cycles. It does not predict fixed events, and we make no guarantee about results, timing or outcomes in any area of your life.",
          ],
        },
        {
          heading: "Your decisions remain yours",
          body: [
            "Any action you take after reading a report or attending a consultation is your own choice and responsibility.",
          ],
        },
        {
          heading: "Accuracy of details",
          body: [
            "The quality of a reading depends entirely on the accuracy of the name and birth date you provide. Please double-check both before submitting the form.",
          ],
        },
      ]}
    />
  );
}
