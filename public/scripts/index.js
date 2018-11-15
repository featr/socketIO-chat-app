const socket = io();

const activeRooms = document.getElementById('activeRooms');

socket.on('getActiveRooms', rooms => {
	const defaultOption = document.createElement('option');
	defaultOption.text = 'See active rooms';
	activeRooms.innerHTML = '';
	console.log(rooms);
	if (rooms) {
		activeRooms.add(defaultOption);
		rooms.forEach(room => {
			let option = document.createElement('option');
			option.text = room;
			// option.disabled = 'disabled';
			activeRooms.add(option);
		});
	}
});

activeRooms.onchange = function(e) {
	if (activeRooms.options[activeRooms.selectedIndex.value] !== activeRooms[0]) {
		console.log('yea');
		document.getElementById('room-name').value =
			activeRooms.options[activeRooms.selectedIndex].value;
	}
};
