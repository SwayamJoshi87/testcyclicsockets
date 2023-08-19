const express = require('express');
const http = require('http'); // Require the http module
const cors = require('cors'); // Require the cors package
const socketIo = require('socket.io'); // Require the socket.io module

const app = express();
const server = http.createServer(app); // Create an HTTP server
const io = socketIo(server); // Attach Socket.IO to the HTTP server

const port = 3000; // Change this to your desired port number

app.use(cors());

// Serve static files from their respective folders
app.use('/html', express.static('public/html'));
app.use('/css', express.static('public/css'));
app.use('/js', express.static('public/js'));


// Socket.IO connection event
io.on('connection', (socket) => {
  console.log('A user connected');

  // Listen for custom events from the client
  socket.on('chat message', (msg) => {
    // Broadcast the message to all connected clients
    io.emit('chat message', msg);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Start the server
server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
