export { site, images, mainNav, footerNav, socialLinks, provided, type NavItem } from "./site";
export { rooms, roomRatesNote, airportPickupPrices, type Room } from "./rooms";
export { toursA, type Tour } from "./tours-a";
export { toursB } from "./tours-b";
export { toursC } from "./tours-c";
export { toursD } from "./tours-d";
export { toursMore } from "./tours-more";
export { entranceFees, feeNotes, type FeeGroup } from "./fees";
export { about, home } from "./content";
export { location, cityInfo } from "./content2";
export { gallery, blogPosts, type Photo } from "./gallery";

import { toursA } from "./tours-a";
import { toursB } from "./tours-b";
import { toursC } from "./tours-c";
import { toursD } from "./tours-d";
import { toursMore } from "./tours-more";
import type { Tour } from "./tours-a";

export const tours: Tour[] = [...toursA, ...toursB, ...toursC, ...toursD, ...toursMore];

export function getTour(slug: string) {
  return tours.find((tour) => tour.slug === slug);
}
