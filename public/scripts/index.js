const socket = io();
socket.on('connect', () => {
	console.log('Connected to server');
});
socket.on('disconnect', () => {
	console.log('Disconnected from server');
});

socket.on('newMessage', message => {
	const formattedTime = moment(message.createdAt).format('k:mm a');

	const template = $('#message-template').html();
	const html = Mustache.render(template, {
		text: message.text,
		from: message.from,
		createdAt: formattedTime,
	});
	$('#messages').append(html);
});

socket.on('newLocationMessage', message => {
	const formattedTime = moment(message.createdAt).format('k:mm a');
	const template = $('#location-message-template').html();
	const html = Mustache.render(template, {
		text: message.text,
		from: message.from,
		url: message.url,
	});
	$('#messages').append(html);
});

$('#message-form').on('submit', e => {
	e.preventDefault();
	const messageTextbox = $('[name=message]');

	socket.emit(
		'createMessage',
		{
			from: 'User',
			text: messageTextbox.val(),
		},
		() => {
			messageTextbox.val('');
		}
	);
});

const locationButton = $('#send-location');

locationButton.on('click', () => {
	if (!navigator.geolocation) {
		return alert('Geolocation not supported by your browser');
	}

	locationButton.attr('disabled', 'disabled').text('Sending location...');

	navigator.geolocation.getCurrentPosition(
		position => {
			locationButton.removeAttr('disabled').text('Share Location');
			socket.emit('createLocationMessage', {
				latitude: position.coords.latitude,
				longitude: position.coords.longitude,
			});
		},
		e => {
			locationButton.removeAttr('disabled').text('Share Location');
			alert('Unable to fetch location');
		}
	);
});
