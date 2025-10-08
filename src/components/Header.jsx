import headerImg from "../assets/puma.webp";
import "../styles/header.css";

export default function Header() {
  return (
    <header className="header">
      <img src={headerImg} alt="Logo de los Pumas UNAM" />
      <h1>Cantera Puma</h1>
    </header>
  );
}
