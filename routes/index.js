var express = require('express');
var router = express.Router();
var Class = require('./../models/class');

/* GET home page. */
router.get('/', function(req, res, next) {
  Class.getClasses(function (err, classes) {
    if(err){
        res.send(err);
    }
    res.render('index', {
        "classes": classes
    });
  });
});

module.exports = router;
