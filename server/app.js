const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const fs = require('fs');

mongoose.connect('mongodb://cloudnews:cloudnews123@docdb-2020-06-05-17-54-31.czejrkh0utbn.us-east-1.docdb.amazonaws.com:27017/test',
    {
      useNewUrlParser:true,
      ssl: true,
      sslValidate: false,
      sslCA: fs.readFileSync('./rds-combined-ca-bundle.pem'),
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });

mongoose.connection.on('connected', () => {
  console.log('MongoDB connected')
});

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const shopsRouter = require('./routes/shops');
const ordersRouter = require('./routes/orders');
const productsRouter = require('./routes/products');
const recommendationsRouter = require('./routes/recommendations');
const isAliveRouter = require('./routes/Alive');
const categoriesRouter = require('./routes/categories');
const subCategoriesRouter = require('./routes/subCategories');
const twitterRouter = require('./routes/twitter');
const statisticsRouter =  require('./routes/statistics');
const airPollutionRouter =  require('./routes/airPollution');

app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://yardrentlb-824635089.us-east-1.elb.amazonaws.com");
  res.header("Access-Control-Allow-Credentials", true);
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
app.use('/products', productsRouter);
app.use('/recommendations', recommendationsRouter);
app.use('/isAlive', isAliveRouter);
app.use('/categories', categoriesRouter);
app.use('/subCategories', subCategoriesRouter);
app.use('/twitter', twitterRouter);
app.use('/statistics', statisticsRouter);
app.use('/airPollution', airPollutionRouter)

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
