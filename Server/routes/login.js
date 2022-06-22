"use-strict";
import express from "express";
import { ROUTES } from "../config/config.js";
import _LoginUser from "../controllers/loginController.js";
const router = express.Router();

router.post(ROUTES.USER_LOGIN, _LoginUser);

export default router;
