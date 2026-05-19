import { useState } from "react";
import "./NewsPage.css";
import NewsCard from "../../components/NewsCard";
import { useNews } from "../../hooks/useNews";
import LoadingState from "../../components/LoadingState";

export default function NewsSection() {
  const { news, loading, error } = useNews();
  const [visibleCount, setVisibleCount] = useState(6);

  // Cargar 6 noticias adicionales al hacer click en "Más noticias"
  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  if (loading) {
    return <LoadingState message="Buscando últimas noticias de Pumas..." />;
  }

  if (error) {
    return (
      <main className="news-section">
        <section className="news-hero">
          <h2>Últimas Noticias</h2>
          <p>Entérate de las últimas novedades del Club Universidad Nacional</p>
        </section>

        <div className="news-error-container">
          <div className="news-error-card">
            <svg
              aria-hidden="true"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="news-error-icon"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <h3>¡Vaya! Algo no salió como esperábamos</h3>
            <p>
              No pudimos cargar las noticias de Pumas en este momento. Por
              favor, vuelve a intentarlo más tarde.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="news-retry-btn"
            >
              Intentar de nuevo
            </button>
          </div>
        </div>
      </main>
    );
  }

  // Filtrar las noticias que se mostrarán de acuerdo a la paginación local
  const visibleNews = news.slice(0, visibleCount);
  const hasMore = news.length > visibleCount;

  return (
    <main className="news-section">
      <section className="news-hero">
        <h2>Últimas Noticias</h2>
        <p>
          Entérate de las últimas novedades del Club Universidad Nacional en
          tiempo real
        </p>
      </section>

      {news.length === 0 ? (
        <div className="news-no-data-container">
          <p>No hay noticias disponibles en este momento. ¡Vuelve más tarde!</p>
        </div>
      ) : (
        <>
          <div className="news-grid">
            {visibleNews.map((item, idx) => (
              <NewsCard news={item} key={item.guid || idx} />
            ))}
          </div>

          {/* Botón de carga de más noticias */}
          {hasMore && (
            <div className="news-pagination-container">
              <button
                onClick={handleLoadMore}
                className="news-load-more-btn"
                aria-label="Cargar más noticias"
              >
                <span>Más noticias</span>
                <svg
                  aria-hidden="true"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="news-load-more-icon"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          )}
        </>
      )}
    </main>
  );
}
