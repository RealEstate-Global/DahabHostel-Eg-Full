import { NextResponse } from "next/server";
import { site } from "@/app/_data";

export const dynamic = "force-static";

export function GET() {
  return NextResponse.json({
    email: site.email,
    phone: site.phone,
    address: site.address,
  });
}
