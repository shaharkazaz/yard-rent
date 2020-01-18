const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const express = require('express');
const app = express();

mongoose.connect('mongodb://uy9uxa5ensvbjwshje2a:KzfvYuOnKVCaQrZ26jpJ@bytcreskhtan8ld-mongodb.services.clever-cloud.com:27017/bytcreskhtan8ld',
    {
      useNewUrlParser:true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });

mongoose.connection.on('connected', () => {
  console.log('MongoDB connected')
});

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const shopsRouter = require('./routes/shops');
const ordersRouter = require('./routes/orders');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/shops', shopsRouter);
app.use('/orders', ordersRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

// error handler
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  })
});

module.exports = app;