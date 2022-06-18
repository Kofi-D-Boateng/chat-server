"use strict";
import { randomBytes } from "crypto";

export const config = {
  PORT: process.env.CHAT_PORT || 5000,
  JWT_SECRET: process.env.JWT_SECRET || randomBytes(12).toString("hex"),
  EXPIRESIN: process.env.EXPIRES_IN || "60000",
  ORIGINS: [process.env.CORS_ORIGINS] || "*",
  METHODS: [process.env.CORS_METHODS] || ["GET,POST"],
  LOGGER_TYPE: process.env.LOGGER || "dev",
};
