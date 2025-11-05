import { useState } from "react";
import "./TrophyCard.css";

export default function TrophyCard({ trophy }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = (e) => {
    setIsOpen(e.target.open);
  };

  return (
    <div className="trophy-card">
      <img src={trophy.image} alt={trophy.name} className="trophy-img" />
      <h2>{trophy.name}</h2>
      <p>{trophy.count} títulos</p>

      <details onToggle={handleToggle}>
        <summary aria-expanded={isOpen} aria-controls={`years-${trophy.name}`}>
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
