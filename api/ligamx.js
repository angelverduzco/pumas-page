export default async function handler(req, res) {
  // Solo permitir peticiones GET
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const url = "https://www.ligamx.net/cancha/partidosClub/18/pumas";

    // Hacemos el fetch directo al HTML sin usar Puppeteer
    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
    });

    if (!response.ok) {
      throw new Error(`Error en la petición: ${response.status}`);
    }

    const html = await response.text();

    // Buscar el contenedor de los partidos
    const tbodyMatch = html.match(
      /<tbody id="bodyPartido">([\s\S]*?)<\/tbody>/,
    );
    if (!tbodyMatch) {
      throw new Error("No se pudo encontrar la tabla de partidos en el HTML.");
    }

    // Limpiar comentarios HTML que a veces contienen partidos no jugados o duplicados
    const cleanHtml = tbodyMatch[1].replace(/<!--[\s\S]*?-->/g, "");
    const rows = cleanHtml.split("<tr");

    const matches = [];

    rows.forEach((row) => {
      if (!row.includes("</tr>")) return;

      const tdRegex = /<td[^>]*>([\s\S]*?)<\/td>/g;
      const tds = [];
      let match;
      while ((match = tdRegex.exec(row)) !== null) {
        tds.push(match[1].trim());
      }

      // Esperamos al menos las columnas: Datos, Local, Vs, Visita, Estadio
      if (tds.length >= 5) {
        const datosStr = tds[0];
        const localStr = tds[1];
        const vsStr = tds[2];
        const visitaStr = tds[3];

        // Extraer jornada, fecha y hora
        const jornadaMatch = datosStr.match(/<span>(Jornada \d+)<\/span>/);
        const fechaMatch = datosStr.match(/<strong>([^<]+)<\/strong>/);
        // La hora a veces tiene el formato " - 12:00 hrs." o "12:00 hrs."
        const horaMatch = datosStr.match(/([0-9]{2}:[0-9]{2} hrs\.)/);

        const jornada = jornadaMatch ? jornadaMatch[1] : "N/A";
        const fecha = fechaMatch ? fechaMatch[1] : "N/A";
        const hora = horaMatch ? horaMatch[1] : "N/A";

        // Extraer nombres de los equipos desde el atributo title o de img alt
        const localMatch = localStr.match(/title="([^"]+)"/);
        const local = localMatch ? localMatch[1] : "N/A";

        const visitaMatch = visitaStr.match(/title="([^"]+)"/);
        const visita = visitaMatch ? visitaMatch[1] : "N/A";

        // Extraer marcador limpiando las etiquetas HTML dentro del <a>
        // Ej: <a ...>1<span> - </span>1</a> => "1 - 1"
        let marcador = vsStr.replace(/<[^>]+>/g, "").trim();

        // Si no se ha jugado, a veces dice "VS" o "- - -"
        if (
          marcador.toLowerCase() === "vs" ||
          marcador === "- - -" ||
          marcador === ""
        ) {
          marcador = "Próximo";
        }

        const condicion =
          local.toLowerCase().includes("universidad nacional") ||
          local.toLowerCase().includes("pumas")
            ? "Local"
            : "Visitante";

        matches.push({
          jornada,
          fecha,
          hora,
          local,
          visita,
          marcador,
          condicion,
        });
      }
    });

    // Cachear el resultado por 1 día (86400 segundos) en Vercel
    res.setHeader(
      "Cache-Control",
      "s-maxage=86400, stale-while-revalidate=43200",
    );

    return res.status(200).json({
      success: true,
      source: "Liga MX (Direct HTML parsed)",
      data: matches,
    });
  } catch (error) {
    console.error("Error procesando partidos:", error);
    return res.status(500).json({
      success: false,
      error: "Hubo un error al procesar los partidos.",
      details: error.message,
    });
  }
}

// Código para poder ejecutar y probar este archivo directamente con `node api/ligamx.js`
if (
  typeof process !== "undefined" &&
  process.argv &&
  process.argv[1] &&
  process.argv[1].endsWith("ligamx.js")
) {
  console.log("Ejecutando script de partidos localmente sin Puppeteer...");
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
