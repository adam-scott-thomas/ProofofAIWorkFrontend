export const BOT_UA =
  /bot|crawl|spider|slurp|facebookexternalhit|Facebot|Twitterbot|LinkedInBot|Discordbot|WhatsApp|Telegram|Slack|iMessage|Applebot|Google-InspectionTool|Googlebot|bingbot|yandex|Pinterestbot|Embedly|Quora Link Preview|Showyou|outbrain|pinterest|vkShare|W3C_Validator/i;

export const API_BASE = "https://api.proofofaiwork.com/api/v1";
export const SITE_BASE = "https://proofofaiwork.com";

export interface Env {
  ASSETS: { fetch: (req: Request) => Promise<Response> };
}

export function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export function isBot(request: Request) {
  return BOT_UA.test(request.headers.get("user-agent") || "");
}

export function htmlMetaPage({
  title,
  description,
  pageUrl,
  imageUrl,
  type = "website",
  siteName = "Proof of AI Work",
  cta = "Open on Proof of AI Work",
}: {
  title: string;
  description: string;
  pageUrl: string;
  imageUrl?: string;
  type?: string;
  siteName?: string;
  cta?: string;
}) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}" />
  <meta property="og:type" content="${esc(type)}" />
  <meta property="og:title" content="${esc(title)}" />
  <meta property="og:description" content="${esc(description)}" />
  <meta property="og:url" content="${esc(pageUrl)}" />
  <meta property="og:site_name" content="${esc(siteName)}" />
  ${imageUrl ? `<meta property="og:image" content="${esc(imageUrl)}" />` : ""}
  ${imageUrl ? `<meta property="og:image:width" content="1200" />` : ""}
  ${imageUrl ? `<meta property="og:image:height" content="630" />` : ""}
  <meta name="twitter:card" content="${imageUrl ? "summary_large_image" : "summary"}" />
  <meta name="twitter:title" content="${esc(title)}" />
  <meta name="twitter:description" content="${esc(description)}" />
  ${imageUrl ? `<meta name="twitter:image" content="${esc(imageUrl)}" />` : ""}
  <meta http-equiv="refresh" content="0;url=${esc(pageUrl)}" />
</head>
<body>
  <h1>${esc(title)}</h1>
  <p>${esc(description)}</p>
  <p><a href="${esc(pageUrl)}">${esc(cta)}</a></p>
</body>
</html>`;
}
