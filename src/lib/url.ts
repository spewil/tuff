/**
 * Prefix an internal path (route or public asset) with the configured base path
 * so links work both locally and under the GitHub Pages /tuff/ subpath.
 * Astro auto-prefixes bundled assets, but raw references to routes and
 * public/ files in markup are not rewritten — use this for those.
 */
export function url(path = "/"): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  if (!path || path === "/") return base + "/";
  return base + (path.startsWith("/") ? path : "/" + path);
}
