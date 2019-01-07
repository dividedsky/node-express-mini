// implement your API here
const express = require('express');
const db = require('./data/db');

const server = express();

server.get('/', (req, res) => {
  res.send('hello world!');
});

server.get('/hobbits', ( req, res  )=> {
  const hobbits = [
  {
    id: 1,
    name: 'Samwise Gamgee',
  },
  {
    id: 2,
    name: 'Frodo Baggins',
  },
  ];
  res.status(200).json(hobbits);
})

const users = db.find();
console.log(users);

server.get('/users', (req, res) => {
  db.find().then(d => res.status(200).json(d)).catch(e => res.status(500).send(`oh not! ${e}`));
});

server.get('users/:id', (req, res) => {
  const user = db.findById(req.params.id);
  res.send(user);
  console.log(req.params.id);
})

/*
 *server.get('/api/users', (req, res) => {
 *  let users;
 *  db.find().then(r => users = r);
 *  res.send(`helo, ${users}`);
 *});
 */

server.listen(5500, () => console.log('hello from the server!'));
