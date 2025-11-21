import "@justinribeiro/lite-youtube";
import "./VideoPlayer.css";
import { useState, useRef, useEffect } from "react";

export default function VideoPlayer({ videoId, onClick, title }) {
  const [btnActive, setBtnActive] = useState(false);
  const ytRef = useRef(null);

  const handleToggleAudioDescription = async () => {
    setBtnActive((prev) => {
      const next = !prev;
      onClick();
      return next;
    });
  };

  useEffect(() => {
    const el = ytRef.current;
    if (!el) return;

    // intenta encontrar el botón dentro del shadowRoot o en el light DOM
    const setInnerButtonLabel = () => {
      try {
        const root = el.shadowRoot;
        const btn = root
          ? root.querySelector("button")
          : el.querySelector("button");
        if (btn) {
          btn.setAttribute(
            "aria-label",
            title ? `Reproducir video: ${title}` : "Reproducir video",
          );
          return true;
        }
      } catch (e) {
        console.log(e);
      }
      return false;
    };
    setInnerButtonLabel();
  }, [title, videoId]);

  return (
    <div className="video-player">
      <lite-youtube
        ref={ytRef}
        videoid={videoId}
        autopause
        aria-label={`Video de noticia ${title}`}
        style={{ width: "100%", height: "auto" }}
      />
      <button
        type="button"
        onClick={handleToggleAudioDescription}
        aria-label={`Alternar Audio Description de video ${title}`}
        aria-pressed={btnActive}
        className={`video-toggle-ad ${btnActive ? "active" : ""}`}
      >
        AD
      </button>
    </div>
  );
}
