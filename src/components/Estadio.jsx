import estadioImg from "../assets/estadio.webp";
import "../styles/estadio.css";

export default function Estadio() {
  return (
    <section className="estadio">
      <h2>Estadio Olímpico Universitario</h2>
      <figure>
        <img src={estadioImg} alt="Estadio Olímpico Universitario" />
        <figcaption>
          Capacidad: 72,000 espectadores | Inaugurado: 1952
        </figcaption>
      </figure>
    </section>
  );
}
