import "../styles/campeonatos.css";

export default function Campeonatos() {
  return (
    <section className="campeonatos">
      <h2>Campeonatos de Liga Mexicana</h2>
      <table>
        <thead>
          <tr>
            <th>Temporada</th>
            <th>Entrenador</th>
            <th>Final vs.</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1976-1977</td>
            <td>Jorge Marik</td>
            <td>Leones Negros</td>
          </tr>
          <tr>
            <td>1980-1981</td>
            <td>Velibor Milutinović</td>
            <td>Cruz Azul</td>
          </tr>
          <tr>
            <td>1990-1991</td>
            <td>Miguel Mejía Barón</td>
            <td>América</td>
          </tr>
          <tr>
            <td>Clausura 2004</td>
            <td>Hugo Sánchez</td>
            <td>Chivas</td>
          </tr>
          <tr>
            <td>Apertura 2004</td>
            <td>Hugo Sánchez</td>
            <td>Monterrey</td>
          </tr>
          <tr>
            <td>Clausura 2009</td>
            <td>Ricardo Ferretti</td>
            <td>Pachuca</td>
          </tr>
          <tr>
            <td>Clausura 2011</td>
            <td>Guillermo Vázquez</td>
            <td>Morelia</td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}
