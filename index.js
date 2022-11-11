require('./API/database').connect();

const https = require('https');
const http = require('http');
const fs = require('fs');

// Express app, this is the file that will actually handle requests
const app = require('./app');

// Load SSL certificate and key
const credentials = {
    key: fs.readFileSync('sslcert/key.pem'),
    cert: fs.readFileSync('sslcert/cert.pem')
}

// Create HTTP and HTTPS server
const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

// Default ports used by webbrowsers
// If you wish for your site to be public, make sure you open both ports in your firewall and router.
const HTTP_PORT = 80;
const HTTPS_PORT = 443;

// Start the servers
httpServer.listen(HTTP_PORT, () => {
    console.log(`HTTP:${HTTP_PORT} LISTENING`);
});

httpsServer.listen(HTTPS_PORT, () => {
    console.log(`HTTPS:${HTTPS_PORT} LISTENING`);
});