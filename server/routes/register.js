var express = require( 'express' );
var path = require( 'path' );
var pg = require( 'pg' );

var encryptLib = require( '../modules/encryption' );
var connection = require( '../modules/connection' );

var router = express.Router();

router.get( '/', function( req, res ) {
  res.sendFile( path.resolve( 'public/views/register.html' ) );
});

router.post( '/', function( res, req ) {
  pg.connect( connection, function( err, client, done ) {
    var userToSave = {
      username: req.body.username,
      password: encryptLib.encryptPassword( req.body.password )
    };
    client.query( 'INSERT INTO users ( username, password ) VALUES ( $1, $2 ) RETURNING id', [ userToSave.username, userToSave.password ], function( err, result ) {
      done();
      if( err ){
        console.log( 'ERROR SAVING USER.');
        res.sendStatus( 500 );
      } else {
        console.log( 'SUCCESS SAVING USER.' );
        res.redirect( '/' );
      }
    });
  });
});

module.exports = router;
