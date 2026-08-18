import { useState } from "react";
import { cn } from "@/lib/utils";

const products = [
  { id: "vedic-astrology", label: "Vedic Astrology" },
  { id: "numerology", label: "Numerology" },
] as const;

type ProductId = (typeof products)[number]["id"];

export function ProductSelector() {
  const [product, setProduct] = useState<ProductId>("vedic-astrology");

  return (
    <div className="border-b border-border px-4 py-3 sm:px-6">
      <div className="mx-auto flex max-w-7xl justify-center">
        <div
          role="tablist"
          aria-label="Choose a reading type"
          className="inline-flex items-center gap-1 rounded-lg border border-border bg-muted/50 p-1"
        >
          {products.map((item) => {
            const isActive = product === item.id;
            return (
              <button
                key={item.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setProduct(item.id)}
                className={cn(
                  "rounded-md px-5 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-transparent text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
