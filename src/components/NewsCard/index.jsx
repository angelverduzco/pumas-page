import { useState } from "react";
import "./NewsCard.css";
import pumaLogo from "../../assets/puma.webp";

export default function NewsCard({ news }) {
  const [showRelated, setShowRelated] = useState(false);

  // Formatear la fecha en es-MX
  const formattedDate = new Date(news.pubDate).toLocaleDateString("es-MX", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const hasRelated = news.relatedArticles && news.relatedArticles.length > 0;

  return (
    <article className="news-card">
      {/* Cabecera visual premium con gradiente deportivo y marca de agua de Puma */}
      <div className="news-card-banner">
        <div className="news-banner-overlay"></div>
        <img src={pumaLogo} alt="" className="news-banner-watermark" />

        {/* Badge del medio fuente */}
        <span className="news-source-badge">{news.source}</span>
      </div>

      <div className="news-body">
        {/* Fecha y hora de publicación */}
        <time className="news-date" dateTime={news.pubDate}>
          {formattedDate}
        </time>

        {/* Título de la noticia */}
        <h3 className="news-heading">
          <a
            href={news.link}
            target="_blank"
            rel="noopener noreferrer"
            className="news-title-link"
            title={`Leer: ${news.title}`}
          >
            {news.title}
          </a>
        </h3>

        <div className="news-footer-actions">
          {/* Botón de acción principal */}
          <a
            href={news.link}
            target="_blank"
            rel="noopener noreferrer"
            className="news-read-more-btn"
          >
            Leer artículo completo
            <svg
              aria-hidden="true"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="news-btn-icon"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </div>

        {/* Sección interactiva de cobertura relacionada */}
        {hasRelated && (
          <div className="news-related-section">
            <button
              onClick={() => setShowRelated(!showRelated)}
              className={`news-related-toggle ${showRelated ? "is-expanded" : ""}`}
              aria-expanded={showRelated}
              aria-controls={`related-articles-${news.guid || news.title}`}
            >
              <span>
                {showRelated
                  ? "Ocultar cobertura adicional"
                  : `Ver cobertura relacionada (${news.relatedArticles.length})`}
              </span>
              <svg
                aria-hidden="true"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="news-toggle-chevron"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            <div
              id={`related-articles-${news.guid || news.title}`}
              className={`news-related-list-container ${showRelated ? "is-open" : ""}`}
            >
              <ul className="news-related-list">
                {news.relatedArticles.map((art, idx) => (
                  <li key={idx} className="news-related-item">
                    <a
                      href={art.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="news-related-link"
                    >
                      <span className="news-related-source-badge">
                        {art.source}
                      </span>
                      <span className="news-related-title">{art.title}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
