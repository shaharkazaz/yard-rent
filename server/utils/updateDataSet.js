const Common = require('../model/common');
const formatData = require('../utils/contentProduct');
const mongoose = require('mongoose');
const ProductsDataSet = require('../model/productsDataSet');
const Product = require('../model/product');

//TODO: final-ayelet called in : public: delete_user private usage:
//
// releaseRentedProducts,releaseDeletedProducts,resetDataSet
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
const clearRecommendations = () =>{
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
};
const initialUpdateSchema = () =>{
    const common = new Common({
        _id: new mongoose.Types.ObjectId(),
        numOfNewProducts: 0,
        maxNumOfProductsBeforeUpdate: 15
    });
    common.save();
};
const resetRecommendationIfNeeded = () => {
    mongoose.connection.db.listCollections({name: 'commons'}).next(function(err, collinfo) {
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
            clearRecommendations();
            Common.updateOne({$set: {numOfNewProducts: 0}}).then((status)=>{
                if(status.ok!==1){
                    console.log("couldn't zeroed the number of new product")
                }
            });
        }
    });
};
const removeProductsFromDataSet = (productsIdsToRemove) => {
    ProductsDataSet.updateOne({$pull: {data: {_id:productsIdsToRemove}}}).then((status)=>{
        if (status.ok!==1){
            console.log("didnt remove products from dataset")
        }
    })
};

const updateProductInDataSet = async (productIdToUpdate) => {
    const result = await createContentForProductId(productIdToUpdate);
    ProductsDataSet.updateOne({'data._id': productIdToUpdate}, {$set: {'data.$.content': result}}).then((status) => {
        if (status.ok !== 1) {
            console.log("didnt remove products from dataset")
        }
        resetRecommendationIfNeeded();
    })
};

const addProductInDataSet = async (productIdToAdd) => {
    const result = await createContentForProductId(productIdToAdd);
    let tmpObj = {
        _id: mongoose.Types.ObjectId(productIdToAdd),
        content: result
    };
    ProductsDataSet.updateOne({$push: {data: tmpObj}}).then((status) => {
        if (status.ok !== 1) {
            console.log("didnt remove products from dataset")
        }
        resetRecommendationIfNeeded();
    })
};
//TODO: currently enable to edit a rented product if not add ,isRented:false}
const createContentForProductId = async (productId) => {
    return await Product.findOne({_id:productId,isDeleted: false}, {
        name: 1,
        category: 1,
        subCategory: 1,
        rewards: 1,
        description: 1
    }).populate('category').populate('subCategory').then((product) => {
        return [product.name, product.category.name, product.subCategory.name, product.rewards, product.description].join(" ");
    });
};

module.exports = {clearDataSet,updateDataSetCollections: resetRecommendationIfNeeded,removeProductsFromDataSet,addProductInDataSet,updateProductInDataSet};
