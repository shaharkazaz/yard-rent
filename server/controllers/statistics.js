module.exports = {
    graf1: (req, res) => {
        const response = [{
            Day: "Sunday",
            Orders: 50,
            Rewards: 20
        } ,{
            Day: "Monday",
            Orders: 30,
            Rewards: 10
        } ,{
            Day: "Tuesday",
            Orders: 19,
            Rewards: 15
        }, {
            Day: "Wednesday",
            Orders: 78,
            Rewards: 150
        }]
        res.status(200).json({
            data: response
        })
    }
    ,
    graf2: (req, res) => {
        const response = [{
            Category: "Furnitire",
            Orders: 50
        }, {
            Category: "Shoes",
            Count: 20
        }, {
            Category: "Electric",
            Count: 44
        }, {
            Category: "Garden",
            Count: 12
        }]
        res.status(200).json({
            data: response
        })
    }
};
