import campeonImg from "../../assets/campeon.webp";
import "./Introduction.css";

export default function Introduction() {
  return (
    <section className="introduction">
      <div>
        <h2>La Máxima Casa De Estudios</h2>
        <p>
          Los Pumas de la UNAM son uno de los equipos más emblemáticos del
          fútbol mexicano, representando con orgullo a la Universidad Nacional
          Autónoma de México desde 1954. <br />
          Con 7 campeonatos de liga y una rica tradición de formar talento desde
          sus fuerzas básicas, los Pumas son sinónimo de garra, corazón y pasión
          universitaria.
        </p>
      </div>
      <img
        src={campeonImg}
        alt="Equipo de Pumas levantando el trofeo de campeones en 2011"
      />
    </section>
  );
}
