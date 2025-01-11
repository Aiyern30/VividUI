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

  const generateCode = () => {
    return `<Button variant="${variant}" size="${size}" className="${cn(
      customClass
    )}">${text}</Button>`;
  };

  const handleCopyCode = () => {
    const code = generateCode();
    navigator.clipboard.writeText(code).then(() => {
      alert("Code copied to clipboard!");
    });
  };

  return (
    <div className="flex items-stretch h-screen">
      {/* Left Panel: Customization */}
      <div className="flex flex-col items-center justify-start space-y-6 w-80 p-6 bg-gray-100">
        <h1 className="text-2xl font-bold">Customize Your Button</h1>

        {/* Customization Options */}
        <div className="space-y-4 w-full">
          {/* Button Text */}
          <div>
            <label className="block mb-2">Button Text</label>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="border px-3 py-2 rounded w-full"
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
              className="border px-3 py-2 rounded w-full"
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
              className="border px-3 py-2 rounded w-full"
            >
              <option value="default">Default</option>
              <option value="sm">Small</option>
              <option value="lg">Large</option>
              <option value="icon">Icon</option>
            </select>
          </div>

          {/* Custom Class for Additional Styling */}
          <div>
            <label className="block mb-2">
              Custom Styles (Tailwind Classes)
            </label>
            <input
              type="text"
              value={customClass}
              onChange={(e) => setCustomClass(e.target.value)}
              placeholder="e.g., text-white bg-blue-500"
              className="border px-3 py-2 rounded w-full"
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

      {/* Right Panel: Code Preview */}
      <div className="flex flex-col space-y-4 w-80 p-6 bg-gray-800 text-white">
        <h2 className="text-xl font-bold">Generated Code</h2>
        <div className="bg-gray-700 p-4 rounded-md w-full">
          <pre className="overflow-x-auto text-sm">{generateCode()}</pre>
        </div>

        <button
          onClick={handleCopyCode}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Copy Code
        </button>
      </div>
    </div>
  );
}
