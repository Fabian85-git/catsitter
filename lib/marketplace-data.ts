export interface MarketplaceItem {
  id: number
  title: string
  price: string
  category: string
  image: string
  seller: string
  location: string
  description: string
  images?: string[]
}

export const marketplaceItems: MarketplaceItem[] = [
  // Katzenfutter
  {
    id: 1,
    title: "Premium Trockenfutter für Katzen 5kg",
    price: "29.90",
    category: "Katzenfutter",
    image: "/cat-food-bowls.jpg",
    seller: "Maria K.",
    location: "Zürich, 3.2 km",
    description:
      "Hochwertiges Trockenfutter mit allem, was deine Katze braucht. Reich an Proteinen, Vitaminen und Mineralien. Perfekt für erwachsene Katzen ab 1 Jahr. Die Kroketten sind optimal auf die Bedürfnisse von Hauskatzen abgestimmt und fördern eine gesunde Verdauung. Ungeöffnete Verpackung, direkt vom Züchter bezogen. Mindesthaltbarkeit bis 2026.",
    images: ["/cat-food-bowls.jpg", "/playful-cat.png", "/cat-grooming.png"],
  },
  {
    id: 2,
    title: "Bio Nassfutter Huhn & Gemüse 12er Pack",
    price: "24.90",
    category: "Katzenfutter",
    image: "/cat-food-bowls.jpg",
    seller: "Thomas B.",
    location: "Bern, 5.8 km",
    description:
      "100% Bio-Qualität mit frischem Hühnerfleisch und gesundem Gemüse. Ohne Zusatzstoffe, Getreide oder künstliche Aromen. Artgerechte Ernährung für deine Samtpfote. 12 Dosen à 400g, perfekt portioniert. Meine Katze mag es leider nicht, daher günstig abzugeben. Alle Dosen sind mindestens 8 Monate haltbar.",
    images: ["/cat-food-bowls.jpg", "/tabby-cat-sunbeam.png"],
  },
  {
    id: 3,
    title: "Katzenfutter Mix Paket - 20 Dosen",
    price: "35.00",
    category: "Katzenfutter",
    image: "/cat-food-bowls.jpg",
    seller: "Anna S.",
    location: "Basel, 2.1 km",
    description:
      "Verschiedene Sorten im praktischen Mix-Paket für Abwechslung auf dem Speiseplan. Enthält Huhn, Lachs, Rind und Thunfisch. Perfekt zum Ausprobieren oder für wählerische Katzen, die gerne variieren. Jede Sorte 5x vorhanden. Alle Dosen sind mindestens 6 Monate haltbar. Neupreis wäre 45 CHF.",
    images: ["/cat-food-bowls.jpg", "/playful-cat.png"],
  },
  {
    id: 4,
    title: "Whiskas Katzenfutter Multipack",
    price: "18.50",
    category: "Katzenfutter",
    image: "/cat-food-bowls.jpg",
    seller: "Peter M.",
    location: "Luzern, 7.5 km",
    description:
      "Beliebter Klassiker von Whiskas in verschiedenen Geschmacksrichtungen. Das Multipack bietet deiner Katze eine abwechslungsreiche Auswahl. Meine Katzen fressen nur noch Premium-Futter, daher gebe ich diesen Rest günstig ab. Originalverpackt und versiegelt. Perfekt für Katzen, die klassisches Futter bevorzugen.",
    images: ["/cat-food-bowls.jpg"],
  },
  {
    id: 9,
    title: "Royal Canin Indoor Katzenfutter 4kg",
    price: "42.00",
    category: "Katzenfutter",
    image: "/cat-food-bowls.jpg",
    seller: "Markus L.",
    location: "Bern, 6.3 km",
    description:
      "Premium Trockenfutter speziell für Wohnungskatzen entwickelt. Unterstützt die Verdauung und reduziert unangenehme Gerüche durch optimierte Nährstoffzusammensetzung. Hilft bei der Gewichtskontrolle und fördert ein glänzendes Fell. Originalverpackt und ungeöffnet. Habe versehentlich zu viel bestellt, daher 10 CHF unter Ladenpreis.",
    images: ["/cat-food-bowls.jpg", "/cat-grooming.png"],
  },
  {
    id: 10,
    title: "Katzenfutter Senior 7+ Jahre",
    price: "27.50",
    category: "Katzenfutter",
    image: "/cat-food-bowls.jpg",
    seller: "Sarah T.",
    location: "Zürich, 3.7 km",
    description:
      "Speziell formuliert für ältere Katzen ab 7 Jahren mit angepasstem Energie- und Nährstoffgehalt. Enthält Glucosamin für die Gelenke und zusätzliche Vitamine zur Unterstützung des Immunsystems. Leicht verdaulich und schonend für empfindliche Mägen. Meine Seniorkatze ist leider verstorben, daher verkaufe ich den noch versiegelten Rest.",
    images: ["/cat-food-bowls.jpg"],
  },

  // Spielmäuse
  {
    id: 11,
    title: "Plüschmaus mit Katzenminze",
    price: "5.90",
    category: "Spielmäuse",
    image: "/playful-cat.png",
    seller: "Laura F.",
    location: "Zürich, 2.1 km",
    description:
      "Süsse Plüschmaus gefüllt mit echter Katzenminze, die deine Katze zum Spielen animiert. Die Katzenminze wirkt aktivierend und sorgt für stundenlangen Spielspass. Robuste Verarbeitung, waschbar bei 30°C. Perfekt für Katzen jeden Alters. Neuwertig, wurde nur einmal verwendet.",
    images: ["/playful-cat.png", "/cat-interactive-toys.jpg"],
  },
  {
    id: 5,
    title: "Interaktive Spielmaus mit Feder",
    price: "12.90",
    category: "Spielmäuse",
    image: "/playful-cat.png",
    seller: "Sandra M.",
    location: "Zürich, 1.5 km",
    description:
      "Elektrische Spielmaus, die sich selbstständig und unvorhersehbar bewegt - garantiert die Aufmerksamkeit deiner Katze! Mit bunten Federn ausgestattet, die den Jagdinstinkt wecken. Automatische Abschaltung nach 15 Minuten Dauerbetrieb schont die Batterien. Batteriebetrieben, Batterien bereits inklusive. Wie neu, kaum benutzt.",
    images: ["/playful-cat.png", "/cat-with-leash.jpg"],
  },
  {
    id: 12,
    title: "Mechanische Maus Set - 3 Stück",
    price: "14.50",
    category: "Spielmäuse",
    image: "/playful-cat.png",
    seller: "Kevin R.",
    location: "Winterthur, 6.8 km",
    description:
      "Drei mechanische Mäuse mit Aufziehmechanismus für stundenlangen Spielspass. Jede Maus bewegt sich unterschiedlich - im Kreis, im Zickzack oder geradeaus. Trainiert die Reflexe und hält deine Katze fit. Robuste Kunststoff-Konstruktion. Set mit 3 verschiedenfarbigen Mäusen. Gebraucht aber voll funktionsfähig.",
    images: ["/playful-cat.png"],
  },

  // Pflege & Hygiene
  {
    id: 6,
    title: "Katzenklo selbstreinigend",
    price: "89.00",
    category: "Pflege & Hygiene",
    image: "/cat-grooming.png",
    seller: "Michael R.",
    location: "Winterthur, 4.2 km",
    description:
      "Modernes selbstreinigendes Katzenklo mit automatischer Reinigungsfunktion spart Zeit und hält die Wohnung frisch. Der Sensor erkennt, wenn deine Katze das Klo verlassen hat und startet automatisch den Reinigungszyklus. Geruchsfilter inklusive. Sehr guter Zustand, nur 3 Monate alt. Verkauf wegen Umzug ins Ausland. Originalpreis war 149 CHF.",
    images: ["/cat-grooming.png", "/cat-interactive-toys.jpg"],
  },
  {
    id: 13,
    title: "Fellbürste für Langhaarkatzen",
    price: "15.90",
    category: "Pflege & Hygiene",
    image: "/cat-grooming.png",
    seller: "Nina P.",
    location: "Basel, 3.5 km",
    description:
      "Professionelle Fellbürste speziell für Langhaarkatzen entwickelt. Entfernt sanft lose Haare und Unterwolle, verhindert Verfilzungen und reduziert Haarballen. Mit ergonomischem Griff für komfortables Bürsten. Die abgerundeten Zinken massieren die Haut und fördern die Durchblutung. Neuwertig, kaum benutzt da meine Katze das Bürsten nicht mag.",
    images: ["/cat-grooming.png", "/playful-cat.png"],
  },
  {
    id: 14,
    title: "Katzenshampoo Bio 250ml",
    price: "12.50",
    category: "Pflege & Hygiene",
    image: "/cat-grooming.png",
    seller: "Tobias K.",
    location: "Luzern, 5.2 km",
    description:
      "Mildes Bio-Shampoo speziell für empfindliche Katzenhaut. Mit natürlichen Inhaltsstoffen wie Aloe Vera und Kamille. pH-neutral, parfümfrei und dermatologisch getestet. Macht das Fell weich, glänzend und leicht kämmbar. 250ml Flasche, etwa zur Hälfte voll. Meine Katze lässt sich nicht baden, daher abzugeben.",
    images: ["/cat-grooming.png"],
  },

  // Interaktive Spielzeuge
  {
    id: 7,
    title: "Elektronisches Katzenspielzeug",
    price: "45.00",
    category: "Interaktive Spielzeuge",
    image: "/cat-interactive-toys.jpg",
    seller: "Lisa W.",
    location: "St. Gallen, 8.9 km",
    description:
      "Hochwertiges interaktives Spielzeug mit rotierenden Elementen und bunten LED-Lichtern für maximalen Spielspass. Drei verschiedene Geschwindigkeitsstufen und programmierbare Timer-Funktion (15/30/45 Min). Hält deine Katze aktiv und geistig beschäftigt, auch wenn du nicht zu Hause bist. Batteriebetrieb oder USB-Kabel. Neuwertig, in OVP.",
    images: ["/cat-interactive-toys.jpg", "/playful-cat.png", "/cat-with-leash.jpg"],
  },
  {
    id: 15,
    title: "Laser Pointer für Katzen",
    price: "8.90",
    category: "Interaktive Spielzeuge",
    image: "/cat-interactive-toys.jpg",
    seller: "Daniel B.",
    location: "Zürich, 4.1 km",
    description:
      "Klassischer Laser Pointer mit verschiedenen Mustern (Punkt, Maus, Schmetterling) für abwechslungsreiche Jagdspiele. Ergonomischer Griff mit Handschlaufe. Trainiert Reflexe und hält deine Katze fit. Mit automatischer Abschaltfunktion. Batterien inklusive. Praktisch neu, nur 2x verwendet. Perfekt für interaktives Spielen mit deiner Katze.",
    images: ["/cat-interactive-toys.jpg"],
  },
  {
    id: 16,
    title: "Intelligenzspielzeug Futter-Puzzle",
    price: "24.90",
    category: "Interaktive Spielzeuge",
    image: "/cat-interactive-toys.jpg",
    seller: "Sophie M.",
    location: "Bern, 2.9 km",
    description:
      "Anspruchsvolles Intelligenzspielzeug, das die geistigen Fähigkeiten deiner Katze fördert. Mehrere Schwierigkeitsstufen durch verstellbare Öffnungen. Perfekt zur Beschäftigung und gegen Langeweile. Kann mit Trockenfutter oder Leckerlis befüllt werden. Spülmaschinenfest für einfache Reinigung. Wie neu, da meine Katze zu faul dafür ist.",
    images: ["/cat-interactive-toys.jpg", "/cat-food-bowls.jpg"],
  },

  // Alle Spielzeuge
  {
    id: 8,
    title: "Katzenspielzeug Set - 10 Teile",
    price: "19.90",
    category: "Alle Spielzeuge",
    image: "/cat-with-leash.jpg",
    seller: "Julia H.",
    location: "Zürich, 2.8 km",
    description:
      "Umfangreiches Spielzeug-Set mit 10 verschiedenen Teilen: Mäuse, Bälle, Federn, Glöckchen und mehr für maximale Abwechslung. Hergestellt aus langlebigen, ungiftigen Materialien. Perfekt für junge, verspielte Katzen die Abwechslung lieben. Alles in gutem Zustand, hygienisch gereinigt und desinfiziert. Komplett-Set zum Sonderpreis.",
    images: ["/cat-with-leash.jpg", "/playful-cat.png"],
  },
  {
    id: 17,
    title: "Federangel-Set mit 5 Anhängern",
    price: "16.50",
    category: "Alle Spielzeuge",
    image: "/cat-with-leash.jpg",
    seller: "Patrick W.",
    location: "Winterthur, 7.3 km",
    description:
      "Professionelle Federangel mit Teleskop-Stab (ausziehbar bis 90cm) und 5 austauschbaren Anhängern. Verschiedene Farben und Formen wecken den Jagdinstinkt. Fördert Bewegung und stärkt die Bindung zwischen dir und deiner Katze. Stabile Konstruktion mit flexibler Schnur. Wie neu, alle Anhänger vollständig vorhanden.",
    images: ["/cat-with-leash.jpg"],
  },
  {
    id: 18,
    title: "Kratzbaum klein mit Spielzeug",
    price: "55.00",
    category: "Alle Spielzeuge",
    image: "/cat-with-leash.jpg",
    seller: "Emma S.",
    location: "Basel, 4.6 km",
    description:
      "Kompakter Kratzbaum perfekt für kleine Wohnungen. Mit Sisalsäulen zum Krallenschärfen, Liegefläche und integrierten Spielzeugen (Bälle, Federn). Höhe 75cm, stabile Bodenplatte. Schützt deine Möbel und bietet deiner Katze einen eigenen Rückzugsort. Gebraucht aber gepflegt, keine Beschädigungen. Muss wegen Platzmangel weg.",
    images: ["/cat-with-leash.jpg", "/playful-cat.png", "/tabby-cat-sunbeam.png"],
  },
]

export const categoryMap: Record<string, string> = {
  katzenfutter: "Katzenfutter",
  spielmaeuse: "Spielmäuse",
  "pflege-hygiene": "Pflege & Hygiene",
  "interaktive-spielzeuge": "Interaktive Spielzeuge",
  "alle-spielzeuge": "Alle Spielzeuge",
}

export function getItemById(id: number): MarketplaceItem | undefined {
  return marketplaceItems.find((item) => item.id === id)
}

export function getItemsByCategory(category: string): MarketplaceItem[] {
  return marketplaceItems.filter((item) => item.category === category)
}
