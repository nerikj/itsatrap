import express from "express";
import { Server } from "http";
import socketio from "socket.io";

const app = express();
const http = Server(app);
const io = socketio(http);

const players = {};

io.on('connection', (socket) => {
  console.log('a user connected');

  players[socket] = {};
  socket.emit('chat', 'Hi ' + socket.id);

  socket.on('move', (msg) => {
    console.log(socket.id, 'move: ', msg);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

http.listen(3000, () => {
  console.log("Hi from lolball");
});
