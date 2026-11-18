/**
 * Content sourced from https://dahabhostel.com and stored locally so the app
 * never needs to call the original site at runtime.
 */

export const site = {
  name: "Dahab Hostel",
  fullName: "Dahab Hostel Cairo",
  tagline: "Your Oasis in the City...",
  title: "#1 Best Hostel Egypt - Best small Hostel in Africa — Dahab Hostel Cairo",
  description:
    "Award-winning Rooftop hostel in Downtown Cairo city center. Rooftop terraces to relax, study or be social and meet solo travelers. Dorms and private rooms, 24/7 reception, airport pickup and budget tours.",
  keywords:
    "dahab, hostel, hotel, cheap, cairo, egypt, good, great, deal, bed, breakfast, lodge, accommodation, safe, downtown, central, location, friendly, staff, oasis, terrace, garden, outdoor, fun, atmosphere, travel, tahrir, guide, pyramids, tour, luxor, aswan",
  ogSiteName: "Welcome to Dahab Hostel in Cairo...",
  url: "https://dahabhostel.com",
  email: "info@dahabhostel.com",
  phone: "+20 2 257 99104",
  mobile: "+201090400310",
  address: "26 Mahmoud Bassiouny St. Talaat Harb Sq. 11556 Cairo, Egypt",
  building: "Building No. 26 – Rooftop 7th floor",
  foundSince: 1998,
  guests: "over 800,000 guests",
  bookingUrl: "https://hotels.cloudbeds.com/en/reservation/eQvcYi?currency=egp",
  googleReviewUrl: "https://share.google/ds4jt29yjl1KiLqwa",
  tripAdvisorUrl:
    "https://www.tripadvisor.com/Hotel_Review-g294201-d629999-Reviews-Dahab_Hostel-Cairo_Cairo_Governorate.html",
  hostelWorldUrl: "https://www.hostelworld.com/myworld/",
  youtubeVideoId: "cihq3FI4ssI",
} as const;

export const images = {
  logo: "/images/1c76110e3757dac2f674c7be0dcdade0.png",
  awardBestHostelEgypt: "/images/5c8662d4e8e3ce1b6cfab879b2fcc447.png",
  awardBestSmallHostelAfrica: "/images/6c768d837da645bac6809f622ebacf8f.png",
  tripAdvisor: "/images/tours--tripadvisor.png",
  homeBanner: "/images/tours--home-banner.jpg",
  provideBanner: "/images/tours--provide-banner.jpg",
  toursBanner: "/images/tours--tours-banner.jpg",
  collage: "/images/tours--collage.png",
  terrace: "/images/tours--terrace.jpeg",
  siwa: "/images/7f5e910fdb3056ca3aba57fbdcf2a476.jpg",
  siwaView: "/images/8c9f18a4d6a16c4df3705bd336924e2b.jpg",
  siwaDesert: "/images/bf5e6c86af527d39ed7165ca0c8365f6.jpg",
} as const;

export type NavItem = { title: string; href: string };

export const mainNav: NavItem[] = [
  { title: "Our Tours", href: "/our-tours" },
  { title: "Location", href: "/location" },
  { title: "Photos", href: "/photos" },
  { title: "Rates & Booking", href: "/book-now" },
  { title: "City Info", href: "/city-info" },
  { title: "About Us", href: "/about-us" },
  { title: "Contact Us", href: "/contact-us" },
  { title: "Services Brochure", href: "/services-brochure" },
];

export const footerNav = {
  ourInfo: [
    { title: "Entrance Fees", href: "/entrance-fees" },
    { title: "Airport Pickup Service", href: "/airport-pickup-service" },
    { title: "Room Rates", href: "/prices" },
    { title: "Request Tour Prices", href: "/tours-prices" },
  ],
  ourServices: [{ title: "Online Booking", href: "/book-now" }],
  followUs: [
    { title: "Our News Blog", href: "/blog" },
    { title: "Write a Review", href: "/write-a-review" },
  ],
} as const;

export const socialLinks = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/dahabhostel/",
    icon: "facebook",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/dahabhostel/",
    icon: "instagram",
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/channel/UCRLOsveE31GCINKOR-N2X5g",
    icon: "youtube",
  },
  { name: "Tripadvisor", href: site.tripAdvisorUrl, icon: "tripadvisor" },
] as const;

export const provided = [
  "Privates and Dorms",
  "Open 24/7",
  "Safety deposit box",
  "No curfew",
  "Friendly staff",
  "Travel info",
  "Airport pickup service",
  "FREE WiFi",
  "Breakfast",
  "Guest kitchen",
  "Luggage storage",
  "Laundry service",
] as const;
