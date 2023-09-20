// const Events = require('node:events');
//
// const eventEmitter = new Events();
//
// eventEmitter.on('click', ()=>{
//   console.log('Click click click')
// });
//
// eventEmitter.emit('click');
// eventEmitter.emit('click');
// eventEmitter.emit('click');
// eventEmitter.emit('click');
//
//
// eventEmitter.once('sayHello', ()=>{
//   console.log('Hello hello hello');
// });
//
// console.log(eventEmitter.eventNames())
//
// eventEmitter.emit('sayHello') // sayHello
// eventEmitter.emit('sayHello') // event does not exist
// eventEmitter.emit('sayHello')
// eventEmitter.emit('sayHello')
//
// console.log(eventEmitter.eventNames());
//
// const fs = require('fs');
// const path = require('path');
//
//
// const readStream = fs.createReadStream(path.join(__dirname, 'folder', 'text3.txt'), { highWaterMark: 10000 });
// const writeStream = fs.createWriteStream(path.join(__dirname, 'folder', 'text2.txt'));
//
// readStream.on('data', (chunk)=>{
//   console.log(chunk);
//   writeStream.write(chunk);
// });
//
// readStream.pipe(writeStream);
//
// readStream.on('error', ()=>{
//   console.log('error happened');
//   readStream.destroy();
//   writeStream.end('ERROR HAPPENED');
// })

const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const users = [
  { id: 1, name: 'Іван', email: 'ivan@example.com' },
  { id: 2, name: 'Марія', email: 'maria@example.com' },
  { id: 3, name: 'Петро', email: 'petro@example.com' },
  { id: 4, name: 'Ольга', email: 'olga@example.com' },
  { id: 5, name: 'Андрій', email: 'andriy@example.com' },
  { id: 6, name: 'Наталія', email: 'natalia@example.com' },
  { id: 7, name: 'Максим', email: 'maxim@example.com' },
  { id: 8, name: 'Софія', email: 'sofia@example.com' },
  { id: 9, name: 'Анна', email: 'anna@example.com' },
  { id: 10, name: 'Олександр', email: 'oleksandr@example.com' }
];

app.get('/users', (req, res)=>{
  res.json({
    data: users,
  })
})

app.get('/users/:id', (req, res)=>{
  const { id } = req.params;

  res.json({
    data: users[+id - 1],
  })
})

app.post('/users', (req, res)=>{
  users.push(req.body);

  res.status(201).json({
    message: "User created",
  });
})

app.delete('/users/:id', (req, res)=>{
  const { id } = req.params;

  users.splice(+id - 1, 1);

  res.sendStatus(204);
})

app.put('/users/:id', (req, res)=>{
  const { id } = req.params;

  users[id] = req.body;

  res.json({
    message: 'User updated',
  })
})

const PORT = 5001;

app.listen(PORT, ()=>{
  console.log(`Server has successfully started on PORT ${PORT}`);
})


// CRUD c - create, r - read, u - update, d - delete

