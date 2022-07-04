"use strict";
import redis from "../../config/database/redis.js";
import { room } from "../../structs/redis/room.js";

const searchForRoom = async ({ key: key }) => {
  const search = await redis.GET(key);
  const roomRef = room;
  if (search) {
    const r = await JSON.parse(search);
    roomRef.key = r.key;
    roomRef.roomName = r.room_name;
    roomRef.maxCapacity = r.maxCapacity;
    roomRef.members = r.members;
    return roomRef;
  }
  return room;
};

const createRoom = async ({ key: key }) => {
  const room = await redis.GET(key);
  if (room) {
    return JSON.parse(room);
  }
  return {};
};

const removeUserFromRoom = async () => {};

const deleteRoomFromMemory = async () => {};

export { searchForRoom, removeUserFromRoom };
