import type { SitterProfile } from "./types"

// Central sitter profiles data
export const sitterProfiles: Record<string, SitterProfile> = {
  sandra: {
    id: "sandra",
    name: "Sandra",
    avatar: "/diverse-woman-portrait.png",
    location: "Zürich, Wiedikon",
    distance: "1.2 km",
    rating: 4.9,
    reviewCount: 23,
    bio: "Hallo! Ich bin Sandra und lebe in einer gemütlichen 3-Zimmer-Wohnung in Wiedikon. Als erfahrene Katzenliebhaberin kümmere ich mich liebevoll um deine Fellnase.",
    fullBio:
      "Hallo! Ich bin Sandra und lebe in einer gemütlichen 3-Zimmer-Wohnung in Wiedikon. Als erfahrene Katzenliebhaberin kümmere ich mich liebevoll um deine Fellnase. Ich arbeite im Homeoffice, daher bin ich fast immer zu Hause und kann deiner Katze viel Aufmerksamkeit schenken. Meine eigene Katze Mimi ist sehr sozial und liebt Besuch von anderen Katzen. Ich habe über 5 Jahre Erfahrung im Cat-Sitting und kenne mich bestens mit verschiedenen Charakteren und Bedürfnissen aus.",
    photos: [
      "/diverse-woman-portrait.png",
      "/playful-cat.png",
      "/cat-grooming.png",
      "/tabby-cat-sunbeam.png",
      "/cat-interactive-toys.jpg",
      "/cat-with-leash.jpg",
    ],
    cats: [
      { name: "Mimi", image: "/playful-cat.png" },
      { name: "Felix", image: "/tabby-cat-sunbeam.png" },
    ],
    paymentType: "both",
    verified: true,
  },
  tommy: {
    id: "tommy",
    name: "Tommy",
    avatar: "/sitter-tommy-portrait.jpg",
    location: "Zürich, Seefeld",
    distance: "2.8 km",
    rating: 4.7,
    reviewCount: 18,
    bio: "Hey! Ich bin Tommy und wohne in einer ruhigen Gegend in Seefeld. Ich liebe Katzen und habe selbst zwei verspielte Stubentiger.",
    fullBio:
      "Hey! Ich bin Tommy und wohne in einer ruhigen Gegend in Seefeld. Ich liebe Katzen und habe selbst zwei verspielte Stubentiger. Meine Wohnung ist katzensicher eingerichtet mit vielen Kletter- und Spielmöglichkeiten. Ich arbeite flexible Zeiten und kann mich daher gut um Gäste kümmern. Besonders gerne betreue ich aktive und verspielte Katzen, die Gesellschaft mögen.",
    photos: [
      "/sitter-tommy-portrait.jpg",
      "/playful-cat.png",
      "/cat-grooming.png",
      "/tabby-cat-sunbeam.png",
      "/cat-interactive-toys.jpg",
      "/cat-with-leash.jpg",
    ],
    cats: [
      { name: "Luna", image: "/playful-cat.png" },
      { name: "Leo", image: "/tabby-cat-sunbeam.png" },
    ],
    paymentType: "tausch",
    verified: false,
  },
  "anna-kim": {
    id: "anna-kim",
    name: "Anna & Kim",
    avatar: "/sitter-anna-kim-portrait.jpg",
    location: "Zürich, Altstetten",
    distance: "3.5 km",
    rating: 4.8,
    reviewCount: 31,
    bio: "Wir sind Anna und Kim, ein Paar das Katzen über alles liebt. In unserer großzügigen Wohnung haben wir viel Platz für Katzengäste.",
    fullBio:
      "Wir sind Anna und Kim, ein Paar das Katzen über alles liebt. In unserer großzügigen Wohnung haben wir viel Platz für Katzengäste. Wir haben drei eigene Katzen, die sehr sozial und freundlich sind. Da wir beide im Homeoffice arbeiten, ist immer jemand zu Hause. Wir haben Erfahrung mit scheuen und ängstlichen Katzen und geben ihnen die Zeit, die sie brauchen.",
    photos: [
      "/sitter-anna-kim-portrait.jpg",
      "/playful-cat.png",
      "/cat-grooming.png",
      "/tabby-cat-sunbeam.png",
      "/cat-interactive-toys.jpg",
      "/cat-with-leash.jpg",
    ],
    cats: [
      { name: "Whiskers", image: "/playful-cat.png" },
      { name: "Shadow", image: "/tabby-cat-sunbeam.png" },
      { name: "Bella", image: "/cat-grooming.png" },
    ],
    paymentType: "both",
    verified: true,
  },
  charly: {
    id: "charly",
    name: "Charly",
    avatar: "/sitter-charly-portrait.jpg",
    location: "Zürich, Oerlikon",
    distance: "4.2 km",
    rating: 4.6,
    reviewCount: 15,
    bio: "Hi, ich bin Charly! Ich wohne in Oerlikon in einer modernen Wohnung mit Balkon. Meine Katze Simba liebt Gesellschaft.",
    fullBio:
      "Hi, ich bin Charly! Ich wohne in Oerlikon in einer modernen Wohnung mit Balkon. Meine Katze Simba liebt Gesellschaft und freut sich immer über Besuch. Ich arbeite tagsüber, bin aber abends und am Wochenende voll verfügbar. Der Balkon ist katzensicher vergittert und bietet einen schönen Ausblick. Ich betreue am liebsten ruhige bis mittelaktive Katzen.",
    photos: [
      "/sitter-charly-portrait.jpg",
      "/playful-cat.png",
      "/cat-grooming.png",
      "/tabby-cat-sunbeam.png",
      "/cat-interactive-toys.jpg",
      "/cat-with-leash.jpg",
    ],
    cats: [{ name: "Simba", image: "/tabby-cat-sunbeam.png" }],
    paymentType: "bezahlt",
    verified: false,
  },
  esmeralda: {
    id: "esmeralda",
    name: "Esmeralda",
    avatar: "/diverse-woman-portrait.png",
    location: "Zürich, Enge",
    distance: "1.8 km",
    rating: 5.0,
    reviewCount: 42,
    bio: "Grüezi! Ich bin Esmeralda und habe jahrelange Erfahrung in der Katzenbetreuung. Deine Katze ist bei mir in besten Händen.",
    fullBio:
      "Grüezi! Ich bin Esmeralda und habe jahrelange Erfahrung in der Katzenbetreuung. Deine Katze ist bei mir in besten Händen. Ich bin pensioniert und habe daher den ganzen Tag Zeit für meine Gäste. Meine zwei Perserkatzen sind sehr ruhig und sanft. Ich kenne mich auch mit speziellen Bedürfnissen wie Medikamentengabe oder Diätfutter aus. Meine Wohnung ist eine ruhige Oase mit vielen gemütlichen Plätzen.",
    photos: [
      "/diverse-woman-portrait.png",
      "/playful-cat.png",
      "/cat-grooming.png",
      "/tabby-cat-sunbeam.png",
      "/cat-interactive-toys.jpg",
      "/cat-with-leash.jpg",
    ],
    cats: [
      { name: "Princess", image: "/cat-grooming.png" },
      { name: "Duke", image: "/tabby-cat-sunbeam.png" },
    ],
    paymentType: "both",
    verified: true,
  },
}

// Helper function to get sitter by name
export function getSitterByName(name: string): SitterProfile | undefined {
  const key = name.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "")
  return sitterProfiles[key]
}

// Helper function to get sitter avatar
export function getSitterAvatar(name: string): string {
  const sitter = getSitterByName(name)
  return sitter?.avatar || "/diverse-woman-portrait.png"
}
