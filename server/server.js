const http = require('http');
const path = require('path');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

io.on('connection', (socket) => {
	console.log('New user connectied.');	

	socket.emit('newMessage', {
		from: "Admin",
		text: "Welcome to the Chat App",
		createdAt: new Date().getTime()		
	});

	socket.broadcast.emit('newMessage', {
		from: "Admin",
		text: "New user joined.",
		createdAt: new Date().getTime()
	});

	socket.on('createMessage', (message) => {
		console.log("createMessage", message);
		io.emit('newMessage', {
			from: message.from,
			text: message.text,
			createdAt: new Date().getTime()
		});

		// socket.broadcast.emit('newMessage', {
		// 	from: message.from,
		// 	text: message.text,
		// 	createdAt: new Date().getTime()
		// });
	});

	socket.on('disconnect', () => {
		console.log('User was disconnectied.');	
	});
});

app.use(express.static(publicPath));

server.listen(port, () => {
  console.log(`Started up at port ${port}`);
});