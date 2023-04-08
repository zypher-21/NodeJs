const http = require('http');
const fs = require('fs');
const path = require('path');

// Define the port number
const port = 3000;

// Create the server
const server = http.createServer((req, res) => {
  // Log the event
  EventLogs(`Request made for ${req.url}`);

  // Set the content type based on the file extension
  const ext = path.extname(req.url);
  let contentType = 'text/html';
  if (ext === '.jpg' || ext === '.jpeg') {
    contentType = 'image/jpeg';
  } else if (ext === '.png') {
    contentType = 'image/png';
  } else if (ext === '.gif') {
    contentType = 'image/gif';
  }

  // Check if the file exists
  const filePath = path.join(__dirname, 'public', req.url);
  if (fs.existsSync(filePath)) {
    // Read the file and send it as the response
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end('Error reading file');
      } else {
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data);
      }
    });
  } else {
    // File not found
    res.writeHead(404);
    res.end('File not found');
  }
});

// Start the server
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
