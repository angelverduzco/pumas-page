import "./PlayerModal.css";
import { calculateAge } from "../../utils/dates";

export default function PlayerModal({ player, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          ✕
        </button>
        <img src={player.image} role="presentation" className="modal-photo" />
        <div>
          <h2 className="name">{player.name}</h2>
          <p>
            <strong>#{player.number}</strong> — {player.position}
          </p>
          <p>
            <strong>Nacionalidad:</strong> {player.nationality}
          </p>
          <p>
            <strong>Edad:</strong> {calculateAge(player.birthDate)} años
          </p>
          <p className="bio">{player.bio}</p>
        </div>
      </div>
    </div>
  );
}
