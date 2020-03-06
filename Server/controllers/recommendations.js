const mongoose = require('mongoose');
const Product = require('../model/product');
const Recommendation = require('../model/recommendation');

const ContentBasedRecommender = require('content-based-recommender')
const RecommendationProductsNumber = 3;
const recommender = new ContentBasedRecommender({
    minScore: 0,
    maxSimilarDocuments: 100,
    debug: true
});
const formatData = data => {
    let formatted = [];
    for (const [key,labels] of Object.entries(data)) {
        let tmpObj = {
            id: labels._id,
            content: [labels.name,labels.category.name,labels.subCategory.subCategoryName,labels.rewards,labels.deposit].join(" ")
        };

        formatted.push(tmpObj);
    }

    return formatted;
};
module.exports = {
    getRecommendation: (req, res) => {
        const productId = req.params.productId;
        Product.find({}, {
            name: 1,
            category: 1,
            subCategory: 1,
            rewards: 1,
            deposit: 1
        }).populate('category').populate('subCategory').then((products) => {
            const result = formatData(products);
            recommender.train(result);
            const similarDocuments = recommender.getSimilarDocuments(productId, 0, RecommendationProductsNumber);
            const ids = similarDocuments.map(l=>l.id);
            const recommendation = new Recommendation({
                _id: mongoose.Types.ObjectId(productId),
                recommendedProducts: ids
            });
            recommendation.save().then(() => {
                res.status(200).json({
                    similarDocuments
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
};