import { useState, useEffect } from "react";
import staticMatches from "../data/pumas_matches.json";

export function useCalendario() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        setLoading(true);
        // Intentar obtener los datos del web scraper
        const response = await fetch("/api/ligamx");

        if (!response.ok) {
          throw new Error("Error al obtener datos de Liga MX");
        }

        const result = await response.json();

        if (result.success && result.data && result.data.length > 0) {
          setMatches(result.data);
        } else {
          throw new Error("Datos vacíos del API");
        }
      } catch (err) {
        console.warn(
          "Fallo el web scraper, usando datos estáticos (fallback):",
          err.message,
        );
        // Fallback a los datos estáticos extraídos previamente
        setMatches(staticMatches);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  return { matches, loading, error };
}
