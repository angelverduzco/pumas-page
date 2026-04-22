/**
 * Serverless handler – consolida datos de DOS APIs externas:
 *
 *  1. football.api-sports.io  → plantilla de jugadores
 *  2. thesportsdb.com         → tabla de posiciones + últimos partidos
 *
 * Cada API tiene sus propias credenciales y IDs (ver .env).
 */

/* ────────────────────────────────────────────────────────────
   Helpers para cada API
   ──────────────────────────────────────────────────────────── */

/**
 * Obtiene la plantilla de jugadores desde API-Football.
 * Requiere header `x-apisports-key`.
 */
async function fetchPlantilla(apiKey, teamId) {
  const res = await fetch(
    `https://v3.football.api-sports.io/players/squads?team=${teamId}`,
    { headers: { "x-apisports-key": apiKey } },
  );

  if (!res.ok) {
    throw new Error(`API-Football squads: HTTP ${res.status}`);
  }

  const json = await res.json();
  return json.response;
}

/* ────────────────────────────────────────────────────────────
   Handler principal (Vercel Serverless Function)
   ──────────────────────────────────────────────────────────── */

export default async function handler(request, response) {
  // Solo permitir GET
  if (request.method !== "GET") {
    return response.status(405).json({ error: "Método no permitido" });
  }

  // ── Variables de entorno: API-Football ──
  const AF_KEY = process.env.API_FOOTBALL_KEY;
  const AF_TEAM = process.env.API_FOOTBALL_TEAM_ID;

  // Validar que todas estén configuradas
  const missing = [];
  if (!AF_KEY) missing.push("API_FOOTBALL_KEY");
  if (!AF_TEAM) missing.push("API_FOOTBALL_TEAM_ID");

  if (missing.length > 0) {
    console.error("Faltan variables de entorno:", missing.join(", "));
    return response.status(500).json({
      error: "Configuración del servidor incompleta",
    });
  }

  try {
    // Lanzar las 3 peticiones en paralelo
    const plantilla = await fetchPlantilla(AF_KEY, AF_TEAM);

    const data = { plantilla };

    // Cachear en la CDN de Vercel por 4 horas, servir stale por 10 min mientras revalida
    response.setHeader(
      "Cache-Control",
      "s-maxage=14400, stale-while-revalidate=600",
    );

    return response.status(200).json(data);
  } catch (error) {
    console.error("Handler error:", error.message || error);
    return response.status(502).json({
      error: "Error al obtener datos de las APIs externas",
      detail: error.message,
    });
  }
}
