import * as cheerio from "cheerio";

async function scrapeYTS() {
  const url = "https://www.yts-official.to/browse-movies";

  try {
    const response = await fetch(url);
    const html = await response.text();

    // 1. Load the HTML to create the '$' selector
    const $ = cheerio.load(html);
    const movies = [];

    // 2. Perform the scraping INSIDE this block where '$' is defined
    $(".browse-movie-title").each((index, element) => {
      const $el = $(element);

      // Get the title and the year (usually a sibling div/span)
      const title = $el.text().trim();
      const relativeUrl = $el.attr("href");
      const year = $el.parent().find(".browse-movie-year").text().trim();

      movies.push({
        title: title,
        url: relativeUrl.startsWith("http")
          ? relativeUrl
          : `https://www.yts-official.to${relativeUrl}`,
        year: year,
      });
    });

    console.log(movies);
  } catch (error) {
    console.error("Scraping failed:", error);
  }
}

scrapeYTS();
