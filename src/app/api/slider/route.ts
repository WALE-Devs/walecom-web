// src/app/api/about/route.ts
import { NextResponse } from "next/server";
import { sliderData } from "@/data/slider";

export async function GET() {
  return NextResponse.json(sliderData);
}
