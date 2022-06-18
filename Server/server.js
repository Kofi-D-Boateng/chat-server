"use strict";
require("dotenv").config();
const PORT = process.env.PORT;
const express = require("express");
const logger = require("morgan");
const app = express();
const cors = require("cors");
// PROXY WHITELIST
const whitelist = {
  origin: "http://localhost:3000",
  credentials: true,
  optionSuccessStatus: 200,
  method: ["GET", "POST"],
};
app.use(logger("dev"));
app.use(cors(whitelist));
app.use(express.json());

// SERVER
const server = require("http").createServer(app);
// SOCKET
const io = require("socket.io")(server, {
  cors: whitelist,
});

// ROUTE DEPENDENCIES
const login = require("./routes/login");

const users = {};

app.use("/login", login);
io.on("connection", (socket) => {
  socket.on("join-room", (data) => {
    socket.emit("myID", socket.id);
    if (users[data.room]) {
      const length = users[data.room].length;
      if (length === 4) {
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

server.listen(4000, () => console.log(`Server listening on port: ${PORT}`));
