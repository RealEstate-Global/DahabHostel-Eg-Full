export type FeeGroup = {
  group: string;
  tagline?: string;
  rows: [string, string][];
  note?: string;
  addons?: [string, string][];
};

export const entranceFees: FeeGroup[] = [
  {
    group: "Discover Giza with Us",
    rows: [
      ["Giza Pyramids and Sphinx Area", "EGP 700"],
      ["Saqqara", "EGP 600"],
      ["Grand Egyptian Museum", "EGP 1830"],
      ["Dahshur (The Red & Bent Pyramid)", "EGP 200"],
      ["Inside Khufu Pyramid", "EGP 1500"],
      ["Pyramids Sound & Light Show", "EGP 1000"],
    ],
  },
  {
    group: "Discover the heart of Cairo's history",
    rows: [["Islamic & Coptic Cairo", "EGP 550"]],
    addons: [["Sound & Light shows", "EGP 220"]],
  },
  {
    group: "Uncover the secrets of Luxor, Aswan & Abu Simbel",
    rows: [
      ["Karnak Temple", "EGP 500"],
      ["Luxor Temple", "EGP 500"],
      ["Valley of the Kings", "EGP 750"],
      ["Temple of Queen Hatshepsut", "EGP 440"],
      ["Temple of Horus (Edfu)", "EGP 450"],
      ["Temple of Sobek (Kom Ombo)", "EGP 450"],
      ["Philae Temple", "EGP 450"],
      ["Aswan High Dam", "EGP 450"],
    ],
    addons: [
      ["Sound & Light Show (Karnak)", "EGP 960"],
      ["Sound & Light Show (Abu Simbel)", "EGP 675"],
      ["Sound & Light Show (Edfu)", "EGP 675"],
    ],
  },
  {
    group: "Come Sail into Alexandria's Timeless Charm",
    rows: [
      ["Citadel of Qaitbay", "EGP 150"],
      ["Pompey's Pillar", "EGP 25"],
    ],
  },
  {
    group: "Experience the Chill Vibes of Dahab",
    rows: [["Blue Hole", "10 USD"]],
  },
  {
    group: "Discover Siwa with Us",
    rows: [
      ["Temple of the Oracle of Amun", "EGP 120"],
      ["Mountain of the Dead", "EGP 120"],
      ["Shali Fortress", "Free"],
    ],
  },
  {
    group: "Uncover the Magic of the White Desert",
    rows: [["National park", "EGP 250"]],
  },
];

export const feeNotes = [
  "Entrance fees listed above are excluded and must be paid by card only at the sites.",
  "However, if you book the tour with us, you can pay in cash.",
  "Grand Egyptian Museum tickets are sold online only, for a set time slot. We will book it for you when you join our tour.",
];
