const Orders = require('../model/order');
const Products = require('../model/product');

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
                    "as": "product"
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
            console.log(stats);
            stats.forEach(o =>{
                console.log(o.products.length)
                var currentOrder = o;
                var dayIndex = currentOrder.date.getDay();

                // sum products per order
                results[dayIndex].orders++;

                // sum all rewards of products per order
                var rewardsPerDay = 0;
                var productsArr = currentOrder.products
                for (var j=0; j < productsArr.length; j++)
                {
                    var currentProduct = productsArr[j];
                    console.log(currentProduct.id);
                    Products.findOne({_id: currentProduct.id}).then(p => {
                        console.log(p)
                        rewardsPerDay += currentProduct.rewards;
                    })
                }
                results[dayIndex].rewards = results[dayIndex].rewards + rewardsPerDay;
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
            }
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
