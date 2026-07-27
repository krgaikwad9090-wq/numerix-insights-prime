import type { ReactNode } from "react";
import { Navbar } from "@/components/landing/Navbar";
import { SiteFooter } from "@/components/landing/SiteFooter";

interface LegalPageProps {
  title: string;
  updated: string;
  intro: string;
  sections: Array<{ heading: string; body: string[] }>;
  children?: ReactNode;
}

export function LegalPage({ title, updated, intro, sections }: LegalPageProps) {
  return (
    <div className="min-h-dvh">
      <Navbar />
      <main className="mesh-bg pt-28 pb-20 md:pt-36">
        <article className="mx-auto max-w-3xl px-4 sm:px-6">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h1>
          <p className="mt-3 text-sm text-muted-foreground">Last updated {updated}</p>
          <p className="text-body mt-6 leading-relaxed">{intro}</p>

          {sections.map((section) => (
            <section key={section.heading} className="mt-10">
              <h2 className="text-xl font-semibold tracking-tight">{section.heading}</h2>
              {section.body.map((paragraph) => (
                <p key={paragraph} className="text-body mt-3 text-sm leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}
