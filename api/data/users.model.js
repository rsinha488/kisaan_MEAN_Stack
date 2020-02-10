var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
   username: {
       type:String,
       unique:true,
       required: true
   },
    name: {
        type: String
    },
    role:{
        type: Number,
        required: true,
        "default": 1
    },
    password:{
        type: String,
        required: true
    }
});

mongoose.model('users',userSchema);