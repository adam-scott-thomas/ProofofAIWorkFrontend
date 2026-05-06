import { siteMetadata } from "./constants";

type SeoInput = {
  title?: string;
  description?: string;
  path?: string;
};

function upsertMeta(name: string, content: string, property = false) {
  const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(property ? "property" : "name", name);
    document.head.appendChild(element);
  }
  element.content = content;
}

function upsertCanonical(href: string) {
  let element = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!element) {
    element = document.createElement("link");
    element.rel = "canonical";
    document.head.appendChild(element);
  }
  element.href = href;
}

export function setSeo({ title, description, path = "" }: SeoInput) {
  const pageTitle = title ? `${title} | ProofOfAIWork` : siteMetadata.title;
  const pageDescription = description ?? siteMetadata.description;
  const canonical = `${siteMetadata.canonical}${path}`;

  document.title = pageTitle;
  upsertMeta("description", pageDescription);
  upsertMeta("og:title", pageTitle, true);
  upsertMeta("og:description", pageDescription, true);
  upsertMeta("og:type", "website", true);
  upsertMeta("og:url", canonical, true);
  upsertMeta("twitter:card", "summary_large_image");
  upsertMeta("twitter:title", pageTitle);
  upsertMeta("twitter:description", pageDescription);
  upsertCanonical(canonical);
}
