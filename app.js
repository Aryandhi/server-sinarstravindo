var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// import mongoose
// mongodb://ThinkWin:w1npreneur@cluster0-shard-00-00.9vgut.mongodb.net:27017,cluster0-shard-00-01.9vgut.mongodb.net:27017,cluster0-shard-00-02.9vgut.mongodb.net:27017/db_sinarsTravindo?ssl=true&replicaSet=atlas-8dpqln-shard-0&authSource=admin&retryWrites=true&w=majority
// mongodb://localhost:27017/db_sinarsTravindo
const mongoose = require('mongoose'); 
mongoose.connect('mongodb://ThinkWin:w1npreneur@cluster0-shard-00-00.9vgut.mongodb.net:27017,cluster0-shard-00-01.9vgut.mongodb.net:27017,cluster0-shard-00-02.9vgut.mongodb.net:27017/db_sinarsTravindo?ssl=true&replicaSet=atlas-8dpqln-shard-0&authSource=admin&retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

// import method-override
const methodOverride = require('method-override');

// define router admin
const adminRouter = require('./routes/admin');

var app = express();

// Parse incoming requests data (https://github.com/expressjs/body-parser)
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// enable method-override
app.use(cors());
app.use(methodOverride('_method'));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/sb-admin-2', express.static(path.join(__dirname, 'node_modules/startbootstrap-sb-admin-2')));
// call adminRouter
app.use('/admin', adminRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
