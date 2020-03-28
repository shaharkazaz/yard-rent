const mongoose = require('mongoose');
const DataSet = require('../model/productsDataSet');
const Recommendation = require('../model/recommendation');

const ContentBasedRecommender = require('content-based-recommender');
const RecommendationProductsNumber = 2;
const recommender = new ContentBasedRecommender({
    minScore: 0,
    maxSimilarDocuments: 100,
    debug: true
});
//TODO: error handling
const getProductPopulated = async productId=>{
    const result = Recommendation.findById(productId).populate({
        path: 'recommendedProducts', select: {
            _id: 0,
            isDeleted: 0
        }, populate: [{path: 'user', select: {name: 1, _id: 0}},{
            path: 'category', select: {
                name: 1,
                _id: 0
            }},{path: 'subCategory', select: {subCategoryName: 1, _id: 0}}]});
    return result
};
//TODO: make sure Shahar never send productID of a deleted product (need to put validation or counting on Shahar to do so)
module.exports = {
    getRecommendation: async (req, res) => {
        const productId = req.params.productId;
        const recommendation = await getProductPopulated(productId);
            if (recommendation) {
                res.status(200).json(recommendation.recommendedProducts)
            } else {
                DataSet.findOne({}).then((dataSet) => {
                    recommender.train(dataSet.data.toObject({getters: true}));
                    const similarDocuments = recommender.getSimilarDocuments(productId, 0, RecommendationProductsNumber);
                    const ids = similarDocuments.map(l => l.id);
                    const recommendation = new Recommendation({
                        _id: mongoose.Types.ObjectId(productId),
                        recommendedProducts: ids
                    });
                    recommendation.save().then(async () => {
                        const recommendation = await getProductPopulated(productId);
                        res.status(200).json(recommendation.recommendedProducts)
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
    }
};