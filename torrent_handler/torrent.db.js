import movieModel from "../models/torrent.model.js";
import { v4 as uuidv4 } from "uuid";
import fs from "fs/promises";
import path from "path";

export const savetodb = async (result) => {
  if (!result || !Array.isArray(result)) return;

  const normal_imgsPath = "./torrent_assets/normal_imgs";
  const cached_imgsPath = "./torrent_assets/cached_imgs";

  await fs.mkdir(normal_imgsPath, { recursive: true });
  await fs.mkdir(cached_imgsPath, { recursive: true });
  try {
    //You can process in chunks (avoid traffic jam, too db server calls & being banned by server fr too many requests)
    for (let i = 0; i < result.length; i += 10) {
      const chunk = result.slice(i, i + 10);
      const cnttPrm = chunk.map(async (movie) => {
        //use array of promises for concurrent processing (muitple downlaods than for of loop)
        //find movie by title & date
        const foundmovie = await movieModel.findOne({
          where: {
            title: movie.title,
            year: movie.year,
          },
        });
        //create movie
        //download img
        if (!foundmovie) {
          const fileuuid = uuidv4();
          const filename = `${fileuuid}.jpg`;

          const filePath = path.join(normal_imgsPath, filename);

          //normal imgs
          try {
            const response = await fetch(movie.thumbnail);
            if (!response.ok)
              throw new Error(`Failed to fetch image: ${response.statusText}`);

            const buffer = await response.arrayBuffer();
            await fs.writeFile(filePath, Buffer.from(buffer));

            await movieModel.create({
              title: movie.title,
              year: movie.year,
              thumbnail: filePath,
              magnets: movie.magnets,
            });
          } catch (error) {
            console.log("Error downloading movie img", error);
          }
        }
      });
      await Promise.all(cnttPrm);
    }
    return true;
  } catch (error) {
    console.log("Error failed saved to db: ", error);
  }
};
