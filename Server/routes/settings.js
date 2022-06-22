import express from "express";
import { ROUTES } from "../config/config.js";

const router = express.Router();

router.post(ROUTES.USER_SETTINGS);
