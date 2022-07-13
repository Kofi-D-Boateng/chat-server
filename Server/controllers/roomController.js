"use strict";
import { _searchForRoom, _createRoom } from "../utils/redis/query.js";
import { randomBytes } from "crypto";
import { CONFIG } from "../config/config.js";

const findRoom = async (req, res) => {
  const param = req.query["key"];
  const result = await _searchForRoom({ key: param });
  if (result.roomName.trim().length > 0) {
    const token = randomBytes(CONFIG.LENGTH_OF_TOKEN).toString(
      CONFIG.TOKEN_STRING_FORMAT
    );
    res
      .status(200)
      .json({ token: token, roomName: result.roomName, key: result.key });
  } else {
    res.status(400).json();
  }
};

const createRoom = async (req, res) => {
  const roomID = randomBytes(16).toString("base64url");
  const result = await _createRoom({ key: roomID });
  console.log(result);
  if (result.roomName.trim().length > 0) {
    return;
  }
  res.status(200).json({ roomID: roomID });
};

export { findRoom, createRoom };
