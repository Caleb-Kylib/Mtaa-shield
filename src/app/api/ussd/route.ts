import { NextRequest, NextResponse } from "next/server";
import { buildUssdResponse, type USSDPayload } from "@/lib/ussd";

async function readPayload(request: NextRequest): Promise<USSDPayload> {
  const contentType = request.headers.get("content-type") || "";

  if (contentType.includes("application/x-www-form-urlencoded")) {
    const formData = await request.formData();
    const entries = Array.from(formData.entries());
    return Object.fromEntries(entries.map(([key, value]) => [key, value.toString()])) as USSDPayload;
  }

  try {
    return (await request.json()) as USSDPayload;
  } catch {
    return {};
  }
}

export async function POST(request: NextRequest) {
  const payload = await readPayload(request);
  const responseText = buildUssdResponse(payload);

  return new NextResponse(responseText, {
    status: 200,
    headers: {
      "content-type": "text/plain; charset=utf-8",
    },
  });
}

export async function GET() {
  return NextResponse.json({
    message: "Mtaa Shield USSD callback is ready",
    status: "ok",
  });
}
