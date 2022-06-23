"use-strict";
import express from "express";
import { ROUTES } from "../config/config.js";
import findRoom from "../controllers/searchController.js";
const router = express.Router();

router.get(ROUTES.FIND_ROOM, findRoom);

export default router;
