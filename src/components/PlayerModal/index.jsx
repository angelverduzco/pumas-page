import { useEffect, useRef } from "react";
import "./PlayerModal.css";
import { calculateAge } from "../../utils/dates";

export default function PlayerModal({ player, onClose }) {
  const modalRef = useRef(null);
  const closeBtnRef = useRef(null);

  // Cierra con tecla ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Enfoca el botón al abrir
  useEffect(() => {
    closeBtnRef.current?.focus();
  }, []);

  // Evita que el foco salga del modal (focus trap básico)
  useEffect(() => {
    const focusableElements = modalRef.current?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    const first = focusableElements[0];
    const last = focusableElements[focusableElements.length - 1];

    const handleTab = (e) => {
      if (e.key !== "Tab") return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleTab);
    return () => document.removeEventListener("keydown", handleTab);
  }, []);

  return (
    <div className="modal-player-overlay" onClick={onClose} aria-hidden="true">
      <div
        ref={modalRef}
        className="modal-player-content"
        role="dialog"
        aria-modal="true"
        aria-labelledby="player-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeBtnRef}
          className="close-btn"
          onClick={onClose}
          aria-label="Cerrar tarjeta del jugador"
        >
          ✕
        </button>

        <img
          src={player.image}
          role="presentation"
          className="modal-player-photo"
        />

        <div>
          <span id="player-modal-title" className="name">
            {player.name}
          </span>
          <p>
            <strong>#{player.number}</strong> — {player.position}
          </p>
          <p>
            <strong>Nacionalidad:</strong> {player.nationality}
          </p>
          <p>
            <strong>Edad:</strong> {calculateAge(player.birthDate)} años
          </p>
          <p id="player-modal-desc" className="bio">
            {player.bio}
          </p>
        </div>
      </div>
    </div>
  );
}
