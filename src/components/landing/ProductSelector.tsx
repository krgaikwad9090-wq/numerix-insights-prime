import { useState } from "react";
import { cn } from "@/lib/utils";

export function ProductSelector() {
  const [product, setProduct] = useState<"numerology" | "vedic-astrology">("vedic-astrology");

  return (
    <div className="border-b border-border px-4 py-3 sm:px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        <button
          onClick={() => setProduct("vedic-astrology")}
          className={cn(
            "flex items-center justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
            product === "vedic-astrology" && "bg-primary/20"
          )}
        >
          Vedic Astrology
        </button>
        <button
          onClick={() => setProduct("numerology")}
          className={cn(
            "flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
            product === "numerology" && "bg-accent/20"
          )}
        >
          Numerology
        </button>
      </div>
    </div>
  );
}