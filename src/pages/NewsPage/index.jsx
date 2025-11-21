import "./NewsPage.css";
import NewsCard from "../../components/NewsCard";

const NEWS = [
  {
    id: 1,
    title: "Pumas vence a Cruz Azul y se mete a Play-In",
    date: "2025-11-09",
    image:
      "https://i.ytimg.com/vi/lhT32tJN7Hs/hqdefault.jpg?sqp=-oaymwEnCNACELwBSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLATzAejdjNII4uz3LjTjA7yrvnA5g",
    excerpt:
      "Con marcador de 2-3, Pumas aseguró su lugar en la fase de play-in.",
  },
  {
    id: 2,
    title: "Cantera Puma: debutan dos juveniles",
    date: "2025-01-15",
    image:
      "https://www.futboltotal.com.mx/wp-content/uploads/2024/11/misael-torres-pumas-inferiores-1024x678.jpg",
    excerpt:
      "Dos jóvenes formados en la cantera universitaria tuvieron minutos en el primer equipo.",
  },
  {
    id: 3,
    title: "Pumas anuncia fichaje de Álvaro Angulo",
    date: "2025-07-16",
    excerpt:
      "El defensa colombiano se une al equipo para fortalecer la zaga universitaria.",
    video: {
      normal: "GouRLxFmU1Y",
      ad: "d49gUxqr5tg",
    },
  },
  {
    id: 4,
    title: "Pumas anuncia fichaje de Aaron Ramsey",
    date: "2025-07-04",
    video: {
      normal: "NhDw2b7J9ZQ",
      ad: "BiBQ7GKcgGE",
    },
    excerpt:
      "El experimentado mediocampista galés se une al equipo para aportar su calidad y liderazgo.",
  },
];

export default function NewsSection() {
  return (
    <main className="news-section">
      <section className="news-hero">
        <h2>Últimas Noticias</h2>
        <p>Enterate de las últimas novedades del Club Universidad Nacional</p>
      </section>

      <div className="news-grid">
        {NEWS.map((item) => (
          <NewsCard news={item} key={item.id} />
        ))}
      </div>
    </main>
  );
}
