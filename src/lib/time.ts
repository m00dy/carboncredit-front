/**
 * Returns a human-friendly relative time string, e.g. "3 hours ago".
 * @param unixSeconds - Unix timestamp in seconds
 */
export function timeAgo(unixSeconds: number): string {
  const now = Math.floor(Date.now() / 1000);
  const diff = now - unixSeconds;

  if (diff < 60) return "just now";
  if (diff < 3600) {
    const m = Math.floor(diff / 60);
    return `${m} ${m === 1 ? "minute" : "minutes"} ago`;
  }
  if (diff < 86400) {
    const h = Math.floor(diff / 3600);
    return `${h} ${h === 1 ? "hour" : "hours"} ago`;
  }
  if (diff < 86400 * 30) {
    const d = Math.floor(diff / 86400);
    return `${d} ${d === 1 ? "day" : "days"} ago`;
  }
  if (diff < 86400 * 365) {
    const mo = Math.floor(diff / (86400 * 30));
    return `${mo} ${mo === 1 ? "month" : "months"} ago`;
  }
  const y = Math.floor(diff / (86400 * 365));
  return `${y} ${y === 1 ? "year" : "years"} ago`;
}

/**
 * Formats a Unix timestamp as a readable date string.
 */
export function formatDate(unixSeconds: number): string {
  return new Date(unixSeconds * 1000).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
