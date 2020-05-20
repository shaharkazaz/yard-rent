const {clearDataSet} = require('../utils/updateDataSet');
const User = require('../model/user');
const Products = require('../model/product');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const getUserId = require('../utils/getUserId');
const cron = require('node-cron');

cron.schedule('*/2 * * * *', () => {
    const now = new Date();
    const userId = getUserId(req);
    const oneDayInMilliseconds = 86400000;

    Order.find({}, {_id: 0}).populate('products', {_id: 0, name: 1, rewards: 1, image: 1}).then((orders) => {
        for(let order of orders)
        {
            if((order.returnDate - now) < oneDayInMilliseconds)
            {

            }
        }
            }).catch((error) => {
        res.status(500).json({
            error
        })
    })
});



module.exports = {
    getOrderNotifications: (req, res) => {
        User.find({isDeleted: false}).populate('orderId').then((users) => {
            res.status(200).json(users)
        }).catch((error) => {
            res.status(500).json({
                error
            })
        })
    }
};
