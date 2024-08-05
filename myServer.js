const http = require('http');
const fs = require('fs');
const port = 21142;

http.createServer((req, res) => {
  fs.readFile('gfg.html', (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('Error: File not found');
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    }
  });
}).listen(port, () => {
  console.log(`Server running on: http://localhost:${port}`);
});