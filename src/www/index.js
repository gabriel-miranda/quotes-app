const express = require('express');
const next = require('next');
const cookie = require('react-cookies');

const port = parseInt(process.env.WWW_PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare()
  .then(() => {
    const server = express();

    server.get('*', (req, res) => {
      cookie.setRawCookie(req.headers.cookie);
      return handle(req, res);
    });

    server.listen(port, (err) => {
      if (err) {
        throw err;
      }
      console.log(`> Ready on internal url http://localhost:${port}`);
    });
  });
