// src/app/api/about/route.ts
import { NextResponse } from "next/server";
import { aboutData } from "@/data/about";

export async function GET() {
  return NextResponse.json(aboutData);
}
