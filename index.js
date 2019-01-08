// implement your API here
const express = require('express');
const db = require('./data/db');

const server = express();
server.use(express.json());

server.get('/', (req, res) => {
  res.send('hello world!');
});

server.get('/hobbits', (req, res) => {
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
});

const users = db.find();
console.log(users);

server.get('/users', (req, res) => {
  db.find()
    .then(d => res.status(200).json(d))
    .catch(e => res.status(500).send(`oh not! ${e}`));
});

server.get('/users/:id', (req, res) => {
  db.findById(req.params.id)
    .then(user => res.send(user))
    .catch(err => res.send('nooo!'));
  console.log(req.params.id);
});

server.post('/users', (req, res) => {
  const userInfo = req.body;
  console.log(req.body);
  console.log(userInfo);

  db.insert(userInfo)
    .then(result => {
      db.findById(result.id)
        .then(user => res.status(201).json(user))
        .catch(err => res.status(500).json({error: 'the find by id failed'}));
    })
    .catch(err => res.status(500).json({error: err}));
});

server.delete('/users/:id', (req, res) => {
  const id = req.params.id;
  db.findById(id)
    .then(user => {
      db.remove(id)
        .then(count => {
          res.status(200).json(user);
        })
        .catch(err => res.status(500).json(err));
    })
    .catch(err => res.status(404).json({message: 'the user does not exist'}));
});

// using queries instead of params: greet?first=Justin&last=Lowry
server.get('/greet', (req, res) => {
  const {first, last} = req.query;
  res.send({hello: `${first} ${last}`});
});
/*
 *server.get('/api/users', (req, res) => {
 *  let users;
 *  db.find().then(r => users = r);
 *  res.send(`helo, ${users}`);
 *});
 */

server.listen(5500, () => console.log('hello from the server!'));
