const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const update = require('./update');

const port = 4001;
const app = express();

app.use(cookieParser());
app.use(bodyParser.json());

app.post('/update', update);

app.listen(port, (err) => {
  if (err) {
    throw err;
  }
  console.log(`> Ready on internal url http://localhost:${port}`);
});
