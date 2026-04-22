import chromium from "@sparticuz/chromium";
import puppeteer from "puppeteer-core";

export default async function handler(req, res) {
  // Solo permitir peticiones GET
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    // Detectamos si estamos en local (Windows/Mac) para no usar el Chromium de Vercel
    const isLocal =
      !process.env.VERCEL_ENV && process.env.NODE_ENV !== "production";

    if (isLocal) {
      console.log(
        "Modo desarrollo detectado. Saltando puppeteer para usar fallback local.",
      );
      throw new Error("Desarrollo local (skipping Chromium)");
    }

    // Configurar el navegador headless para Vercel
    const browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
      ignoreHTTPSErrors: true,
    });

    const page = await browser.newPage();

    // Interceptar y abortar peticiones de imágenes/fuentes para mayor velocidad
    await page.setRequestInterception(true);
    page.on("request", (request) => {
      if (["image", "stylesheet", "font"].includes(request.resourceType())) {
        request.abort();
      } else {
        request.continue();
      }
    });

    // Navegar a la página de Liga MX
    await page.goto("https://www.ligamx.net/cancha/partidosClub/18/pumas", {
      waitUntil: "networkidle2", // Esperar a que carguen los datos dinámicos
      timeout: 5000,
    });

    // Extraer los datos del DOM
    const matches = await page.evaluate(() => {
      const results = [];
      // Seleccionamos todos los contenedores de los partidos
      const matchElements = document.querySelectorAll("div.partido");

      matchElements.forEach((el) => {
        const jornada =
          el.querySelector(".datos .jornada")?.textContent?.trim() || "N/A";
        const fecha =
          el.querySelector(".datos .fecha")?.textContent?.trim() || "N/A";
        const hora =
          el.querySelector(".datos .hora")?.textContent?.trim() || "N/A";
        const local =
          el.querySelector(".local a.loadershow")?.textContent?.trim() || "N/A";
        const visita =
          el.querySelector(".visita a.loadershow")?.textContent?.trim() ||
          "N/A";

        // El marcador a veces es la fecha si no se ha jugado, o el resultado ej. "1 - 1"
        const marcador =
          el
            .querySelector(".marcador a.loadershow, .marcador .loadershow")
            ?.textContent?.trim() || "Próximo";

        results.push({
          jornada,
          fecha,
          hora,
          local,
          visita,
          marcador,
          condicion: local.toLowerCase().includes("pumas")
            ? "Local"
            : "Visitante",
        });
      });

      return results;
    });

    await browser.close();

    // Cachear el resultado por 1 día (86400 segundos) en Vercel
    // y servir datos obsoletos mientras se revalida por 12 horas adicionales
    res.setHeader(
      "Cache-Control",
      "s-maxage=86400, stale-while-revalidate=43200",
    );

    return res.status(200).json({
      success: true,
      source: "Liga MX (Web Scraped)",
      data: matches,
    });
  } catch (error) {
    console.error("Error durante el web scraping:", error);
    return res.status(500).json({
      success: false,
      error: "Hubo un error al escrapear la página. Revisa los logs de Vercel.",
      details: error.message,
    });
  }
}
