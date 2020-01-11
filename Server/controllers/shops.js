const mongoose = require('mongoose');
const Shop = require('../model/shop');


module.exports = {
    getAllShops: (req, res) => {
        Shop.find({}).then((shops) => {
            res.status(200).json({
                shops
            })
        }).catch((error) => {
            res.status(500).json({
                error
            })
        })
    },
    addShop: (req, res) => {
        const { address } = req.body;

        const shop = new Shop({
            _id: new mongoose.Types.ObjectId(),
            address
        });
        shop.save().then(() => {
            res.status(200).json({
                message: 'new shop was added'
            })
        }).catch(error => {
            res.status(500).json({
                error
            })
        })
    },
    getShop: (req, res) => {
        const shopId = req.params.shopId;
        Shop.findById(shopId).then((shop) => {
            res.status(200).json({
                shop
            })
        }).catch(error => {
            res.status(500).json({
                error
            })
        })
    }
};
