const http = require('http');
const server = http.createServer((req, res) => {
res.writeHead(200, {'Content-Type': 'text/plain'});
res.end('Olá, Servidor HTTP!');
});
server.listen(3000, '127.0.0.1', () => {
console.log('Servidor rodando em http://127.0.0.1:3000/');
});
