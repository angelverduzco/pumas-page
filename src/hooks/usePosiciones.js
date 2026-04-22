import { useState, useEffect } from "react";

export function usePosiciones() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStandings = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch("/api/posiciones");

        if (!response.ok) {
          throw new Error("Error al obtener datos de posiciones de Liga MX");
        }

        const result = await response.json();

        if (result.success && result.data && result.data.length > 0) {
          setData(result.data);
        } else {
          throw new Error("Datos vacíos del API");
        }
      } catch (err) {
        console.error("Error al cargar las posiciones:", err.message);
        setError("No se encontraron los datos");
      } finally {
        setLoading(false);
      }
    };

    fetchStandings();
  }, []);

  return { data, loading, error };
}
