require("dotenv").config();
const express = require("express");
const http = require("http");
const app = express();
const cors = require("cors");
const { Server } = require("socket.io");
const { pipeline } = require("serialport");
var SerialPort = require("serialport");

app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
	cors: {
		origin: '*',
		methods: ['GET', 'POST'],
	},
});

const parsers = SerialPort.parsers;
const parser = new parsers.Readline({
	delimiter: '\r\n'
});

var port = new SerialPort("/dev/cu.usbmodem14401", {
	baudRate: 9600,
	dataBits: 8,
	parity: 'none',
	stopBits: 1,
	flowControl: false
});

port.pipe(parser);

// setTimeout(() => {
// 	port.write("1");
// }, 3000);

io.on('connection', (socket) => {
	socket.on('result', (data) => {
		if (data.status === 1) {
			console.log('writing true on port...')
			port.write("1");
		} else {
			console.log('writing false on port...')
			port.write("0");
		}
	});
});

const Port = process.env.PORT || 3001;
server.listen(Port, () => console.log(`server is running on port ${Port}`));