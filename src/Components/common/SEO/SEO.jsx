import { useEffect } from "react";

const DEFAULT_TITLE = "Aimpluss Gems — Premium Certified Loose Gemstones";
const DEFAULT_DESCRIPTION = "Discover natural earth-mined precious and semi-precious loose gemstones, certified Sapphires, Rubies & Emeralds from Bangkok & Sri Lanka since 2004.";
const DEFAULT_KEYWORDS = "gemstones, certified gemstones, loose gems, sapphires, rubies, emeralds, bangkok gemstones, natural gems, aimpluss gems";
const DEFAULT_IMAGE = "https://d1wugj5ru4kx2.cloudfront.net/logo.png";
const DOMAIN = "https://aimplussgems.com";

/**
 * Reusable SEO component for managing page titles, meta descriptions,
 * canonical links, Open Graph, Twitter cards, and JSON-LD structured data.
 */
export default function SEO({
  title,
  description,
  keywords,
  canonical,
  ogImage,
  ogType = "website",
  noindex = false,
  schema = null,
}) {
  useEffect(() => {
    // Page Title
    const finalTitle = title ? (title.includes("Aimpluss Gems") ? title : `${title} | Aimpluss Gems`) : DEFAULT_TITLE;
    document.title = finalTitle;

    // Helper to set or update meta tag
    const setMetaTag = (selector, attribute, attributeValue, content) => {
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, attributeValue);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content || "");
    };

    // Helper to set or update link tag
    const setLinkTag = (rel, href) => {
      let element = document.querySelector(`link[rel="${rel}"]`);
      if (!element) {
        element = document.createElement("link");
        element.setAttribute("rel", rel);
        document.head.appendChild(element);
      }
      element.setAttribute("href", href);
    };

    const finalDescription = description || DEFAULT_DESCRIPTION;
    const finalKeywords = keywords || DEFAULT_KEYWORDS;
    const finalImage = ogImage || DEFAULT_IMAGE;
    const currentUrl = canonical || (typeof window !== "undefined" ? window.location.href : DOMAIN);

    // Primary Meta Tags
    setMetaTag('meta[name="description"]', 'name', 'description', finalDescription);
    setMetaTag('meta[name="keywords"]', 'name', 'keywords', finalKeywords);
    setMetaTag('meta[name="robots"]', 'name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large');

    // Open Graph / Facebook
    setMetaTag('meta[property="og:type"]', 'property', 'og:type', ogType);
    setMetaTag('meta[property="og:url"]', 'property', 'og:url', currentUrl);
    setMetaTag('meta[property="og:title"]', 'property', 'og:title', finalTitle);
    setMetaTag('meta[property="og:description"]', 'property', 'og:description', finalDescription);
    setMetaTag('meta[property="og:image"]', 'property', 'og:image', finalImage);
    setMetaTag('meta[property="og:site_name"]', 'property', 'og:site_name', 'Aimpluss Gems');

    // Twitter Card
    setMetaTag('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
    setMetaTag('meta[name="twitter:url"]', 'name', 'twitter:url', currentUrl);
    setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', finalTitle);
    setMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', finalDescription);
    setMetaTag('meta[name="twitter:image"]', 'name', 'twitter:image', finalImage);

    // Canonical Link
    setLinkTag('canonical', currentUrl);

    // JSON-LD Structured Data
    let scriptTag = document.querySelector('script[data-seo-jsonld="true"]');
    if (schema) {
      if (!scriptTag) {
        scriptTag = document.createElement("script");
        scriptTag.setAttribute("type", "application/ld+json");
        scriptTag.setAttribute("data-seo-jsonld", "true");
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(schema);
    } else if (scriptTag) {
      scriptTag.remove();
    }
  }, [title, description, keywords, canonical, ogImage, ogType, noindex, schema]);

  return null;
}
