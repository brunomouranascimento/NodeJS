// const fs = require('fs');

// const requestHandler = (req, res) => {
//   const url = req.url;
//   const method = req.method;
//   if (url === '/') {
//     res.write('<html>');
//     res.write('<head><title>Enter Message</title></head>');
//     res.write(
//       '<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>'
//     );
//     res.write('</html>');
//     return res.end();
//   }

//   if (url === '/message' && method === 'POST') {
//     const body = [];
//     req.on('data', chunk => {
//       console.log(chunk);
//       body.push(chunk);
//     });
//     return req.on('end', () => {
//       const parsedBody = Buffer.concat(body).toString();
//       const message = parsedBody.split('=')[1];
//       fs.writeFile('message.txt', message, err => {
//         res.statusCode = 302;
//         res.setHeader('Location', '/');
//         return res.end();
//       });
//     });
//   }
//   res.setHeader('Content-Type', 'text/html');
//   res.write('<html>');
//   res.write('<head><title>My First Page</title><head>');
//   res.write('<body><h1>Hello from my Node.js Server!</h1></body>');
//   res.write('</html>');
//   res.end();
// };

// module.exports = requestHandler;

// module.exports = {
//     handler: requestHandler,
//     someText: 'Some hard coded text'
// };

// module.exports.handler = requestHandler;
// module.exports.someText = 'Some text';

// exports.handler = requestHandler;
// exports.someText = 'Some hard coded text';

const { Router } = require('express');

const routes = Router();

routes.get('/admin/add-product', (req, res, next) => {
  res.send(
    '<form action="/add-product" method="POST"><input type="text" name="title"><button type="submit">Add Product</button></form>'
  );
});

routes.post('/admin/add-product', (req, res, next) => {
  console.log(req.body);
  res.redirect('/');
});

routes.get('/', (req, res, next) => {
  res.send('<h1>Hello from Express</h1>');
});
routes.use((req, res, next) => {
  res.status(404).send('<h1>Page not found</h1>');
});

module.exports = routes;
