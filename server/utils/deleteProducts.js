const Products = require('../model/product');
const User = require('../model/user');
const mongoose = require('mongoose');
const {updateDataSetCollections, clearDataSet} = require('../utils/updateDataSet');

const deleteProducts = async (products, res) => {
    const objectIdProducts = products.map(product => mongoose.Types.ObjectId(product));
    Products.updateMany({_id: {$in: objectIdProducts}}, {$set: {isDeleted: true}}).then(() => {
        Products.deleteMany({_id: {$in: objectIdProducts}, orderCounter: 0,isDeleted: true}).then((error,result) => {
            if(result.valueOf()){
                clearDataSet();
            }
            if(error){
                console.log(error)
            }
        });
    })

};

const deleteUsers = async (products, res) => {
    User.deleteMany({isDeleted: true,product:[],orderId:[]}).then((error,result)=>{
        if(result.valueOf()){
            clearDataSet();
        }
        if(error){
            console.log(error)
        }
    })
};
module.exports = deleteProducts;
