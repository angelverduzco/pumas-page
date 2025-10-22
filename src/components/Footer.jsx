import "../styles/footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div>
        <div>
          <p className="title">Pumas UNAM</p>
          <p>
            Club Universidad Nacional A.C. <br /> Representando a la UNAM desde
            1954
          </p>
        </div>

        <div>
          <p className="title">Enlaces</p>
          <a href="https://pumas.mx/" target="_blank" rel="noreferrer">
            Sitio oficial
          </a>
          <a href="https://www.unam.mx/" target="_blank" rel="noreferrer">
            UNAM
          </a>
          <a href="https://tiendapumas.com/" target="_blank" rel="noreferrer">
            Tienda oficial
          </a>
        </div>

        <div>
          <p className="title">Contacto</p>
          <p>
            Estadio Olímpico Universitario <br /> Ciudad Universitaria, CDMX{" "}
            <br /> México
          </p>
        </div>
      </div>

      <p>© 2025 Pumas UNAM. Goya, Goya, Cachún Cachún Ra Ra!</p>
    </footer>
  );
}
