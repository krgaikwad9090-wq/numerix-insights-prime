import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Download, FileText, Printer, ArrowLeft, Loader2, Mail } from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/landing/Navbar";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { ReportDocument } from "@/components/report/ReportDocument";
import { generateReport, type LeadInput, type NumerologyReport } from "@/lib/numerology";
import { exportJpg, exportPdf, safeFileName } from "@/lib/report-export";
import { LEAD_STORAGE_KEY } from "@/lib/lead-storage";

const title = "Your Personalized Numerology Report | Numerology Insights";
const description =
  "View your complete personalized numerology report instantly — life path, expression, soul urge, career, relationships and your personal year forecast.";

export const Route = createFileRoute("/report")({
  component: ReportPage,
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "robots", content: "noindex" },
    ],
  }),
});

function ReportPage() {
  const [report, setReport] = useState<NumerologyReport | null>(null);
  const [ready, setReady] = useState(false);
  const [busy, setBusy] = useState<"pdf" | "jpg" | null>(null);
  const docRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(LEAD_STORAGE_KEY);
      if (raw) {
        const lead = JSON.parse(raw) as LeadInput;
        if (lead?.fullName && lead?.dob) setReport(generateReport(lead));
      }
    } catch {
      /* ignore malformed storage */
    }
    setReady(true);
  }, []);

  async function handleExport(kind: "pdf" | "jpg") {
    const node = docRef.current;
    if (!node || !report) return;
    setBusy(kind);
    try {
      const base = safeFileName(report.input.fullName);
      if (kind === "pdf") await exportPdf(node, base);
      else await exportJpg(node, base);
      toast.success(`${kind.toUpperCase()} downloaded`);
    } catch (error) {
      console.error(error);
      toast.error("Export failed. Please try again.");
    } finally {
      setBusy(null);
    }
  }

  if (!ready) {
    return (
      <div className="grid min-h-dvh place-items-center bg-background">
        <Loader2 className="h-6 w-6 animate-spin text-primary" aria-hidden="true" />
      </div>
    );
  }

  if (!report) {
    return (
      <div className="min-h-dvh">
        <Navbar />
        <main className="mx-auto grid max-w-xl gap-4 px-4 py-24 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">No report found</h1>
          <p className="text-sm text-muted-foreground">
            Fill in the short form on the home page and your personalized report will appear here
            instantly.
          </p>
          <div className="mt-2 flex justify-center">
            <Button asChild variant="hero" size="lg">
              <Link to="/">
                <ArrowLeft aria-hidden="true" />
                Generate my free report
              </Link>
            </Button>
          </div>
        </main>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="min-h-dvh">
      <div className="print:hidden">
        <Navbar />
      </div>

      <main className="mx-auto max-w-5xl px-4 pb-16 pt-24 sm:px-6 print:pt-0">
        <div className="glass-panel mb-6 flex flex-col gap-4 p-4 sm:p-5 print:hidden">
          <div className="flex flex-col gap-1">
            <h1 className="text-lg font-semibold tracking-tight sm:text-xl">
              Your report is ready, {report.input.fullName.split(" ")[0]}
            </h1>
            <p className="text-sm text-muted-foreground">
              Read it below, or save a copy. A copy is also on its way to your email and WhatsApp.
            </p>
          </div>
          <div className="grid gap-2 sm:grid-cols-3">
            <Button variant="hero" onClick={() => handleExport("pdf")} disabled={busy !== null}>
              {busy === "pdf" ? (
                <Loader2 className="animate-spin" aria-hidden="true" />
              ) : (
                <FileText aria-hidden="true" />
              )}
              Download as PDF
            </Button>
            <Button variant="glass" onClick={() => handleExport("jpg")} disabled={busy !== null}>
              {busy === "jpg" ? (
                <Loader2 className="animate-spin" aria-hidden="true" />
              ) : (
                <Download aria-hidden="true" />
              )}
              Download as JPG
            </Button>
            <Button variant="glass" onClick={() => window.print()} disabled={busy !== null}>
              <Printer aria-hidden="true" />
              Print Report
            </Button>
          </div>
          <p className="flex items-center gap-2 text-xs text-muted-foreground">
            <Mail className="h-3.5 w-3.5" aria-hidden="true" />
            Optional: we also deliver this report to {report.input.email}.
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-border print:border-0">
          <ReportDocument ref={docRef} report={report} />
        </div>

        <div className="mt-6 flex justify-center print:hidden">
          <Button asChild variant="ghost">
            <Link to="/">
              <ArrowLeft aria-hidden="true" />
              Back to home
            </Link>
          </Button>
        </div>
      </main>

      <div className="print:hidden">
        <SiteFooter />
      </div>
      <Toaster position="top-center" />
    </div>
  );
}
