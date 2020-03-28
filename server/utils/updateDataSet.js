const Common = require('../model/common');
const formatData = require('../utils/contentProduct');
const mongoose = require('mongoose');

// TODO: delete the console log what to do with error handling instead maybe make sure that the schema isn't exist before
// TODO: must check if the schema exist before deleting raise an error
const clearDataSet = () =>{
    mongoose.connection.db.listCollections({name: 'productsdatasets'}).next(function(error, collinfo) {
        if (collinfo!==null) {
            mongoose.connection.dropCollection("productsdatasets",(error,result)=>{
                if(error){
                    console.log(error)
                }
                else{
                    console.log(result)
                }
            });
        }
    });
    mongoose.connection.db.listCollections({name: 'recommendations'}).next(function(error, collinfo) {
        if (collinfo!==null) {
            mongoose.connection.dropCollection("recommendations",(error,result)=> {
                if (error) {
                    console.log(error)
                } else {
                    console.log(result)
                }
            })
        }
    });
    Common.updateOne({$set:{numOfNewProducts: 0}}).then((status)=>{
        if(status.ok!==1){
            console.log("couldn't set to 0 the number of new product")
        }
    });
    formatData();
};
const initialUpdateSchema = () =>{
    const common = new Common({
        _id: new mongoose.Types.ObjectId(),
        numOfNewProducts: 0,
        maxNumOfProductsBeforeUpdate: 15
    });
    //TODO:add error handling
    common.save();
};
const updateDataSetCollections = () => {
    mongoose.connection.db.listCollections({name: 'common'}).next(function(err, collinfo) {
        if (collinfo===null) {
            initialUpdateSchema();
        }
    });
    Common.updateOne({$inc: {numOfNewProducts: 1}}).then((status)=>{
        if(status.ok!==1){
            console.log("couldn't increase the number of new product")
        }
    });
    Common.findOne().then((num)=>{
        if(num.numOfNewProducts >= num.maxNumOfProductsBeforeUpdate){
            clearDataSet();
        }
    });
};

module.exports = {clearDataSet,updateDataSetCollections};
