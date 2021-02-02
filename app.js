var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var indexRouter = require('./routes/index');
var DriverRouter = require('./routes/driver');
var UserRouter = require('./routes/user');
var RouteRouter = require('./routes/route');
var StopRouter = require('./routes/stop');
var TravelRouter = require('./routes/travel');
var VehicleRouter = require('./routes/vehicle');

var EventRouter = require('./routes/event');

var logger = require('morgan');

var app = express();
app.use(express.json());
app.use(cookieParser());
app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    next();
});
app.use('/', indexRouter);
app.use('/driver', DriverRouter);
app.use('/user', UserRouter);
app.use('/route', RouteRouter);
app.use('/stop', StopRouter);
app.use('/travel', TravelRouter);
app.use('/vehicle', VehicleRouter);
app.use('/event', EventRouter);
module.exports = app;