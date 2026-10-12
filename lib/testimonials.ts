/**
 * Real customer quotes only, with the customer's permission. The section stays hidden while this list is empty.
 * Example: { quote: "…", name: "Chanda M.", what: "Discover Scuba Diving, Lusaka", pages: ["try-scuba"] }
 * Leave `pages` out to show a quote on every landing page.
 */
export type Testimonial = { quote: string; name: string; what: string; pages?: string[] };

export const TESTIMONIALS: Testimonial[] = [];
