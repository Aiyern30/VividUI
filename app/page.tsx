"use client";

import { useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button"; // ShadCN Button
import { cn } from "@/lib/utils";

export default function CustomizeButtonPage() {
  const [text, setText] = useState("Click Me");
  const [variant, setVariant] = useState<
    "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  >("default");
  const [size, setSize] = useState<"default" | "sm" | "lg" | "icon">("default");
  const [customClass, setCustomClass] = useState("");

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-6">
      <h1 className="text-2xl font-bold">Customize Your Button</h1>

      {/* Customization Options */}
      <div className="space-y-4">
        {/* Button Text */}
        <div>
          <label className="block mb-2">Button Text</label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="border px-3 py-2 rounded w-64"
          />
        </div>

        {/* Button Variant */}
        <div>
          <label className="block mb-2">Variant</label>
          <select
            value={variant}
            onChange={(e) =>
              setVariant(
                e.target.value as
                  | "default"
                  | "destructive"
                  | "outline"
                  | "secondary"
                  | "ghost"
                  | "link"
              )
            }
            className="border px-3 py-2 rounded w-64"
          >
            <option value="default">Default</option>
            <option value="destructive">Destructive</option>
            <option value="outline">Outline</option>
            <option value="secondary">Secondary</option>
            <option value="ghost">Ghost</option>
            <option value="link">Link</option>
          </select>
        </div>

        {/* Button Size */}
        <div>
          <label className="block mb-2">Size</label>
          <select
            value={size}
            onChange={(e) =>
              setSize(e.target.value as "default" | "sm" | "lg" | "icon")
            }
            className="border px-3 py-2 rounded w-64"
          >
            <option value="default">Default</option>
            <option value="sm">Small</option>
            <option value="lg">Large</option>
            <option value="icon">Icon</option>
          </select>
        </div>

        {/* Custom Class for Additional Styling */}
        <div>
          <label className="block mb-2">Custom Styles (Tailwind Classes)</label>
          <input
            type="text"
            value={customClass}
            onChange={(e) => setCustomClass(e.target.value)}
            placeholder="e.g., text-white bg-blue-500"
            className="border px-3 py-2 rounded w-64"
          />
        </div>
      </div>

      {/* Preview Button */}
      <div className="mt-8">
        <Button
          variant={variant}
          size={size}
          className={cn(customClass)} // Apply custom classes
        >
          {text}
        </Button>
      </div>
    </div>
  );
}
