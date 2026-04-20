import "./StandingsTable.css";

export default function StandingsTable({ standings }) {
  return (
    <div
      className="table-responsive-wrapper"
      role="region"
      aria-label="Tabla del torneo"
      tabIndex="0"
    >
      <table className="standings-table">
        <caption className="sr-only">
          Posiciones actuales de los equipos en la liga
        </caption>
        <thead>
          <tr>
            <th scope="col" aria-label="Posición" className="col-rank">
              #
            </th>
            <th scope="col" aria-label="Club de Fútbol" className="col-team">
              Club
            </th>
            <th scope="col" aria-label="Puntos" title="Puntos totales">
              Pts
            </th>
            <th
              scope="col"
              aria-label="Partidos Jugados"
              title="Partidos Jugados"
              className="hide-mobile"
            >
              PJ
            </th>
            <th
              scope="col"
              aria-label="Partidos Ganados"
              title="Ganados"
              className="hide-mobile"
            >
              G
            </th>
            <th
              scope="col"
              aria-label="Partidos Empatados"
              title="Empatados"
              className="hide-mobile"
            >
              E
            </th>
            <th
              scope="col"
              aria-label="Partidos Perdidos"
              title="Perdidos"
              className="hide-mobile"
            >
              P
            </th>
            <th
              scope="col"
              aria-label="Diferencia de Goles"
              title="Diferencia de Goles"
            >
              DG
            </th>
          </tr>
        </thead>
        <tbody>
          {standings.map((row) => {
            const isPumas = row.team.id === 2286;
            return (
              <tr
                key={row.team.id}
                className={isPumas ? "highlight-team" : ""}
                aria-label={isPumas ? "Pumas UNAM, tu equipo" : null}
              >
                <td className="col-rank">
                  <strong>{row.rank}</strong>
                </td>
                <td className="col-team">
                  <div className="team-info">
                    <img
                      src={row.team.logo}
                      alt={`Escudo Oficial del equipo ${row.team.name}`}
                      loading="lazy"
                      width="35"
                      height="35"
                    />
                    <span>{row.team.name}</span>
                  </div>
                </td>
                <td className="col-points">
                  <strong>{row.points}</strong>
                </td>
                <td className="hide-mobile">{row.all.played}</td>
                <td className="hide-mobile">{row.all.win}</td>
                <td className="hide-mobile">{row.all.draw}</td>
                <td className="hide-mobile">{row.all.lose}</td>
                <td className="col-diff">
                  {row.goalsDiff > 0 ? `+${row.goalsDiff}` : row.goalsDiff}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
