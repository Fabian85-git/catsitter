export const findCatsOwners = [
  {
    id: "1",
    name: "Sandra",
    image: "/orange-tabby-cat.jpg",
    cats: "Katzen Joe & Zen",
    distance: "ca. 60m entfernt",
    dates: "2.-3. November 2025",
    status: "Tausch",
  },
  {
    id: "2",
    name: "Adrian",
    image: "/grey-white-cat.jpg",
    cats: "Katzen Joe & Zen",
    distance: "ca. 90m entfernt",
    dates: "15. November 2025",
    status: "Tausch",
  },
  {
    id: "3",
    name: "Anna",
    image: "/smiling-brown-haired-woman.png",
    cats: "Katzen Joe & Zen",
    distance: "ca. 120m entfernt",
    dates: "1.-7. November 2025",
    status: "Bezahlt",
  },
  {
    id: "4",
    name: "Charly",
    image: "/dark-haired-man.png",
    cats: "Katzen Joe & Zen",
    distance: "ca. 210m entfernt",
    dates: "12.-15. November 2025",
    status: "Tausch",
  },
  {
    id: "5",
    name: "Esmeralda",
    image: "/fluffy-persian-cat.jpg",
    cats: "Katze Joe",
    distance: "ca. 40m entfernt",
    dates: "5.-9. November 2025",
    status: "Tausch",
  },
  {
    id: "6",
    name: "Flo",
    image: "/bearded-man.jpg",
    cats: "Katze Joe",
    distance: "ca. 40m entfernt",
    dates: "5.-9. November 2025",
    status: "Bezahlt",
  },
]

export function getOwnerById(id: string) {
  return findCatsOwners.find((owner) => owner.id === id)
}

export function getOwnerByName(name: string) {
  return findCatsOwners.find((owner) => owner.name.toLowerCase() === name.toLowerCase())
}
