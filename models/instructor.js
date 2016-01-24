var mongoose = require('mongoose');

var instructorSchema = mongoose.Schema({
    first_name: {
        type: String
    },

    last_name: {
        type: String
    },

    address: [
        {
            street_address: {type: String},
            city: {type: String},
            state: {type: String},
            zip: {type: String}
        }
    ],

    username: {
        type: String
    },

    email: {
        type: String
    },

    classes: [{
        class_id: {type: [mongoose.Schema.Types.ObjectId]},
        class_title: {type: String}
    }]

});


var Instructor = module.exports = mongoose.model('Instructor', instructorSchema);


module.exports.getInstructorByUsername = function (username, callback) {
    var query = {username: username};
    Instructor.findOne(query, callback);
}

module.exports.register = function (info, callback) {
    var instructor_username = info['instructor_username'];
    var class_id = info['class_id'];
    var class_title = info['class_title'];

    Instructor.findOneAndUpdate(
        instructor_username,
        {$push: {"classes":{class_id: class_id, class_title: class_title}}},
        {safe: true, upsert: true},
        callback
    );


}