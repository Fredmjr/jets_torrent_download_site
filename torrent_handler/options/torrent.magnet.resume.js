// resume a torrent download using saved metadata
export const resumemagnetdwnld = async (movieId, downloadsPath) => {
  try {
    // fetch the movie record from DB
    const movie = await metadataModel.findOne({
      where: { movie_id: movieId },
    });

    if (!movie || !movie.resume_metadata) {
      console.log("No resume metadata found for movie:", movieId);
      return false;
    }

    // re-add the torrent using saved magnet URI
    activeTorrent = client.add(
      movie.resume_metadata,
      { path: downloadsPath },
      (torrent) => {
        trrnt = torrent;

        torrent.on("download", () => {
          downloadmagentStats.progress = `${(torrent.progress * 100).toFixed(
            2
          )}%`;
          downloadmagentStats.peers = torrent.numPeers;
          downloadmagentStats.status = "Downloading";
          console.log(
            `Resumed: ${downloadmagentStats.progress} | Peers: ${downloadmagentStats.peers}`
          );
        });
        //sequence downloading
        torrent.on("ready", () => {
          const file = torrent.files[0];
          file.select();
        });

        torrent.on("done", () => {
          downloadmagentStats.status = "Complete";
          downloadmagentStats.progress = "100%";
          torrent.destroy();
          clearInterval(clearout_setInterval);
        });

        torrent.on("error", (err) => {
          console.error("Torrent Error:", err);
          clearInterval(clearout_setInterval);
        });
      }
    );

    return true;
  } catch (err) {
    console.error("Resume failed:", err);
    return false;
  }
};
