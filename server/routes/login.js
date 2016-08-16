var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');

router.post('/',

    passport.authenticate('local', {
        successRedirect: '/router',
        failureRedirect: '/'
    })
);

router.get('/', function ( req,res ){
  res.sendFile(path.resolve('public/views/index.html'));

});

module.exports = router;
