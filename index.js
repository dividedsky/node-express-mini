// implement your API here
const express = require('express');
const db = require('./data/db');

const server = express();

server.get('/', (req, res) => {
  res.send('hello world!');
});

/*
 *server.get('/api/users', (req, res) => {
 *  let users;
 *  db.find().then(r => users = r);
 *  res.send(`helo, ${users}`);
 *});
 */

server.listen(5500, () => console.log('hello from the server!'));
