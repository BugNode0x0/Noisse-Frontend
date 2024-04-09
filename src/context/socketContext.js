import React from 'react';
import io from 'socket.io-client';

const SOCKET_URL = 'https://api.noisse.io/';

// Function to get a cookie by name
const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
};

export const SocketContext = React.createContext();

const token = getCookie('token'); // Replace 'token' with your cookie name

// Logging the process
console.log("Attempting WebSocket connection...");
if (token) {
  console.log("JWT Token retrieved from cookie:", token);
} else {
  console.log("No JWT Token found in cookie. Proceeding without token.");
}

export const socket = io(SOCKET_URL, {
  withCredentials: true,
  transports: ['websocket'],
  auth: {
    token: token, // Pass the token here
  },
  pingInterval: 25000,
  pingTimeout: 60000
});

// Logging on successful connection or failure
socket.on('connect', () => {
  console.log(`WebSocket connected with ID: ${socket.id}`);
});

socket.on('connect_error', (error) => {
  console.error(`WebSocket connection error:`, error);
});
