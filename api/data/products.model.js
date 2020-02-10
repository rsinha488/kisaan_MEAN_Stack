var mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
   
    name: {
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    mfd:{
        type:String,
        required: true
    },
    exp:{
        type: String,
        required: true
    },
    location:{
        type: String,
        required: true
    },
    qrcode:{
        type:String
    }

});

mongoose.model('Product',productSchema);