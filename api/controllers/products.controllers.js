var mongoose = require('mongoose');
const qrcode= require('qrcode');
var fs = require('fs');
var products = mongoose.model('Product');


module.exports.productsGetAll = function(req, res) {
    
    var offset=0;
    var count=30;
    var maxCount = 140;
    
    if(req.query && req.query.offset){
        offset = parseInt(req.query.offset, 10);
    }
    
    if(req.query && req.query.count){
        offset = parseInt(req.query.count, 10);
    }
    
    if( isNaN(offset) || isNaN(count)) {
        res
            .status(400)
            .json({
                "message" : "If supplied in querystring count and offset should be a number"
            });
        return;
    }
    
    if(count > maxCount){
        res
            .status(400)
            .json({
                "message" : "Count limit of "+ maxCount+" exceeded"
        });
        return;
    }
    
    products
        .find()
        .skip(offset)
        .limit(count)
        .exec(function(err, products){
            if(err) {
                console.log("Error finding Products");
                res
                    .status(500)
                    .json(err);
            }else{
                console.log("Found Products", products.length);
                res
                    .json(products);
            }
    });
    
};
  

module.exports.productsAddOne = function(req, res){
    products
        .create({
            name : req.body.name,
            price : parseInt(req.body.price),
            description : req.body.description,
            mfd : req.body.mfd,
            exp : req.body.exp,
            location : req.body.location,
            qrcode : null
            
        },function(err, products){   
            if(err){
                console.log("Error creating ProductDetails");
                res
                    .status(400)
                    .json(err);
            } else {

               

                console.log("Product Details created", products);
                res
                    .status(201)
                    .json(products);
                run().catch(error => console.error(error.stack));

                async function run() {

                    const res = await qrcode.toDataURL(JSON.stringify(products), function (err, url) {
                        if(err){
                            console.log(err);
                        }
                        else{
                             var base64Data = url.replace(/^data:image\/png;base64,/, "");
                            fs.writeFile("out.png", base64Data, 'base64', 
                            function(err, data) {
                                 if (err) {
                                     console.log('err', err);
                                }
                                 console.log('success');
                             });
                            //  products.qrcode=url;
                            console.log("qrcode URL:",url);
                           products.update(
                            { $set: { qrcode : url } }
                           )
                            
                        }
                        
                      });
                      
                }
                

            }
        });
};


  
