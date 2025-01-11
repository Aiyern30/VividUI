// app/api/button-code/route.ts
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// This handles GET requests to this route
export async function GET() {
  const filePath = path.join(process.cwd(), "components/ui/button.tsx");

  try {
    const fileContent = fs.readFileSync(filePath, "utf-8");
    return NextResponse.json({ code: fileContent });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to read file content" },
      { status: 500 }
    );
  }
}
