import estadioImg from "../../assets/estadio.webp";
import "./Estadio.css";

export default function Estadio() {
  return (
    <section className="estadio">
      <figure>
        <img src={estadioImg} alt="" />
        <h2>Estadio Olímpico Universitario</h2>
        <figcaption>
          Capacidad: 72,000 espectadores | Inaugurado: 1952
        </figcaption>
      </figure>
    </section>
  );
}
