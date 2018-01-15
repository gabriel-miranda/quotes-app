const express = require('express');

const port = 4001;

const app = express();

app.get('/', (req, res) => {
  res.send('Quotes api');
});

app.listen(port, (err) => {
  if (err) {
    throw err;
  }
  console.log(`> Ready on internal url http://localhost:${port}`);
});
