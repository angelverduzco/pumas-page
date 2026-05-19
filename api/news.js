/**
 * Vercel Serverless Function
 * Obtiene las noticias de Pumas UNAM desde Google News RSS, las procesa y las cachea.
 */

// Helper para decodificar entidades HTML comunes de XML
function decodeXmlEntities(text) {
  if (!text) return "";
  return text
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1") // Extraer contenido CDATA
    .trim();
}

// Extrae el contenido de una etiqueta XML
function extractTagContent(xml, tag) {
  // Maneja etiquetas con atributos como <source url="..."> o <guid isPermaLink="...">
  const regex = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\/${tag}>`, "i");
  const match = xml.match(regex);
  return match ? decodeXmlEntities(match[1]) : "";
}

// Procesa el HTML de <description> para obtener artículos relacionados
function parseRelatedArticles(descriptionHtml, mainTitle, mainSource) {
  if (!descriptionHtml) return [];
  const articles = [];

  // Expresión regular para buscar los elementos de lista en el HTML de la descripción
  // <li><a href="LINK">TITLE</a>&nbsp;&nbsp;<font color="#6f6f6f">SOURCE</font></li>
  const liRegex =
    /<li><a\s+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>(?:&nbsp;)*\s*<font[^>]*>([\s\S]*?)<\/font><\/li>/gi;

  let match;
  while ((match = liRegex.exec(descriptionHtml)) !== null) {
    const link = match[1];
    const title = decodeXmlEntities(match[2]);
    const source = decodeXmlEntities(match[3]);

    articles.push({ link, title, source });
  }

  // Filtrar el artículo principal de la lista de relacionados (suele ser el primero)
  const mainTitleLower = mainTitle.toLowerCase();
  const mainSourceLower = mainSource.toLowerCase();

  return articles.filter((art) => {
    const artTitleLower = art.title.toLowerCase();
    const artSourceLower = art.source.toLowerCase();

    // Si coincide en gran parte el título y el medio, es el mismo artículo
    const isSameTitle =
      mainTitleLower.includes(artTitleLower) ||
      artTitleLower.includes(mainTitleLower);
    const isSameSource = mainSourceLower === artSourceLower;

    return !(isSameTitle && isSameSource);
  });
}

export default async function handler(request, response) {
  // Solo permitir peticiones GET
  if (request.method !== "GET") {
    return response.status(405).json({ error: "Método no permitido" });
  }

  try {
    const googleNewsUrl =
      "https://news.google.com/rss/search?q=Pumas+UNAM&hl=es-419&gl=MX&ceid=MX:es-419";

    const res = await fetch(googleNewsUrl);
    if (!res.ok) {
      throw new Error(`Google News RSS: HTTP ${res.status}`);
    }

    const xmlText = await res.text();

    // Parsear los items con una expresión regular robusta
    const items = [];
    const itemRegex = /<item>([\s\S]*?)<\/item>/gi;
    let itemMatch;

    while ((itemMatch = itemRegex.exec(xmlText)) !== null) {
      const itemXml = itemMatch[1];

      const rawTitle = extractTagContent(itemXml, "title");
      const link = extractTagContent(itemXml, "link");
      const guid = extractTagContent(itemXml, "guid");
      const pubDate = extractTagContent(itemXml, "pubDate");
      const description = extractTagContent(itemXml, "description");

      // Obtener la fuente de la etiqueta <source url="...">Fuente</source>
      const sourceMatch = itemXml.match(
        /<source\s+url="([^"]*)">([\s\S]*?)<\/source>/i,
      );
      const source = sourceMatch
        ? decodeXmlEntities(sourceMatch[2])
        : "Google News";
      const sourceUrl = sourceMatch ? sourceMatch[1] : "";

      // Limpiar el título principal: Google News suele añadir " - Nombre de la Fuente" al final
      let title = rawTitle;
      const sourceSuffix = ` - ${source}`;
      if (title.endsWith(sourceSuffix)) {
        title = title.substring(0, title.length - sourceSuffix.length).trim();
      }

      // Obtener la cobertura relacionada
      const relatedArticles = parseRelatedArticles(description, title, source);

      items.push({
        title,
        link,
        guid,
        pubDate,
        source,
        sourceUrl,
        relatedArticles,
      });
    }

    // Ordenar noticias: de más reciente a más antigua
    items.sort((a, b) => {
      const dateA = new Date(a.pubDate);
      const dateB = new Date(b.pubDate);
      return dateB - dateA;
    });

    // Guardar en la CDN de Vercel por 1 hora, revalidar en segundo plano por 10 minutos
    response.setHeader(
      "Cache-Control",
      "s-maxage=3600, stale-while-revalidate=600",
    );

    return response.status(200).json(items);
  } catch (error) {
    console.error("Error en el handler de noticias:", error.message || error);
    return response.status(502).json({
      error: "Error al recuperar o parsear el feed de noticias",
      detail: error.message,
    });
  }
}
