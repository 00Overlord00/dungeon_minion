var passport = require( 'passport' );
var LocalStrategy = require( 'passport-local' ).Strategy;
var pg = require( 'pg' );

var encryptLib = require( '../modules/encryption' );
var connection = require( '../modules/connection' );

passport.serializeUser( function( user, done ) {
  console.log( 'User Serialized...' );
  done( null, user.id );
});

passport.deserializeUser( function( id, passDone ) {
  console.log( 'User Deserialized...' );
});

pg.connect( connection, function( err, client, pgDone ) {
  if( err ) {
    console.log( err );
    res.sendStatus( 500 );
  } else {
    client.query( 'SELECT * FROM users WHERE id = $1;', [ id ], function( err, results ) {
      pgDone();

      if( results.rows.length >= 1 ) {
        console.log( results.rows[ 0 ] );
        return passDone( null, results.rows[ 0 ] );
      }
      if( err ) {
        console.log( err );
      }  //End error handling in results.
    });  //End client.query.
  }  //End 'else' error handling statement.
});  //End pg.connect.

passport.use( 'local', new LocalStrategy(
  {
    passReqToCallback: true,
    usernameField: 'username'
  },
  function( req, username, password, passDone ) {
    pg.connect( connection, function( err, client, pgDone ) {
      if( err ) {
        res.sendStatus( 500 );
      } else {
        client.query( 'SELECT * FROM users WHERE username = $1;', [ username ], function( err, result ) {
          pgDone();
          if( err ) {
            return passDone( null, false );
          } else {
            if( result.rows.length >= 1 ) {
              var passwordDb = result.rows[0].password;
              if( encryptLib.comparePassword( password, passwordDb )) {
                console.log( 'User Authenticated.' );
                return passDone( null, result.rows[0] );
              }
            }
            console.log( 'Failure to Authenticate.' );
            return passDone( null, false, {message: 'No dice, hombre...'} );
          }
        });
      }
    });
  }
));
