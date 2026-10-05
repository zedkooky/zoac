// Unsplash stand-ins with credit chips. Swap for Zambian Outdoor Adventure Company photography when available.
export type Photo = { id: string; name: string; handle: string; alt: string };

export const UTM = "utm_source=zoac&utm_medium=referral";
export const unsplash = (id: string, w = 1600) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=70`;

export const PHOTOS = {
  river: { id: "1533631278779-d722ded4c7df", name: "Nicole Olwagen", handle: "nicoleoh_", alt: "The Zambezi river at dusk" },
  canoe: { id: "1635749687861-4341928cbf97", name: "Chris Linnett", handle: "chrislinnett", alt: "A river safari on an African waterway" },
  walking: { id: "1614531341773-3bff8b7cb3fc", name: "Thomas Bennie", handle: "thomasbennie", alt: "A walking safari in the African bush" },
  drive: { id: "1709402606682-400133d92ab2", name: "Meg von Haartman", handle: "traveleroohlala", alt: "Game drive in open country at golden hour" },
  wildlife: { id: "1633363593895-9249c144db6f", name: "Jonathan Hunt", handle: "jothhunt", alt: "Wildlife in Zambia" },
} satisfies Record<string, Photo>;
