"use strict";

import { CONFIG } from "../../config/config.js";

export class Room {
  constructor({
    key: key,
    roomName: roomName,
    maxCapacity: maxCapacity,
    members: members,
  }) {
    this.key = key;
    this.roomName = roomName;
    this.maxCapacity = maxCapacity;
    this.members = members;
  }
}

export const room = {
  key: 0,
  roomName: "",
  maxCapacity: CONFIG.MAX_ROOM_CAPACITY,
  members: [],
};
