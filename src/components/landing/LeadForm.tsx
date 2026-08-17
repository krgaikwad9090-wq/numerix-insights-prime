import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Loader2, ShieldCheck, Lock, BadgeCheck, MailCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const reasons = [
  "Career",
  "Relationship",
  "Business",
  "Self Discovery",
  "Life Purpose",
  "Personal Growth",
  "Other",
] as const;

const leadSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, { message: "Please enter your full name" })
    .max(100, { message: "Name must be under 100 characters" }),
  mobile: z
    .string()
    .trim()
    .min(8, { message: "Enter a valid mobile number" })
    .max(20, { message: "Enter a valid mobile number" })
    .regex(/^[+0-9][0-9\s-]{7,19}$/, { message: "Enter a valid mobile number" }),
  email: z
    .string()
    .trim()
    .email({ message: "Enter a valid email address" })
    .max(255, { message: "Email must be under 255 characters" }),
  dob: z.string().min(1, { message: "Select your date of birth" }),
  reason: z.string().min(1, { message: "Select a reason for consultation" }),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Please accept to receive your free report" }),
  }),
});

type FieldErrors = Partial<Record<keyof z.infer<typeof leadSchema>, string>>;

const trustPoints = [
  { icon: BadgeCheck, label: "100% Free" },
  { icon: MailCheck, label: "No Spam" },
  { icon: Lock, label: "Secure" },
  { icon: ShieldCheck, label: "Private" },
];

export function LeadForm() {
  const [reason, setReason] = useState("");
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const parsed = leadSchema.safeParse({
      fullName: String(data.get("fullName") ?? ""),
      mobile: String(data.get("mobile") ?? ""),
      email: String(data.get("email") ?? ""),
      dob: String(data.get("dob") ?? ""),
      reason,
      consent,
    });

    if (!parsed.success) {
      const next: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof FieldErrors;
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      toast.error("Please check the highlighted fields.");
      return;
    }

    setErrors({});
    setSubmitting(true);
    try {
      sessionStorage.setItem(LEAD_STORAGE_KEY, JSON.stringify(parsed.data));
    } catch {
      /* storage unavailable */
    }
    await new Promise((resolve) => setTimeout(resolve, 700));
    setSubmitting(false);
    toast.success("Your report is ready", {
      description: "Opening your personalized numerology report. A copy is also sent to your email.",
    });
    navigate({ to: "/report" });
  }

  const fieldClass =
    "h-11 rounded-lg border-border bg-surface/70 text-foreground placeholder:text-muted-foreground focus-visible:ring-ring";

  return (
    <div id="lead-form" className="glass-panel scroll-mt-24 p-5 sm:p-7">
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
          Get Your FREE Numerology Report
        </h2>
        <p className="text-sm text-muted-foreground">
          Takes under 60 seconds. Delivered to your inbox and WhatsApp.
        </p>
      </div>

      <form className="mt-6 grid gap-4" onSubmit={handleSubmit} noValidate>
        <div className="grid gap-2">
          <Label htmlFor="fullName">Full Name *</Label>
          <Input
            id="fullName"
            name="fullName"
            autoComplete="name"
            maxLength={100}
            placeholder="Aarav Sharma"
            className={fieldClass}
            aria-invalid={Boolean(errors.fullName)}
            aria-describedby={errors.fullName ? "fullName-error" : undefined}
          />
          {errors.fullName ? (
            <p id="fullName-error" className="text-xs text-destructive">
              {errors.fullName}
            </p>
          ) : null}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="mobile">Mobile Number *</Label>
            <Input
              id="mobile"
              name="mobile"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              maxLength={20}
              placeholder="+91 98765 43210"
              className={fieldClass}
              aria-invalid={Boolean(errors.mobile)}
              aria-describedby={errors.mobile ? "mobile-error" : undefined}
            />
            {errors.mobile ? (
              <p id="mobile-error" className="text-xs text-destructive">
                {errors.mobile}
              </p>
            ) : null}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              maxLength={255}
              placeholder="you@email.com"
              className={fieldClass}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {errors.email ? (
              <p id="email-error" className="text-xs text-destructive">
                {errors.email}
              </p>
            ) : null}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="dob">Date of Birth *</Label>
            <Input
              id="dob"
              name="dob"
              type="date"
              max="2026-12-31"
              className={`${fieldClass} [color-scheme:dark]`}
              aria-invalid={Boolean(errors.dob)}
              aria-describedby={errors.dob ? "dob-error" : undefined}
            />
            {errors.dob ? (
              <p id="dob-error" className="text-xs text-destructive">
                {errors.dob}
              </p>
            ) : null}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="reason">Reason For Consultation</Label>
            <Select value={reason} onValueChange={setReason}>
              <SelectTrigger
                id="reason"
                className={`${fieldClass} w-full`}
                aria-describedby={errors.reason ? "reason-error" : undefined}
              >
                <SelectValue placeholder="Choose a focus area" />
              </SelectTrigger>
              <SelectContent className="rounded-lg border-border bg-popover">
                {reasons.map((item) => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.reason ? (
              <p id="reason-error" className="text-xs text-destructive">
                {errors.reason}
              </p>
            ) : null}
          </div>
        </div>

        <div className="flex items-start gap-3 rounded-lg border border-border bg-surface/50 p-3">
          <Checkbox
            id="consent"
            checked={consent}
            onCheckedChange={(value) => setConsent(value === true)}
            className="mt-0.5"
            aria-describedby={errors.consent ? "consent-error" : undefined}
          />
          <div className="grid gap-1">
            <Label htmlFor="consent" className="text-sm leading-relaxed font-normal">
              I agree to receive my FREE report via Email and WhatsApp.
            </Label>
            {errors.consent ? (
              <p id="consent-error" className="text-xs text-destructive">
                {errors.consent}
              </p>
            ) : null}
          </div>
        </div>

        <Button type="submit" variant="hero" size="xl" className="w-full" disabled={submitting}>
          {submitting ? <Loader2 className="animate-spin" aria-hidden="true" /> : null}
          {submitting ? "Generating your report..." : "Generate My FREE Report"}
        </Button>

        <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 pt-1">
          {trustPoints.map(({ icon: Icon, label }) => (
            <li key={label} className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Icon className="h-3.5 w-3.5 text-success" aria-hidden="true" />
              {label}
            </li>
          ))}
        </ul>
      </form>
    </div>
  );
}
