const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const { generateMessage, generateLocationMessage } = require('./utils/message');
const { isRealString } = require('./utils/validation');
const { Users } = require('./utils/users');

const app = express();
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const server = http.createServer(app);
const io = socketIO(server);
const users = new Users();

app.use(express.static(publicPath));

io.on('connection', socket => {
	console.log('New user connected');
	socket.on('join', (params, callback) => {
		if (!isRealString(params.name) || !isRealString(params.room)) {
			return callback('Name and room name are required');
		}
		caseInsensitiveRoom = params.room.toLowerCase();
		socket.join(caseInsensitiveRoom);
		users.removeUser(socket.id);
		users.addUser(socket.id, params.name, caseInsensitiveRoom);

		io.to(caseInsensitiveRoom).emit('updateUserList', users.getUserList(caseInsensitiveRoom));
		socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
		socket.broadcast
			.to(caseInsensitiveRoom)
			.emit('newMessage', generateMessage('Admin', `${params.name} has joined the chat`));
		io.emit('getActiveRooms', users.getActiveRooms());

		callback();
	});

	io.emit('getActiveRooms', users.getActiveRooms());

	socket.on('createMessage', (message, callback) => {
		const user = users.getUser(socket.id);
		if (user && isRealString(message.text)) {
			io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
		}

		callback();
	});

	socket.on('createLocationMessage', coords => {
		const user = users.getUser(socket.id);
		if (user) {
			io.to(user.room).emit(
				'newLocationMessage',
				generateLocationMessage(user.name, coords.latitude, coords.longitude)
			);
		}
	});

	socket.on('disconnect', () => {
		const user = users.removeUser(socket.id);
		io.emit('getActiveRooms', users.getActiveRooms());

		if (user) {
			io.to(user.room).emit('updateUserList', users.getUserList(user.room));
			io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
		}
	});
});

server.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
