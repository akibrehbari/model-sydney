import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const BLOCKED_AGENTS = [
  "facebookexternalhit",
  "facebot",
  "twitterbot",
  "linkedinbot",
  "instagram",
  "pinterest",
  "slackbot",
  "telegrambot",
  "whatsapp",
  "googlebot",
  "bingbot",
  "yandexbot",
  "duckduckbot",
  "baiduspider",
  "ahrefsbot",
  "semrushbot",
  "mj12bot",
  "dotbot",
  "rogerbot",
  "scrapy",
  "curl",
  "wget",
  "python-requests",
  "axios",
  "go-http-client",
  "java/",
  "libwww-perl",
];

export function middleware(request: NextRequest) {
  const ua = request.headers.get("user-agent")?.toLowerCase() ?? "";

  if (BLOCKED_AGENTS.some((bot) => ua.includes(bot))) {
    // Serve a blank page — no links, no content
    return new NextResponse(
      `<!DOCTYPE html><html><head><title>Sydney</title></head><body></body></html>`,
      { headers: { "content-type": "text/html" } }
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/",
};
