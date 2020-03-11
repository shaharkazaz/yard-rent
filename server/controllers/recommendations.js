const mongoose = require('mongoose');
const DataSet = require('../model/dataSet');
const Recommendation = require('../model/recommendation');

const ContentBasedRecommender = require('content-based-recommender');
const RecommendationProductsNumber = 2;
const recommender = new ContentBasedRecommender({
    minScore: 0,
    maxSimilarDocuments: 100,
    debug: true
});

module.exports = {
    getRecommendation: async (req, res) => {
        const productId = req.params.productId;
        Recommendation.findById(productId).populate('recommendedProducts').then((recommendation) => {
            if(recommendation){
                res.status(200).json({
                    recommendation: recommendation.recommendedProducts
                })
            }
            else{
                DataSet.findOne({}).then((dataSet) => {
                    recommender.train(dataSet.data.toObject({getters: true}));
                    const similarDocuments = recommender.getSimilarDocuments(productId, 0, RecommendationProductsNumber);
                    const ids = similarDocuments.map(l => l.id);
                    const recommendation = new Recommendation({
                        _id: mongoose.Types.ObjectId(productId),
                        recommendedProducts: ids
                    });
                    recommendation.save().then(() => {
                        Recommendation.findById(productId).populate('recommendedProducts').then((fullrecomend)=>{
                            res.status(200).json({
                                recommendation: fullrecomend.recommendedProducts
                            })
                        })
                    }).catch(error => {
                        return res.status(500).json({
                            error
                        })
                    });
                }).catch(error => {
                    res.status(500).json({
                        error
                    })
                })
            }
        }).catch((error) => {
            res.status(500).json({
                error
            })
        });
    }
};