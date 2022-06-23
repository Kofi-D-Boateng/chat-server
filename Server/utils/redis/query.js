"use strict";
import redis from "../../config/database/redis.js";

const searchForRoom = async ({ key: key }) => {
  const room = await redis.GET(key);
  if (room) {
    return JSON.parse(room);
  }
  return {};
};

const removeUserFromRoom = async () => {};

const deleteRoomFromMemory = async () => {};

export { searchForRoom, removeUserFromRoom };
