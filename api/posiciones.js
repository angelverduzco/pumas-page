export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const endpoint =
      "https://www.ligamx.net/ws/aHR0cHM6Ly9hcHhqdm0tcHJ0bHdiLmxpZ2FteC5uZXQvYXBpX3NpaWQtdjEvc3J2amF2YXNsY3Q@aHNhaD18NTNlN2RhNGU4NTM2YmFhYTA3ZWYwOTdmMDFiYzQ5MDUwNDgyNzJmNWU0MGVjZmI3MzQ4NmY0MWFmNDlkNjVhNTkxZjZlMDFmOTNkNWVmNDNhZWExN2I1NjEwM2Q5OTkxYzZlMGJjNmE3MjI3MDc5OWU5YTdiNzIxYmI3YTEyYzl8JnBzV2lkZ2V0PVBSVExfQ2xzZlNtbGRMZ2xsVE9QJm9iaklERGl2aXNpb249MSZvYmpJRFRlbXBvcmFkYT03NiZvYmpJRFRvcm5lbz0yJm9ialRPUD0yOA==";

    const response = await fetch(endpoint, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
      },
    });

    if (!response.ok) {
      throw new Error(`API respondió con estado: ${response.status}`);
    }

    const json = await response.json();

    if (!json.DatosJSON || !Array.isArray(json.DatosJSON)) {
      throw new Error("Formato de respuesta inválido de la Liga MX");
    }

    const tableData = json.DatosJSON.map((team) => {
      return {
        idTeam: team.nombreClubUrl === "pumas" ? "134201" : String(team.IDClub),
        intRank: team.Lugar,
        strTeam: team.Club,
        strBadge: `https://s3.amazonaws.com/lmxwebsite/docs/archdgtl/Afldos/logos/${team.IDClub}/${team.IDClub}.png`,
        intPlayed: team.JJ,
        intWin: team.JG,
        intDraw: team.JE,
        intLoss: team.JP,
        intGoalDifference: team.Dif,
        intPoints: team.Pts,
        strLeague: "Liga MX",
        strSeason: "Actual",
      };
    });

    res.setHeader(
      "Cache-Control",
      "s-maxage=86400, stale-while-revalidate=43200",
    );

    return res.status(200).json({
      success: true,
      source: "Liga MX (JSON API)",
      data: tableData,
    });
  } catch (error) {
    console.error("Error obteniendo posiciones de API JSON:", error);
    return res.status(500).json({
      success: false,
      error: "Error al obtener la tabla de posiciones.",
      details: error.message,
    });
  }
}

// Código para probar localmente con `node api/posiciones.js`
if (
  typeof process !== "undefined" &&
  process.argv &&
  process.argv[1] &&
  process.argv[1].endsWith("posiciones.js")
) {
  console.log("Probando el endpoint JSON localmente...");
  const mockReq = { method: "GET" };
  const mockRes = {
    status: (code) => ({
      json: (data) => {
        console.log(`\n=== RESPUESTA (Status: ${code}) ===`);
        console.log(JSON.stringify(data, null, 2));
      },
    }),
    setHeader: (name, value) => {
      console.log(`[Header] ${name}: ${value}`);
    },
  };

  handler(mockReq, mockRes).then(() => process.exit(0));
}
