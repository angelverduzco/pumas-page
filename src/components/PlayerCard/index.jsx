import "./PlayerCard.css";

export default function PlayerCard({ player, onClick }) {
  const handleKeyDown = (e) => {
    // Permite activar con Enter o Espacio
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <figure
      className="player-card"
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      aria-label={`Ver información de ${player.name}, número ${player.number || "desconocido"}`}
    >
      <div className="player-photo-wrapper">
        <img
          src={player.photo}
          alt={`Foto de perfil de ${player.name}`}
          className="player-photo"
          loading="lazy"
        />
      </div>
      <figcaption className="player-info">
        <p className="player-number">
          {player.number !== null ? `#${player.number}` : "-"}
        </p>
        <span className="player-name">{player.name.toUpperCase()}</span>
      </figcaption>
    </figure>
  );
}
