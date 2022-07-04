"use strict";
import { room } from "../structs/redis/room.js";
import { searchForRoom } from "../utils/redis/query.js";
import { randomBytes } from "crypto";
import { CONFIG } from "../config/config.js";

const findRoom = async (req, res) => {
  const param = req.query["room"];
  let roomRef = room;
  const result = await searchForRoom({ key: param });
  roomRef.key = result.key;
  roomRef.capacity = result.capacity;
  roomRef.members = result.members;
  roomRef.roomName = result.roomName;
  if (roomRef.roomName.trim().length > 0) {
    const token = randomBytes(CONFIG.LENGTH_OF_TOKEN).toString(
      CONFIG.TOKEN_STRING_FORMAT
    );
    res.status(200).json({ token: token, room: roomRef.roomName });
    roomRef.key = 0;
    roomRef.capacity = 0;
    roomRef.members = [];
    roomRef.roomName = "";
  } else {
    res.status(400).json({});
    roomRef.key = 0;
    roomRef.capacity = 0;
    roomRef.members = [];
    roomRef.roomName = "";
  }
};

const createRoom = async (req, res) => {
  const roomID = randomBytes(16).toString("base64url");
  res.status(200).json({ roomID: roomID });
};

export { findRoom, createRoom };
