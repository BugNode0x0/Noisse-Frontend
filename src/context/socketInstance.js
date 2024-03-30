import io from 'socket.io-client';

const SOCKET_URL = 'https://noisse-backend-development.up.railway.app/';

const socket = io(SOCKET_URL, {
  withCredentials: true,
  transports: ['websocket'],
  pingInterval: 25000,
  pingTimeout: 60000
});

// Emit a 'ping' event every 25 seconds
setInterval(() => {
  socket.emit('ping');
  console.log(`Sending fucking pings`);
}, 5000);

// Listen for 'pong' event from the server
socket.on('pong', latency => {
  console.log(`Received pong with latency: ${latency}ms`);
});

// Function to emit 'authenticate' event with hunter_id
export const authenticateSocket = (hunterId) => {
  console.log("fucking authenticated")
  socket.emit('authenticate', hunterId);
};

export default socket;
