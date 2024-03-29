import io from 'socket.io-client';

const SOCKET_URL = 'https://noisse-backend-development.up.railway.app/';

const socket = io(SOCKET_URL, {
  withCredentials: true,
  transports: ['websocket'],
  pingInterval: 25000,
  pingTimeout: 60000
});

export default socket;