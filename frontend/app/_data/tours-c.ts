import type { Tour } from "./tours-a";

const wd = (n: number) => `/images/tours--wd-${n}.webp`;

export const toursC: Tour[] = [
  {
    slug: "bahareya-oasis-white-desert",
    title: "Bahareya Oasis, White and Black Deserts",
    cardTitle: "Bahareya Oasis (White Desert); 2 Nights, 3 Days (Great Value for Money)",
    category: "adventure",
    duration: "1 or 2 Nights",
    description:
      "The White Desert has massive chalk rock formations created by occasional sandstorms. A night under the stars here is an experience never forgotten, as the sky turns pink then fiery orange.",
    image: "/images/tours--bahareya.webp",
    gallery: [
      { src: wd(1), caption: "The White Desert" },
      { src: wd(2), caption: "The Black Desert" },
      { src: wd(3), caption: "Chalky rock formations" },
      { src: wd(5), caption: "4x4 Jeep Safari" },
      { src: wd(7), caption: "Crystal Mountain" },
    ],
    highlights: ["4x4 Jeep Safari", "White Desert camping", "Crystal Mountain", "Black Desert", "Bedouin BBQ dinner"],
    itinerary: [
      { day: "Day 1", text: "Depart Cairo by bus to Bahareya Oasis (about 4 hrs). Transfer to a camp-style hotel, lunch, then a local village tour, sand dunes, English Mountain, Flower Stone, Salt Lake and hot springs." },
      { day: "Day 2", text: "4x4 Jeep Safari: hot water spring, Bedouin villages, Akabat Desert dunes and Crystal Mountain. Camp overnight in the White Desert with a Bedouin BBQ dinner under the stars." },
      { day: "Day 3", text: "After breakfast, visit the Black Desert with its dark cones and rocks. Return to Cairo around 5 PM." },
    ],
    inclusions: ["1 night camp-style hotel", "1 night camping in the White Desert", "4x4 Jeep Safari", "Bedouin BBQ dinner", "English speaking driver"],
    exclusions: ["Extras not mentioned", "Optional tour guides", "Drinks"],
    notes: ["Tour starts early in the morning from Cairo.", "Sightseeing in small groups."],
  },
];
