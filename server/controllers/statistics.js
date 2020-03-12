const Orders = require('../model/order');
const Products = require('../model/product');
const mongoose = require('mongoose');

// helper Class
class statObj {
    constructor(day) {
        this.day = day;
        this.orders = 0;
        this.rewards = 0;
    }
    incrementOrders(num)
    {
        this.orders += num;
    }
    incrementRewards(num)
    {
        this.rewards += num;
    }
}

module.exports = {
    graph1: (req, res) => {
        const pipeline = [
            {
                "$lookup": {
                    "from": "products",
                    "localField": "products",
                    "foreignField": "_id",
                    "as": "productObjects"
                }
            }
        ];
        var results = [{
            day: "Sunday",
            orders: 0,
            rewards: 0
        },{
            day: "Monday",
            orders: 0,
            rewards: 0
        },{
            day: "Tuesday",
            orders: 0,
            rewards: 0
        },{
            day: "Wednesday",
            orders: 0,
            rewards: 0
        },{
            day: "Thursday",
            orders: 0,
            rewards: 0
        },{
            day: "Friday",
            orders: 0,
            rewards: 0
        },{
            day: "Saturday",
            orders: 0,
            rewards: 0
        }]

        Orders.aggregate(pipeline).then((stats) =>{
            stats.forEach(o =>{
                var currentOrder = o;
                var dayIndex = currentOrder.date.getDay();

                // sum all rewards of products per order
                var rewardsPerDay = 0;
                var productObjects = currentOrder.productObjects;

                for (var i=0; i<productObjects.length;i++)
                {
                    rewardsPerDay += productObjects[i].rewards;
                }

                results[dayIndex].rewards = results[dayIndex].rewards + rewardsPerDay;
                results[dayIndex].orders++;
            })
            res.status(200).json(results);
        }).catch((error) => {
            res.status(500).json({
                error
            })
        })
    },
    graph2: (req, res) => {
        const pipeline = [
            {
                "$group": {
                    "_id": "$category",
                    "count": { "$sum": 1 }
                }
            },
            { "$project": {
                    "_id": 0,
                    "name": "$_id",
                    "count": 1,
                    "sum": 1
                }
            },
            {
                "$lookup": {
                    "from": "categories",
                    "localField": "name",
                    "foreignField": "_id",
                    "as": "shouldBeNAme"
                }
            },
            { "$project": {
                    "name": { "$arrayElemAt": [ "$shouldBeNAme.name", 0 ] } ,
                    "count": "$count",
                }
            },
        ];
        Products.aggregate(pipeline).then((stats) =>{
            res.status(200).json({
                stats: stats
            })
        }).catch((error) => {
            res.status(500).json({
                error
            })
        })
    }

};
