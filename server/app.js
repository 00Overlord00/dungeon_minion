var express = require( 'express' );
var app = express();
var pg = require( 'pg' );
var path = require( 'path' );
var bodyParser = require( 'body-parser' );
var router = express.Router();

app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { extended: true } ) );

app.use( express.static( 'public' ) );  //Sets public folder to static.

var passport = require( './strategies/user-sql.js' );
var session = require( 'express-session' );

//Route Inclusion
var login = require('./routes/login');
var register = require('./routes/register');
var router = require('./routes/router');

app.use( session({
  secret: 'secret',
  key: 'user',
  resave: 'true',
  saveUninitialized: false,
  cookie: { maxage: 60000, secure: false }
}));

router.get( '/', function( req, res ) {  //Determines base page.
  res.sendFile( path.resolve( 'views/index.html' ) );
});

app.use( passport.initialize() );
app.use( passport.session() );

app.listen( process.env.PORT || 8900, function() {  //Determines PORT.
  console.log( 'Hailing frequencies open. Listening on PORT 8900.' );
});
