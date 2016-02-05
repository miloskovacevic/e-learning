var express = require('express');
var router = express.Router();

var Class = require('./../models/class');
var Instructor = require('./../models/instructor');
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

    req.flash('success','You are now registered to teach this class!');
    res.redirect('/instructors/classes');
});


router.get('/classes/:id/lessons/new', ensureAuthenticated, function (req, res) {
    var id = req.params.id;

    res.render('instructors/newlesson', {
        'class_id': id
    });
});

router.post('/classes/:id/lessons/new', ensureAuthenticated, function (req, res) {
    var info = [];
    info['class_id'] = req.params.id;
    info['lesson_number'] = req.body.lesson_number;
    info['lesson_title'] = req.body.lesson_title;
    info['lesson_body'] = req.body.lesson_body;

    Class.addLesson(info, function(err, lesson){
        if(err) {
            throw  err;
        }

        console.log(lesson);
    });

    req.flash('success','Lesson added!');
    res.redirect('/instructors/classes');


});

function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/users/login');
}



module.exports = router;





