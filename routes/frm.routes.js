import express from "express";
import {} from "../controllers/torrent.controller.js";
import { clsUrl, minUrl, mxUrl } from "../controllers/frm.controller.js";

const router = express.Router();

router.post("/min", minUrl);
router.post("/mx", mxUrl);
router.post("/cls", clsUrl);

export default router;
