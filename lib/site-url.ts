const fallbackSiteUrl = "https://fornedringskassan.vercel.app";

function normalizeSiteUrl(value: string | undefined) {
  const candidate = value?.trim();

  if (!candidate) {
    return fallbackSiteUrl;
  }

  try {
    return new URL(candidate).origin;
  } catch {
    return fallbackSiteUrl;
  }
}

export const siteBaseUrl = normalizeSiteUrl(
  process.env.NEXT_PUBLIC_SITE_URL ?? process.env.SITE_URL,
);

export function siteUrl(pathname = "/") {
  return new URL(pathname, siteBaseUrl).toString();
}
