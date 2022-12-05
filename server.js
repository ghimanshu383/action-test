const app = require('./application/app');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Path = require('path');
const {Server} = require('socket.io');

dotenv.config({
  path: Path.join(`${__dirname}`, 'config.env')});

mongoose.connect(process.env.DATABASE.replace('<password>', process.env.DATABASE_PASS), ()=>{
  console.log('The connection with the database was successful');
});

const expressServer = app.listen(process.env.PORT, ()=>{
  console.log(`The server started on the port no ${process.env.PORT}`);
});

const io = new Server(expressServer, {
  path: '/socket',
  cors: {
    origin: '*',
  },
});

io.on('connect', (socket) =>{
  socket.emit('test', {test: 'This is the test data'}, () =>{
    console.log('This is the test data');
  });
});
