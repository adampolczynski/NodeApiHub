const http = require('http');

// options for example api server, later take it from config files
const options = {
    host: 'localhost',
    port: 4000,
    path: '/api',
}

// create apiHub server
const apiHub = http.createServer((req, res) => {

    // pipe request to our api server
    req.pipe(http.request(options), {end: true})
    res.writeHead(200, { 'Content-Type': 'text/plain' });    
    res.end('okay');
});

// start listening
apiHub.listen(8080, '0.0.0.0');