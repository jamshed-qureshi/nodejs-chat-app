	var socket = io();

	socket.on('connect', function () {
		console.log('Connected to Server.');

		socket.emit('createMessage', {
			from: 'Jamshed',
			text: 'Hey, This is Jaq.'
		});
	});


	socket.on('disconnect', function ()  {
		console.log('Disconnected from Server.');
	});

	socket.on('newMessage', function(message){
		console.log('newMessage', message);
	});