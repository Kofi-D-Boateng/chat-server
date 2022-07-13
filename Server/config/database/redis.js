"use strict";
import redis from "redis";
import { CONFIG } from "../config.js";
const REDIS_URL = `redis://${CONFIG.REDIS_HOST}:${CONFIG.REDIS_PORT}`;
console.log("connection String: " + REDIS_URL);
const CLIENT = redis.createClient({ url: REDIS_URL });
CLIENT.connect();

export default CLIENT;
