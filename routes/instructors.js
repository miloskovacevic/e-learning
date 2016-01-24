var express = require('express');
var router = express.Router();

var Class = require('./../models/class');
var Instructor = require('./../models/nstructor');
var User = require('./../models/user');


router.get('/classes', ensureAuthenticated, function(req, res, next) {
    Instructor.getInstructorByUsername(req.user.username, function (err, instructor) {
        if(err){
            console.log(err);
            res.send(err);
        }
        res.render('instructors/classes', {
            "instructor" : instructor
        });
    });
});

router.post('/classes/register', function (req, res) {

    var instructor_username = req.body.hidden_username;
    var class_id = req.body.class_id;
    var class_title = req.body.class_title;

    info = [];
    info['instructor_username'] = instructor_username;
    info['class_id'] = class_id;
    info['class_title'] = class_title;

    Instructor.register(info, function (err, instructor) {
        if(err){
            throw err;
        }
        console.log(instructor);
    });

    req.flash('success','You are now registered!');
    res.redirect('/classes');
});

function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/users/login');
}


module.exports = router;





