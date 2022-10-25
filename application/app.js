const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const feeRouter = require('../routes/userRoutes');
const AppErrors = require('./appError');
const cookieParser = require('cookie-parser');
const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors({credentials: true, origin: 'http://localhost:8080'}));
app.use(cookieParser());

app.use('/v1/govindPay/', feeRouter);

app.all('*', (reqeust, resposne, next)=>{
  next(new AppErrors('The application is not hosting the requested web page', 404 ));
});

app.use((error, request, response, next)=>{
  const errorCode = error.errorCode || 404;
  response.json({
    status: 'fail',
    errorCode,
    errorMessage: error.message,
    stack: error.stack,
  });
});

module.exports = app;
