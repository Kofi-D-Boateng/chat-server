"use strict";
import { randomBytes } from "crypto";

export const CONFIG = {
  PORT: process.env.CHAT_PORT || 7210,
  JWT_SECRET: process.env.JWT_SECRET || randomBytes(12).toString("hex"),
  EXPIRESIN: process.env.EXPIRES_IN || "60000",
  ORIGINS: [process.env.CORS_ORIGINS] || "*",
  METHODS: [process.env.CORS_METHODS] || ["GET,POST"],
  LOGGER_TYPE: process.env.LOGGER || "dev",
  MAX_ROOM_CAPACITY: process.env.MAX_CAPACITY || 100,
  REDIS_HOST: process.env.REDIS_CACHE_IP,
  REDIS_PORT: process.env.REDIS_CACHE_PORT,
  MONGO_URI: process.env.MONGO_DB_URI,
  MONGO_DB_NAME: process.env.DB_NAME,
  USERS_COLLECTION: process.env.USERS_COLLECTION,
  LENGTH_OF_TOKEN: +process.env.TOKEN_LENGTH || 12,
  TOKEN_STRING_FORMAT: process.env.TOKEN_STRING_FORMAT || "hex",
  PASSWORD_SALT_ROUNDS: +process.env.SALT_ROUNDS || 10,
};

export const API_VERSION = {
  VERSION: "api/v1",
};

export const ROUTES = {
  USER_SETTINGS: "/configure-room",
  USER_LOGIN: "/authenticate-user",
  FIND_ROOM: "/find-room",
  CREATE_ROOM: "/create-room",
};
