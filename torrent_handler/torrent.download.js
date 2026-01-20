import WebTorrent from "webtorrent";
import fs from "fs";
import path from "path";

const client = new WebTorrent();

//progress of torrent
let downloadStats = { progress: "0%", peers: 0, status: "Idle" };

//build .torrent file path not concatenation
export const torrentdwnldr = async (filename, downloadsPath) => {
  const torrentFilePath = path.join("./torrent_assets/uploads", filename);
  console.log(filename); //torrent name & extension (e.g example.torrent)
  console.log(downloadsPath); //computer default download path (e.g C:\Users\example\Downloads)
  console.log(torrentFilePath); //mondatory root directory where actual .torrent file is saved (e.g torrent_assets\uploads\A Very Jonas Christmas Movie (2025) 1080p.WEB.x265 (1).torrent)

  const torrentBuffer = fs.readFileSync(torrentFilePath);

  client.add(torrentBuffer, { path: downloadsPath }, (torrent) => {
    torrent.on("download", () => {
      downloadStats.progress = `${(torrent.progress * 100).toFixed(2)}%`;
      downloadStats.peers = torrent.numPeers;
      downloadStats.status = "Downloading";
    });

    torrent.on("done", () => {
      downloadStats.status = "Complete";
      downloadStats.progress = "100%";
      //Stop seeding and free up server resources
      torrent.destroy();
      //End all torrents
      // client.destroy();
    });
  });

  // Handle errors to prevent the app from crashing
  client.on("error", (err) => {
    console.error("Error:", err.message);
  });
};

export default downloadStats;
