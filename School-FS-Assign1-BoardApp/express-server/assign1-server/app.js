var express = require('express');

var indexRouter = require('./routes/index');
var userRouter = require('./routes/users');
var boardRouter = require('./routes/boardRoute');

var app = express();

app.use('/', indexRouter);
app.use('/users', userRouter);
app.use('/board', boardRouter);

module.exports = app;
