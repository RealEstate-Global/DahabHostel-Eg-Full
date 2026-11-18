export type Room = {
  name: string;
  price: string;
  description: string;
  category: "dorm" | "private";
  image: string;
};

export const rooms: Room[] = [
  {
    name: "Bed in a Mixed 6 beds Dorm room",
    price: "600 EGP",
    description: "Deluxe mixed dorm with a private bathroom and A/C",
    category: "dorm",
    image: "/images/tours--collage.png",
  },
  {
    name: "Deluxe Single; Ensuite",
    price: "1200 EGP",
    description: "Deluxe room with Private Bathroom and Fan",
    category: "private",
    image: "/images/tours--terrace.jpeg",
  },
  {
    name: "Single; Shared bathroom",
    price: "900 EGP",
    description: "Standard room with Fan",
    category: "private",
    image: "/images/tours--collage.png",
  },
  {
    name: "Deluxe Double; Ensuite",
    price: "1800 EGP",
    description: "Deluxe room with Private bathroom and A/C",
    category: "private",
    image: "/images/tours--terrace.jpeg",
  },
  {
    name: "Double; Shared bathroom",
    price: "1300 EGP",
    description: "Standard room with 2 Single beds and Fan",
    category: "private",
    image: "/images/tours--collage.png",
  },
  {
    name: "Deluxe 3-Bed; Ensuite",
    price: "2400 EGP",
    description: "Deluxe room with 3 Single bed, Private Bathroom and A/C",
    category: "private",
    image: "/images/tours--terrace.jpeg",
  },
  {
    name: "3-Bed; Shared bathroom",
    price: "1800 EGP",
    description: "Standard room with 3 Single beds and Fan",
    category: "private",
    image: "/images/tours--collage.png",
  },
  {
    name: "Female Dorm Room",
    price: "600 EGP",
    description: "Female-only dorm available with a private bathroom and A/C",
    category: "dorm",
    image: "/images/tours--collage.png",
  },
];

export const roomRatesNote = "*Prices are per Room per Night in Egyptian Pounds";

export const airportPickupPrices = [
  "Cairo Airport — 550 EGP per Car (1 to 3 PaX)",
  "Sphinx Airport — 1000 EGP per Car (1 to 3 PaX)",
  "For groups of more than 3 PaX, please contact us for a price quote.",
];
