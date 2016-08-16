var express = require('express');
var router = express.Router();
var path = require('path');
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/groupDB';

if(process.env.DATABASE_URL !== undefined) {
     connectionString = process.env.DATABASE_URL;
     pg.defaults.ssl = true;
 } else {
     connectionString = 'postgres://localhost:5432/groupDB';
 }

 router.get('/', function(req, res) {
    if(req.isAuthenticated()) {
        res.send(req.user);
    } else {
        res.send(false);
    }
});

router.get('/logout', function(req, res) {
  req.logOut();
  res.sendStatus(200);
});

module.exports = router;
