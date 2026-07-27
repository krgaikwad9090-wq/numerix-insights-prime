import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/legal/LegalPage";

const title = "Privacy Policy | Numerology Insights";
const description =
  "How Numerology Insights collects, uses, stores and protects the personal details you share when requesting your free numerology report.";

export const Route = createFileRoute("/privacy-policy")({
  component: PrivacyPolicy,
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/privacy-policy" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/privacy-policy" }],
  }),
});

function PrivacyPolicy() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="27 July 2026"
      intro="This policy explains what information Numerology Insights collects when you request a free numerology report, why we collect it, and the choices you have over it."
      sections={[
        {
          heading: "Information we collect",
          body: [
            "We collect the details you enter into the report form: your full name, date of birth, email address, mobile number, and the reason for consultation you select.",
            "We also collect basic usage data such as pages viewed and referring source, where analytics tools are enabled, to understand how the site performs.",
          ],
        },
        {
          heading: "How we use your information",
          body: [
            "Your name and date of birth are used to calculate and prepare your personalized numerology report. Your email address and mobile number are used to deliver that report and to respond to any follow-up questions you send us.",
            "If you consented, we may occasionally send related guidance or consultation offers. You can opt out of these at any time using the unsubscribe link or by replying to any message.",
          ],
        },
        {
          heading: "Sharing and disclosure",
          body: [
            "We do not sell, rent or trade your personal information. Data is shared only with the service providers that help us deliver reports and messages, and only to the extent needed to perform that service.",
          ],
        },
        {
          heading: "Data retention and security",
          body: [
            "We keep your details only as long as needed to provide our services or as required by law. Access is limited to people who need it to prepare or deliver your report.",
          ],
        },
        {
          heading: "Your rights",
          body: [
            "You can request access to, correction of, or deletion of your personal information at any time by contacting us through the form on the home page.",
          ],
        },
        {
          heading: "Cookies and analytics",
          body: [
            "Where enabled, we use analytics and measurement tools to understand site usage and improve the experience. You can control cookies through your browser settings.",
          ],
        },
      ]}
    />
  );
}
