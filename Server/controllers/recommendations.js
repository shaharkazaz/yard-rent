const mongoose = require('mongoose');
const Product = require('../model/product');
const User = require('../model/user');
const Order = require('../model/order');
const ContentBasedRecommender = require('content-based-recommender')

const recommender = new ContentBasedRecommender({
    minScore: 0,
    maxSimilarDocuments: 1000,
    debug: true
});

module.exports = {
    getRecommendation: (req, res) => {

        const documents = [
            { id: '1000001', content: {
                    name: "prom",
                    user: "chen@gmail.com"
                }},
            { id: '1000002', content: {
                    name: "fish",
                    user: "chen@gmail.com"
                } },
            { id: '1000003', content: {
                    name: "shoes",
                    user: "ayelet@gmail.com"
                } },
            { id: '1000004', content: {
                    name: "dress",
                    user: "ayelet@gmail.com"
                } }
        ];

        recommender.train(documents);

        const similarDocuments = recommender.getSimilarDocuments('1000002', 0, 1);

        res.status(200).json({
            similarDocuments
        })

        },
    };