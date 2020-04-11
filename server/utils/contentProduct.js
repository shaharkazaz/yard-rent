const Product = require('../model/product');
const ProductsDataSet = require('../model/productsDataSet');
const mongoose = require('mongoose');

const DataToString = data => {
    let formatted = [];
    for (const [key,labels] of Object.entries(data)) {
        let tmpObj = {
            _id: mongoose.Types.ObjectId(labels._id),
            content: [labels.name,labels.category.name,labels.subCategory.name,labels.rewards,labels.description].join(" ")
        };

        formatted.push(tmpObj);
    }

    return formatted;
};
const formatData = async () => {
    Product.find({isDeleted: false,isRented:false}, {
        name: 1,
        category: 1,
        subCategory: 1,
        rewards: 1,
        description: 1
    }).populate('category').populate('subCategory').then(async (products) => {
        const result = DataToString(products);
        const dataSet = new ProductsDataSet({
            _id: new mongoose.Types.ObjectId(),
            data: result
        });
        dataSet.save().then(()=>{
            return 0
        }).catch(error => {
            return error
        });
    }).catch(error => {
            return error
        });
};

module.exports = formatData;