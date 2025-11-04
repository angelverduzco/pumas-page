import "./PlayerCard.css";

export default function PlayerCard({ player, onClick }) {
  return (
    <figure
      className="player-card"
      role="button"
      onClick={onClick}
      aria-label={`Ver detalles de ${player.name}, número ${player.number}`}
    >
      <img src={player.image} role="presentation" className="player-photo" />
      <figcaption className="player-info">
        <p className="player-number">#{player.number}</p>
        <span className="player-name">{player.name.toUpperCase()}</span>
      </figcaption>
    </figure>
  );
}
