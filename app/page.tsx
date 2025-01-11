"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);

  const handleSelect = (variant: string) => {
    setSelectedVariant(variant);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-6">
      {/* Selection Buttons */}
      <div className="flex space-x-4">
        <Button variant="default" onClick={() => handleSelect("default")}>
          Default
        </Button>
        <Button variant="outline" onClick={() => handleSelect("outline")}>
          Outline
        </Button>
        <Button
          variant="destructive"
          onClick={() => handleSelect("destructive")}
        >
          Destructive
        </Button>
      </div>

      {/* Display Selected Component */}
      <div className="mt-8">
        {selectedVariant && (
          <div>
            <p className="mb-4 text-center">
              You selected: <strong>{selectedVariant}</strong>
            </p>
            <Button
              variant={selectedVariant as "default" | "outline" | "destructive"}
            >
              {selectedVariant.charAt(0).toUpperCase() +
                selectedVariant.slice(1)}{" "}
              Button
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
