var express = require('express');
var router = express.Router();
var Class = require('./../models/class');

/* GET home page. */
router.get('/', function(req, res) {
    Class.getClasses(function (err, classes) {
        if(err){
            res.send(err);
        }
        res.render('classes/index', {
            "classes": classes
        });
    }, 3);
});

router.get('/:id/details', function (req, res) {
    var id = req.params.id;
    Class.getClass(id, function (err, classname) {
        if(err){
            res.send(err);
        }
        console.log('========================>>>> TESTIRAMO <<<<==========================');
        console.log('REZULTAT JE ' + classname);

        res.render('classes/single-details', {
            "class": classname
        });
    })
});

module.exports = router;





