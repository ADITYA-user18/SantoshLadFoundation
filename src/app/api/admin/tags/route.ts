import { NextRequest, NextResponse } from "next/server";
import { getAllTags } from "@/lib/cms";

export async function GET(_req: NextRequest) {
  const tags = await getAllTags();
  return NextResponse.json({ tags });
}
