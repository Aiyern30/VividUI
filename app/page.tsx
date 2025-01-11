"use client";

import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism"; // Choose your theme

export default function CustomizeButtonPage() {
  const [text, setText] = useState("Click Me");
  const [variant, setVariant] = useState<
    "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  >("default");
  const [size, setSize] = useState<"default" | "sm" | "lg" | "icon">("default");
  const [customClass, setCustomClass] = useState("");
  const [buttonCode, setButtonCode] = useState<string>("");
  const [variantStyles, setVariantStyles] = useState<
    { name: string; styles: string }[]
  >([]);
  const [sizeStyles, setSizeStyles] = useState<
    { name: string; styles: string }[]
  >([]);
  const { toast } = useToast();
  console.log("variantStyles", variantStyles);
  console.log("sizeStyles", sizeStyles);

  useEffect(() => {
    const fetchButtonCode = async () => {
      try {
        const response = await fetch("/api/button-code");
        if (response.ok) {
          const data = await response.json();

          const variantRegex = /variant:\s*\{\s*([\s\S]*?)\s*\},/m;
          const sizeRegex = /size:\s*\{\s*([\s\S]*?)\s*\},/m;

          const extractedVariants: { name: string; styles: string }[] = [];
          const extractedSizes: { name: string; styles: string }[] = [];

          // Parse `variant` styles
          const variantMatch = variantRegex.exec(data.code);
          if (variantMatch) {
            const variantContent = variantMatch[1];
            const styleRegex = /(\w+):\s*"(.*?)"/g;
            let match;
            while ((match = styleRegex.exec(variantContent))) {
              extractedVariants.push({
                name: match[1],
                styles: match[2],
              });
            }
          }

          // Parse `size` styles
          const sizeMatch = sizeRegex.exec(data.code);
          if (sizeMatch) {
            const sizeContent = sizeMatch[1];
            const styleRegex = /(\w+):\s*"(.*?)"/g;
            let match;
            while ((match = styleRegex.exec(sizeContent))) {
              extractedSizes.push({
                name: match[1],
                styles: match[2],
              });
            }
          }

          setVariantStyles(extractedVariants);
          setSizeStyles(extractedSizes);
          setButtonCode(data.code);
        } else {
          console.error("Failed to fetch button code");
        }
      } catch (error) {
        console.error("Error fetching button code", error);
      }
    };

    fetchButtonCode();
  }, []);

  const handleCopyCode = () => {
    navigator.clipboard
      .writeText(buttonCode)
      .then(() => {
        toast({
          title: "Copied!",
          description: "The button code has been copied to your clipboard.",
          variant: "default",
        });
      })
      .catch((error) => {
        console.error("Failed to copy code: ", error);
        toast({
          title: "Error!",
          description: "Failed to copy the button code. Please try again.",
          variant: "destructive",
        });
      });
  };

  return (
    <div className="flex items-stretch max-h-screen">
      {/* Left Panel: Customization */}
      <div className="flex flex-col items-center justify-start space-y-6 w-1/4 p-6 bg-gray-100">
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
      <div className="flex flex-col space-y-4 w-3/4 p-6 bg-gray-800 text-white overflow-auto min-h-screen">
        <h2 className="text-xl font-bold">Generated Button.tsx Code</h2>
        <div className="bg-gray-700 p-4 rounded-md w-full custom-scroll">
          <SyntaxHighlighter language="jsx" style={oneDark}>
            {buttonCode || "// Code will appear here after fetching"}
          </SyntaxHighlighter>
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
