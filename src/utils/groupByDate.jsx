/**
 * Convert any valid date input into "YYYY-MM-DD" format (local time)
 * @param {string|number|Date} d - Date string, timestamp, or Date object
 * @returns {string} Formatted date key
 */
export function toDateKey(d) {
  const date = new Date(d);
  if (isNaN(date)) return "invalid-date";

  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/**
 * Returns a user-friendly label for a date key
 * Example: "Today", "Yesterday", "11 Nov 2025"
 * @param {string} dateKey - Expected format: "YYYY-MM-DD"
 * @returns {string}
 */
export function friendlyDateLabel(dateKey) {
  if (!dateKey || dateKey === "invalid-date") return "Unknown date";

  const [y, m, d] = dateKey.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  const now = new Date();

  const todayKey = toDateKey(now);
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  const yesterdayKey = toDateKey(yesterday);

  if (dateKey === todayKey) return "Today";
  if (dateKey === yesterdayKey) return "Yesterday";

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return `${date.getDate()} ${
    monthNames[date.getMonth()]
  } ${date.getFullYear()}`;
}

/**
 * Groups any array of items by their date field (defaults to `createdAt`)
 * Optionally limits the total number of items across all groups
 * Returns array of groups sorted by date (newest first)
 *
 * @param {Array} items - Array of objects to group
 * @param {string} [field="createdAt"] - The date field name in each object
 * @param {number} [maxTotalItems] - Optional maximum total items to include
 * @returns {Array<{dateKey: string, label: string, items: Array}>}
 */
export function groupByDate(items = [], field = "createdAt", maxTotalItems) {
  if (!Array.isArray(items)) return [];

  // Sort newest → oldest by date field
  const sorted = [...items].sort(
    (a, b) => new Date(b[field]) - new Date(a[field])
  );

  const map = new Map();
  for (const item of sorted) {
    const key = toDateKey(item[field]);
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(item);
  }

  // Convert map to array of groups with readable labels
  let groups = Array.from(map.entries()).map(([dateKey, items]) => ({
    dateKey,
    label: friendlyDateLabel(dateKey),
    items,
  }));

  // Sort descending by dateKey
  groups.sort((a, b) => (a.dateKey < b.dateKey ? 1 : -1));

  // If maxTotalItems is set, limit the total items across all groups
  if (typeof maxTotalItems === "number") {
    const limitedGroups = [];
    let count = 0;

    for (const group of groups) {
      if (count >= maxTotalItems) break;

      const remaining = maxTotalItems - count;
      const itemsToTake = group.items.slice(0, remaining);

      limitedGroups.push({ ...group, items: itemsToTake });
      count += itemsToTake.length;
    }

    groups = limitedGroups;
  }

  return groups;
}
