import { NextRequest, NextResponse } from "next/server";

const prefixes: Record<string, string> = {
  "013": "Grameenphone", "017": "Grameenphone",
  "014": "Banglalink", "019": "Banglalink",
  "016": "Airtel", "018": "Robi", "015": "Teletalk",
};

function findString(value: unknown, keys: string[], depth = 0): string | null {
  if (!value || typeof value !== "object" || depth > 5) return null;
  const obj = value as Record<string, unknown>;
  for (const key of keys) {
    const v = obj[key];
    if (typeof v === "string" && v.trim()) return v.trim();
  }
  for (const v of Object.values(obj)) {
    const found = findString(v, keys, depth + 1);
    if (found) return found;
  }
  return null;
}

export async function GET(req: NextRequest) {
  const number = (req.nextUrl.searchParams.get("number") || "").replace(/\D/g, "");
  if (!/^01\d{9}$/.test(number)) {
    return NextResponse.json(
      { success: false, error: "Enter a valid 11-digit Bangladesh mobile number." },
      { status: 400 }
    );
  }

  try {
    // Proxy the public API from the server to avoid browser CORS restrictions.
    const upstream = await fetch(
      `https://number-info-bd.vercel.app/api/lookup?number=${encodeURIComponent(number)}`,
      { headers: { Accept: "application/json" }, cache: "no-store", signal: AbortSignal.timeout(12000) }
    );

    const payload: unknown = await upstream.json().catch(() => null);
    if (!upstream.ok || !payload || typeof payload !== "object") {
      const message = findString(payload, ["error", "message"]) || "The number lookup service is temporarily unavailable.";
      return NextResponse.json({ success: false, error: message }, { status: upstream.status || 502 });
    }

    const data = payload as Record<string, unknown>;
    if (data.success === false) {
      return NextResponse.json(
        { success: false, error: findString(payload, ["error", "message"]) || "No lookup result found." },
        { status: 404 }
      );
    }

    const prefix = number.slice(0, 3);
    const carrier = findString(payload, ["carrier", "operator", "operator_name", "network", "provider"]) || prefixes[prefix] || "Unknown";
    const name = findString(payload, ["name", "full_name", "subscriber_name", "owner_name", "caller_name"]);
    const carrierCode = findString(payload, ["carrier_code", "operator_code", "prefix"]) || prefix;
    const location = findString(payload, ["location", "region", "country"]) || "Bangladesh";
    const type = findString(payload, ["type", "number_type"]) || "Mobile";
    const internationalFormat = findString(payload, ["international_format", "international", "international_number"]) || `+88${number}`;

    return NextResponse.json({
      success: true,
      number,
      name,
      carrier,
      carrier_code: carrierCode,
      location,
      type,
      international_format: internationalFormat,
      source: "number-info-bd.vercel.app",
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Could not connect to the lookup API. Please try again." },
      { status: 502 }
    );
  }
}
