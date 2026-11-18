import type { Tour } from "./tours-a";

const t = (p: string) => `/images/tours--${p}.webp`;
const a = (n: number) => `/images/tours--aswan-${n}.webp`;

export const toursB: Tour[] = [
  {
    slug: "aswan-luxor-abu-simbel",
    title: "Aswan, Luxor & Abu Simbel",
    cardTitle: "3 Nights, 4 Days; Aswan, Luxor & Abu Simbel with Nile Cruise (Best Seller)",
    category: "history",
    duration: "3 Nights, 4 Days",
    description:
      "Our best selling Nile Cruise. Luxor is known as the world's greatest open air museum. Book now and get a FREE Giza Pyramids day trip and a FREE hot air balloon ride in Luxor.",
    image: t("aswan"),
    gallery: [
      { src: a(1), caption: "Pillars of Karnak Temple, Luxor" },
      { src: a(2), caption: "Abu Simbel" },
      { src: a(7), caption: "5-Star Nile Cruise" },
      { src: a(13), caption: "Valley of the Kings, Luxor West Bank" },
    ],
    highlights: ["Karnak & Luxor Temples", "Valley of the Kings", "Abu Simbel", "Philae Temple", "Hot air balloon in Luxor"],
    itinerary: [
      { day: "Day 1", text: "Check in to the 5-star Nile cruise; visit Karnak and Luxor Temples on the East Bank. Overnight on board." },
      { day: "Day 2", text: "Free hot air balloon ride, then the West Bank: Valley of the Kings, Temple of Queen Hatshepsut and Colossi of Memnon. Sail towards Aswan." },
      { day: "Day 3", text: "Visit the Temple of Horus in Edfu and the Temple of Sobek in Kom Ombo. Continue to Aswan." },
      { day: "Day 4", text: "Abu Simbel, Philae Temple and the Aswan High Dam. Evening train back to Cairo." },
    ],
    inclusions: [
      "Pickups and transfers as mentioned",
      "1st class train tickets Cairo - Luxor and Aswan - Cairo",
      "English speaking Egyptologist guide",
      "3 nights on 5-star Nile Cruise including all meals",
      "All taxes and service charge",
    ],
    exclusions: ["Entrance fees to sites", "Beverages on the cruise", "Any extras not mentioned"],
    notes: [
      "Upgrade to sleeper train: 100 USD per person in a double cabin, including dinner and breakfast.",
      "Tour available every day; sightseeing in small groups.",
      "Reach us on +201090400310 for inquiries during your trip.",
    ],
  },
  {
    slug: "aswan-luxor-hostels-budget-trip",
    title: "Aswan, Luxor Hostels & Felucca Budget Trip",
    cardTitle: "3 Nights, 4 Days; Aswan, Abu Simbel, Felucca & Luxor Hostels Budget Trip",
    category: "adventure",
    duration: "3 Nights, 4 Days",
    description:
      "Budget 3 nights, 4 days trip from Cairo: Aswan, Abu Simbel, a night on a felucca and Luxor, staying in hostels. Night bus and transfers included.",
    image: t("aswan"),
    gallery: [
      { src: a(5), caption: "Feluccas on the Nile in magical Aswan" },
      { src: a(6), caption: "Nile in Aswan" },
      { src: a(10), caption: "Colossi of Memnon, Luxor" },
      { src: a(12), caption: "Philae Temple, Aswan" },
    ],
    highlights: ["Philae Temple", "Abu Simbel", "Felucca overnight", "Karnak & Luxor Temples", "Valley of the Kings"],
    itinerary: [
      { day: "Day 1", text: "Depart Cairo by bus at 8 PM. Visit Philae Temple in Aswan; overnight in the Aswan hostel." },
      { day: "Day 2", text: "At 4 AM transfer to Abu Simbel. Return around 1 PM, then a traditional felucca sailing with lunch and dinner; overnight under the stars." },
      { day: "Day 3", text: "Arrive Aqaba Port around 7 AM, transfer to Luxor. Explore Karnak and Luxor Temples; overnight in the Luxor hostel." },
      { day: "Day 4", text: "Visit the Valley of the Kings, Colossi of Memnon and Hatshepsut Temple; night bus back to Cairo." },
    ],
    inclusions: [
      "1 night in an Aswan hostel and 1 night in a Luxor hostel",
      "1 night on a traditional felucca with lunch, dinner and breakfast",
      "All transportation for scheduled tours",
      "Professional tour guides (except Abu Simbel)",
    ],
    exclusions: ["Entrance fees (paid by card at each site)", "Meals and drinks not mentioned", "Personal expenses"],
    notes: [
      "Abu Simbel departure at 4 AM, return to Aswan around noon.",
      "Itinerary subject to minor changes depending on local conditions.",
    ],
  },
];
