import "./PlayersPage.css";
import { useState } from "react";
import { JUGADORES_IMAGES } from "../../utils/images";
import PlayerCard from "../../components/PlayerCard";
import PlayerModal from "../../components/PlayerModal";

const playersData = [
  {
    name: "Pablo Lara",
    number: 35,
    position: "Portero",
    nationality: "México",
    birthDate: "29-06-2005",
    bio: "Joven portero canterano de Pumas con notable agilidad y potencial. Lara busca consolidarse en el primer equipo, destacando en las categorías juveniles.",
    image: JUGADORES_IMAGES.pabloLara,
  },
  {
    name: "Rodrigo Parra",
    number: 256,
    position: "Portero",
    nationality: "México",
    birthDate: "28-11-2007",
    bio: "Promesa en la portería de Pumas, Rodrigo Parra es un guardameta juvenil que ya entrena con el primer equipo. Se caracteriza por su valentía y reflejos.",
    image: JUGADORES_IMAGES.rodrigoParra,
  },
  {
    name: "Keylor Navas",
    number: 1,
    position: "Portero",
    nationality: "Costa Rica",
    birthDate: "15-12-1986",
    bio: "Portero costarricense de talla mundial, reconocido por su agilidad, reflejos excepcionales y experiencia en el fútbol europeo. Es un referente de liderazgo bajo los tres palos.",
    image: JUGADORES_IMAGES.keylorNavas,
  },
  {
    name: "Pablo Bennevendo",
    position: "Defensa",
    number: 2,
    nationality: "México",
    birthDate: "03-01-2000",
    bio: "Defensor mexicano surgido de la cantera de Pumas. Se destaca por su polivalencia en la banda derecha, combinando solidez defensiva con proyecciones al ataque.",
    image: JUGADORES_IMAGES.pabloBennevendo,
  },
  {
    name: "Nathan Silva",
    number: 6,
    position: "Defensa",
    nationality: "Brasil",
    birthDate: "06-05-1996",
    bio: "Central brasileño que aporta fuerza física y liderazgo a la zaga de Pumas. Es clave en el juego aéreo y destaca por su buena lectura para anticipar jugadas.",
    image: JUGADORES_IMAGES.nathanSilva,
  },
  {
    name: "Pablo Monroy",
    number: 13,
    position: "Defensa",
    nationality: "México",
    birthDate: "22-07-2002",
    bio: "Joven lateral mexicano, producto de las fuerzas básicas de Pumas. Posee gran proyección ofensiva y se distingue por su velocidad y manejo de balón.",
    image: JUGADORES_IMAGES.pabloMonroy,
  },
  {
    name: "Ruben Duarte",
    number: 5,
    position: "Defensa",
    nationality: "España",
    birthDate: "18-10-1995",
    bio: "Defensor español con una amplia trayectoria en La Liga. Aporta experiencia y versatilidad en la línea defensiva, siendo un jugador inteligente en la marca y el despliegue.",
    image: JUGADORES_IMAGES.rubenDuarte,
  },
  {
    name: "Álvaro Angulo",
    number: 77,
    position: "Defensa",
    nationality: "Colombia",
    birthDate: "06-03-1997",
    bio: "Lateral izquierdo colombiano conocido por su recorrido por la banda y su agresividad para recuperar balones. Aporta intensidad y dinamismo al sector defensivo.",
    image: JUGADORES_IMAGES.alvaroAngulo,
  },
  {
    name: "Ulises Rivas",
    number: 15,
    position: "Medio",
    nationality: "México",
    birthDate: "25-01-1996",
    bio: "Mediocampista mexicano de corte defensivo. Es un pilar en la recuperación de balones y destaca por su inteligencia táctica para equilibrar al equipo en el centro del campo.",
    image: JUGADORES_IMAGES.ulisesRivas,
  },
  {
    name: "Santiago Trigos",
    number: 20,
    position: "Medio",
    nationality: "México",
    birthDate: "22-01-2002",
    bio: "Mediocampista central con buena técnica y visión de juego. Canterano de Pumas, Trigos se perfila como una de las jóvenes promesas para el mediocampo universitario.",
    image: JUGADORES_IMAGES.santiagoTrigos,
  },
  {
    name: "José Caicedo",
    number: 18,
    position: "Medio",
    nationality: "Colombia",
    birthDate: "23-05-2002",
    bio: "Joven mediocampista colombiano con vocación defensiva. Destaca por su despliegue físico y capacidad de cobertura, siendo importante en la contención del rival.",
    image: JUGADORES_IMAGES.joseCaicedo,
  },
  {
    name: "Rodrigo López",
    number: 7,
    position: "Medio",
    nationality: "México",
    birthDate: "12-11-2001",
    bio: "Mediocampista ofensivo mexicano que se caracteriza por su habilidad en el uno contra uno, visión de juego y capacidad para generar oportunidades de gol.",
    image: JUGADORES_IMAGES.rodrigoLopez,
  },
  {
    name: "Jorge Ruvalcaba",
    number: 17,
    position: "Medio",
    nationality: "México",
    birthDate: "23-07-2001",
    bio: "Extremo mexicano con mucha velocidad y desequilibrio por la banda. Formado en la cantera, aporta dinamismo y regate al ataque de los Pumas.",
    image: JUGADORES_IMAGES.jorgeRuvalcaba,
  },
  {
    name: "Aaron Ramsey",
    number: 10,
    position: "Medio",
    nationality: "Gales",
    birthDate: "26-12-1990",
    bio: "Mediocampista galés de amplia trayectoria internacional. Aporta clase, experiencia y gol desde el mediocampo, siendo un jugador clave en la creación de juego de Pumas.",
    image: JUGADORES_IMAGES.aaronRamsey,
  },
  {
    name: "Ángel Rico",
    number: 26,
    position: "Medio",
    nationality: "México",
    birthDate: "12-01-2005",
    bio: "Promesa de la cantera de Pumas, Ángel Rico es un mediocampista ofensivo con potencial. Destaca por su técnica individual y su capacidad para asistir a sus compañeros.",
    image: JUGADORES_IMAGES.angelRico,
  },
  {
    name: "Adalberto Carrasquilla",
    number: 28,
    position: "Medio",
    nationality: "Panamá",
    birthDate: "28-11-1998",
    bio: "Mediocampista panameño conocido por su energía y distribución en el centro del campo. Es un referente en su selección y aporta garra y calidad a Pumas.",
    image: JUGADORES_IMAGES.adalbertoCarrasquilla,
  },
  {
    name: "Pedro Vite",
    number: 45,
    position: "Medio",
    nationality: "Ecuador",
    birthDate: "09-03-2002",
    bio: "Joven volante ecuatoriano con gran futuro. Vite es un jugador habilidoso, creativo y con buen golpeo de balón, ideal para la creación de oportunidades en el ataque.",
    image: JUGADORES_IMAGES.pedroVite,
  },
  {
    name: "Alan Medina",
    number: 22,
    position: "Medio",
    nationality: "México",
    birthDate: "19-08-1997",
    bio: "Mediocampista mexicano que aporta desborde y velocidad por los costados. Se caracteriza por su habilidad para encarar y su buen centro al área.",
    image: JUGADORES_IMAGES.alanMedina,
  },
  {
    name: "Guillermo Martínez",
    number: 9,
    position: "Delantero",
    nationality: "México",
    birthDate: "15-03-1995",
    bio: "Delantero centro mexicano, apodado 'El Memote'. Es un atacante con presencia en el área, buen juego de espaldas y olfato goleador.",
    image: JUGADORES_IMAGES.guillermoMartinez,
  },
  {
    name: "Santiago López",
    number: 30,
    position: "Delantero",
    nationality: "México",
    birthDate: "10-06-2005",
    bio: "Joven atacante canterano de Pumas. Santiago López es una promesa en el ataque, destacando por su movilidad y capacidad de definición.",
    image: JUGADORES_IMAGES.santiagoLopez,
  },
  {
    name: "Jose Juan Macías",
    number: 11,
    position: "Delantero",
    nationality: "México",
    birthDate: "22-09-1999",
    bio: "Delantero mexicano conocido por su calidad técnica y potente remate. Macías busca retomar su mejor nivel, aportando goles y experiencia ofensiva al equipo.",
    image: JUGADORES_IMAGES.joseMacias,
  },
  {
    name: "Efraín Juarez",
    number: "DT",
    position: "Director Técnico",
    nationality: "México",
    birthDate: "22-02-1988",
    bio: "Exfutbolista y actual Director Técnico mexicano. Efraín Juárez dirige a Pumas con una visión moderna, buscando imprimir disciplina táctica y dinamismo en el juego del equipo universitario.",
    image: JUGADORES_IMAGES.efrainJuarez,
  },
];

export default function PlayersPage() {
  const [filter, setFilter] = useState("Todos");
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const positions = [
    "Todos",
    "Portero",
    "Defensa",
    "Medio",
    "Delantero",
    "Director Técnico",
  ];

  const filteredPlayers =
    filter === "Todos"
      ? playersData
      : playersData.filter((p) => p.position === filter);

  const openModal = (player) => {
    setSelectedPlayer(player);
    document.body.style.overflow = "hidden"; // bloquea scroll
  };

  const closeModal = () => {
    setSelectedPlayer(null);
    document.body.style.overflow = "auto"; // restaura scroll
  };

  return (
    <main className="players-container">
      <section className="players-hero">
        <h2>Plantilla Pumas UNAM</h2>
        <p>Conoce a los jugadores que defienden nuestros colores</p>
      </section>

      <div className="filters">
        {positions.map((pos) => (
          <button
            key={pos}
            className={`filter-btn ${filter === pos ? "active" : ""}`}
            aria-label={`Filtrar por posición: ${pos}`}
            onClick={() => setFilter(pos)}
          >
            {pos}
          </button>
        ))}
      </div>

      <div className="players-grid">
        {filteredPlayers.map((player) => (
          <PlayerCard
            player={player}
            key={player.number}
            onClick={() => openModal(player)}
          />
        ))}
      </div>
      {selectedPlayer && (
        <PlayerModal player={selectedPlayer} onClose={closeModal} />
      )}
    </main>
  );
}
