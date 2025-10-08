import React from "react";
import { useReducer } from "react";

export const ModalContext = React.createContext();

const initialState = { isOpen: false, message: "" };

function modalReducer(state, action) {
  switch (action.type) {
    case "OPEN_MODAL":
      return { isOpen: true, message: action.message || "" };
    case "CLOSE_MODAL":
      return { isOpen: false, message: "" };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

export function ModalProvider({ children }) {
  const [state, dispatch] = useReducer(modalReducer, initialState);

  const openModal = (message = "") => dispatch({ type: "OPEN_MODAL", message });
  const closeModal = () => dispatch({ type: "CLOSE_MODAL" });

  return (
    <ModalContext.Provider
      value={{
        isOpen: state.isOpen,
        message: state.message,
        openModal,
        closeModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = React.useContext(ModalContext);
  if (context === undefined) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
}
