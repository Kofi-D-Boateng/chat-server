"use strict";
import { MongoClient } from "mongodb";
import { CONFIG } from "../config.js";

const dbConnection = new MongoClient(CONFIG.MONGO_URI);
export { dbConnection };
