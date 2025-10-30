import headerImg from "../../assets/puma.webp";
import "./Header.css";

export default function Header() {
  return (
    <header className="header">
      <img src={headerImg} alt="" />
      <h1>Cantera Puma</h1>
    </header>
  );
}
