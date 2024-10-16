import { PlacesVisited } from "@/components/places-visited";

export default function Home() {
  const locations = [
    { lat: 52.2297, lng: 21.0122, label: "Warszawa", country: "Poland" },
    { lat: 54.352, lng: 18.6466, label: "Gdańsk", country: "Poland" },
    { lat: 51.8787, lng: -0.42, label: "Luton", country: "United Kingdom" },
    { lat: 51.5074, lng: -0.1278, label: "London", country: "United Kingdom" },
    {
      lat: 51.5378,
      lng: 0.7139,
      label: "Southend on Sea",
      country: "United Kingdom",
    },
    { lat: 50.2482, lng: 18.8504, label: "Gartatowice", country: "Poland" },
    { lat: 50.6954, lng: -2.1093, label: "Wareham", country: "United Kingdom" },
    {
      lat: 50.6145,
      lng: -2.4576,
      label: "Weymouth",
      country: "United Kingdom",
    },
    { lat: 51.752, lng: -1.2577, label: "Oxford", country: "United Kingdom" },
    { lat: 49.2992, lng: 19.9496, label: "Zakopane", country: "Poland" },
    {
      lat: 49.3744,
      lng: 20.1026,
      label: "Białka Tatrzańska",
      country: "Poland",
    },
    { lat: 51.1079, lng: 17.0385, label: "Wrocław", country: "Poland" },
    { lat: 54.7804, lng: 18.1298, label: "Dębki", country: "Poland" },
    { lat: 28.3587, lng: -14.0537, label: "Fuerteventura", country: "Spain" },
    { lat: 50.0647, lng: 19.945, label: "Krakow", country: "Poland" },
    { lat: 49.8209, lng: 18.2625, label: "Ostrava", country: "Czech Republic" },
    { lat: 49.7512, lng: 18.6264, label: "Cieszyn", country: "Poland" },
    {
      lat: 51.5218,
      lng: -0.7177,
      label: "Maidenhead",
      country: "United Kingdom",
    },
    { lat: 36.7697, lng: 31.3886, label: "Side", country: "Turkey" },
    { lat: 54.0254, lng: 15.2275, label: "Wrzosowo", country: "Poland" },
    { lat: 51.7592, lng: 19.4559, label: "Łódź", country: "Poland" },
    { lat: 36.8383, lng: 27.1546, label: "Tigaki", country: "Greece" },
  ];

  return <PlacesVisited locations={locations} />;
}
