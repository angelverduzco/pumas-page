import "./StandingsPage.css";
import { useFutbolData } from "../../hooks/useFutbol";
import StandingsTable from "../../components/StandingsTable";

export default function StandingsPage() {
  const { data, loading, error } = useFutbolData();

  if (loading) {
    return (
      <main className="standings-container">
        <div className="loading-state">
          <h2>Cargando tabla de posiciones...</h2>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="standings-container">
        <div className="error-state">
          <h2>Hubo un error cargando las posiciones</h2>
          <p>{error}</p>
        </div>
      </main>
    );
  }

  const leagueData = data?.posiciones?.[0]?.league;
  const tableData = leagueData?.standings?.[0] || [];

  return (
    <main className="standings-container">
      <section className="standings-hero">
        {leagueData?.logo && (
          <img
            src={leagueData.logo}
            alt={`Logo oficial de la competencia ${leagueData.name}`}
            className="league-logo"
            loading="lazy"
          />
        )}
        <h2>Tabla de Posiciones</h2>
        <p>Acompaña el recorrido del Equipo en la liga</p>
      </section>

      <section aria-labelledby="standings-heading">
        <h3 id="standings-heading" className="sr-only">
          Clasificación de equipos
        </h3>
        {tableData.length > 0 ? (
          <StandingsTable standings={tableData} />
        ) : (
          <p className="empty-state" role="alert">
            La tabla de posiciones no está disponible en este momento.
          </p>
        )}
      </section>
    </main>
  );
}
