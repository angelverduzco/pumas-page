import "./TrophiesPage.css";
import ligamxTrophy from "../../assets/ligamx.webp";
import campeonDeCampeonesTrophy from "../../assets/campeon_de_campeones.webp";
import concacafTrophy from "../../assets/concachampions.webp";
import TrophyCard from "../../components/TrophyCard";
import copaMexicoTrophy from "../../assets/copa_mexico.webp";
import segundaDivisionTrophy from "../../assets/segunda_division.webp";
import interamericanaTrophy from "../../assets/copa_interamericana.webp";
import santiagoBernabeuTrophy from "../../assets/copa_santiago_bernabeu.webp";

const trophies = [
  {
    name: "Liga MX",
    count: 7,
    years: [
      "1976-77",
      "1980-81",
      "1990-91",
      "2004(C)",
      "2004(A)",
      "2009(C)",
      "2011(C)",
    ],
    image: ligamxTrophy,
  },
  {
    name: "Copa de Campeones de la Concacaf",
    count: 3,
    years: ["1981", "1982", "1989"],
    image: concacafTrophy,
  },
  {
    name: "Copa México",
    count: 1,
    years: ["1974-1975"],
    image: copaMexicoTrophy,
  },
  {
    name: "Copa Interamericana",
    count: 1,
    years: ["1981"],
    image: interamericanaTrophy,
  },
  {
    name: "Campeón de Campeones",
    count: 2,
    years: ["1974-1975", "2003-2004"],
    image: campeonDeCampeonesTrophy,
  },
  {
    name: "Trofeo Santiago Bernabéu",
    count: 1,
    years: ["1975"],
    image: santiagoBernabeuTrophy,
  },
  {
    name: "Segunda División",
    count: 1,
    years: ["1961-1962"],
    image: segundaDivisionTrophy,
  },
];

export default function TrophiesPage() {
  return (
    <div className="trophies-container">
      <header className="hero-section">
        <h1>Palmarés de Pumas UNAM</h1>
        <p>Una historia de gloria y pasión universitaria</p>
      </header>

      <div className="trophies-grid">
        {trophies.map((trophy, index) => (
          <TrophyCard trophy={trophy} key={index} />
        ))}
      </div>
    </div>
  );
}
