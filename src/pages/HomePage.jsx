import Introduction from "../components/Introduction";
import Estadio from "../components/Estadio";
import Campeonatos from "../components/Campeonatos";
import Form from "../components/Form";
import LatestResults from "../components/LatestResults";

export default function HomePage() {
  return (
    <main>
      <Introduction />
      <Campeonatos />
      <Estadio />
      <LatestResults />
      <Form />
    </main>
  );
}
