import { useState } from "react";
import "../styles/formulario.css";
import { useModal } from "../ModalContext";
import ValidatedInput from "./ValidatedInput";

export default function Form() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const { openModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    openModal(
      `¡Gracias por suscribirte, ${name}! Pronto recibirás noticias en ${email}.`,
    );
    setName("");
    setEmail("");
    setPhone("");
    console.log({ name, email, phone });
  };

  const validateName = (value) => {
    if (!value) {
      return "El nombre es obligatorio";
    }
    if (value.length < 3) {
      return "El nombre debe tener al menos 3 caracteres";
    }
    return null;
  };

  const validateEmail = (value) => {
    if (!value) {
      return "El correo es obligatorio";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return "El correo no es válido";
    }
    return null;
  };

  const validatePhone = (value) => {
    if (!value) {
      return null;
    }
    const phoneRegex = /^\+?\d{10,15}$/;
    if (!phoneRegex.test(value)) {
      return "El teléfono no es válido";
    }
    return null;
  };

  return (
    <section className="formulario">
      <h2>Únete a la comunidad Puma</h2>
      <p>Recibe noticias, promociones y actualizaciones del equipo</p>
      <form onSubmit={handleSubmit}>
        <ValidatedInput
          label="Nombre"
          value={name}
          type="text"
          onChange={({ target }) => setName(target.value)}
          validationFn={validateName}
        />
        <ValidatedInput
          label="Correo electrónico"
          value={email}
          type="email"
          onChange={({ target }) => setEmail(target.value)}
          validationFn={validateEmail}
        />
        <ValidatedInput
          label="Teléfono (Opcional)"
          value={phone}
          type="cel"
          onChange={({ target }) => setPhone(target.value)}
          validationFn={validatePhone}
        />
        <button type="submit">Suscribirse</button>
      </form>
    </section>
  );
}
