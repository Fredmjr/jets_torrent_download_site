import busboy from "busboy";
import { folder_uploads } from "../torrent_handler/torrent.folder.js";
import { torrentdwnldr } from "../torrent_handler/torrent.download.js";
import downloadStats from "../torrent_handler/torrent.download.js";
import path from "path";
import fs from "fs";
import os from "os";
import fsPromises from "fs/promises";
import { ytsmovieserch } from "../torrent_handler/torrent.api.js";
import { savetodb } from "../torrent_handler/torrent.db.js";
import movieModel from "../models/torrent.model.js";
import sharp from "sharp";
import { Op } from "sequelize";
import downloadmagentStats, {
  ismagnetFunc1downloading,
  magnettorrentdwnldr,
  stopmagnetdwnld,
} from "../torrent_handler/torrent.magnet.download.js";
import metadataModel from "../models/metadata.model.js";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//............................................. .TORRENT FILE .......................
//upload, process and start download
export const trrntdwnldUrl = async (req, res) => {
  let receivedfile = false;
  try {
    //create ./torrent_assets/uploads folder
    await folder_uploads();

    //file processing
    const Busboy = busboy({ headers: req.headers });
    Busboy.on("file", (fieldname, file, { filename }, encoding, mimetype) => {
      receivedfile = true; //no file check
      //save .torrent to ./torrent_assets/uploads
      console.log(`File ${filename}`);
      const filePath = path.join("./torrent_assets/uploads", filename);
      const writeStream = fs.createWriteStream(filePath);
      file.pipe(writeStream);

      //Downloaded file(s)
      const downloadsPath = path.join(os.homedir(), "Downloads");
      console.log(downloadsPath);
      torrentdwnldr(filename, downloadsPath);
    });
    Busboy.on("finish", () => {
      if (!receivedfile) {
        res.json({
          erMgs: "No .torrent file detected, select one!",
        }); //error code is messing up console
      } else {
        res.status(200).json({
          upload: true,
        });
      }
    });
    Busboy.on("error", (err) => {
      console.error(err);
      res.status(400).json({
        erMgs: "Unable to process your .torrent file",
      });
    });
    req.pipe(Busboy);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      erMgs: ".torrent file processing for download failed!",
    });
  }
};

//torrent status check
export const trrntdsttuschkUrl = async (req, res) => {
  try {
    if (downloadStats) {
      res.json({
        downloadStats,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      erMgs: "Unable to check torrent download status!",
    });
  }
};

//............................................ MAGNET LINK ...........................................................................

//search movie on  my db & yts db
export const ytsmovieserchUrl = async (req, res) => {
  const { name } = req.body;
  let result;
  try {
    //my db
    result = await movieModel.findAll({
      where: {
        title: {
          [Op.startsWith]: `%${name}`,
        },
      },
    });
    //yts db
    if (result.length === 0) {
      result = await ytsmovieserch(name);
      if (result && result.length > 0) {
        await savetodb(result);
      }
    }
    //no movie found
    if (!result || result.length === 0) {
      return res.status(404).json({
        erMgs: "No movie found!",
      });
    }
    //send found movie results
    return res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      erMgs: "Unable to check torrent download status!",
    });
  }
};

export const srchpgtrrrntsUrl = async (req, res) => {
  try {
    res.render("components/searchpage");
  } catch (error) {
    console.log(error);
    res.status(400).json({
      erMgs: "Unable to check torrent download status!",
    });
  }
};
//image for thumbnail
export const imgtrrrntUrl = async (req, res) => {
  const { ttl, yr } = req.body;
  try {
    const foundmovie = await movieModel.findOne({
      where: {
        title: ttl,
        year: yr,
      },
    });
    //Default icon If movie doesn't exist in db
    if (!foundmovie) {
      return res
        .status(200)
        .json({ img: "../public/src/assets/icons/no_img.png" });
    }

    const flnm = foundmovie.dataValues.thumbnail;
    const filename = flnm.match(/([^\\]+)$/)[0];
    const srvr_imgPath = path.join(
      __dirname,
      "../torrent_assets/normal_imgs",
      filename,
    );

    //If img isnt avaible show default img
    try {
      const accessable_img = await fsPromises.stat(srvr_imgPath);
      // check if img file is broken
      if (accessable_img.size < 5000) {
        throw new Error("File too small");
      }
      //add more borken img checks here!!!!!!!!!!!!!!!!!!!!!!!!!!!!

      return res.status(200).sendFile(srvr_imgPath);
    } catch {
      return res
        .status(200)
        .json({ img: "../public/src/assets/icons/no_img.png" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      erMgs: "Unable to load image preview!",
    });
  }
};

//download magnet torrent
export const magnetdwnldrUrl = async (req, res) => {
  const { ttl, yr, qty } = req.body;
  try {
    const foundmovie = await movieModel.findOne({
      where: {
        title: {
          [Op.startsWith]: `%${ttl}`,
        },
        year: yr,
      },
    });

    console.log(foundmovie);
    //if this fails then the movie wasnt stored in my db
    if (!foundmovie) {
      return res.status(200).json({
        erMgs: "Failed to process link for download, selected movie not found!",
      });
    }
    //Get movie magnet from found movie stored in db
    const movieId = foundmovie.dataValues.id;
    const quality = qty;
    //get single link of the magnet array of objects
    const moviemagnets = foundmovie.dataValues.magnets;
    const moviemagnetlink = moviemagnets.find(
      (magnet) => magnet.quality === qty,
    )?.link;

    //Downloaded file(s) path on client computer
    const downloadsPath = path.join(os.homedir(), "Downloads");
    const { downloadActive } = ismagnetFunc1downloading();
    console.log("active or not: ", downloadActive);
    //download status true (active - already downloading)
    if (downloadActive === true) {
      return res.status(200).json({
        download_status: true,
        mgs: "Download in progress. All 3 slots occupied!",
      });
    }
    //download status false (idel - has started)
    if (downloadActive === false) {
      const downloadstarted = magnettorrentdwnldr(
        moviemagnetlink,
        downloadsPath,
        yr,
        ttl,
        movieId,
        quality,
      );

      if (downloadstarted) {
        return res.status(200).json({
          download_status: false,
          download_pkg_nm: `${ttl} ${yr} [${qty}]`,
          mgs: "Download has started!",
        });
      }
      return res.status(400).json({
        erMgs_status: true,
        mgs: "Download failed to start!",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      erMgs: "Unable to download file!",
    });
  }
};

//stop magnet download
export const magnetstopdownloadUrl = async (req, res) => {
  try {
    stopmagnetdwnld();
    res.send("Movie stopped dowloading");
  } catch (error) {
    console.log(error);
    res.status(400).json({
      erMgs: "Unable stop download!",
      instructions:
        "If unable to stop download, use task manager to close app then reopen it",
      mgs: "Stop download fail-safe coming in next app update!",
    });
  }
};

//get magnet progress status
export const magnetstatusUrl = async (req, res) => {
  try {
    downloadmagentStats;
    return res.status(200).send(downloadmagentStats);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      erMgs: "Unable to get download progress status!",
    });
  }
};

//downloads page
export const dwlndspgsUrl = async (req, res) => {
  try {
    downloadmagentStats;
    return res.status(200).render("components/downloads");
  } catch (error) {
    console.log(error);
    res.status(400).json({
      erMgs: "Unable to reach server for downloads page!",
    });
  }
};

//resume magnet downloads
export const magnetdwnldUrl = async (req, res) => {
  try {
    return res.status(200).json({
      mgs: "Download has resumed!",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      erMgs: "Unable to reach server for downloads page!",
    });
  }
};

//Stop magnet download - based on the downloading function (e.g function  1 will be stop)
export const stopmagnetdwnldrUrl = async (req, res) => {
  try {
    const { downloadActiv } = ismagnetFunc1downloading();
    const num_dwnldng_trrnts = 0;
    if (downloadActiv === false) {
      return res.status(200).json({
        mgs: `${num_dwnldng_trrnts} torrents under downloads!`,
      });
    }
    return res.status(200).json({
      mgs: "Download has stopped!",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      erMgs:
        "Unable to stop download, ...................addign more way kill download besides shuting down app!",
    });
  }
};

//
export const dwnldngfunctnsUrl = async (req, res) => {
  try {
    let slots = 3;
    let flrtd_mv1;
    let mv_arr_obj = [];
    //funtion no.1
    const { downloadActive, movieId } = ismagnetFunc1downloading();
    console.log(downloadActive, movieId);
    if (downloadActive === true) {
      const mv1 = await metadataModel.findOne({
        where: {
          movie_id: movieId,
        },
      });

      if (mv1) {
        const { title, quality, progress, type } = mv1.dataValues;
        const func1_nm = "func1";
        flrtd_mv1 = { title, quality, progress, type, func1_nm };
        mv_arr_obj[0] = flrtd_mv1; //movies object
        slots = 3 - 1;
      }
    }

    //funtion no.2

    //funtion no.3
    if (downloadActive === false) {
      return res.status(200).json({
        downloadActive: false,
        trrnt_status_mgs: "You have no torrents downloading!",
        mgs: `You have ${slots} slots for downloading movies!`,
      });
    }
    return res.status(200).json({
      downloadActive: true,
      mv_arr_obj,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      erMgs:
        "Unable to stop download, ...................adding more ways to kill downloads besides shuting down app!",
    });
  }
};

//All movies (downloaded, downloading & pending torrents (searched & file))
export const allmetadatatrrntsUrl = async (req, res) => {
  try {
    const completed = await metadataModel.findAll({
      where: {
        progress: "100%",
      },
    });
    const incomplete = await metadataModel.findAll({
      where: {
        progress: {
          [Op.ne]: "100%",
        },
      },
    });

    //filter out unnecessry data from this array of objects data
    const frlrtd_completed = completed.map((item) => ({
      title: item.dataValues.title,
      quality: item.dataValues.quality,
      year: item.dataValues.year,
      progress: item.dataValues.progress,
      type: item.dataValues.type,
    }));

    const frlrtd_incomplete = incomplete.map((item) => ({
      title: item.dataValues.title,
      quality: item.dataValues.quality,
      year: item.dataValues.year,
      progress: item.dataValues.progress,
      type: item.dataValues.type,
    }));

    //slice two four catgries: by file & searched
    const frlrtd_completed_file = frlrtd_completed.filter(
      (item) => item.type === "file",
    );
    const frlrtd_completed_srchd = frlrtd_completed.filter(
      (item) => item.type === "searched",
    );
    const frlrtd_incomplete_file = frlrtd_incomplete.filter(
      (item) => item.type === "file",
    );
    const frlrtd_incomplete_srchd = frlrtd_incomplete.filter(
      (item) => item.type === "searched",
    );

    return res.status(200).json({
      dwnlded_srchd: frlrtd_completed_srchd,
      dwnldied_fl: frlrtd_completed_file,
      dwnlding_srchd: frlrtd_incomplete_file,
      dwnlding_fl: frlrtd_incomplete_srchd,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      erMgs:
        "Unable to fetch download status, try reload or pause and resume torrent(s)!",
    });
  }
};

//STORED - downloading & complete download status
