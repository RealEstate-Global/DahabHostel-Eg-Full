export type Photo = { src: string; caption: string; group: "room" | "terrace" };

const tours = (name: string) => `/images/tours--${name}.webp`;

export const gallery: Photo[] = [
  { src: "/images/tours--collage.webp", caption: "Dahab Hostel rooftop collage", group: "terrace" },
  { src: "/images/tours--terrace.webp", caption: "Our rooftop terrace", group: "terrace" },
  { src: tours("home-banner"), caption: "The rooftop at sunset", group: "terrace" },
  { src: tours("giza"), caption: "Giza Pyramids and Sphinx", group: "room" },
  { src: tours("giza-1"), caption: "Pyramids of Giza", group: "room" },
  { src: tours("aswan-1"), caption: "Pillars of Karnak Temple, Luxor", group: "room" },
  { src: tours("aswan-5"), caption: "Feluccas on the Nile in Aswan", group: "room" },
  { src: tours("islamic-1"), caption: "Mohamed Ali Mosque at the Citadel", group: "room" },
  { src: tours("dahab-1"), caption: "Dahab City", group: "room" },
  { src: tours("dahab-3"), caption: "The famous Blue Hole", group: "room" },
  { src: tours("bahareya"), caption: "Bahareya Oasis, White Desert", group: "room" },
  { src: tours("wd-1"), caption: "The White Desert", group: "room" },
  { src: "/images/7f5e910fdb3056ca3aba57fbdcf2a476.webp", caption: "Siwa Oasis", group: "room" },
  { src: "/images/8c9f18a4d6a16c4df3705bd336924e2b.webp", caption: "A view over Siwa Oasis", group: "room" },
];

export const blogPosts = [
  { title: "Travelling to Egypt: Is it Safe?", image: "/images/blog--pyramid-1.webp", href: "/blog" },
  { title: "Discover the Giza Pyramids", image: "/images/blog--pyramid-2.webp", href: "/blog" },
  { title: "Budget Travel Tips for Cairo", image: "/images/blog--pyramid-3.webp", href: "/blog" },
];
