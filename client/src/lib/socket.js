import io from 'socket.io-client';

export const socketEvent = {
  SEND_MESSAGE: 'sending',
  REPLY_MESSAGE: 'reply',
  REGISTER: 'register',
  UNREGISTER: 'unregister',
};

const socket = io('/', {
  path: '/socket',
  cors: { origin: '*' },
});

export default socket;
