import express from "express";
import {
  dwlndspgsUrl,
  dwnldngfunctnsUrl,
  imgtrrrntUrl,
  allmetadatatrrntsUrl,
  magnetdwnldrUrl,
  magnetdwnldUrl,
  srchpgtrrrntsUrl,
  stopmagnetdwnldrUrl,
  trrntdsttuschkUrl,
  trrntdwnldUrl,
  ytsmovieserchUrl,
} from "../controllers/torrent.controller.js";

const router = express.Router();

router.post("/trrntdwnld", trrntdwnldUrl);
router.get("/trrntdsttuschk", trrntdsttuschkUrl);
router.post("/ytsmovieserch", ytsmovieserchUrl);
router.get("/srchpgtrrrnts", srchpgtrrrntsUrl);
router.post("/imgtrrrnt", imgtrrrntUrl);
router.post("/magnetdwnldr", magnetdwnldrUrl);
router.get("/dwlndspgs", dwlndspgsUrl);
router.get("/magnetdwnld", magnetdwnldUrl);
router.get("/allmetadatatrrnts", allmetadatatrrntsUrl);
router.get("/stopmfntdwnld1", stopmagnetdwnldrUrl);
router.get("/dwnldngfunctns", dwnldngfunctnsUrl);

export default router;
