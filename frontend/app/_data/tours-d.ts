import type { Tour } from "./tours-a";

const d = (n: number) => `/images/tours--dahab-${n}.webp`;

export const toursD: Tour[] = [
  {
    slug: "dahab-red-sea",
    title: "Dahab (Red Sea)",
    cardTitle: "Dahab (Red Sea); 2 Nights, 3 Days",
    category: "adventure",
    duration: "2 Nights, 3 Days",
    image: "/images/tours--dahab.webp",
    description: "One of Sinai's most treasured diving destinations. The Blue Hole and Canyon are internationally famous dive spots.",
    gallery: [
      { src: d(1), caption: "Dahab City" },
      { src: d(3), caption: "The famous Blue Hole" },
      { src: d(6), caption: "Red Sea corals" },
    ],
  },
];
