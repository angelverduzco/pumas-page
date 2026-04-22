import { useState, useEffect } from "react";

export function useCalendario() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        setLoading(true);
        setError(null);
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
        console.error("Error al cargar el calendario:", err.message);
        setError("No se encontraron los datos");
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  return { matches, loading, error };
}
