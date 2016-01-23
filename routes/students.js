var express = require('express');
var router = express.Router();

var Class = require('./../models/class');
var Student = require('./../models/student');
var User = require('./../models/user');


router.get('/classes', ensureAuthenticated, function(req, res, next) {
    Student.getStudentByUsername(req.user.username, function (err, student) {
        if(err){
            console.log(err);
            res.send(err);
        }
        res.render('students/classes', {
            "student" : student
        });
    });
});

router.post('/classes/register', function (req, res) {

    var student_username = req.body.hidden_username;
    var class_id = req.body.class_id;
    var class_title = req.body.class_title;

    info = [];
    info['student_username'] = student_username;
    info['class_id'] = class_id;
    info['class_title'] = class_title;

    Student.register(info, function (err, student) {
        if(err){
            throw err;
        }
        console.log(student);
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





