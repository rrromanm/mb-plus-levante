import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

const VALID_TAGS = ["cars", "featured-cars"] as const;
type ValidTag = (typeof VALID_TAGS)[number];

function isValidTag(tag: unknown): tag is ValidTag {
  return typeof tag === "string" && (VALID_TAGS as readonly string[]).includes(tag);
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const tags = body?.tags;

  if (!Array.isArray(tags) || tags.length === 0 || !tags.every(isValidTag)) {
    return NextResponse.json(
      { error: `tags must be a non-empty array of: ${VALID_TAGS.join(", ")}` },
      { status: 400 },
    );
  }

  tags.forEach((tag) => revalidateTag(tag));

  return NextResponse.json({ revalidated: true, tags });
}
