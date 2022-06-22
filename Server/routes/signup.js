"use strict";

import express from "express";
import createNewUser from "../controllers/signupController.js";

const router = express.Router();

router.put("/create-user", createNewUser);

export default router;
