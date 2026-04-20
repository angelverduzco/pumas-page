import { useEffect, useRef } from "react";
import "./PlayerModal.css";

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
    if (!modalRef.current) return;
    const focusableElements = modalRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    if (!focusableElements.length) return;

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
          aria-label={`Cerrar detalles de ${player.name}`}
        >
          ✕
        </button>

        <div className="modal-header-background">
          <img
            src={player.photo}
            alt={`Foto de ${player.name}`}
            className="modal-player-photo"
          />
        </div>

        <div className="modal-player-details">
          <h3 id="player-modal-title" className="name">
            {player.name}
          </h3>
          <div className="stats-box">
            <p>
              <strong>Dorsal</strong>
              {player.number !== null ? `#${player.number}` : "N/A"}
            </p>
            <p>
              <strong>Edad</strong>
              {player.age ? `${player.age} años` : "N/A"}
            </p>
            <p>
              <strong>Posición</strong>
              {player.categoria || player.position}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
