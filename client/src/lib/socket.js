import io from 'socket.io-client';

export const socketEvent = {
  SEND_MESSAGE: 'sending',
  REPLY_MESSAGE: 'reply',
  REGISTER: 'register',
  UNREGISTER: 'unregister',
};

<<<<<<< HEAD
const socket = io('/', {
  path: '/socket',
  cors: { origin: '*' },
});
=======
const socket = io('http://15.164.145.161:5000', { cors: { origin: '*' } });
>>>>>>> 9798389 (.)

export default socket;
