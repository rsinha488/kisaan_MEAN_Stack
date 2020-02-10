var mongoose = require('mongoose');
var dburl = 'mongodb://localhost:27017/test';

mongoose.connect(dburl,{ useNewUrlParser: true });


// CONNECTION EVENTS
mongoose.connection.on('connected',function(){
    console.log('Mongoose Connected to '+dburl);
});

mongoose.connection.on('connected',function(err){
    console.log('Mongoose Connection Error '+ err);
});
mongoose.connection.on('disconnected',function(){
    console.log('Mongoose DisConnected ');
});


process.on('SIGINT', function(){
    mongoose.connection.close(function(){
        console.log('Mongoose disconnected through app termination (SIGINT)');
        process.exit(0);
    });
}); 

process.on('SIGTERM', function(){
    mongoose.connection.close(function(){
        console.log('Mongoose disconnected through app termination (SIGTERM)');
        process.exit(0);
    });
}); 



process.once('SIGUSR2', function(){
    mongoose.connection.close(function(){
        console.log('Mongoose disconnected through app termination (SIGUSR2)');
        process.kill(process.pid,'SIGUSR2');
    });
}); 

//BRING IN SCHEMA AND MODELS
require('./products.model.js');
require('./users.model');