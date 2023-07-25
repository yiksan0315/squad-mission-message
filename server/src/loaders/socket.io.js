import socket from 'socket.io';

// 기본적으로 그냥 로그인 했을 때 socket을 생성해주거나, 아니면 App이 구동 되었을 때
// store에서 그냥 socket 만들어서 박아두기

const SEND_MESSAGE = 'sending';
// 메세지 받으면 보내주기, 이때 상대 socket이 존재하지 않는다면 보내주기는 x,
// 메세지 db에 저장?
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

    // 대충 이렇게 되면 데이터베이스에 저장
    // 그런 다음에 socket.emit()으로 해서 상대방한테 전송
    // 한쪽 연결 끊어지면은 데이터베이스에 저장만 하고 emit은 안해줌
  });
};
