const http = require('http');
const net = require('net');
const config = require('dotenv').config();

const hosts = config.parsed.API_HOSTS.split(',');
const ports = config.parsed.API_PORTS.split(',');
const prefixes = config.parsed.API_PREFIXES.split(',');

const serversList = hosts.map((host, i) => {
    return { host, port: ports[i], path: prefixes[i] };
})

// create apiHub server
const apiHub = http.createServer((req, res) => {
    
    // respond it is just ok
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('okay');

});

apiHub.on('request', (req, res) => {
     
    // pipe request to each server from config
    serversList.forEach((server) => {

        // if url is not matching our prefix do not pipe
        if (server.path !== req.url.substring(0, server.path.length)) {
            return;
        }
        req.pipe(http.request({ ...server, method: req.method }), { end: true });
    });

});

apiHub.on('connection', (req, cltSocket, head) => {
    console.log('New apiHub connection');
});

// start listening
apiHub.listen(8080, '0.0.0.0');