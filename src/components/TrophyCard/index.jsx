import { useState } from "react";
import "./TrophyCard.css";

export default function TrophyCard({ trophy }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = (e) => {
    setIsOpen(e.target.open);
  };

  return (
    <div className="trophy-card">
      <img src={trophy.image} alt="" className="trophy-img" />
      <h2 id={`trophy-name-${trophy.id}`}>{trophy.name}</h2>
      <p>{trophy.count} títulos</p>

      <details onToggle={handleToggle}>
        <summary
          tabIndex={0}
          id={`summary-years-${trophy.id}`}
          aria-labelledby={`trophy-name-${trophy.id} summary-years-${trophy.id}`}
          aria-expanded={isOpen}
          aria-controls={`years-${trophy.name}`}
        >
          Ver años
        </summary>
        <ul id={`years-${trophy.name}`}>
          <li>1980</li>
          <li>1982</li>
          <li>1989</li>
        </ul>
      </details>
    </div>
  );
}
