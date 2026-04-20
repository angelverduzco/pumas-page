export default async function handler(request, response) {
  // Solo permitir GET
  if (request.method !== "GET") {
    return response.status(405).json({ error: "Método no permitido" });
  }

  const API_KEY = process.env.API_FOOTBALL_KEY;
  const TEAM_ID = process.env.TEAM_ID; // ID de Pumas en API-Football
  const LEAGUE_ID = process.env.LEAGUE_ID; // Liga MX
  const SEASON = process.env.SEASON; // Año actual

  // Validar que las variables de entorno estén configuradas
  if (!API_KEY || !TEAM_ID || !LEAGUE_ID || !SEASON) {
    console.error("Faltan variables de entorno requeridas:", {
      API_KEY: !!API_KEY,
      TEAM_ID: !!TEAM_ID,
      LEAGUE_ID: !!LEAGUE_ID,
      SEASON: !!SEASON,
    });
    return response.status(500).json({
      error: "Configuración del servidor incompleta",
    });
  }

  const headers = {
    "x-apisports-key": API_KEY,
  };

  try {
    const [posicionesRes, resultadosRes, plantillaRes] = await Promise.all([
      fetch(
        `https://v3.football.api-sports.io/standings?league=${LEAGUE_ID}&season=${SEASON}`,
        { headers },
      ),
      fetch(
        `https://v3.football.api-sports.io/fixtures?team=${TEAM_ID}&season=${SEASON}`,
        { headers },
      ),
      fetch(
        `https://v3.football.api-sports.io/players/squads?team=${TEAM_ID}`,
        { headers },
      ),
    ]);

    if (!posicionesRes.ok || !resultadosRes.ok || !plantillaRes.ok) {
      const failedEndpoints = [];
      if (!posicionesRes.ok)
        failedEndpoints.push(`standings: ${posicionesRes.status}`);
      if (!resultadosRes.ok)
        failedEndpoints.push(`fixtures: ${resultadosRes.status}`);
      if (!plantillaRes.ok)
        failedEndpoints.push(`squads: ${plantillaRes.status}`);
      console.error(
        "Error from API-Sports HTTP request:",
        failedEndpoints.join(", "),
      );
      return response.status(502).json({
        error: "No se pudieron obtener todos los datos de la API de deportes",
      });
    }

    const data = {
      posiciones: (await posicionesRes.json()).response,
      resultados: (await resultadosRes.json()).response,
      plantilla: (await plantillaRes.json()).response,
    };

    // Cachear en la CDN de Vercel por 4 horas, servir stale por 10 min mientras revalida
    response.setHeader(
      "Cache-Control",
      "s-maxage=14400, stale-while-revalidate=600",
    );

    return response.status(200).json(data);
  } catch (error) {
    console.error("Handler error:", error.message || error);
    return response.status(500).json({ error: "Error al consolidar datos" });
  }
}
