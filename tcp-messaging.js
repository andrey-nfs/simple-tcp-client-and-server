var net = require('net');

var serverPort = 5000;
var serverHost = '127.0.0.1';

var client = new net.Socket();
var stdin = process.openStdin();

client.connect(serverPort, serverHost, function() {
	console.log('Connected');
	client.write('Hello, server! Love, Client.');
});

stdin.addListener("data", function(d) {
	console.log("you entered: [" + d.toString().trim() + "]");
	client.write(d.toString());
});

client.on('data', function(data) {
	console.log('Received: ' + data);
	client.destroy(); // kill client after server's response
});

client.on('close', function() {
	console.log('Connection closed');
});