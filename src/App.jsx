import Header from "./components/Header";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Modal from "./components/Modal";
import { useModal } from "./ModalContext";
import HomePage from "./pages/HomePage";

function App() {
  const { isOpen, message, closeModal } = useModal();

  return (
    <>
      <Modal isOpen={isOpen} onClose={closeModal}>
        {message}
      </Modal>
      <Header />
      <NavBar />
      <HomePage />
      <Footer />
    </>
  );
}

export default App;
