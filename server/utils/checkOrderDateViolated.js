const jwt = require('jsonwebtoken');
const Orders = require('../model/order');



const checkOrderDateViolated = () =>{
    Orders.find({}, {_id: 0}).populate('products', {_id: 0, name: 1, rewards: 1, image: 1}).then((orders) => {
        res.status(200).json({
            orders
        })
    }).catch((error) => {
        res.status(500).json({
            error
        })
    })
}

module.exports = checkOrderDateViolated;
