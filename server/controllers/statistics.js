const Orders = require('../model/order');
const Products = require('../model/product');

module.exports = {
    weeklyData: (req, res) => {
        // TODO get only the orders of the past week
        const today = new Date().getDay();
        const lastWeek = new Date();
        lastWeek.setDate(lastWeek.getDate() -7);
        const pipeline = [
            {
                "$lookup": {
                    "from": "products",
                    "localField": "products",
                    "foreignField": "_id",
                    "as": "productObjects"
                }
            },
            {
                "$match": {
                    "date": { $gte: lastWeek  }
                }
            }
        ];

        let daysOfWeekOrdered = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
        for(let i=0;i<today;i++)
        {
            const d = daysOfWeekOrdered.pop();
            daysOfWeekOrdered.unshift(d);
        }
        let results = daysOfWeekOrdered.map(day => ({day, orders: 0, rewards: 0}));

        Orders.aggregate(pipeline).then((stats) => {
            stats.forEach(o =>{
                const dayIndex = o.date.getDay();
                // sum all rewards of products per order
                const rewardsPerDay = o.productObjects.reduce((acc, product) => (acc + product.rewards), 0);
                const dayData = results[Math.abs(today + dayIndex)%7];
                dayData.rewards += rewardsPerDay;
                dayData.orders++;
            });
            res.status(200).json(results);
        }).catch((error) => {
            res.status(500).json({
                error
            })
        })
    },
    ordersPerCategory: (req, res) => {
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
                    "as": "categoryObj"
                }
            },
            {
                "$project": {
                    "name": { "$arrayElemAt": [ "$categoryObj.name", 0 ] } ,
                    "count": "$count",
                }
            },
        ];
        Products.aggregate(pipeline).then((stats) =>{
            res.status(200).json(stats)
        }).catch((error) => {
            res.status(500).json({
                error
            })
        })
    }
};
