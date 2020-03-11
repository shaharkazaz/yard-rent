const Product = require('../model/product');
const DataSet = require('../model/dataSet');
const mongoose = require('mongoose');

const DataToString = data => {
    let formatted = [];
    for (const [key,labels] of Object.entries(data)) {
        let tmpObj = {
            id: labels._id,
            content: [labels.name,labels.category.name,labels.subCategory.subCategoryName,labels.rewards,labels.deposit].join(" ")
        };

        formatted.push(tmpObj);
    }

    return formatted;
};
const formatData = async () => {
    Product.find({}, {
        name: 1,
        category: 1,
        subCategory: 1,
        rewards: 1,
        deposit: 1
    }).populate('category').populate('subCategory').then((products) => {
        const result = DataToString(products);
        const dataSet = new DataSet({
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