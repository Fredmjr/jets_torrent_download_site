import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import frmRouter from "./routes/frm.routes.js";
import torrentRouter from "./routes/torrent.routes.js";
import sequelize from "./config/db.js";
import corsMiddleware from "./middleware/cors/cors.js";

// Wrap the entire server setup and start logic in a function

const app = express();
app.use(express.json());
const port = 8100;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// hbs engine crucial for Electron packaging.
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
app.set("torrent_assets", path.join(__dirname, "torrent_assets"));
/* app.use(express.static(path.join(__dirname, "torrent_assets/normal_imgs"))); */
/* app.use(express.static("torrent_assets/normal_imgs")); */

// Routes & controllers (add them, they should work unless otherwise)
app.get("/", (req, res) => {
  res.render("index.hbs");
});
app.use("/trrnt", corsMiddleware, torrentRouter);
app.use("/frm", corsMiddleware, frmRouter);

// Start the server and return a promise
(async () => {
  await sequelize.sync();
  app.listen(port, () => {
    console.log("Application running");
  });
})();
