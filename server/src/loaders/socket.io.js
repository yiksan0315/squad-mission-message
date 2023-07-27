import socket from 'socket.io';

const SEND_MESSAGE = 'sending';
const REPLY_MESSAGE = 'reply';
const REGISTER = 'register';
const UNREGISTER = 'unregister';
const ERROR = 'error';
const DISCONNECT = 'disconnect';

let sockets = new Map();

export default async ({ app, server }) => {
  const io = socket(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    socket.on(DISCONNECT, () => {
      console.log('client leaves... : ', socket.id);
      sockets.forEach((value, key, map) => {
        if (socket.id === value.id) {
          map.delete(key);
        }
      });
    });
    socket.on(ERROR, (error) => {
      console.error(error);
    });

    socket.on(REGISTER, (id) => {
      if (!sockets.has(id)) {
        sockets.set(id, socket);
        console.log(`${id} is registered on ${socket.id}`);
      }
    });

    socket.on(UNREGISTER, (id) => {
      if (sockets.has(id)) {
        sockets.delete(id);
        console.log(`${id} is unregistered from ${socket.id}`);
      }
    });

    socket.on(REPLY_MESSAGE, (id, message) => {
      const user = sockets.get(id);
      if (user) {
        user.emit(SEND_MESSAGE, message);
      }
    });
  });
};
