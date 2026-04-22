import chromium from "@sparticuz/chromium";
import puppeteer from "puppeteer-core";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const isLocal =
      !process.env.VERCEL_ENV && process.env.NODE_ENV !== "production";

    if (isLocal) {
      console.log(
        "Modo desarrollo detectado. Saltando puppeteer para posiciones.",
      );
      throw new Error("Desarrollo local (skipping Chromium)");
    }

    const browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
      ignoreHTTPSErrors: true,
    });

    const page = await browser.newPage();

    await page.setRequestInterception(true);
    page.on("request", (request) => {
      // Bloqueamos imágenes y recursos pesados para acelerar
      if (
        ["image", "stylesheet", "font", "media"].includes(
          request.resourceType(),
        )
      ) {
        request.abort();
      } else {
        request.continue();
      }
    });

    // Vamos a la página principal de la liga
    await page.goto("https://ligamx.net", {
      waitUntil: "networkidle2",
      timeout: 5000,
    });

    // Extraer datos de la Tabla General
    const tableData = await page.evaluate(() => {
      const rows = document.querySelectorAll("table.tabla-general tbody tr");
      const standings = [];

      rows.forEach((row, index) => {
        const rank =
          row.querySelector("td:nth-child(1)")?.textContent?.trim() ||
          String(index + 1);
        const teamElement = row.querySelector("td:nth-child(2)");
        const teamName =
          teamElement?.textContent?.trim() || "Equipo Desconocido";

        // Tratar de sacar el logo (en LigaMX usualmente es un img dentro del td o un background)
        const imgEl = teamElement?.querySelector("img");
        const badge = imgEl
          ? imgEl.src
          : "https://s3.amazonaws.com/lmxwebsite/docs/archdgtl/Afldos/logos/18/18.png"; // Pumas default if not found

        const played =
          row.querySelector("td:nth-child(3)")?.textContent?.trim() || "0";
        const won =
          row.querySelector("td:nth-child(4)")?.textContent?.trim() || "0";
        const draw =
          row.querySelector("td:nth-child(5)")?.textContent?.trim() || "0";
        const lost =
          row.querySelector("td:nth-child(6)")?.textContent?.trim() || "0";
        const goalDiff =
          row.querySelector("td:nth-child(9)")?.textContent?.trim() || "0";
        const points =
          row.querySelector("td:nth-child(10)")?.textContent?.trim() || "0";

        // Mapeamos al formato que usa TheSportsDB para no romper el frontend
        standings.push({
          idTeam: teamName.toLowerCase().includes("pumas")
            ? "134201"
            : String(index),
          intRank: rank,
          strTeam: teamName,
          strBadge: badge,
          intPlayed: played,
          intWin: won,
          intDraw: draw,
          intLoss: lost,
          intGoalDifference: goalDiff,
          intPoints: points,
          strLeague: "Liga MX",
          strSeason: "Clausura 2026",
        });
      });

      return standings;
    });

    await browser.close();

    res.setHeader(
      "Cache-Control",
      "s-maxage=86400, stale-while-revalidate=43200",
    );

    return res.status(200).json({
      success: true,
      source: "Liga MX (Web Scraped)",
      data: tableData,
    });
  } catch (error) {
    console.error("Error scrapeando posiciones:", error);
    return res.status(500).json({
      success: false,
      error: "Error al escrapear la tabla de posiciones.",
      details: error.message,
    });
  }
}
