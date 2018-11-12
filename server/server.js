const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', socket => {
	console.log('New user connected');

	socket.emit('newMessage', { from: 'Admin', text: 'Welcome to the chat app' });
	socket.broadcast.emit('newMessage', { from: 'Admin', text: 'A new user has joined the chat' });
	socket.on('createMessage', message => {
		console.log('createMessage', message);
		io.emit('newMessage', { ...message, createdAt: new Date().getTime() });
	});
	socket.on('disconnect', () => {
		console.log('Client disconnected');
	});
});

server.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
