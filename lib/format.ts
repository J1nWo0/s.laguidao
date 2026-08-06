const MONTH_YEAR = new Intl.DateTimeFormat("en-US", {
	month: "short",
	year: "numeric",
	timeZone: "UTC",
});

const PRESENT_LABEL = "Present";

/** Parses an ISO year-month (`"2025-08"`) into a UTC date to avoid timezone drift. */
function parseYearMonth(value: string): Date {
	const [year, month] = value.split("-").map(Number);
	return new Date(Date.UTC(year, (month ?? 1) - 1, 1));
}

export function formatMonthYear(value: string): string {
	return MONTH_YEAR.format(parseYearMonth(value));
}

/** `"Aug 2025 — Present"`. Pass `null` as the end for an ongoing period. */
export function formatDateRange(start: string, end: string | null): string {
	const from = formatMonthYear(start);
	const to = end ? formatMonthYear(end) : PRESENT_LABEL;
	return `${from} — ${to}`;
}

/** `"2025.08"` — sortable and fixed-width, so it aligns in a mono gutter. */
export function formatCompactYearMonth(value: string): string {
	const [year, month] = value.split("-");
	return `${year}.${(month ?? "01").padStart(2, "0")}`;
}

/** `"2025.08 → now"`. Pass `null` as the end for an ongoing period. */
export function formatCompactRange(start: string, end: string | null): string {
	const from = formatCompactYearMonth(start);
	const to = end ? formatCompactYearMonth(end) : "now";
	return `${from} \u2192 ${to}`;
}

/** Inclusive month count between two year-months, ongoing periods run to today. */
function monthsBetween(start: string, end: string | null): number {
	const from = parseYearMonth(start);
	const to = end ? parseYearMonth(end) : new Date();
	const months =
		(to.getUTCFullYear() - from.getUTCFullYear()) * 12 +
		(to.getUTCMonth() - from.getUTCMonth());
	return Math.max(months, 0) + 1;
}

/** Compact duration label such as `"5 mos"` or `"1 yr 2 mos"`. */
export function formatDuration(start: string, end: string | null): string {
	const total = monthsBetween(start, end);
	const years = Math.floor(total / 12);
	const months = total % 12;

	const parts: string[] = [];
	if (years > 0) parts.push(`${years} yr${years > 1 ? "s" : ""}`);
	if (months > 0) parts.push(`${months} mo${months > 1 ? "s" : ""}`);

	return parts.join(" ");
}

/** `"Backend & APIs"` → `"backend-apis"`, so labels can read as paths. */
export function slugify(value: string): string {
	return value
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-|-$/g, "");
}

/**
 * Rewrites share links from the common document hosts into the form they allow
 * inside an iframe. Unknown hosts pass through untouched — they may still refuse
 * to be framed, which is why the viewer always offers the direct link too.
 */
export function toEmbedUrl(url: string): string {
	const drive = url.match(/drive\.google\.com\/file\/d\/([^/?#]+)/);
	if (drive) return `https://drive.google.com/file/d/${drive[1]}/preview`;

	const workspace = url.match(
		/docs\.google\.com\/(document|presentation|spreadsheets)\/d\/([^/?#]+)/,
	);
	if (workspace) {
		return `https://docs.google.com/${workspace[1]}/d/${workspace[2]}/preview`;
	}

	if (url.includes("dropbox.com")) {
		const raw = url.replace(/([?&])dl=\d\b/, "$1raw=1");
		if (raw !== url) return raw;
		return `${url}${url.includes("?") ? "&" : "?"}raw=1`;
	}

	return url;
}

/** Strips the protocol and trailing slash so URLs read well as link labels. */
export function formatUrlLabel(url: string): string {
	return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}
