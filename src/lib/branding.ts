// Single source of truth for the panchang's display name. Final brand name TBD —
// edit the four fields below to rename across the entire UI (header, widget, share
// title, layout metadata, hamburger nav, printed calendar footer).

export const BRAND = {
  /** Hindi short name shown next to the page header. */
  shortHi: "जैन पंचांग",
  /** English short name shown next to the page header. */
  shortEn: "Jain Panchang",
  /** Hindi long/decorative form (e.g., printed at the top of the daily widget). */
  longHi: "॥ जैन पंचांग ॥",
  /** English long form for share titles and HTML <title>. */
  longEn: "Jain Panchang",
} as const;
