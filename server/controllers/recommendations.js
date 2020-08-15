const mongoose = require('mongoose');
const DataSet = require('../model/productsDataSet');
const Recommendation = require('../model/recommendation');
const Products = require('../model/product');
const formatData = require('../utils/contentProduct');
const {clearDataSet} = require('../utils/updateDataSet');

const ContentBasedRecommender = require('content-based-recommender');
const RecommendationProductsNumber = 3;
const recommender = new ContentBasedRecommender({
    minScore: 0,
    maxSimilarDocuments: 100,
    debug: true
});
//TODO: error handling
const getProductPopulated = async productId => {
    const result = Recommendation.findById(productId).populate({
        path: 'recommendedProducts',
        select: { isInReturnProcess: 0},
        populate: [{path: 'user', select: {name: 1, _id: 0}}, {
            path: 'category', select: {
                name: 1,
                _id: 0
            }
        }, {path: 'subCategory', select: {name: 1, _id: 0}}]
    });
    return result
};

module.exports = {
    getRecommendation: async (req, res) => {
        let runRecommendation = true;
        const productId = req.params.productId;
        await Products.find({_id: {$in: productId}, isDeleted: true}, {name: 1}).then(async (alreadyDeletedProduct) => {
            if (await alreadyDeletedProduct.length > 0) {
                return res.status(409).json('the product is deleted');
            }
        });
        const recommendation = await getProductPopulated(productId);
        if (recommendation) {
            await Products.find({_id: {$in: recommendation.recommendedProducts.forEach(p=>p._id)}, isDeleted: true}, {name: 1}).then(async (deletedProduct) => {
                if (await deletedProduct.length > 0) {
                    runRecommendation=true;
                    Recommendation.findByIdAndRemove(productId);
                }
                else{
                    runRecommendation=false;
                    res.status(200).json(recommendation.recommendedProducts);
                }
            });
        }
        if(runRecommendation) {
            DataSet.findOne({}).then(async (dataSet) => {
                if(dataSet==null){
                    await formatData();
                }
                recommender.train(dataSet.data.toObject({getters: true}));
                const similarDocuments = recommender.getSimilarDocuments(productId, 0, RecommendationProductsNumber);
                const ids = similarDocuments.map(l => l.id);
                const recommendation = new Recommendation({
                    _id: mongoose.Types.ObjectId(productId),
                    recommendedProducts: ids
                });
                recommendation.save().then(async () => {
                    const savedRecommendation = await getProductPopulated(productId);
                    res.status(200).json(savedRecommendation.recommendedProducts)
                }).catch(error => {
                    res.status(500).json({
                        error
                    })
                })
            }).catch((error) => {
                res.status(500).json({
                    error
                })
            });
        }
    },
    //make sure we dont use it and remove in the end
    resetDataSet: (req,res)=> {
        clearDataSet();
        res.status(200).json();
    }
};
