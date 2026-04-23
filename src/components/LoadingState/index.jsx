import "./LoadingState.css";
import pumaLogo from "../../assets/puma.webp";

const LoadingState = ({ message = "Cargando información..." }) => {
  return (
    <div className="loading-container" role="status" aria-live="polite">
      <div className="loading-content">
        <img src={pumaLogo} alt="" className="loading-logo" />
        <h2 className="loading-message">{message}</h2>
        <div className="loading-bar">
          <div className="loading-progress"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingState;
