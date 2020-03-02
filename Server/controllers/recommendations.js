const {Apriori, Itemset, IAprioriResults} = require('node-apriori')
const mongoose = require('mongoose');
const Product = require('../model/product');
const User = require('../model/user');
const Order = require('../model/order');

const apriori = new Apriori(.4);

module.exports = {
    getRecommendation: (req, res) => {
        Order.find({}).select({product: 1}).then(productsIds => {
            const transactions = productsIds.map(p => p.product);
            apriori.on('data', itemset => {
                let support = itemset.support;
                let items = itemset.items;
            });
            apriori.exec(transactions)
                .then(recommendation => {
                    let recommendedProducts = recommendation.itemsets.map(item => item.items);
                    let result = async () => {
                        const a = await recommendedProducts.map(p => p.map(id => getProduct(id)))
                        res.status(200).json({
                            recommendation: a
                        })
                    }

                    result()
                });

                }).catch((error) => {
                res.status(500).json({
                    error
                })
            })
        }
    };


let getProduct = async (id) => {
    return await Product.findById(id);
};