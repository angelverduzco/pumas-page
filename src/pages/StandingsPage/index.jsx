import "./StandingsPage.css";
import { usePosiciones } from "../../hooks/usePosiciones";
import StandingsTable from "../../components/StandingsTable";

export default function StandingsPage() {
  const { data, loading, error } = usePosiciones();

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

  // El nuevo hook devuelve el arreglo de posiciones directamente en data
  const tableData = data || [];
  const leagueName = tableData[0]?.strLeague || "Liga MX";
  const season = tableData[0]?.strSeason || "Clausura 2026";

  return (
    <main className="standings-container">
      <section className="standings-hero">
        <h2>Tabla de Posiciones</h2>
        <p>
          {leagueName} {season && `— Temporada ${season}`}
        </p>
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
