export interface NavItem { title: string; href: string; disabled?: boolean; external?: boolean; icon?: string; label?: string; }
export interface NavItemWithChildren extends NavItem { items: NavItemWithChildren[]; }
export interface MainNavItem extends NavItem {}
export interface SidebarNavItem extends NavItemWithChildren {}

export const mainNav: MainNavItem[] = [
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
  company: [
    { title: "About Us", href: "/about-us" },
    { title: "Location", href: "/location" },
    { title: "Photos", href: "/photos" },
    { title: "Our News Blog", href: "/blog" },
  ],
  services: [
    { title: "Online Booking", href: "/book-now" },
    { title: "Room Rates", href: "/prices" },
    { title: "Airport Pickup Service", href: "/airport-pickup-service" },
    { title: "Request Tour Prices", href: "/tours-prices" },
  ],
  destinations: [
    { title: "Giza Pyramids", href: "/our-tours/giza-pyramids" },
    { title: "Aswan & Luxor", href: "/our-tours/aswan-luxor-abu-simbel" },
    { title: "White Desert", href: "/our-tours/bahareya-oasis-white-desert" },
    { title: "Dahab Red Sea", href: "/our-tours/dahab-red-sea" },
  ],
  legal: [
    { title: "Privacy Policy", href: "/privacy" },
    { title: "Terms of Service", href: "/terms" },
    { title: "Cookie Policy", href: "/cookies" },
    { title: "Write a Review", href: "/write-a-review" },
  ],
};
