const UpdateData = require('../model/updateData');
const formatData = require('../utils/contentProduct');
const mongoose = require('mongoose');

// TODO: delete the console log what to do with error handling instead maybe make sure that the schema isn't exist before
// TODO: must check if the schema exist before deleting raise an error
const clearDataSet = () =>{
    mongoose.connection.dropCollection("datasets",(error,result)=>{
        if(error){
            console.log(error)
        }
        else{
            console.log(result)
        }
    });
    mongoose.connection.dropCollection("recommendations",(error,result)=>{
        if(error){
            console.log(error)
        }
        else{
            console.log(result)
        }
    });
    UpdateData.updateOne({$set:{numOfNewProducts: 0}}).then((status)=>{
        if(status.ok!==1){
            console.log("couldn't set to 0 the number of new product")
        }
    });
    formatData();
};
const initialUpdateSchema = () =>{
    const update = new UpdateData({
        _id: new mongoose.Types.ObjectId(),
        numOfNewProducts: 0,
        maxNumOfProductsBeforeUpdate: 15
    });
    //add error handling
    update.save();
};
const updateDataSet = () => {
    //need to check if the collection update is exsist if not initial
    mongoose.connection.db.listCollections({name: 'updatedatas'}).next(function(err, collinfo) {
        if (collinfo) {
            console.log("the collection is exist")
        }
        if(err){
            console.log(err)
        }
    });
    UpdateData.updateOne({$inc: {numOfNewProducts: 1}}).then((status)=>{
        if(status.ok!==1){
            console.log("couldn't increase the number of new product")
        }
    });
    UpdateData.findOne().then((num)=>{
        if(num.numOfNewProducts >= num.maxNumOfProductsBeforeUpdate){
            clearDataSet();
        }
    });
};
module.exports = initialUpdateSchema;
module.exports = updateDataSet;
