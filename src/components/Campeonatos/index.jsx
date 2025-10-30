import "./Campeonatos.css";

export default function Campeonatos() {
  return (
    <section className="campeonatos">
      <h2>Campeonatos de Liga Mexicana</h2>
      <table>
        <thead>
          <tr>
            <th scope="col">Temporada</th>
            <th scope="col">Entrenador</th>
            <th scope="col">Final vs.</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1976-1977</th>
            <td>Jorge Marik</td>
            <td>Leones Negros</td>
          </tr>
          <tr>
            <th scope="row">1980-1981</th>
            <td>Velibor Milutinović</td>
            <td>Cruz Azul</td>
          </tr>
          <tr>
            <th scope="row">1990-1991</th>
            <td>Miguel Mejía Barón</td>
            <td>América</td>
          </tr>
          <tr>
            <th scope="row">Clausura 2004</th>
            <td>Hugo Sánchez</td>
            <td>Chivas</td>
          </tr>
          <tr>
            <th scope="row">Apertura 2004</th>
            <td>Hugo Sánchez</td>
            <td>Monterrey</td>
          </tr>
          <tr>
            <th scope="row">Clausura 2009</th>
            <td>Ricardo Ferretti</td>
            <td>Pachuca</td>
          </tr>
          <tr>
            <th scope="row">Clausura 2011</th>
            <td>Guillermo Vázquez</td>
            <td>Morelia</td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}
