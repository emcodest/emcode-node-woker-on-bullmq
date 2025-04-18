require("dotenv").config()
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const worker_pool = require("./lib/WorkerPool")
const { join } = require("path")

const indexRouter = require('./routes/index')

const app = express();

// new worker - forked process
//! consumers
const consumer_queues = [
  { folder: "categories", file: "InitOrder.js" },
  { folder: "categories", file: "ReceiveOrder.js" },
  { folder: "categories", file: "CreditOrder.js" },
  { folder: "categories", file: "CloseOrder.js" },
  { folder: "general", file: "ProcessorWorker.js" },
  { folder: "general", file: "RepeaterWorker.js" }
]
for (const q of consumer_queues) {
  const script_file = join(__dirname, "qtask-manager-v2", "consumers", q.folder, q.file)
  const forked_main_process = worker_pool.NewChildWorker(script_file, 1)
  const forked_main = forked_main_process.send({ message: `Connect to Queue - ${q.folder}/${q.file}` })
  forked_main.then((res) => {
    console.log('\x1b[41m%s\x1b[0m', `From child ${q.file} worker: `, res)
  })
}


//! Buy 
// const buy_worker_file = join(__dirname, "workers", "Buy.js")
// const buy_forked_process = worker_pool.NewChildWorker(buy_worker_file)
// const buy_child_res = buy_forked_process.send({ message: "Connect Buy to Queue" })
// buy_child_res.then((res) => {
//   console.log('\x1b[41m%s\x1b[0m', 'From child buy worker: ', res)
// })
//! Sell
// const sell_worker_file = join(__dirname, "workers", "Sell.js")
// const sell_forked_process = worker_pool.NewChildWorker(sell_worker_file)
// const sell_child_res = sell_forked_process.send({ message: "Connect Sell to Queue" })
// sell_child_res.then((res) => {
//   console.log('\x1b[41m%s\x1b[0m', 'From child sell worker: ', res)
// })


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
process.on("uncaughtException", (ex) => {
  console.log('\x1b[41m%s\x1b[0m', 'Uncaught error: ', ex)
})
module.exports = app;
