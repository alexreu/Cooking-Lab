var mongoose = require('mongoose');

var adminSchema = new mongoose.Schema({
    mail : {
        type: String,
        unique: true,
    },
    password : {
        type: String,
    },
    passwordConf: {
        type: String,
}
});

module.exports = mongoose.model('admin', adminSchema);