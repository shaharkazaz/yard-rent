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
        select: { isDeleted: 0},
        populate: [{path: 'user', select: {name: 1, _id: 0}}, {
            path: 'category', select: {
                name: 1,
                _id: 0
            }
        }, {path: 'subCategory', select: {name: 1, _id: 0}}]
    });
    return result
};
//TODO: make sure the error if the product is deleted is okay
module.exports = {
    getRecommendation: async (req, res) => {
        const productId = req.params.productId;
        await Products.find({_id: {$in: productId}, isDeleted: true}, {name: 1}).then(async (alreadyDeletedProduct) => {
            if (await alreadyDeletedProduct.length > 0) {
                return res.status(409).json('the product is deleted');
            }
        });
        const recommendation = await getProductPopulated(productId);
        if (recommendation) {
            res.status(200).json(recommendation.recommendedProducts)
        }
        else {
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
    resetDataSet: (req,res)=> {
        clearDataSet();
        res.status(200).json();
    }
};
