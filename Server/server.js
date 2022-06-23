"use strict";
import "dotenv/config";
import { CONFIG, API_VERSION } from "./config/config.js";
import { Server } from "socket.io";
import { createServer } from "http";
import express from "express";
import morgan from "morgan";
import cors from "cors";
const app = express();

// PROXY WHITELIST
console.log(CONFIG.ORIGINS);
const whitelist = {
  origin: CONFIG.ORIGINS,
  credentials: true,
  optionSuccessStatus: 200,
  method: CONFIG.METHODS,
};
app.use(morgan(CONFIG.LOGGER_TYPE));
app.use(cors(whitelist));
app.use(express.json());

// SERVER
const server = createServer(app);
// SOCKET
const io = new Server(server, {
  cors: whitelist,
});

// ROUTE DEPENDENCIES
import login from "./routes/login.js";
import signup from "./routes/signup.js";
import search from "./routes/search.js";

const users = {};
let length = 0;

app.use(`/${API_VERSION.VERSION}/login`, login);
app.use(`/${API_VERSION.VERSION}/signup`, signup);
app.use(`/${API_VERSION.VERSION}/rooms`, search);
io.on("connection", (socket) => {
  socket.on("join-room", (data) => {
    socket.emit("myID", socket.id);
    if (users[data.room]) {
      length = users[data.room].length;
      if (length === CONFIG.MAX_ROOM_CAPACITY) {
        socket.emit("room-status", { isFull: true });
        return;
      }
      users[data.room].push(socket.id);
    } else {
      users[data.room] = [socket.id];
    }
    for (const room in users) {
      console.log(room);
      for (let i = 0; i < users[room].length; i++) {
        if (socket.id === users[room][i]) {
          const usersInRoom = users[room].filter((id) => id !== socket.id);
          socket.emit("all-users", { users: usersInRoom });
          socket.join(room);
        }
      }
    }
    console.log(users);
  });

  socket.on("sending-signal", (data) => {
    io.to(data.userToSignal).emit("user-joined", {
      signal: data.signal,
      callerID: data.callerID,
    });
  });

  socket.on("returning-signal", (data) => {
    io.to(data.callerID).emit("receiving-signal", {
      signal: data.signal,
      id: socket.id,
    });
  });

  socket.on("message", (data) => {
    for (const room in users) {
      for (let i = 0; i < users[room].length; i++) {
        if (socket.id === users[room][i]) {
          io.to(room).emit("chat", { message: data.message, id: socket.id });
        }
      }
    }
  });

  socket.on("disconnect", () => {
    for (const room in users) {
      for (let i = 0; i < users[room].length; i++) {
        if (socket.id === users[room][i]) {
          const usersLeft = users[room].filter((id) => id !== socket.id);
          socket.broadcast.emit("users-left", {
            leaver: socket.id,
          });
          if (usersLeft.length === 0) {
            delete users[room];
            return;
          }
          users[room] = [...usersLeft];
          return;
        }
      }
    }
    console.log(users);
  });
});

server.listen(CONFIG.PORT, () =>
  console.log(`Server listening on port:${CONFIG.PORT}`)
);
