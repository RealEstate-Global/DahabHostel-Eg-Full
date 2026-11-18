export type Tour = {
  slug: string;
  title: string;
  cardTitle: string;
  category: "history" | "adventure" | "leisure";
  duration: string;
  description: string;
  image: string;
  gallery?: { src: string; caption: string }[];
  highlights?: string[];
  itinerary?: { day: string; text: string }[];
  inclusions?: string[];
  exclusions?: string[];
  notes?: string[];
};

const t = (p: string) => `/images/tours--${p}.jpg`;
const g = (n: number) => `/images/tours--giza-${n}.jpg`;

export const toursA: Tour[] = [
  {
    slug: "giza-pyramids",
    title: "Giza Pyramids & Sphinx",
    cardTitle: "Giza Pyramids & Sphinx; Day trip (Very Popular)",
    category: "history",
    duration: "Day trip",
    description:
      "The Giza Necropolis stands on the Giza Plateau, on the outskirts of Cairo, Egypt. The complex includes the three Great Pyramids and the massive Great Sphinx, 25 km southwest of Cairo city center. The Great Pyramid is the only remaining monument of the Seven Wonders of the Ancient World.",
    image: t("giza"),
    gallery: [
      { src: g(1), caption: "Pyramids of Giza" },
      { src: g(2), caption: "Sakkara Pyramid" },
      { src: g(3), caption: "Red Pyramid, Dahshour" },
      { src: g(4), caption: "Bent Pyramid, Dahshour" },
    ],
    highlights: [
      "Giza Pyramids and Sphinx area",
      "Sakkara (The Step Pyramid) area",
      "Memphis Museum",
      "Dahshour (The Red Pyramid)",
    ],
    itinerary: [
      {
        day: "Full day",
        text: "You will be picked up from Dahab Hostel's reception early morning by our English speaking driver, and transferred to the Giza Pyramids and Sphinx area, Sakkara (The Step Pyramid) area, Memphis Museum and Dahshour (The Red Pyramid). The driver waits for you until you finish sightseeing and brings you back to the hostel.",
      },
    ],
    inclusions: [
      "Full day trip transportation with a private car and English speaking driver",
      "Entrance fees to touristic sites (optional add-on)",
    ],
    exclusions: [
      "Tourist guides are optional for an extra charge (English, French, Spanish and German available)",
      "Personal expenses and extras not mentioned",
    ],
    notes: [
      "This tour starts early in the morning and ends in the afternoon.",
      "All sights open at 8:00 AM and close at 4:00 PM; times are flexible upon request.",
      "Special Offer 2026: this tour is FREE when you book our 4 Nights Aswan, Luxor & Abu Simbel or 3 Nights Aswan, Luxor with Nile Cruise tours.",
    ],
  },
  {
    slug: "giza-grand-egyptian-museum",
    title: "Giza Pyramids & Grand Egyptian Museum",
    cardTitle: "Giza Pyramids & Grand Egyptian Museum",
    category: "history",
    duration: "Day trip",
    description:
      "Combine the Giza Pyramids and Sphinx with the Grand Egyptian Museum (GEM), the largest archaeological museum in the world, home to the complete collection of Tutankhamun's treasures.",
    image: t("giza"),
    gallery: [
      { src: "/images/tours--gem-1.jpg", caption: "The Grand Egyptian Museum" },
      { src: "/images/tours--gem-2.jpg", caption: "Colossus of Ramses II, GEM atrium" },
      { src: "/images/tours--gem-3.jpg", caption: "The Grand Staircase, GEM" },
      { src: "/images/tours--gem-6.jpg", caption: "View of the Pyramids of Giza from the GEM" },
    ],
    highlights: ["Giza Pyramids and Sphinx", "Grand Egyptian Museum", "Grand Staircase", "Tutankhamun galleries"],
    itinerary: [
      {
        day: "Full day",
        text: "Morning visit to the Giza Pyramids and Sphinx, followed by the Grand Egyptian Museum. Grand Egyptian Museum tickets are sold online only for a set time slot; we will book it for you when you join our tour.",
      },
    ],
    inclusions: ["Private car and English speaking driver", "GEM tickets booked for you"],
    exclusions: ["Tourist guides optional for an extra charge", "Personal expenses"],
    notes: ["All sights open at 8:00 AM and close at 4:00 PM."],
  },
  {
    slug: "islamic-coptic-cairo",
    title: "Islamic & Coptic Cairo",
    cardTitle: "City tour (Islamic and Coptic Cairo); Day trip",
    category: "history",
    duration: "Day trip",
    description:
      "Islamic Cairo is part of central Cairo noted for its historically important mosques and monuments, overlooked by the Cairo Citadel. Coptic Cairo was a stronghold for Christianity until the Islamic era.",
    image: t("islamic"),
    gallery: [
      { src: "/images/tours--islamic-1.jpg", caption: "Mohamed Ali (Alabaster) Mosque at the Citadel" },
      { src: "/images/tours--islamic-5.jpg", caption: "Inside Sultan Hassan Mosque" },
      { src: "/images/tours--islamic-7.jpg", caption: "Entrance of the Hanging Church Basilica" },
      { src: "/images/tours--islamic-8.jpg", caption: "Ibn Tulun Mosque" },
    ],
    highlights: [
      "The Citadel of Saladin (El-Qala)",
      "Mohamed Ali Alabaster Mosque",
      "Mosque of Amr Ibn Al As",
      "Sultan Hassan Madrassa and Mosque",
      "The Hanging Church",
      "Church of St. Sergius (Abu Serga)",
      "The Synagogue of Ben Ezra",
    ],
    itinerary: [
      {
        day: "Full day",
        text: "A guided city tour through Islamic Cairo (the Citadel, Mohamed Ali Mosque, Ibn Tulun Mosque, Sultan Hassan Mosque) and Coptic Cairo (the Hanging Church, Abu Serga, Ben Ezra Synagogue, St. Barbara Church).",
      },
    ],
    inclusions: ["Transportation", "Professional tour guide"],
    exclusions: ["Entrance fees to sites", "Personal expenses"],
    notes: ["Times are flexible upon request."],
  },
  {
    slug: "alexandria",
    title: "Alexandria",
    cardTitle: "Alexandria; Day trip",
    category: "history",
    duration: "Day trip",
    description:
      "As Egypt's second largest city, Alexandria has plenty to see and do. We offer a one day tour for those short on time but still wanting to see all that they can.",
    image: t("alexandria"),
    gallery: [],
    highlights: [
      "Qaitbay Citadel",
      "El Morsi Abu El Abais Mosque",
      "The Library of Alexandria",
      "Pompeii's Pillar",
      "Montaza beach and palace",
    ],
    itinerary: [
      {
        day: "Full day",
        text: "Early in the morning our driver will pick you up from reception. You will have the driver for the whole day to see a number of sights before returning to Cairo in the evening.",
      },
    ],
    inclusions: ["Full day private driver"],
    exclusions: ["Entrance fees", "Guide (optional)", "Personal expenses"],
    notes: ["Long day trip — approximately 6 AM to 10 PM."],
  },
];
