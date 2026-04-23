import { useState } from "react";
import "./NavBar.css";
import { NavLink } from "react-router";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="navbar">
      <button
        className={`menu-toggle ${isOpen ? "open" : ""}`}
        onClick={toggleMenu}
        aria-expanded={isOpen}
        aria-label="Menú de navegación"
        aria-controls="nav-list"
      >
        <span className="hamburger"></span>
      </button>

      <ul id="nav-list" className={isOpen ? "open" : ""}>
        <li>
          <NavLink to={"/"} onClick={closeMenu}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to={"/trofeos"} onClick={closeMenu}>
            Trofeos
          </NavLink>
        </li>
        <li>
          <NavLink to={"/posiciones"} onClick={closeMenu}>
            Posiciones
          </NavLink>
        </li>
        <li>
          <NavLink to={"/plantilla"} onClick={closeMenu}>
            Plantilla
          </NavLink>
        </li>
        <li>
          <NavLink to={"/calendario"} onClick={closeMenu}>
            Calendario
          </NavLink>
        </li>
        <li>
          <NavLink to={"/noticias"} onClick={closeMenu}>
            Noticias
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
