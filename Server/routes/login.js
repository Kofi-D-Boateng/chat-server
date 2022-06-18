"use-strict";
import express from "express";
var router = express.Router();

import login from "../controllers/loginController.js";

router.post("/authenticate", login);

export default router;
