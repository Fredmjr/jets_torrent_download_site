import express from "express";
import { crtusrUrl, tstUrl } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/crtusr", crtusrUrl);
router.get("/tst", tstUrl);

export default router;
