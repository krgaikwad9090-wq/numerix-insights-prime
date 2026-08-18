import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/landing/Navbar";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { ProductSelector } from "@/components/landing/ProductSelector";

const title = "Free Vedic Astrology Birth Chart | Numerix Insights";
const description =
  "Get your free personalized Vedic astrology birth chart — Janma Kundli with planetary positions, Lagna, Nakshatra, and Dasha analysis.";

export const Route = createFileRoute("/birth-chart")({
  component: BirthChartPage,
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/birth-chart" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: "/birth-chart" }],
  }),
});

function BirthChartPage() {
  const [birthDetails, setBirthDetails] = useState<{
    fullName: string;
    dateOfBirth: string;
    timeOfBirth: string;
    city: string;
    state: string;
    country: string;
    latitude: number;
    longitude: number;
    timezone: string;
  }>({
    fullName: "",
    dateOfBirth: "",
    timeOfBirth: "",
    city: "",
    state: "",
    country: "",
    latitude: 0,
    longitude: 0,
    timezone: "",
  });

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setBirthDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormErrors({});

    // Validate required fields
    const errors: { [key: string]: string } = {};

    if (!birthDetails.fullName?.trim()) {
      errors.fullName = "Full name is required";
    }
    if (!birthDetails.dateOfBirth?.trim()) {
      errors.dateOfBirth = "Date of birth is required";
    } else {
      const dobDate = new Date(birthDetails.dateOfBirth);
      if (isNaN(dobDate.getTime())) {
        errors.dateOfBirth = "Invalid date of birth";
      }
    }
    if (!birthDetails.timeOfBirth?.trim()) {
      errors.timeOfBirth = "Exact birth time is required";
    } else {
      const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
      if (!timeRegex.test(birthDetails.timeOfBirth)) {
        errors.timeOfBirth = "Please use HH:MM format (24-hour)";
      }
    }
    if (!birthDetails.city?.trim()) {
      errors.city = "Birth place city is required";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // Show confirmation card before generating
    if (
      !window.confirm(
        `Please confirm your birth details:\n\n• Birth Date: ${birthDetails.dateOfBirth}\n• Birth Time: ${birthDetails.timeOfBirth}\n• Birth Place: ${birthDetails.city}, ${birthDetails.state || ""}${birthDetails.country ? ", " + birthDetails.country : ""}\n\nSome calculations, especially Lagna and house-based interpretations, may be unreliable if birth time is unknown.`,
      )
    ) {
      return;
    }

    // Store birth details and navigate to report
    localStorage.setItem("vedic-birth-details", JSON.stringify(birthDetails));
    window.location.href = "/astrology-report";
  };

  // Load birth details from localStorage if available
  useEffect(() => {
    const stored = localStorage.getItem("vedic-birth-details");
    if (stored) {
      const details = JSON.parse(stored);
      setBirthDetails(details);
    }
  }, []);

  if (Object.keys(formErrors).length > 0) {
    return (
      <div className="min-h-dvh p-8 sm:p-12">
        <Navbar />
        <main className="mx-auto max-w-lg">
          <div className="bg-card p-6 rounded-lg shadow mb-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">Please fix the errors below:</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Full Name
                  <input
                    name="fullName"
                    type="text"
                    value={birthDetails.fullName}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-input p-3 focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </label>
                {formErrors.fullName && (
                  <p className="text-sm text-destructive-foreground mt-1">{formErrors.fullName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Date of Birth
                  <input
                    name="dateOfBirth"
                    type="date"
                    value={birthDetails.dateOfBirth}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-input p-3 focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </label>
                {formErrors.dateOfBirth && (
                  <p className="text-sm text-destructive-foreground mt-1">{formErrors.dateOfBirth}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Time of Birth
                  <input
                    name="timeOfBirth"
                    type="time"
                    value={birthDetails.timeOfBirth}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-input p-3 focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </label>
                {formErrors.timeOfBirth && (
                  <p className="text-sm text-destructive-foreground mt-1">{formErrors.timeOfBirth}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Birth Place
                  <input
                    name="city"
                    type="text"
                    value={birthDetails.city}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-input p-3 focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </label>
                {formErrors.city && (
                  <p className="text-sm text-destructive-foreground mt-1">{formErrors.city}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full rounded-md bg-primary py-3 px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Continue to Birth Chart
              </button>
            </form>
          </div>
        </main>
        <SiteFooter />
      </div>
    );
  }

  // Show form if birth details not complete
  if (!birthDetails.fullName) {
    return (
      <div className="min-h-dvh p-8 sm:p-12">
        <Navbar />
        <main className="mx-auto max-w-lg">
          <div className="bg-card p-6 rounded-lg shadow mb-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">Generate Your Vedic Birth Chart</h2>
            <p className="text-body mb-6">
              Enter your birth details to receive a personalized Vedic astrology
              birth chart reading including Lagna, planetary positions, Nakshatra,
              and Dasha analysis.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Full Name
                  <input
                    name="fullName"
                    type="text"
                    value={birthDetails.fullName}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-input p-3 focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Date of Birth
                  <input
                    name="dateOfBirth"
                    type="date"
                    value={birthDetails.dateOfBirth}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-input p-3 focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Time of Birth
                  <input
                    name="timeOfBirth"
                    type="time"
                    value={birthDetails.timeOfBirth}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-input p-3 focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Exact birth time is preferred for accurate Lagna and house calculations.
                    If birth time is unknown, some interpretations may be limited.
                  </p>
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Birth Place (City)
                  <input
                    name="city"
                    type="text"
                    value={birthDetails.city}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-input p-3 focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </label>
              </div>

              <button
                type="submit"
                className="w-full rounded-md bg-primary py-3 px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Generate My Vedic Birth Chart
              </button>
            </form>
          </div>
        </main>
        <SiteFooter />
      </div>
    );
  }

  // Birth details are complete, show the chart
  return (
    <div className="min-h-dvh">
      <Navbar />
      <main className="mesh-bg pt-28 pb-20 md:pt-36">
        <article className="mx-auto max-w-3xl px-4 sm:px-6">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Your Vedic Birth Chart</h1>

          <ProductSelector />

          <ConfirmationCard birthDetails={birthDetails} />

          {/* Chart would go here */}
          <div className="mt-8 glass-panel p-4 sm:p-5">
            <p className="text-body">
              Birth Chart calculation in progress... This requires deterministic
              Vedic astrology calculations. The chart will display your Lagna,
              planetary positions, Nakshatra, and house placements based on
              traditional Jyotish methodology.
            </p>
          </div>
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}

function ConfirmationCard({ birthDetails }: { birthDetails: any }) {
  return (
    <div className="bg-card p-6 sm:p-8 rounded-xl mb-8">
      <h2 className="text-xl font-semibold tracking-tight mb-4">Birth Details Confirmation</h2>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <p className="text-sm text-muted-foreground">Full Name</p>
          <p className="font-medium">{birthDetails.fullName || "—"}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Birth Date</p>
          <p className="font-medium">{birthDetails.dateOfBirth || "—"}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Birth Time</p>
          <p className="font-medium">{birthDetails.timeOfBirth || "—"}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Birth Place</p>
          <p className="font-medium">
            {birthDetails.city || "—"}, {birthDetails.state || "—"}{birthDetails.country ? ", " + birthDetails.country : ""}
          </p>
        </div>
      </div>
      <div>
        <p className="text-sm text-muted-foreground">
          {"Birth time is unknown. Some calculations, especially Lagna and house-based interpretations, may be unreliable."}
        </p>
      </div>
      <div className="mt-6 flex justify-end">
        <Button size="sm" variant="hero">
          Generate Full Report
        </Button>
      </div>
    </div>
  );
}