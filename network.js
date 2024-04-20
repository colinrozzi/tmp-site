import http from 'http';
import fs from 'fs';

const requestListener = function (req, res) {
  const { method, url } = req;

  console.log(method, url);

  if (method === 'POST') {
    let body = [];
    req.on('data', (chunk) => {
      body.push(chunk);
    }).on('end', () => {
      let data = Buffer.concat(body).toString();
      console.log('received data: ', data);
      fs.writeFileSync('data.json', data);
      res.writeHead(200);
      res.end();
    });
  }
};

export default function networkRun() {
  const server = http.createServer(requestListener);
  server.listen(8081);
}

networkRun();