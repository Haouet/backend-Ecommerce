var createError = require('http-errors');
var express = require('express');
const mongoose = require("mongoose");
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products');
var catRouter = require('./routes/cat');
const sendEmail = require("./config/sendmail")
var filesRouter = require("./routes/files");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
require("dotenv").config();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({
    origin: 'http://localhost:3000',
}))
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/product', productsRouter);
app.use('/api/cat', catRouter);
app.use("/api/files", filesRouter);
app.post('/email', async(req, res)=>{
  try{
    console.log("Sending mail ...");
    await sendEmail(req.body.email, req.body.subject,req.body.text);
    res.status(200).json({ msg: "Email is sending ",  success: true });
  }
  
      catch (error) {
          res.status(500).json({ err: "An error occured" });
          console.log(error);
      }
  });
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
/* CORS Setup*/

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  //  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Headers', '*');
  
  //  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Methods', '*');
  
  next();
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
// Connect databasse Mongodb Atlas
mongoose.connect(process.env.MONGO_URI, (err,done) =>{
  if(err){
   console.log(err);
  }
  if(done){
     console.log('BD est connecter avec succes');
  }
 });
module.exports = app;
