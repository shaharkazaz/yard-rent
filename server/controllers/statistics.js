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
    },
    graph1: (req, res) => {
        var res = [{
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

        Orders.find({}).populate("products").then((orders) => {
            orders.foreach(order =>{
                var dayIndex = order.date.getDay();

                // sum products per order
                res[dayIndex].orders = res[dayIndex].orders + order.products.length;

                // sum all rewards of products per order
                var rewardsPerDay = 0;
                order.products.foreach(p =>{
                    rewardsPerDay += p.rewards;
                })
                res[dayIndex].rewards = res[dayIndex].rewards + rewardsPerDay;
                // TODO: return the response as array
            })
            res.status(200).json(res)
        }).catch((error) => {
            res.status(500).json({
                error
            })
        })
    }
};
