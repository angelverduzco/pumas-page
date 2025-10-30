import "./Modal.css";

export default function Modal({ isOpen, onClose, children }) {
  return isOpen ? (
    <div
      className="modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      {" "}
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {" "}
        <button
          className="modal-close"
          onClick={onClose}
          aria-label="Cerrar modal"
        >
          &times;
        </button>
        <div className="modal-body">{children}</div>{" "}
      </div>{" "}
    </div>
  ) : null;
}
