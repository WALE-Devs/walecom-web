import { NextResponse } from "next/server";
import { contactData } from "@/data/contact";

export async function GET() {
  return NextResponse.json(contactData);
}
