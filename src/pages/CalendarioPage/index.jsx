import "./CalendarioPage.css";
import { useCalendario } from "../../hooks/useCalendario";

export default function CalendarioPage() {
  const { matches, loading, error } = useCalendario();

  if (loading) {
    return (
      <main className="calendario-page">
        <h1>Calendario</h1>
        <div className="status-message loading">Cargando el calendario...</div>
      </main>
    );
  }

  if (error || !matches || matches.length === 0) {
    return (
      <main className="calendario-page">
        <h1>Calendario</h1>
        <div className="status-message error">No se pudo cargar el calendario.</div>
      </main>
    );
  }

  return (
    <main className="calendario-page">
      <h1>Calendario Clausura 2026</h1>
      <p className="page-description">Sigue todos los resultados y próximos partidos de Pumas UNAM.</p>
      
      <div className="calendario-grid">
        {matches.map((match, index) => {
          const home = match.local || (match.condicion === "Local" ? "Pumas" : match.rival);
          const away = match.visita || (match.condicion === "Visitante" ? "Pumas" : match.rival);
          const score = match.marcador || match.resultado || "";
          
          let homeScore = "";
          let awayScore = "";
          let isFuture = true;

          if (score !== "Próximo" && score.includes("-")) {
            const scores = score.split("-").map((s) => s.trim());
            homeScore = scores[0] || "";
            awayScore = scores[1] || "";
            isFuture = false;
          }

          const matchDate = match.fecha || "Fecha por definir";
          const matchTime = match.hora ? ` - ${match.hora}` : "";
          const statusText = isFuture ? "Por Jugar" : "Finalizado";

          return (
            <article
              key={index}
              className={`match-card ${isFuture ? "future" : "past"}`}
              aria-label={`Jornada ${match.jornada}: ${home} ${homeScore ? homeScore + " a" : "contra"} ${awayScore ? awayScore + " " : ""}${away}`}
              tabIndex="0"
            >
              <header className="match-header">
                <span className="jornada">{match.jornada}</span>
                <span className={`status-badge ${isFuture ? "future-badge" : "past-badge"}`}>
                  {statusText}
                </span>
              </header>
              <div className="match-date">
                <time>{matchDate}{matchTime}</time>
              </div>
              <div className="match-details">
                <div className="team">
                  <span className="team-name">{home}</span>
                  {!isFuture && <span className="score">{homeScore}</span>}
                </div>
                <div className="versus">vs</div>
                <div className="team">
                  {!isFuture && <span className="score">{awayScore}</span>}
                  <span className="team-name">{away}</span>
                </div>
              </div>
              {isFuture && (
                <div className="match-footer">
                  <span>Próximo Encuentro</span>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </main>
  );
}
