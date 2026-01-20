import fs from "fs/promises";

export const folder_uploads = async () => {
  await fs.mkdir("./torrent_assets/uploads", { recursive: true });
};
