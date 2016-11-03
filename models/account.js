var mongoose = require('mongoose');

var plm = require('passport-local-mongoose');

var AccountSchema = new mongoose.Schema({
   username: {
       type: String,
       required: 'Username is required'
   },
   password: {
       type: String
   }
});

AccountSchema.plugin(plm);

module.exports = mongoose.model('Account', AccountSchema);