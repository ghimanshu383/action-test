const app = require('./application/app');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Path = require('path');

dotenv.config({
  path: Path.join(`${__dirname}`, 'config.env')});

mongoose.connect(process.env.DATABASE.replace('<password>', process.env.DATABASE_PASS), ()=>{
  console.log('The connection with the database was successful');
});

app.listen(process.env.PORT, ()=>{
  console.log(`The server started on the port no ${process.env.PORT}`);
});
