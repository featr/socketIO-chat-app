const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const { generateMessage } = require('./utils/message');

const app = express();
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', socket => {
	console.log('New user connected');

	socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
	socket.broadcast.emit('newMessage', generateMessage('Admin', 'A new user has joined the chat'));
	socket.on('createMessage', message => {
		console.log('createMessage', message);
		io.emit('newMessage', generateMessage(message.from, message.text));
	});
	socket.on('disconnect', () => {
		console.log('Client disconnected');
	});
});

server.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
