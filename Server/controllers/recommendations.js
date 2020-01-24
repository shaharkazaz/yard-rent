//import { Apriori, Itemset, IAprioriResults } from 'node-apriori';

const {Apriori, Itemset, IAprioriResults} = require('node-apriori')
const mongoose = require('mongoose');
const Products = require('../model/product');
const User = require('../model/user');
const Order = require('../model/order');

// Execute Apriori with a minimum support of 40%. Algorithm is generic.
const apriori = new Apriori(.6);






module.exports = {
    getRecommendation: (req, res) => {
        Order.find({}).select({product: 1}).then(productsIds => {
            const transactions = productsIds.map(p => p.product)
            // Returns itemsets 'as soon as possible' through events.
            apriori.on('data', itemset => {
                // Do something with the frequent itemset.
                let support = itemset.support;
                let items = itemset.items;
            });
            // Execute Apriori on a given set of transactions.
            apriori.exec(transactions)
                .then(result => {
                    // Returns both the collection of frequent itemsets and execution time in millisecond.
                    res.status(200).json({
                        result: result.itemsets
                    })
                });
        }).catch((error) => {
            res.status(500).json({
                error
            })
        })
    }
};


// getAllProductsId = () => {
//     return Order.find({}, {projection: {product: 1}}).toArray(function (err, result) {
//         if (err) throw err;
//     });
// };

// const transactions = getAllProductsId();
//
// // Execute Apriori with a minimum support of 40%. Algorithm is generic.
// let apriori = new Apriori(.4);
//
// // Returns itemsets 'as soon as possible' through events.
// apriori.on('data', itemset => {
//     // Do something with the frequent itemset.
//     let support = itemset.support;
//     let items = itemset.items;
// });
//
// // Execute Apriori on a given set of transactions.
// apriori.exec(transactions)
//     .then(result => {
//         // Returns both the collection of frequent itemsets and execution time in millisecond.
//         let frequentItemsets = result.itemsets;
//         let executionTime = result.executionTime;
//     });