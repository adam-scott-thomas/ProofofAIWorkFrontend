import { API_BASE, Env, SITE_BASE, htmlMetaPage, isBot } from "../_lib/meta";

export const onRequest: PagesFunction<Env> = async (context) => {
  if (!isBot(context.request)) {
    return context.env.ASSETS.fetch(context.request);
  }

  const slug = context.params.slug as string;
  if (!slug) return context.env.ASSETS.fetch(context.request);

  try {
    const res = await fetch(`${API_BASE}/u/${slug}`, {
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) return context.env.ASSETS.fetch(context.request);

    const data: any = await res.json();
    const title = `${data.title || "Verified AI Portfolio"} | Verified AI Portfolio`;
    const description =
      data.summary ||
      data.headline ||
      `Public portfolio of AI-assisted work, proof pages, and evidence-backed projects from ${data.title || "this builder"}.`;
    const pageUrl = `${SITE_BASE}/u/${slug}`;

    return new Response(
      htmlMetaPage({
        title,
        description,
        pageUrl,
        type: "profile",
        cta: "Open portfolio on Proof of AI Work",
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "text/html; charset=utf-8",
          "Cache-Control": "public, max-age=300",
        },
      },
    );
  } catch {
    return context.env.ASSETS.fetch(context.request);
  }
};
