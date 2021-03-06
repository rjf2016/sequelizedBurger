// Dependencies
// =============================================================
//var express = require('express');
//var bodyParser = require('body-parser');
//var methodOverride = require('method-override');
// =============================================================
/*
var app = express();
var PORT = Number(process.env.PORT || 3000);

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(process.cwd() + '/public'));

app.use(bodyParser.urlencoded({
	extended: false
}));

// override with POST having ?_method=DELETE
app.use(methodOverride('_method'));
var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({
	defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

var routes = require('./controllers/burgers_controller.js');
app.use('/', routes);

var port = 3000;
app.listen(port);
*/


// Dependencies
// ============
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser'); // for working with cookies
var bodyParser = require('body-parser');
var session = require('express-session'); 
var methodOverride = require('method-override'); // for deletes in express


// Our model controllers (rather than routes)
var application_controller = require('./controllers/application_controller');

var burgers_controller = require('./controllers/burgers_controller');

//var users_controller = require('./controllers/users_controller');


// Express settings
// ================

// instantiate our app
var app = express();

// override POST to have DELETE and PUT
app.use(methodOverride('_method'))

//allow sessions
app.use(session({ secret: 'app', cookie: { maxAge: 60000 }}));
app.use(cookieParser());

// view engine setup
app.set('views', path.join(__dirname, 'views'));  //views dir will be: c:/sequelizedburger/views

//set up handlebars
var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', application_controller);
app.use('/burgers', burgers_controller);

//app.use('/users', users_controller);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  //res.status(err.status || 500);
  console.log("Sorry: " + err.message);
});


// our module get's exported as app.
module.exports = app;


// Where's the listen? Open up bin/www, and read the comments.