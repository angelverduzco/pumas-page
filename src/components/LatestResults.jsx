import "../styles/latestResults.css";

const LatestResults = () => {
  const results = [
    {
      date: "2025-10-19",
      home: "Monterrey",
      away: "Pumas UNAM",
      homeScore: 1,
      awayScore: 1,
      competition: "Liga MX",
    },
    {
      date: "2025-10-05",
      home: "Pumas UNAM",
      away: "Chivas",
      homeScore: 1,
      awayScore: 2,
      competition: "Liga MX",
    },
    {
      date: "2025-09-27",
      home: "América",
      away: "Pumas UNAM",
      homeScore: 4,
      awayScore: 1,
      competition: "Liga MX",
    },
  ];

  return (
    <section className="latest-results">
      <h2 id="results-title" className="results-title">
        Últimos Resultados
      </h2>
      <div className="results-container">
        {results.map((match, index) => (
          <article
            key={index}
            className="match-card"
            aria-label={`Resultado: ${match.home} ${match.homeScore} - ${match.awayScore} ${match.away}`}
          >
            <div className="match-date">
              <time dateTime={match.date}>
                {new Date(match.date).toLocaleDateString("es-MX")}
              </time>
            </div>
            <div className="match-details">
              <div className="team home">
                <span className="team-name">{match.home}</span>
                <span className="score">{match.homeScore}</span>
              </div>
              <div className="versus">vs</div>
              <div className="team away">
                <span className="score">{match.awayScore}</span>
                <span className="team-name">{match.away}</span>
              </div>
            </div>
            <div className="competition">
              <span>{match.competition}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default LatestResults;
