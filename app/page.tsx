import { PlacesVisited } from "@/components/places-visited";

export default function Home() {
  const locations = [
    { lat: 50.8495829, lng: 4.3625714,  label: "Brussels", country: "Belgium" },
    { lat: 52.3605024, lng: 4.900031,   label: "Amsterdam", country: "Netherlands" },
    { lat: 53.5442106, lng: 9.9564375,  label: "Hamburg", country: "Germany" },
    { lat: 39.9280651, lng: -0.4534524, label: "Valencia", country: "Spain" },
    { lat: 44.5742215, lng: 0.820722,   label: "Madrid", country: "Spain" },
    { lat: 43.7697685, lng: 11.2805666, label: "Florence", country: "Italy" },
    { lat: 45.4495038, lng: 12.2971278, label: "Venice", country: "Italy" },
    { lat: 41.8879885, lng: 12.4690875, label: "Roma", country: "Italy" },
    { lat: 41.1114345, lng: 16.8408809, label: "Bari", country: "Italy" },
    { lat: 47.2855349, lng: 11.2963999, label: "Innsbruck", country: "Austria" },
    { lat: 47.0408145, lng: 8.2760532,  label: "Lucerne", country: "Switzerland" },
    { lat: 48.1549958, lng: 11.4594363, label: "Munich", country: "Germany" },
    { lat: 48.5691586, lng: 7.6796798,  label: "Strasbourg", country: "France" },
    { lat: 52.0716998, lng: 4.2686691,  label: "The Hague", country: "Netherlands" },
    { lat: 52.5069386, lng: 13.2599295, label: "Berlin", country: "Germany" },
    { lat: 40.6212232, lng: 22.9254277, label: "Thessaloniki", country: "Greece" },
    { lat: 40.6284376, lng: 22.4544364, label: "Florina", country: "Greece" },
    { lat: 38.2490746, lng: 21.7044065, label: "Patras", country: "Greece" },
    { lat: 39.3652368, lng: 22.9267207, label: "Volos", country: "Greece" },
    { lat: 34.9409376, lng: 25.0503595, label: "Ag. Ioannis", country: "Greece" },
    { lat: 34.846215813705314, lng: 24.084453644128363, label: "Gavdos", country: "Greece" },
  ];

  return <PlacesVisited locations={locations} />;
}
