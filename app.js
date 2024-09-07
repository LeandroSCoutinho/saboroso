var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var RedisStore = require("connect-redis").default;
var formidable = require("formidable");
var path = require('path');
var http = require('http');
var socket = require('socket.io');

var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin');
const { createClient } = require("redis");


var app = express();

var http = http.Server(app);
var io = socket(http);

io.on('connection', function(socket) {
  console.log('Novo usuário conectado!');
})

app.use(function(req, res, next){

  if (req.method === 'POST') {
      var form = formidable.IncomingForm({
        uploadDir: path.join(__dirname, "/public/images"),
        keepExtensions: true 
      });
    
      form.parse(req, function(err, fields, files){
        req.body = fields;
        req.fields = fields;
        req.files = files;
    
        next();
      });
  } else {
    next();
  }
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


let redisClient = createClient()
redisClient.connect().catch(console.error)

let redisStore = new RedisStore({
  client: redisClient,
  prefix: "myapp:",
})

app.use(
  session({
    store: redisStore,
    resave: true, 
    saveUninitialized: true, 
    secret: "p@ssword",
  }),
)
app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/admin', adminRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  console.log(`Rota não encontrada: ${req.url}`);
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

http.listen(3000, function() {
  console.log("Servidor em execução...");
});

// module.exports = app;
