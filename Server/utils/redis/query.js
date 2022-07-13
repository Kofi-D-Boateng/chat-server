"use strict";
import redis from "../../config/database/redis.js";
import { Room, room } from "../../classes/redis/room.js";

const _searchForRoom = async ({ key: key }) => {
  const roomRef = new Room({
    key: key,
    roomName: room.roomName,
    maxCapacity: room.maxCapacity,
    members: room.members,
  });
  console.log(roomRef);
  const r = await redis.GET(roomRef.key);
  if (r) {
    const ref = await JSON.parse(r);
    roomRef.roomName = ref.roomName;
    roomRef.maxCapacity = ref.maxCapacity;
    roomRef.members = ref.members;
    return roomRef;
  }
  roomRef.roomName = room.roomName;
  roomRef.maxCapacity = room.maxCapacity;
  roomRef.members = room.members;
  return roomRef;
};

const _createRoom = async ({ key: key }) => {
  const roomRef = new Room({
    key: key,
    roomName: room.roomName,
    maxCapacity: room.maxCapacity,
    members: room.members,
  });
  const r = await redis.GET(roomRef.key);
  if (r) {
    const ref = await JSON.parse(r);
    roomRef.roomName = ref.roomName;
    roomRef.maxCapacity = ref.maxCapacity;
    roomRef.members = ref.members;
    return roomRef;
  }
  roomRef.roomName = room.roomName;
  roomRef.maxCapacity = room.maxCapacity;
  roomRef.members = room.members;
  await redis.SET(roomRef.key, JSON.stringify(roomRef));
  return roomRef;
};

const _removeUserFromRoom = async () => {};

const _deleteRoomFromMemory = async () => {};

export {
  _searchForRoom,
  _removeUserFromRoom,
  _deleteRoomFromMemory,
  _createRoom,
};
