var express = require('express'); // ExperssJS Framework
var app = express(); // Invoke express to variable for use in application
var port = process.env.PORT || 4000; // Set default port or assign a port in enviornment
var morgan = require('morgan'); // Import Morgan Package
var cors = require('cors');
var mongoose = require('mongoose'); // HTTP request logger middleware for Node.js
var bodyParser = require('body-parser'); // Node.js body parsing middleware. Parses incoming request bodies in a middleware before your handlers, available under req.body.
var router = express.Router(); // Invoke the Express Router
var appRoutes = require('./app/routes/route')(router); // Import the application end points/API
var path = require('path'); // Import path module
var passport = require('passport'); // Express-compatible authentication middleware for Node.js.
var social = require('./app/passport/passport')(app, passport); // Import passport.js End Points/API

app.use(morgan('dev')); // Morgan Middleware
app.use(cors());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.json()); // Body-parser middleware
app.use(bodyParser.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
app.use(express.static(__dirname + '/public')); // Allow front end to access public folder
app.use('/api', appRoutes); // Assign name to end points (e.g., '/api/management/', '/api/users' ,etc. )

// 
// <---------- REPLACE WITH YOUR MONGOOSE CONFIGURATION ---------->
// 
mongoose.connect('mongodb://localhost:27017/mydb', function (err) {
    if (err) {
        console.log('Not connected to the database: ' + err); // Log to console if unable to connect to database
    } else {
        console.log('Successfully connected to MongoDB'); // Log to console if able to connect to database
    }
});

// Set Application Static Layout
app.get('/', function (req, res) {
    res.send('Slagalica node server!');
});

// Start Server
app.listen(port, function () {
    console.log('Running the server on port ' + port); // Listen on configured port
});
