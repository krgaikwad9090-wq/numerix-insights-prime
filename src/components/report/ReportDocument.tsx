import { forwardRef } from "react";
import type { NumerologyReport } from "@/lib/numerology";

function NumberTile({ label, value, caption }: { label: string; value: number; caption: string }) {
  return (
    <div className="rounded-xl border border-border bg-surface/60 p-4">
      <p className="text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="mt-1 text-3xl font-semibold text-primary">{value}</p>
      <p className="mt-1 text-xs text-muted-foreground">{caption}</p>
    </div>
  );
}

function Block({
  title,
  eyebrow,
  children,
}: {
  title: string;
  eyebrow?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-border bg-surface/40 p-5 sm:p-7">
      {eyebrow ? (
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">{eyebrow}</p>
      ) : null}
      <h2 className="mt-1 text-lg font-semibold tracking-tight sm:text-xl">{title}</h2>
      <div className="mt-3 grid gap-3 text-sm leading-relaxed text-muted-foreground">{children}</div>
    </section>
  );
}

export const ReportDocument = forwardRef<HTMLDivElement, { report: NumerologyReport }>(
  function ReportDocument({ report }, ref) {
    const { input, numbers, core, expression, soul, persona, personalYear, lucky } = report;
    const dob = new Date(`${input.dob}T00:00:00`).toLocaleDateString(undefined, {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    const generated = new Date(report.generatedAt).toLocaleDateString(undefined, {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    return (
      <div
        ref={ref}
        id="report-document"
        className="mx-auto w-full max-w-3xl bg-background p-5 text-foreground sm:p-8"
      >
        <header className="rounded-2xl border border-border bg-surface/60 p-5 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="text-sm font-semibold tracking-tight">Numerology Insights</span>
            <span className="text-xs text-muted-foreground">Generated {generated}</span>
          </div>
          <h1 className="mt-4 text-2xl font-semibold tracking-tight sm:text-4xl">
            {input.fullName}&apos;s Personalized Numerology Report
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Born {dob} · Focus area: {input.reason}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{report.summary}</p>
        </header>

        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
          <NumberTile label="Life Path" value={numbers.lifePath} caption={core.title} />
          <NumberTile label="Expression" value={numbers.expression} caption={expression.title} />
          <NumberTile label="Soul Urge" value={numbers.soulUrge} caption={soul.title} />
          <NumberTile label="Personality" value={numbers.personality} caption={persona.title} />
          <NumberTile label="Birthday" value={numbers.birthday} caption="Natural talent" />
          <NumberTile
            label={`Personal Year ${report.year}`}
            value={numbers.personalYear}
            caption={personalYear.theme}
          />
        </div>

        <div className="mt-5 grid gap-5">
          <Block eyebrow="Core blueprint" title={`Life Path ${numbers.lifePath} — ${core.title}`}>
            <p>{core.essence}</p>
            <ul className="grid gap-1.5 sm:grid-cols-2">
              {core.strengths.map((s) => (
                <li key={s} className="text-foreground/90">
                  • {s}
                </li>
              ))}
            </ul>
            <p>
              <span className="font-medium text-foreground">Watch out: </span>
              {core.watchOut}
            </p>
          </Block>

          <Block
            eyebrow="How others experience you"
            title={`Personality ${numbers.personality} — ${persona.title}`}
          >
            <p>{persona.essence}</p>
            <p>
              <span className="font-medium text-foreground">Inner motivation (Soul Urge{" "}
              {numbers.soulUrge}): </span>
              {soul.essence}
            </p>
          </Block>

          <Block eyebrow="Career direction" title={`Expression ${numbers.expression} — ${expression.title}`}>
            <p>{expression.essence}</p>
            <ul className="grid gap-1.5 sm:grid-cols-2">
              {expression.careers.map((c) => (
                <li key={c} className="text-foreground/90">
                  • {c}
                </li>
              ))}
            </ul>
          </Block>

          <Block eyebrow="Relationships" title="Compatibility & communication">
            <p>{core.relationship}</p>
            <p>{soul.relationship}</p>
          </Block>

          <Block
            eyebrow={`Forecast for ${report.year}`}
            title={`Personal Year ${numbers.personalYear} — ${personalYear.theme}`}
          >
            <p>{personalYear.focus}</p>
            <ul className="grid gap-1.5 sm:grid-cols-3">
              {personalYear.months.map((m) => (
                <li key={m} className="rounded-lg border border-border bg-surface/50 p-3 text-foreground/90">
                  {m}
                </li>
              ))}
            </ul>
          </Block>

          <Block eyebrow="Favourable influences" title="Lucky numbers, days and colours">
            <div className="grid gap-3 sm:grid-cols-3">
              <p>
                <span className="font-medium text-foreground">Numbers: </span>
                {lucky.numbers.join(", ")}
              </p>
              <p>
                <span className="font-medium text-foreground">Days: </span>
                {lucky.days}
              </p>
              <p>
                <span className="font-medium text-foreground">Colours: </span>
                {lucky.colours}
              </p>
            </div>
          </Block>

          <Block eyebrow={`Because you chose ${input.reason}`} title="Your focused guidance">
            <p>{report.focus}</p>
            <p>
              <span className="font-medium text-foreground">
                Maturity number {numbers.maturity} —{" "}
              </span>
              {report.maturityTrait.essence}
            </p>
          </Block>

          <Block eyebrow="Next steps" title="Three growth actions for this cycle">
            <ol className="grid gap-2">
              {report.actions.map((a, i) => (
                <li key={a} className="flex gap-3 text-foreground/90">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-primary/15 text-xs font-semibold text-primary">
                    {i + 1}
                  </span>
                  <span>{a}</span>
                </li>
              ))}
            </ol>
          </Block>
        </div>

        <footer className="mt-6 rounded-2xl border border-border bg-surface/40 p-5 text-xs leading-relaxed text-muted-foreground">
          <p>
            Prepared for {input.fullName} · {input.email}
          </p>
          <p className="mt-1">
            Numerology Insights · This report is offered for reflection and personal growth, not as
            medical, legal or financial advice.
          </p>
        </footer>
      </div>
    );
  },
);
