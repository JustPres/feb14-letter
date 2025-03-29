const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Add cache-control headers to prevent caching
app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    next();
});

// Serve static files
app.use(express.static(__dirname));

// Log all requests to help debug
app.use((req, res, next) => {
    console.log(`Request: ${req.method} ${req.url}`);
    next();
});

// Explicitly serve index.html for root path
app.get('/', (req, res) => {
    console.log('Serving index.html');
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Serve index.html for all other routes (for SPA behavior)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
    console.log(`Timelines app running at http://localhost:${port}`);
    console.log(`On your mobile device, navigate to http://<your-computer-ip>:${port}`);
}); 