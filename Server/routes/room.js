"use-strict";
import express from "express";
import { ROUTES } from "../config/config.js";
import { createRoom, findRoom } from "../controllers/roomController.js";
const router = express.Router();

router.get(ROUTES.FIND_ROOM, findRoom);
router.get(ROUTES.CREATE_ROOM, createRoom);

export default router;
