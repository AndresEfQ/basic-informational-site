const http = require('http')
const fs = require('fs')
const path = require('path')

const PORT = 3000;

http.createServer((req, res) => {
  if (req.url === '/favicon.ico') {
    console.log('favicon requested');
    return;
  }

  const filePath = path.format({
    root: __dirname,
    name: req.url === '/' ? '/index' : req.url,
    ext: '.html'
  })

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        console.log(path.join(__dirname, '404.html'));
        fs.readFile(path.join(__dirname, '404.html'), 'utf8', (err2, data) => {
          if (err2) throw err2;
          res.writeHead('200', {'Content-Type': 'Text/html'});
          res.write(data);
          res.end();
        })
        return;
      }
      throw err;
    }
    res.writeHead('200', {'Content-Type': 'Text/html'});
    res.write(data);
    res.end();
  });
}).listen(PORT, () => console.log(`Server listening to ${PORT}`));