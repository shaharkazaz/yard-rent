const mongoose = require('mongoose');
const Shop = require('../model/shop');
const getCoordinatesByAddress = require('../utils/gpsApi');

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
    addShop: async (req, res) => {
        const {address, city, country} = req.body;
        const coordinates = await getCoordinatesByAddress(req);
        const shop = new Shop({
            _id: new mongoose.Types.ObjectId(),
            address,
            city,
            country,
            coordinates
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
            res.status(200).json(shop)
        }).catch(error => {
            res.status(500).json({
                error
            })
        })
    },
    updateShop: (req, res) => {
        const shopId = req.params.shopId;
        Shop.update({_id: shopId}, req.body).then(shop =>{
            res.status(200).json(shop)
        }).catch(error => {
            res.status(500).json({
                error
            })
        })
    },
    deleteShop: (req, res) => {
        const shopId = req.params.shopId;
        Shop.remove({_id: shopId}).then(() =>{
            res.status(200).json({
                message: "the shop was removed"
            })
        }).catch(error => {
            res.status(500).json({
                error
            })
        })
    }
};
