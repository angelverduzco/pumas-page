import Header from "./components/Header";
import NavBar from "./components/NavBar";
import Introduction from "./components/Introduction";
import Campeonatos from "./components/Campeonatos";
import Estadio from "./components/Estadio";
import Form from "./components/Form";
import Footer from "./components/Footer";
import Modal from "./components/Modal";
import { useModal } from "./ModalContext";

function App() {
  const { isOpen, message, closeModal } = useModal();

  return (
    <>
      <Modal isOpen={isOpen} onClose={closeModal}>
        {message}
      </Modal>
      <Header />
      <NavBar />
      <Introduction />
      <Campeonatos />
      <Estadio />
      <Form />
      <Footer />
    </>
  );
}

export default App;
