import * as cheerio from "cheerio";

//Saerch YTS movies
export const ytsmovieserch = async (movieName) => {
  const base = "https://www.yts-official.cc";
  const url = `${base}/browse-movies?keyword=${encodeURIComponent(
    movieName
  )}&quality=all&genre=all&rating=0&order_by=latest&year=0`;

  try {
    const html = await (await fetch(url)).text();
    const $ = cheerio.load(html);

    const results = await Promise.all(
      $(".browse-movie-wrap")
        .toArray()
        .map(async (el) => {
          const wrap = $(el);
          const title = wrap.find(".browse-movie-title").text().trim();
          const detailUrl = new URL(
            wrap.find(".browse-movie-title").attr("href"),
            base
          ).href;

          const detailHtml = await (await fetch(detailUrl)).text();
          const $$ = cheerio.load(detailHtml);

          return {
            title,
            year: wrap.find(".browse-movie-year").text().trim(),
            thumbnail: new URL(wrap.find("img").attr("src"), base).href,
            magnets: $$('a[href^="magnet:"]')
              .map((i, a) => {
                const link = $$(a).attr("href");
                return {
                  quality: link.match(/(\d{3,4}p)/)?.[0] || "Magnet",
                  link,
                };
              })
              .get(),
          };
        })
    );

    console.log(JSON.stringify(results, null, 2));
    return results;
  } catch (err) {
    console.error("Scrape failed:", err.message);
  }
};
