import "./NavBar.css";
import { NavLink } from "react-router";

export default function NavBar() {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <NavLink to={"/"}>Home</NavLink>
        </li>
        <li>
          <NavLink to={"/trofeos"}>Trofeos</NavLink>
        </li>
        <li>
          <NavLink to={"/plantilla"}>Plantilla</NavLink>
        </li>
        <li>
          <NavLink to={"/noticias"}>Noticias</NavLink>
        </li>
      </ul>
    </nav>
  );
}
