import Header from "./components/Header";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Modal from "./components/Modal";
import { useModal } from "./ModalContext";
import HomePage from "./pages/HomePage";
import { Routes } from "react-router";
import { Route } from "react-router";
import TrophiesPage from "./pages/TrophiesPage";

function App() {
  const { isOpen, message, closeModal } = useModal();

  return (
    <>
      <Modal isOpen={isOpen} onClose={closeModal}>
        {message}
      </Modal>
      <Header />
      <NavBar />
      <Routes>
        <Route index path="/" element={<HomePage />} />
        <Route path="/trofeos" element={<TrophiesPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
