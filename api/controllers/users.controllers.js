var mongoose = require('mongoose');
var users = mongoose.model('users');
var bcrypt = require('bcrypt-nodejs');


module.exports.register = function(req, res){
    console.log('registering user');
    
    var username= req.body.username;
    var name= req.body.name || null;
    var role= req.body.role || 1;
    var password = req.body.password;
    
    users.create({
        username: username,
        name: name,
        role: role,
        password: bcrypt.hashSync(password,bcrypt.genSaltSync(10))
    }, function(err, user){
        if(err) {
            console.log(err);
            res.status(400).json(err);
        }else{
            console.log('user created',user);
            res.status(201).json(user);
        }
    });
};

module.exports.login = function(req, res){
         console.log('logging user');
    
    var username= req.body.username;
    var password = req.body.password;
    
    users.findOne({
        username: username
    }).exec(function(err, user){
        if(err){
            console.log(err);
            res.status(400).json(err);
        }else{
            console.log('user found',user);
            res.status(200).json(user);
        }
    });
};