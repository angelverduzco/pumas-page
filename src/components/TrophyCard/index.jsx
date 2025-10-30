import "./TrophyCard.css";

export default function TrophyCard({ trophy }) {
  return (
    <div className="trophy-card">
      <img src={trophy.image} alt="" className="trophy-img" />
      <h2>{trophy.name}</h2>
      <p>{trophy.count} títulos</p>
      <details>
        <summary>Ver años</summary>
        <ul>
          {trophy.years.map((year, i) => (
            <li key={i}>{year}</li>
          ))}
        </ul>
      </details>
    </div>
  );
}
