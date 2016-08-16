var express = require( 'express' );
var passport = require( 'passport' );
var path = require( 'path' );
var router = express.Router();

router.post( '/',
  passport.authenticate( 'local', {
    successRedirect: '/views/users.html',  //File does not currently exist.
    failureRedirect: '/views/failure.html'  //File does not currently exist.
  })
);

router.get( '/', function( req, res ) {
  res.sendFile( path.resolve( 'public/views/index.html' ) );
});

router.exports = router;
