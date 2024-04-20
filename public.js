import http from 'http';
import fs from 'fs';
import Moustache from 'mustache';

const requestListener = function (req, res) {
  const { method, url } = req;

  console.log(method, url);

  if (method === 'GET') {
    const template = fs.readFileSync('./template.html', 'utf8');
    const data = JSON.parse(fs.readFileSync('./data.json', 'utf8'));
    const html = Moustache.render(template, data);
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html);
  }
}

export default function publicRun() {
  const server = http.createServer(requestListener);
  server.listen(8080);
}

publicRun();