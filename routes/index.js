var express = require('express');
var router = express.Router();
var Class = require('./../models/class');

/* GET home page. */
router.get('/', function(req, res, next) {
  req.flash('messages', { 'success' : 'Sign Up Success' });
  Class.getClasses(function (err, classes) {
    if(err){
        res.send(err);
    }
    res.render('index', {
        "classes": classes
    });
  }, 3);
});

module.exports = router;





