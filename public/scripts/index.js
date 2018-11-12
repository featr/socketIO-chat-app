const socket = io();
socket.on('connect', () => {
	console.log('Connected to server');

	socket.emit('createMessage', {
		to: 'Jen',
		text: 'Hey,Jen.',
	});
});
socket.on('disconnect', () => {
	console.log('Disconnected from server');
});

socket.on('newMessage', message => {
	console.log('newMessage', message);
});
