//Key features
// downloads torrent (through magnet),
// saves downloaded metadata (every 15 sec)
// & stops the download

import WebTorrent from "webtorrent";
import metadataModel from "../models/metadata.model.js";
const client = new WebTorrent();

//progress of magnet torrent
let downloadmagentStats = { progress: "0%", peers: 0, status: "Idle" };
let clearout_setInterval; // for clearing setinterval that writes metadata to db
let activeTorrent;
let movie_id;
let movie_qty;
let trrnt;
let movie;
let func1_initiated = false;

export const magnettorrentdwnldr = (
  magnetlink,
  downloadsPath,
  yr,
  ttl,
  movieId,
  quality,
) => {
  movie_id = movieId;
  movie_qty = quality;

  // Directly add the magnet string
  activeTorrent = client.add(magnetlink, { path: downloadsPath }, (torrent) => {
    torrent.on("download", () => {
      downloadmagentStats.progress = `${(torrent.progress * 100).toFixed(2)}%`;
      downloadmagentStats.peers = torrent.numPeers;
      downloadmagentStats.status = "Downloading";
      //the actual download as begun not the running of the function!!
      func1_initiated = true;
      // Optional, log to see it working from the server side.
      console.log(
        `Progress: ${downloadmagentStats.progress} | Peers: ${downloadmagentStats.peers}`,
      );
    });
    trrnt = torrent;
    const movie_year = yr;
    const movie_title = ttl;
    //download in sequance (this allows to view whats been downloaded before file is completely downloaded)
    torrent.on("ready", () => {
      const file = torrent.files[0];
      file.select(); // sequential download
    });

    //save downloaded metadata to db for resume purpose 15 seconds
    //data values
    //1. create movive metadata on start
    const crtmvmetedatafuc = async () => {
      //found movie
      movie = await metadataModel.findOne({
        where: {
          movie_id: movie_id,
        },
      });
      if (!movie) {
        movie = await metadataModel.create({
          movie_id: movie_id,
          title: movie_title,
          year: movie_year,
          progress: "0%",
          resume_metadata: torrent.magnetURI,
          type: "searched",
          quality: quality,
        });
      }
    };
    crtmvmetedatafuc();
    //2. update movie metadata
    clearout_setInterval = setInterval(async () => {
      try {
        if (trrnt && torrent.magnetURI) {
          const movie_progress = downloadmagentStats.progress;
          movie.progress = movie_progress; //save progress

          await movie.save();
        }
      } catch (error) {
        console.log(error);
      }
    }, 15000);

    torrent.on("done", () => {
      downloadmagentStats.status = "Complete";
      downloadmagentStats.progress = "100%";
      torrent.destroy();
      clearInterval(clearout_setInterval); //plz clear clearout_setInterval thats saving metadata so it doesnt run endlessly
    });

    torrent.on("error", (err) => {
      console.error("Torrent Error:", err);
      clearInterval(clearout_setInterval); //in case clearout_setInterval isn't cleared
    });
  });
  //Function returns true once download has started to notify the magnet download controller that we are in business :)
  return {
    rtrn: true,
    func1_initiated,
  };
};

//stop the magnet torrent download
export const stopmagnetdwnld = () => {
  if (activeTorrent) {
    activeTorrent.destroy();
    downloadmagentStats.status = "Stopped";
    clearInterval(clearout_setInterval); //third time in case clearout_setInterval isn't cleared
  }
};

export default downloadmagentStats;

//lack of better naming functions :)
export const ismagnetFunc1downloading = () => {
  const statusobj = {
    downloadActive: !!activeTorrent,
    movieId: movie_id,
    movieQty: movie_qty,
  };
  return statusobj;
};
